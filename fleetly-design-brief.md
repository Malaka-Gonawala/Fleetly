# Fleetly — Design Brief (for prototyping)

Italian, direct-to-consumer online car rental platform. High-end, trustworthy, secure-feeling brand. Client-facing site is public/SEO; there's also a separate hidden admin panel (not part of this prototype's public nav).

## Brand feel
Modern, high-end, trustworthy. Think premium mobility brand, not a budget rental counter. Security/trust signals should be visible without feeling paranoid (verified reviews, insurance included, encrypted payments).

## Language
Italian only (all copy in Italian for the prototype).

## Pages to design

### 1. Homepage
- Hero with search widget: pickup location, pickup/return date & time
- Trust signals: insurance included, verified reviews, security badges
- Featured vehicle categories (city car, SUV, van, luxury, electric)
- "How it works" section
- CTA to browse fleet

### 2. Vehicle Selection (listing/grid)
- Filterable/sortable grid of cars
- Filters: category, brand, transmission, fuel type, seats, price range, availability for selected dates/location
- Filters update results without full page reload (instant-feel UX)
- Map or branch picker
- Empty-state handling

### 3. Vehicle Focus (detail page)
- Photo gallery
- Full specs: make/model/year, transmission, fuel, seats, doors, luggage capacity, mileage policy
- Numberplate/targa + vehicle age shown for transparency
- Price breakdown by rental length
- Insurance/coverage tiers with optional add-ons: extra driver, child seat, GPS, top-up insurance, cross-border permit
- Real-time availability calendar
- Sticky "Rent this car" CTA
- Reviews section (optional — design as toggleable)

### 4. Register / Login
- Email + password, or passwordless option
- Email OTP step (6-digit code entry)
- Phone OTP step (6-digit code entry)
- CAPTCHA challenge on login (design as an inline, non-intrusive widget — not old-school distorted text)
- Account recovery flow

### 5. Profile & Eligibility
- Personal info: full name, date of birth
- Driving license: number, category, issue date, issuing country
- Live eligibility status indicator (e.g. "Eligible" / "Needs verification" / "Not eligible" with reason)

### 6. Rental Form (multi-step booking)
Steps, with saved progress indicator:
1. Dates/branch (pickup/return branch + dates/times)
2. Driver + extras (driver details, extra driver, child seat, GPS, insurance tier, cross-border permit)
3. Verification method — choose:
   - **Stripe Identity**: document + selfie capture flow (in-flow embedded widget)
   - **In person**: "I will show my license and ID at pickup" flag
4. Payment method — choose:
   - Pay online now (full amount or deposit + balance)
   - Pay in person (small online holding deposit configurable)
5. Review — price breakdown (base rate, taxes, deposit/cauzione, extras), cancellation terms, legally required disclosures (trader identity, P.IVA, total price incl. taxes, explicit "right of withdrawal does not apply" notice), a **separate confirmation step** (distinct from the main checkbox) for clauses like liability caps/cancellation penalties
- Payment step: Stripe-style card entry
- Confirmation screen: booking reference, contract PDF download, check-in instructions

## Global/shared UI needs
- Header/nav: logo, browse fleet, login/account, language indicator (IT only for now)
- Footer: legal links (Privacy Policy, Cookie Policy, Terms & Conditions, Right-of-withdrawal notice, Company/legal info with P.IVA/REA/registered office), accessibility statement
- Cookie consent banner: accept/reject with **equal visual prominence**, no dark patterns, link to full Cookie Policy
- Legal pages (can be simple templated content pages): Privacy Policy, Cookie Policy, Terms & Conditions, Company info, Accessibility statement

## Non-functional design constraints
- **Accessibility**: WCAG 2.1 AA — real focus states, sufficient color contrast, keyboard navigable, screen-reader-friendly labels/semantic HTML. This is a hard requirement, not polish.
- **Performance feel**: homepage/listing should read as fast — avoid heavy hero video/animation blocking first paint.
- **Mobile-first responsive**: booking flow especially must work well on mobile (many users will book from phone).
- **Trust-building visual language**: security badges, "your data is encrypted" type micro-copy near sensitive steps (OTP, payment, ID verification), progress indicators on multi-step flows so users always know where they are.

## Not needed in this prototype
- Admin panel (separate, hidden surface — out of scope for this design pass)
- Native mobile app
- Loyalty/rewards UI
- Multi-language switcher (Italian only, but leave room in layout for one later)
