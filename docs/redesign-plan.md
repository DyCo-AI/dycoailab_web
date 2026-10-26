# DyCoAI Laboratory Website Redesign Plan

Prepared October 25, 2026. Status: proposal for review; no production pages changed.

## Purpose and Scope

Present the Dynamics and Control for Autonomy and Intelligence Laboratory at Clemson University, directed by Prof. Umesh Vaidya, through a clear connection between mathematical foundations, computational methods, and demonstrated systems.

Theme: **From Mathematical Foundations to Reliable Autonomous Systems.**

Start with a separate homepage preview. Review that design before extending it to the rest of the site. Keep the current website and all existing URLs available throughout the transition. Launch requires explicit approval; committing a preview is not approval to replace production.

## Repository Findings

- Ten root HTML pages: homepage, research overview, five research-detail pages, publications, team, and funding.
- Static HTML with Bootstrap, jQuery 1.9.1, slider plugins, and repeated navigation/footer markup. No package manifest or build workflow was found in the inspected repository.
- `.nojekyll` is present. The site is hosted under the GitHub Pages project path `/dycoailab_web/`; all generated URLs must respect that prefix.
- The live homepage contains a slider/logo, About Us, five mixed research categories, funding partners, and footer contacts. There is no dedicated News or Contact page.
- `page-Research.html` is titled Research Projects, but its five entries are broad topics, not individual funded projects. Research topics and projects need distinct roles.
- `page-publication.html` is 4,482 lines, with under-review papers and yearly sections from 2027 through 2009. A parser found 184 accordion links; that is a migration baseline, not a verified count of unique papers.
- Publication IDs `collapse15`, `collapse22`, `collapse23`, and `collapse24` repeat. New stable IDs and a legacy-anchor map are needed; ambiguous old anchors cannot be mapped to multiple records at once.
- The People page currently displays the director and three PhD students. Master's and alumni sections mostly contain commented template entries. These are not evidence of an actual alumni roster. Student roles and names should be confirmed before relabeling them.
- The funding page includes the 2026-2029 NSF DMS award, the 2025-2028 NSF CMMI award, VIPR-GS support, and historical grants. A CMMI 2008-2011 entry appears twice; preserve the source and resolve it during content review.
- The off-road research page contains two YouTube demonstrations. The repository also has research plots, simulation images, portraits, and funding logos. Reviewed examples are useful for topic illustrations, but some are small raster images unsuitable for enlargement.
- Existing issues include generic image alternative text, placeholder social links, HTTP dependencies on HTTPS pages, repeated template code, and an active link to missing `page-portfolio-item.html` from the research overview.
- Untracked local photo candidates and the D2C `.bib` file are unrelated working files. They must not be automatically included in a deployment or content import.

These findings are based on source inspection and selected asset inspection, not a full browser accessibility or layout audit.

## Page Hierarchy

Paths below are relative to `/dycoailab_web/`. Use exactly seven primary navigation items.

| Navigation | Proposed path | Content and child pages |
| --- | --- | --- |
| Home | `index.html` | Mission, research overview, selected projects/publications, news, demonstrations, people, contact |
| Research | `research/` | Separate Foundations and Applications sections; six topic pages |
| Projects | `projects/` | Active and completed projects; `projects/<slug>/`; funding overview at `projects/funding/` |
| Publications | `publications/` | Complete archive with search, filters, abstracts, and paper/citation links |
| People | `people/` | Director, current researchers/students, alumni; optional individual profiles when sufficient information exists |
| News | `news/` | Dated research, grant, publication, and laboratory updates; `news/<slug>/` |
| Contact | `contact/` | Verified address, email, affiliation, collaboration and prospective-student information |

Funding remains prominent through Projects, relevant project details, and the footer. Its existing standalone URL remains supported.

### Research Topics and Source Mapping

