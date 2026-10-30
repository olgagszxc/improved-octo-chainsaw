# Roadmap — Kaizen Fitness website

## In progress
- [x] Review uploaded assets, extract logo + photo crops
- [x] Enable Lovable Cloud, upload brand assets, generate hero images
- [ ] Database: consultation_requests + contact_messages tables, RLS policies, server functions
- [ ] Design system in src/styles.css (red/black/charcoal, Oswald + Inter)
- [ ] Content module src/content/site.ts (nav, contact info, FAQ, promo, memberships placeholder)
- [ ] Shared components: Header, Footer, CTA buttons, Hero, cards, forms, FAQ accordion, gallery lightbox, mobile CTA
- [x] Create stub route files for every linked path (/about, /facilities, /memberships, /consultation, /referral-program, /contact, /privacy, /terms) so route links typecheck; replace with real pages below
- [ ] Pages: / (home), /about, /facilities, /memberships, /consultation, /referral-program, /contact (replace each PagePlaceholder)
- [ ] Head metadata per route, favicon from logo
- [ ] Form validation tests + build check
- [ ] End-to-end Playwright verification (forms submit and persist, nav works)
