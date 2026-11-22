## Purpose

Defines the shared visual language and reusable building blocks that every GalleryHello page is composed from: the dark editorial token palette, the typography pairing, the responsive grid rules, and the Header, Footer, CollectionCard, FilterChip, and EmptyState components.

## ADDED Requirements

### Requirement: Dark editorial design tokens

The site SHALL present a single consistent dark editorial theme across all pages, using exactly these base token values: page background `#101014`, surface (cards and dropdown areas) `#1B1B22`, hover surface `#272730`, primary text `#F5F2EF`, secondary text `#AAA6AF`, accent `#C29B84`, and divider `#33313A`.

#### Scenario: Any page renders on the dark palette
- **WHEN** a visitor loads any page of the site
- **THEN** the page background is `#101014` and body text uses the defined primary or secondary text colour
- **AND** no light-mode OS colour-scheme override repaints the page

#### Scenario: Accent colour is reserved for emphasis
- **WHEN** the primary call-to-action button, a selected filter chip, or a small brand decoration is rendered
- **THEN** it uses accent colour `#C29B84`
- **AND** the accent is not used as a large background fill for unrelated page areas

### Requirement: Typography pairing

The site SHALL render display headings (hero and large page titles) in a serif face matching Playfair Display, with a Georgia fallback, and SHALL render navigation, body copy, and buttons in a sans-serif face matching Inter, with a `system-ui` fallback.

#### Scenario: Hero heading renders in the serif face
- **WHEN** the home page hero is displayed
- **THEN** its main heading uses the display serif font
- **AND** the descriptive paragraph beneath it uses the UI sans-serif font

### Requirement: Layout and spacing rules

The main content area SHALL be constrained to a maximum width of `1280px`. Collection cards SHALL use a `12px` corner radius. Primary gallery imagery SHALL be presented in a fixed `3:4` aspect ratio container with `object-cover` fitting.

#### Scenario: Content stays within the maximum width on wide viewports
- **WHEN** the browser viewport is wider than `1280px`
- **THEN** the content column is centred and does not exceed `1280px`

#### Scenario: Images do not shift layout while loading
- **WHEN** a collection cover or preview image is loading
- **THEN** its container already reserves the `3:4` aspect ratio
- **AND** no subsequent content is displaced when the image finishes loading

### Requirement: Responsive grid density

Collection grids SHALL render 2 cards per row below `640px`, 3 cards per row between `640px` and `1023px`, and 4 cards per row at `1024px` and above. Grid gaps SHALL be `12px` on mobile and `20px` on desktop, and page side padding SHALL be `16px` on mobile and `32px` on desktop.

#### Scenario: Grid density changes across breakpoints
- **WHEN** the viewport width crosses `640px` or `1024px`
- **THEN** the number of cards per row changes to 2, 3, or 4 respectively
- **AND** the gap and side padding adopt their corresponding mobile or desktop values

#### Scenario: No horizontal overflow at any width
- **WHEN** the site is viewed at mobile, tablet, and desktop widths
- **THEN** no horizontal scrolling occurs
- **AND** no element overlaps another and no image renders at an incorrect aspect ratio

### Requirement: Header navigation shell

The site SHALL present a sticky header on every page, containing a `GALLERY HELLO.` logo that links to `/`, with `HELLO.` optionally accented, and navigation links to `Explore` (`/explore`) and `About` (`/about`). On mobile the header SHALL present the logo plus a compact menu control that reveals the same navigation.

#### Scenario: Logo navigates home
- **WHEN** a visitor clicks the `GALLERY HELLO.` logo on any page
- **THEN** they are navigated to `/`

#### Scenario: Mobile menu reveals navigation
- **WHEN** a visitor on a viewport below `640px` activates the menu control
- **THEN** the `Explore` and `About` links become visible and operable

#### Scenario: Header contains no unavailable features
- **WHEN** the header is rendered
- **THEN** it contains no sign-in, top-up, email-forwarding, or non-functional search control

### Requirement: Footer content and links

The site SHALL present a footer on every page containing the brand name with a short introduction, navigation links to `Explore`, `About`, `Privacy Policy`, and `Terms of Service`, an automatically year-updating copyright line, and a note that the site presents AI-generated content.

#### Scenario: Footer navigation links resolve
- **WHEN** a visitor activates any footer navigation link
- **THEN** they are navigated to the corresponding page (`/explore`, `/about`, `/privacy`, `/terms`)

#### Scenario: Copyright year is current
- **WHEN** the footer is rendered in any year
- **THEN** the displayed copyright year equals the current year without manual updating

#### Scenario: Contact row is omitted when no address is configured
- **WHEN** no contact email address is configured for the site
- **THEN** the footer renders no contact row
- **AND** no placeholder or example email address appears anywhere on the site

### Requirement: Contact email is rendered only when configured

The site SHALL render a contact email link only when a real, deliverable address is configured, and the link SHALL open a mail composition addressed to that address.

#### Scenario: Configured address produces a working mail link
- **WHEN** a contact address is configured
- **THEN** the footer and the About page display a contact link that opens a mail composition to that exact address

### Requirement: Collection card presentation

Each collection card SHALL display a `3:4` cover image, the collection title, its category, and its photo count. The card SHALL indicate an optional `New`, `Featured`, or `Preview` tag where that attribute applies. The entire card SHALL be an activatable link to the collection's detail page, and SHALL provide a subtle zoom or brightness change on hover.

#### Scenario: Card opens the collection
- **WHEN** a visitor activates any part of a collection card
- **THEN** they are navigated to that collection's detail page

#### Scenario: Card shows accurate metadata
- **WHEN** a collection card is displayed
- **THEN** the title, category, and photo count match that collection's stored data

#### Scenario: Card invents no popularity metrics
- **WHEN** a collection card is rendered
- **THEN** it shows no view count, like count, or download count

### Requirement: Filter chip and empty state components

The site SHALL provide a reusable filter chip that visibly reflects its selected state, and a reusable empty state that communicates that no results were found and offers a way to view all collections.

#### Scenario: Selected chip is visually distinct
- **WHEN** a filter chip is the active filter
- **THEN** it is visually distinguishable from unselected chips

#### Scenario: Empty state offers a recovery action
- **WHEN** a filtered result set contains no collections
- **THEN** the page displays a no-collections-found message
- **AND** a control is present that returns the visitor to the unfiltered collection list
