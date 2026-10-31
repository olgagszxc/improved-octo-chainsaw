-- "How did you hear about us?" and link tracking for both website forms.
alter table public.consultation_requests
  add column if not exists heard_from text,
  add column if not exists heard_from_detail text,
  add column if not exists ref text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists landing_page text,
  add column if not exists referrer_site text;

alter table public.contact_messages
  add column if not exists heard_from text,
  add column if not exists heard_from_detail text,
  add column if not exists ref text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists landing_page text,
  add column if not exists referrer_site text;

-- Tell the API about the new columns straight away.
notify pgrst, 'reload schema';
