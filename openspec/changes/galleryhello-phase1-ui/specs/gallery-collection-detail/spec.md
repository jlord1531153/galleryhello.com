## Purpose

Defines how an individual collection is presented: its cover and descriptive header, the publicly viewable preview gallery, the locked-content placeholder area, related collections, the preview lightbox interaction, and the correct handling of unknown collection URLs.

## ADDED Requirements

### Requirement: Collection detail header

The collection detail page SHALL present a two-column header on desktop — a vertical `3:4` cover on one side and collection copy on the other — containing the category eyebrow, the collection title, a 2–3 line English description, a photo count and category summary, and a control that scrolls to the preview gallery. On mobile the layout SHALL collapse to a single column with the cover first.

#### Scenario: Desktop shows cover beside copy
- **WHEN** the detail page is viewed at `1024px` and above
- **THEN** the cover image and the descriptive copy are laid out side by side

#### Scenario: Mobile stacks the cover above the copy
- **WHEN** the detail page is viewed below `640px`
- **THEN** the cover appears above the descriptive copy in a single column

#### Scenario: Preview control moves to the gallery
- **WHEN** a visitor activates the browse-preview control
- **THEN** the page scrolls to the public preview gallery section

### Requirement: Public preview gallery

The detail page SHALL present a preview gallery section containing the collection's publicly viewable preview images, each rendered at the `3:4` ratio. Only images that are genuinely publicly accessible SHALL appear in this section.

#### Scenario: Preview gallery lists the public images
- **WHEN** a visitor reaches the preview gallery section
- **THEN** all of that collection's public preview images are displayed
- **AND** no high-resolution exclusive image is present in the document

#### Scenario: Preview images are genuinely public
- **WHEN** a visitor opens a preview image directly
- **THEN** the image is fully accessible without authentication

### Requirement: Locked content is a non-interactive placeholder

The detail page SHALL present a locked section for the collection's exclusive content, built solely from separate placeholder cover images. This section SHALL be labelled with text indicating that unlocking is not yet available, and SHALL contain no clickable unlock control.

#### Scenario: Locked section shows a coming-soon notice
- **WHEN** a visitor scrolls to the exclusive collection section
- **THEN** a notice indicates that unlocking is coming soon
- **AND** no unlock button or unlock-action link is present

#### Scenario: Exclusive images are not embedded
- **WHEN** the page source for a collection detail page is inspected
- **THEN** no high-resolution exclusive image is embedded and hidden behind a visual blur
- **AND** the locked area consists only of standalone placeholder covers

#### Scenario: No fabricated progress or counts
- **WHEN** the locked section is displayed
- **THEN** it shows no task-progress indicator, no completed-task count, and no user-count statistic

### Requirement: Preview lightbox

Clicking a public preview image SHALL open an enlarged view of that image in an overlay. The overlay SHALL be closable via a visible close control, via the Escape key, and via a backdrop click, and SHALL be usable on mobile.

#### Scenario: Clicking a preview opens the enlarged view
- **WHEN** a visitor clicks a public preview image
- **THEN** an enlarged view of that image opens in an overlay above the page content

#### Scenario: Overlay closes in every supported way
- **WHEN** the overlay is open
- **THEN** it closes when the visitor activates the close control, presses Escape, or clicks the backdrop

#### Scenario: Overlay is usable on mobile
- **WHEN** the overlay is opened on a mobile viewport
- **THEN** a close control is reachable and the enlarged image does not extend beyond the viewport

### Requirement: Related collections

The detail page SHALL present a related-collections section containing 3 to 4 collection cards linking to other collection detail pages. When no related collections exist, the entire section SHALL be omitted rather than rendered empty.

#### Scenario: Related collections link onward
- **WHEN** a visitor activates a card in the related-collections section
- **THEN** they are navigated to that other collection's detail page

#### Scenario: Section is hidden when there are no related items
- **WHEN** a collection has no related collections
- **THEN** the related-collections section does not appear on the page

### Requirement: Unknown collection URLs return a 404

Requesting a collection detail page with a slug that matches no collection SHALL return an HTTP 404 response and display the site's not-found page, rather than a blank page or an error.

#### Scenario: Invalid slug yields a 404 page
- **WHEN** a visitor requests `/collections/<slug that does not exist>`
- **THEN** the response status is 404
- **AND** the site's not-found page is displayed

### Requirement: Per-collection page metadata

Each collection detail page SHALL expose a page title, a description, and a social sharing image derived from that specific collection's data.

#### Scenario: Metadata reflects the collection
- **WHEN** a collection detail page is shared or inspected
- **THEN** its title, description, and sharing image correspond to that collection
- **AND** they do not duplicate the same values across different collections
