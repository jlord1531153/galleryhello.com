## Purpose

Defines the site's editorial and legal pages — About, Privacy Policy, Terms of Service — the global 404 experience, and the site-wide metadata and SEO surface that makes the gallery discoverable and shareable.

## ADDED Requirements

### Requirement: About page content

The site SHALL provide an About page titled `About Gallery Hello` that explains the site as a platform showcasing AI portraits and creative visual works, and that contains the sections `What You'll Find` (covering Portraits, Cosplay, and Creative Collections), `Our Approach`, and `Get in Touch`. Where the showcased work is AI-generated, the page SHALL state so plainly and SHALL NOT invent team size or photographer credentials.

#### Scenario: About page presents the required sections
- **WHEN** a visitor opens `/about`
- **THEN** the page shows the title `About Gallery Hello`
- **AND** the sections `What You'll Find`, `Our Approach`, and `Get in Touch` are present

#### Scenario: AI generation is disclosed
- **WHEN** a visitor reads the About page
- **THEN** the page states that the showcased works are AI-generated

#### Scenario: No invented credentials
- **WHEN** the About page content is inspected
- **THEN** it contains no fabricated team size, team roster, or photographer biography

### Requirement: Contact channel on the About page

The About page's `Get in Touch` section SHALL provide a working contact link when a real address is configured, and SHALL omit the contact link entirely when none is configured.

#### Scenario: Contact link opens mail composition
- **WHEN** a contact address is configured and the visitor activates the contact link
- **THEN** a mail composition opens addressed to that address

#### Scenario: No contact link without configuration
- **WHEN** no contact address is configured
- **THEN** the `Get in Touch` section contains no email address and no placeholder example address

### Requirement: Privacy policy content

The site SHALL provide a Privacy Policy page containing a last-updated date and a readable long-form layout with a narrow content column of approximately `760px` and clear heading hierarchy. Its content SHALL describe only the data practices that actually apply to the deployed site — and SHALL NOT assert collection of data from advertising, unlock systems, or user accounts that the site does not operate.

#### Scenario: Policy states a last-updated date
- **WHEN** a visitor opens `/privacy`
- **THEN** the page displays a last-updated date

#### Scenario: Policy reflects actual practices only
- **WHEN** the privacy policy content is inspected
- **THEN** it describes the site's real data handling
- **AND** it makes no claim about collecting data from systems the site does not operate

### Requirement: Terms of service content

The site SHALL provide a Terms of Service page sharing the privacy page's long-form reading layout, describing the site's use, the nature of its AI-generated content, the copyright and fair-use position, its treatment of external links, and its disclaimers. It SHALL NOT describe paid or unlock services as already available.

#### Scenario: Terms covers the required topics
- **WHEN** a visitor opens `/terms`
- **THEN** the page addresses site use, AI-generated content, copyright and fair use, external links, and disclaimers

#### Scenario: Terms omit unbuilt features
- **WHEN** the terms content is inspected
- **THEN** it contains no statement that paid access or unlock functionality is currently available

### Requirement: Long-form reading layout

The About, Privacy Policy, and Terms of Service pages SHALL render their body text in a content column of approximately `760px` with clear H1 and H2 heading hierarchy and comfortable line spacing.

#### Scenario: Long-form pages use the narrow column
- **WHEN** a visitor opens any of the three long-form pages
- **THEN** the body text is constrained to a roughly `760px` column
- **AND** it is not stretched across the full `1280px` page width

### Requirement: Global 404 page

Unmatched routes SHALL render a not-found page displaying the large heading `Page Not Found`, a one-line explanation, and two working links labelled `Back Home` and `Explore Collections`. The not-found page SHALL retain the site header and footer so the visual context does not break.

#### Scenario: Unknown path shows the 404 page
- **WHEN** a visitor requests a path that matches no route
- **THEN** the page displays `Page Not Found`
- **AND** the site header and footer remain visible

#### Scenario: Both recovery links work
- **WHEN** a visitor activates `Back Home`
- **THEN** they are navigated to `/`
- **AND** when they activate `Explore Collections` they are navigated to `/explore`

### Requirement: Site-wide metadata and SEO surface

The site SHALL expose a distinctive page title and description, a favicon, a default social sharing image, a robots file, and a sitemap listing the home page, explore page, collection detail pages, and the three editorial pages. Collection detail pages SHALL expose their own title, description, and sharing image.

#### Scenario: Default metadata is set
- **WHEN** any page is loaded
- **THEN** the document has a non-default title, a meta description, and a favicon

#### Scenario: Sitemap covers public routes
- **WHEN** the sitemap is requested
- **THEN** it lists the home page, explore page, every collection detail page, and About, Privacy Policy, and Terms of Service

#### Scenario: Robots file is served
- **WHEN** the robots file is requested
- **THEN** a valid robots file is returned
- **AND** it does not block crawling of the public gallery pages

### Requirement: No unavailable feature is presented as operable

Across the entire site, no control SHALL be rendered that leads to an unavailable service. Specifically, no unlock button, sign-in or account entry point, favourites or history entry point, top-up or payment entry point, or non-functional search control SHALL be present.

#### Scenario: Every visible control has a real result
- **WHEN** a visitor activates any visible control on any page
- **THEN** it produces a real navigation, a real state change, or a real content expansion
- **AND** it never leads to an empty, placeholder, or error outcome

#### Scenario: Phase-one exclusions stay absent
- **WHEN** any page is inspected
- **THEN** no unlock, sign-in, favourites, history, payment, top-up, or standalone search entry point is present
