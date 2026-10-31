import { useFormContext, useWatch } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { heardFromNeedsDetail, heardFromOptions } from "@/content/site";

/**
 * "How did you hear about us?" plus a follow-up box for referrals and
 * "Other". Used on both the booking and contact forms.
 *
 * Must sit inside a shadcn <Form> (react-hook-form provider) whose values
 * include `heardFrom` and `heardFromDetail`.
 */
export function HeardFromFields({ optional = false }: { optional?: boolean }) {
  const { control } = useFormContext<{
    heardFrom?: string;
    heardFromDetail?: string;
  }>();
  const heardFrom = useWatch({ control, name: "heardFrom" });
  const showDetail = !!heardFrom && heardFromNeedsDetail.includes(heardFrom);
  const detailLabel =
    heardFrom === "Friend or member"
      ? "Who referred you?"
      : "Where did you hear about us?";

  return (
    <>
      <FormField
        control={control}
        name="heardFrom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              How did you hear about us?
              {optional ? (
                <>
                  {" "}
                  <span className="text-muted-foreground">(optional)</span>
                </>
              ) : null}
            </FormLabel>
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {heardFromOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {showDetail ? (
        <FormField
          control={control}
          name="heardFromDetail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {detailLabel}{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    heardFrom === "Friend or member"
                      ? "Their name"
                      : "e.g. a poster, an event"
                  }
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        // Keeps the two-column grid tidy when the follow-up box is hidden.
        <div aria-hidden="true" className="hidden sm:block" />
      )}
    </>
  );
}
