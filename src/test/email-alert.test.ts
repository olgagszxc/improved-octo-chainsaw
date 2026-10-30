import { afterEach, describe, expect, it, vi } from "vitest";

import { sendAlert } from "@/lib/email-alert";

describe("sendAlert", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("does nothing without settings", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "");
    await sendAlert("Subject", [["Name", "A"]]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts an escaped email to Resend and swallows failures", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("nope", { status: 403 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("ALERT_EMAIL", "gym@example.com");
    vi.spyOn(console, "error").mockImplementation(() => {});

    await sendAlert(
      "New booking",
      [
        ["Message", "<b>hi</b>"],
        ["Mobile", null],
      ],
      "v@example.com",
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual(["gym@example.com"]);
    expect(body.reply_to).toBe("v@example.com");
    expect(body.html).toContain("&lt;b&gt;hi&lt;/b&gt;");
    expect(body.html).not.toContain("Mobile");
  });
});
