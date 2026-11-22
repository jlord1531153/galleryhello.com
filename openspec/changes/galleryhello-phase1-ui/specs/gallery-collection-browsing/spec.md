## Purpose

Defines the public browsing surface for curated collections: how the home page merchandises featured, by-style, and latest collections, and how the explore page filters and sorts the full catalogue.

## ADDED Requirements

### Requirement: Home page hero

The home page SHALL open with a hero presenting the brand statement `Curated AI Portraits & Visual Stories.`, a supporting description of the site's offering, and a single primary call-to-action that navigates to `/explore`. The hero SHALL NOT use video backgrounds or a full-screen slideshow.

#### Scenario: Primary call-to-action navigates to explore
- **WHEN** a visitor activates the hero's primary button
- **THEN** they are navigated to `/explore`

#### Scenario: Hero renders on mobile without a full-screen banner
- **WHEN** the home page is viewed on a mobile viewport
- **THEN** the hero copy is shortened to fit
- **AND** the hero does not consume the entire viewport height

### Requirement: Home page merchandising sections

The home page SHALL present a Featured Collections section containing between 4 and 8 collection cards, a Latest Collections section containing between 4 and 8 collection cards ordered by publication date descending, and an Explore by Style section listing category shortcuts. The Featured and Latest sections SHALL each offer a control linking to the complete collection list.

#### Scenario: Featured section shows featured collections only
- **WHEN** the Featured Collections section is displayed
- **THEN** every card shown is a collection flagged as featured
- **AND** between 4 and 8 cards are shown

#### Scenario: Latest section is ordered by publication date
- **WHEN** the Latest Collections section is displayed
- **THEN** its cards are ordered from most recently published to least recently published

#### Scenario: View-all control reaches the full list
- **WHEN** a visitor activates the view-all control on the Featured or Latest section
- **THEN** they are navigated to `/explore`

#### Scenario: By-style shortcuts target the explore filter
- **WHEN** a visitor activates a category shortcut
- **THEN** they are navigated to `/explore?category=<category>`
- **AND** only categories that have associated collections are offered

### Requirement: Explore page lists all collections

The explore page SHALL display every collection in the catalogue by default, presented in a responsive grid that yields 2, 3, or 4 cards per row according to the responsive grid density rule.

#### Scenario: Default view shows the full catalogue
- **WHEN** a visitor opens `/explore` with no query parameters
- **THEN** every collection is listed
- **AND** the `All` filter is the active selection

#### Scenario: Sparse results keep normal spacing
- **WHEN** a filter yields fewer collections than fill a grid row
- **THEN** the remaining cards retain the standard card size and grid alignment

### Requirement: Explore page category filtering

The explore page SHALL expose a category filter whose options are derived from the collections that actually exist, including an `All` option that is selected by default. Selecting a category SHALL restrict the visible collections to that category only, and SHALL be reflected in the page URL as the `category` query parameter.

#### Scenario: Category filter restricts results
- **WHEN** a visitor selects a category other than `All`
- **THEN** only collections belonging to that category are shown

#### Scenario: Direct category URL is honoured
- **WHEN** a visitor opens `/explore?category=<category>`
- **THEN** the corresponding filter is active
- **AND** the visible collections are restricted to that category

#### Scenario: Unknown category yields the empty state
- **WHEN** a visitor opens `/explore?category=<value that matches no collection>`
- **THEN** the empty state is displayed with a control to view all collections

#### Scenario: Filter options reflect real data
- **WHEN** the filter row is displayed
- **THEN** every offered category corresponds to at least one existing collection

### Requirement: Explore page sorting

The explore page SHALL offer sorting by newest publication date and by alphabetical title order. It SHALL NOT offer a popularity-based sort, because no real popularity statistic exists.

#### Scenario: Newest sort orders by publication date
- **WHEN** a visitor selects the newest sort option
- **THEN** collections are ordered from most recently published to least recently published

#### Scenario: Alphabetical sort orders by title
- **WHEN** a visitor selects the alphabetical sort option
- **THEN** collections are ordered alphabetically by title

#### Scenario: No popularity sort is offered
- **WHEN** the sort control is displayed
- **THEN** it contains no "Most Popular" or equivalent view-count-based option

### Requirement: Collection catalogue content

The site SHALL ship an initial catalogue of between 6 and 12 collections spanning 3 to 5 categories. Each collection SHALL carry a slug, English title, English description, category, cover image, three publicly viewable preview images, a publication date, and a total photo count.

#### Scenario: Catalogue meets the minimum content bar
- **WHEN** the catalogue is inspected
- **THEN** it contains at least 6 collections
- **AND** it spans at least 3 and at most 5 distinct categories

#### Scenario: Collection records are complete
- **WHEN** a collection record is inspected
- **THEN** it contains a slug, title, description, category, cover image, three preview images, publication date, and total photo count

#### Scenario: Every referenced image resolves
- **WHEN** any page referencing catalogue imagery is loaded
- **THEN** every image URL resolves successfully
- **AND** no broken-image placeholder is displayed

### Requirement: All catalogue images are locally hosted

Collection covers and preview images SHALL be served from assets bundled with the project rather than from an external image host, so that the site renders correctly without third-party availability.

#### Scenario: Images load without external dependencies
- **WHEN** a page containing collection imagery is loaded with no external network access
- **THEN** all cover and preview images still display correctly