| Group | Topic and proposed child path | Existing material to carry forward |
| --- | --- | --- |
| Foundations | Operator-Theoretic Methods for Dynamical Systems: `research/operator-theoretic-methods/` | `page-project-details-4.html`: Koopman/Perron-Frobenius operators, spectral methods, duality, Lyapunov measures |
| Foundations | Learning, Optimization, and Certified Control: `research/learning-optimization-certified-control/` | Control/optimization from detail pages 1, 2, and 4; D2C, density functions, safe MPC, certified Lyapunov publications |
| Foundations | Networked and Stochastic Dynamical Systems: `research/networked-stochastic-systems/` | Detail pages 1 and 5; stochastic stability and uncertainty work from page 3 and publications |
| Applications | Autonomous Robotics and Off-Road Mobility: `research/autonomous-robotics-off-road-mobility/` | `page-project-details-2.html`, vehicle/quadruped figures, two demonstrations, related publications |
| Applications | Power and Energy Systems: `research/power-energy-systems/` | `page-project-details-3.html`: PMUs, power-grid stability, renewable uncertainty, distributed optimization |
| Applications | Cyber-Physical and Networked Systems: `research/cyber-physical-networked-systems/` | Application material from detail pages 1 and 5, including communication constraints and network information flow |

Each topic page: short overview; research questions; methods/contributions; legible figures with captions; related projects; selected publications; associated people; demonstrations/resources where available. Cross-link foundations to applications without duplicating whole narratives.

Information flow and causality remain explicit subtopics. Preserve the scientific detail currently in the five legacy pages through the topic pages and project detail pages.

### Projects

Projects describe a bounded research effort, while topics describe enduring research directions. Each project record connects:

- Title, summary, dates, and confirmed status.
- Related foundational and application topic IDs.
- Investigators and participants, when documented.
- Grant/funding IDs, sponsors, award links, and dates.
- Objectives, methods, results, figures, demonstrations, code/data links, and publications.

Initial candidates grounded in the funding list: NSF DMS control of PDEs; NSF CMMI spectral optimal control; VIPR-GS off-road mobility; historical power-grid and networked-control work. A grant may support several projects and a project may have several grants. Publication-to-grant and person-to-project associations need evidence or review; do not infer them from a similar title alone. Do not infer project completion solely from an award end date.

## Homepage Proposal

Use a restrained academic design: white and light-neutral surfaces, charcoal text, Clemson-inspired orange accents, and limited secondary color. Reserve colors for navigation, distinctions, and emphasis. Confirm institutional logo/brand use during implementation. Use generous but purposeful spacing, readable type, and real research imagery.

1. **Identity and theme.** Prominent heading `DyCoAI Laboratory`, full laboratory name, Clemson University, and director attribution. Place the requested theme immediately below the laboratory name. Use a full-width, authentic laboratory/robotics photograph with a readable text area; avoid placing important equipment behind text. Keep the next section visible below the hero on typical screens. Use Explore Research and Meet the Team links.
2. **Mission.** Proposed copy: "We develop mathematical foundations and data-driven methods for understanding and controlling complex dynamical systems. Our work connects operator theory, learning, and optimization with reliable autonomy in robotics, energy, and networked systems." Review this as editorial copy before publication.
3. **Research.** Two clearly labeled groups, Foundations and Applications, each with three concise topic summaries and relevant figures or photographs. Keep the six topics visible and understandable without an interactive diagram.
4. **Featured projects and demonstrations.** Two or three selected efforts, each connecting a research problem to methods and evidence. Reuse verified robotics demonstrations with a descriptive poster and click-to-load video. Avoid autoplay audio and heavy video downloads on initial load.
5. **Featured publications.** Three selected records with authors, venue/status, year, and working paper links. Proposed selections for review: D2C (under review), certified Lyapunov functions (listed as 2027), and a vehicle-control paper. Keep under-review status distinct from accepted/published work and confirm missing venue metadata.
6. **Recent news.** Up to three dated items backed by source information. The NSF DMS award can support a grant update; its start date is not automatically its announcement date. Do not invent acceptance, hiring, or event dates. If confirmed news is unavailable at prototype time, show the proposed layout in the review notes and omit fabricated items from the page.
7. **People and laboratory.** Director introduction, selected team photographs, laboratory/experimental photographs, and link to People. Reuse the approved director portrait. Use confirmed membership information.
8. **Footer.** University/department affiliation, contact email, verified postal address, ResearchGate and other validated links, funding link, and site navigation.

The homepage preview should include functional links. Until new destination pages exist, link to relevant legacy pages. Projects can initially link to the existing funding/detail material, and News/Contact navigation can link to real homepage sections. Replace these destinations incrementally; do not create empty pages solely to populate navigation.

