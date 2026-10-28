# Publications Redesign

## Scope

The Publications landing page uses the existing homepage's header, navigation,
typography, colors, and footer. No other page or shared stylesheet was changed
for this redesign. The reviewed pages are published from `main`.

The page contains three featured papers from the original bibliography, followed
by all 185 records grouped by descending year. Seven undated manuscripts appear
under "Publications Under Review". Their unknown years remain null in the source
data; existing year-group anchors and filter values are preserved. Search covers titles, all listed authors, venues,
abstracts, and original citation text. Research area, publication type, year,
and status filters can be combined. Existing publication anchors are preserved;
duplicate original IDs have distinct suffixes after their first occurrence.

## Source and Maintenance

- `data/publications.json`: editable structured source of truth.
- `templates/publications.html`: page shell and filter controls.
- `scripts/build-publications.cjs`: dependency-free static page generator.
- `css/publications.css` and `js/publications.js`: page-scoped styling and filtering.
- `page-publication.html`: generated output; do not edit the bibliography here.
- `data/publications-legacy.html` and `data/publications-legacy.json`: immutable
  migration archives, not public preview pages or ongoing editing sources.
- `data/publications-upstream-additions.json`: preserved source for the additional
  paper found on GitHub while synchronizing for publication.

After editing JSON or the template, run from the repository root:

```sh
node scripts/build-publications.cjs
node scripts/test-publications.cjs
```

Commit the generated HTML together with the data and supporting files when
updating the bibliography. GitHub Pages requires no new runtime, package installation,
or build configuration. The full bibliography is already in the HTML, so it is
readable without JavaScript and from a local `file://` preview. JavaScript adds
client-side filtering without fetching the JSON or contacting an external API.

Each record has explicit `authors`, `title`, `venue`, `year`, `types`, `status`,
`areas`, `abstract`, `links`, and `featured` fields. Its `source` object preserves
the complete original citation, abstract/body, section, anchor, and link labels.
Use `null` for an unknown year and an empty array for unclassified research areas.
Add an `areaEvidence` source before assigning a research area. Do not expand
author initials or infer publication metadata without a verified source.

`scripts/migrate-publications.cjs` and `scripts/classify-publications.cjs` are
one-time migration helpers, not the normal update workflow. Re-running migration
would overwrite subsequent JSON edits. The classification helper uses Playwright
only during migration; the site and normal build have no such dependency.

## Metadata Audit

The original page consisted of long, hand-written Bootstrap accordion lists:
eight manuscripts under review, followed by year sections from 2027 through 2009.
All 184 records were retained separately, including possible duplicate citations.

Before publishing, upstream commit `64fb05d` added "Distributed Risk-Aware
Navigation of Heterogeneous Multi-Agent Teams in Unstructured Environments via
Koopman Super eigenfunctions" by Sriram S. K. S. Narayanan and Umesh Vaidya.
Its citation, abstract, and PDF link were imported without guessing its year,
publication type, or research area. The active total is therefore 185, including
nine papers under review, seven undated records, and 162 unclassified records.
The counts below describe the initial 184-record migration audit.

- Authors: many source citations use initials. All listed authors are preserved;
  unavailable full given names were not invented.
- Dates: six under-review citations supply no year. D2C's year is sourced from
  its existing local BibTeX file; other dated manuscripts use their citation year.
- Venues: three entries lack a venue: the 2027 certified Lyapunov-functions paper,
  the terrain-reconstruction paper (`collapse309`), and the 2009 heavy-ball entry.
- Paper links: five entries have none. Original links are retained even when
  questionable, with a metadata note instead of a silent replacement.
- DOI: seven original links explicitly used doi.org. Nine more canonical DOI
  links were extracted from literal DOI identifiers already present in original
  publisher URLs. No DOI was guessed from a title.
- BibTeX: the existing D2C file is linked. No unavailable BibTeX links or invented
  citation fields were added to other entries.
- Abstracts: three contain "will be updated soon" placeholders, and one is empty.
- Anchors: `collapse15`, `collapse22`, `collapse23`, and `collapse24` were reused
  for different papers. The first occurrence keeps the original anchor; subsequent
  occurrences receive numeric suffixes. Old links cannot disambiguate duplicates.
- Conflicts: the robust distributed-optimization entry links to a different paper;
  two vehicle-control entries also have apparently unrelated paper links. These
  are flagged for review. The heavy-ball-gradient title appears in both 2009 and
  2025. Both records and the original year assignments remain intact.
- Publication types: nine records remain unspecified where the source did not
  support a conservative classification. A record can have more than one type,
  for example a journal paper also listed with CDC.
- Research areas: 23 records match exact titles in the existing detailed research
  pages' reference lists. Those assignments retain citation/page evidence. The
  remaining 161 records are explicitly unclassified. This is a metadata limitation,
  not a claim that those papers fall outside the laboratory's research areas.

## Verification

The preservation test checks record count, original source objects, abstracts,
citations, links, local files, original year assignments, legacy anchors, and
classification evidence. Its initial migration baseline is 184 records; extend
the test's baseline comparison deliberately when adding future publications. The
upstream-additions source extends that comparison to all 185 published records.

Headless Chrome checks passed for search, combined filters, query-string state,
reset, empty results, featured links, legacy deep links, mobile navigation, and
the no-JavaScript fallback. Layout checks covered 320, 390, 768, 1024, 1440, and
1920 pixel widths with no horizontal overflow or overlapping filter controls.
Desktop and mobile screenshots were inspected. Other page/shared-asset hashes
match the pre-redesign baseline. External publisher destinations were not audited
for availability or bibliographic correctness in this change.