## Content and Interaction Improvements

### Publications

Extract records into structured data, preserving original citation text, author order, abstract, paper URL, year, status, and legacy anchors. Add separate optional fields for venue, DOI, preprint PDF, BibTeX, topic IDs, and project IDs. Unknown values remain unknown. A record's year and review status are separate fields.

Render the complete archive in HTML at build time. Add lightweight client-side search across title, authors, venue, and keywords; combine it with year, publication status/type, and research-topic filters. Include newest-first sorting, clear filters, a result count, no-results state, and accessible abstract expanders. Store search/filter state in the URL so filtered results can be shared. The complete bibliography must remain readable without JavaScript.

Audit duplicates by DOI, normalized title, authors, and publication history. Conference and journal versions may be distinct; do not merge them automatically. Compare migrated record counts and field values against the source, recording every deliberate correction. Cross-links from topics and projects should use stable publication IDs. Retain PDF and external links exactly unless a validated replacement is approved.

### People

Separate director, current members (by verified role), and alumni. Each record can contain name, role, portrait, research interests, affiliation dates, personal/Scholar/ORCID links, and project IDs. Alumni can include degree/year and last confirmed destination. Missing portraits can use a clean text treatment; template headshots must not be used as real members. Omit empty roster groups from the public page. Reuse the selected director portrait and preserve source names until corrections are confirmed.

### News and Contact

News records have a real date, category, summary, optional article body/image, and links to the relevant project, publication, grant, or person. Keep news announcements distinct from bibliography years. Contact should use a working `mailto:` link and a verified address/map link. Do not copy the template map coordinates or announce open positions without confirmation. A contact form is unnecessary for the initial static release.

## Technical Approach

Recommended: Eleventy for build-time templates and content generation, semantic HTML, dedicated CSS, and small vanilla JavaScript modules for navigation and publication filtering. This adds a build step but makes shared navigation, relationships, and routine content updates easier than maintaining ten or more duplicated HTML files. Published output remains ordinary static files; no server/database is required. Avoid introducing a client-side application framework for these workflows.

Proposed isolated source layout:

```text
redesign/
  package.json                 # Build/preview/check commands; lock dependencies
  src/
    _includes/                 # Layout, navigation, footer, repeated components
    _data/                     # Site settings and related content records
    index.njk                  # Homepage preview first
    research/                  # Overview and six topic pages, later phases
    projects/
    publications/
    people/
    news/
    contact/
    assets/                    # Scoped styles, scripts, approved derivatives
  README.md                    # Preview and content-editing instructions
docs/
  redesign-plan.md
  migration-map.*              # Source URLs, fragments, records, destinations
```

Build output goes outside production paths during development, for example `redesign/_site/`, and is excluded from source commits unless an intentional review snapshot is requested. A dedicated `codex/website-redesign` branch isolates implementation. No existing root HTML or CSS is overwritten during preview development. Do not automatically copy the entire repository into build output: use an asset allowlist to exclude candidates, scratch files, and source data not intended for publication.

Preview locally with a static development server and test both root and `/dycoailab_web/` path configurations. An optional public preview path can be deployed only after the user requests it; it is not a prerequisite for local review. Verify repository Pages settings before proposing deployment changes, because local files do not establish the configured publishing source.

For the eventual launch, use a reproducible GitHub Actions build/deploy of the approved static output if moving to generated pages. Include existing paper paths and compatibility pages in that output. Keep a pre-launch Git tag and tested rollback instructions. Configure canonical URLs only for final destinations; preview pages should be excluded from indexing if published for review.

## Preservation and URL Migration

| Existing URL | Intended destination and compatibility |
| --- | --- |
| `index.html` | Becomes approved new Home only at launch; archive old homepage |
| `page-Research.html` | Research overview compatibility page |
| `page-project-details-1.html` | Preserve original material; link to both networked foundations and CPS applications |
| `page-project-details-2.html` | Autonomous Robotics and Off-Road Mobility |
| `page-project-details-3.html` | Power and Energy Systems |
| `page-project-details-4.html` | Operator-Theoretic Methods, with links to certified-control topic |
| `page-project-details-5.html` | Networked and Stochastic Dynamical Systems; retain information-flow material |
| `page-project-funding.html` | Projects funding overview, including historical grants |
| `page_research_team.html` | People compatibility page |
| `page-publication.html` | Publication compatibility page preserving old fragment targets |
| `papers/*` | Preserve exact published PDF paths and files |
| `img/*` | Retain referenced legacy assets; create optimized derivatives separately |

Prefer retaining useful legacy HTML during migration. GitHub Pages does not provide arbitrary server-side redirects: any eventual compatibility redirects need static HTML and visible fallback links. For publication fragments, keep a mapping and open the intended abstract when reached through a deep link. For already-duplicated IDs, preserve the original first-match behavior and document the ambiguity while exposing unique new anchors. Do not silently redirect a multi-topic page to an unrelated single topic.

## Incremental Delivery and Review

| Stage | Deliverable | Review/exit criterion |
| --- | --- | --- |
| 0. Plan (this task) | Repository audit, hierarchy, source mapping, homepage outline, migration approach | Review proposed organization and visual direction |
| 1. Homepage prototype | Isolated responsive homepage, real assets/content, working links to existing material, desktop/mobile screenshots and local preview | Review layout, mission, imagery, featured work, and navigation before expanding design |
| 2. Research and Projects | Six topic pages, project index/detail template, funding connections | Verify scientific summaries, source coverage, and associations |
| 3. Publications | Validated data migration, search/filter interface, stable IDs and citation links | Reconcile archive, preserve abstract/link content, test filters and old links |
| 4. People, News, Contact | Confirmed roster/alumni, sourced news, verified contact information | Review names, roles, dates, photographs, and outbound links |
| 5. Launch preparation | Complete migration map, accessibility/performance checks, deployment preview and rollback procedure | Explicit approval of redesigned pages and production switch |
| 6. Approved launch | Deploy static output to GitHub Pages; verify public pages/assets/PDFs | Live URLs and critical workflows verified; rollback available |

Each stage gets a focused reviewable change set. Continue routine updates to the current site during redesign; reconcile those new records before launch so content does not freeze at the initial inventory date.

## Verification Plan

- Test homepage and navigation at 360, 390, 768, 1280, and 1440px widths; check menu behavior, text wrapping, images, and horizontal overflow. Recheck at 200% browser zoom.
- Verify keyboard navigation, visible focus, semantic landmarks/headings, skip link, accessible labels, contrast, alternative text, and reduced-motion behavior; target WCAG 2.2 AA.
- Check actual rendered desktop/mobile pages in a browser. Label mockups as mockups; do not present a reconstructed image as a browser screenshot.
- Test publication query/filter combinations, reset/no-results behavior, shareable URLs, legacy fragments, and JavaScript-disabled access.
- Validate internal paths/anchors with the project base path. Check external URLs and distinguish genuine failures from provider blocking/rate limiting.
- Compare migrated citations, abstracts, media, grants, and links against the inventory. Log suspected source errors for review rather than guessing corrections.
- Optimize photos with responsive sizes and dimensions; preserve scientific figure labels and aspect ratios. Lazy-load below-the-fold images and video embeds. Aim for a mobile homepage Lighthouse performance score of at least 90 under a recorded test configuration; this is a target, not a current measurement.
- Before deployment, check that only approved assets/content enter the output. After deployment, verify the actual published HTML, images, PDFs, and navigation, not merely a successful git push.

## Information to Confirm During Implementation

The first homepage prototype can proceed with existing content. Its media and content review should resolve:

- A high-resolution lab/vehicle photograph and any additional laboratory/team photographs with captions and permission to publish. Existing simulation imagery and video posters can support an interim local prototype; do not substitute stock photos for actual laboratory work.
- Current member status, preferred name spellings, alumni names/degrees/years, and destinations.
- Two or three dated news items, featured-publication choices, and current project-to-grant associations.
- Official affiliation/address spelling, preferred logo treatment, and any supplied Clemson brand requirements.

These are content-review items, not reasons to postpone the initial homepage prototype. Unknown details should remain in review notes rather than appear as invented facts on the website.

## References

- Existing public site: https://dyco-ai.github.io/dycoailab_web/
- Eleventy templates/data and static generation: https://www.11ty.dev/docs/
- GitHub Pages custom build/deploy workflow: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
