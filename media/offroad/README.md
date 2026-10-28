# Off-road research page: sources and review notes

This media supports `page-project-details-2.html`. These notes cover the off-road
research redesign; the accompanying People-page update is documented separately
in the repository's change history.

## Scope

- Replaced only the off-road research detail page's HTML.
- Added scoped `css/offroad.css` and `js/offroad.js`; shared styles and navigation
  code are unchanged. Header/footer match the modern operator-theoretic page.
- Four research themes, 14 selected references grouped by topic, and demonstrations.
- Added seven image assets in `img/research/offroad/` and three videos here.
- Existing research image assets remain in place. Both prior YouTube links and all
  seven prior selected publication references are retained.
- No publication database or other website page was changed by this redesign.

## Media provenance

### User-supplied figures

- `img/research/offroad/koopman-architecture-varuna.png`: supplied
  `offroad_koopman_architecture_varuna.png`, 892 x 714. Only the bottom embedded
  caption was removed, yielding 892 x 685; the diagram and legend are unchanged.
  The requested caption is semantic HTML below the figure.
- `img/research/offroad/koopman-tracking-ijrr.png`: supplied
  `offroad_koopman_tracking_ijrr.png`, unchanged at 481 x 429. Existing subfigure
  labels are retained. No plots, trajectories, or numerical content were redrawn.

### Safe Control Density

Source: https://github.com/sriram-2502/safe_control_density

Demonstrations: https://sriram-2502.github.io/safe_control_density/

Copyright (c) 2026 Sriram Krishnamoorthy. MIT license text is included in
`MIT-LICENSE.txt`. Files are unmodified unless identified as extracted stills.

- `img/research/offroad/density-single-robot.png`:
  https://raw.githubusercontent.com/sriram-2502/safe_control_density/main/examples/unicycle/static_single_obstacle/comparison_results/unicycle_static_density_controllers_xy.png
- `density-multi-agent.mp4`:
  https://sriram-2502.github.io/safe_control_density/assets/videos/multi_agent_unicycle_crossing6_collision_cone_density_feedback.mp4
- `density-moving-obstacles.mp4`:
  https://sriram-2502.github.io/safe_control_density/assets/videos/dynamic_obstacles_closing_in_velocity_obstacle_density_filter.mp4
- Corresponding `*-poster.png` files in `img/research/offroad/` are still frames
  from those videos, with no changes to the simulated data. These are simulations,
  not physical robot experiments, and are labeled accordingly.

### RK-MPC

Source: https://sriram-2502.github.io/rk-mpc/

Authors: Sriram S. K. S. Narayanan and Umesh Vaidya.

The project website states CC BY-SA 4.0:
https://creativecommons.org/licenses/by-sa/4.0/

The source repository also includes the MIT license:
https://github.com/sriram-2502/rk-mpc/blob/main/LICENSE

Its copyright/permission notice is identical to the included `MIT-LICENSE.txt`.
Credits and source/license links are provided on the page. Reused RK-MPC media,
including extracted stills, retain the source CC BY-SA terms; this does not change
the licensing of the rest of the laboratory website.

- `img/research/offroad/rk-mpc-framework.png`:
  https://sriram-2502.github.io/rk-mpc/web_assets/images/rk_mpc_framework_fig.png
- `rk-mpc-hardware.mp4`:
  https://sriram-2502.github.io/rk-mpc/web_assets/videos/videos_panel.mp4
- `img/research/offroad/rk-mpc-hardware-poster.png`: unaltered still frame from
  the hardware montage, showing push recovery, debris, grass, gravel, ice, and snow.

Videos use native controls, poster images, and `preload="none"`. Nothing autoplays
or loops. Starting a video pauses the others. Total video payload is about 1.2 MB.

## Publication verification

- IJRR: publisher confirms authors, 2026, volume 45, issue 12, and DOI
  https://doi.org/10.1177/02783649251403096
  The publisher's issue listing gives pages 1850-1878:
  https://journals.sagepub.com/toc/ijr/45/12
  No placeholder manuscript DOI is used.
- Situationally Aware framework: title and authors from
  https://www.project-varuna.com/publications and the user's instructions. Kept as
  a journal manuscript under review without invented volume, pages, or journal DOI.
- RK-MPC: authors, preprint status, 2026, and method/experiment description from
  https://arxiv.org/abs/2604.04221 and the project website.
- Digital Twins: ICRA 2025 citation and DOI confirmed by the author record at
  https://arxiv.org/abs/2409.10347
- Safe Navigation, controller synthesis, and robust CDF descriptions checked at
  https://arxiv.org/abs/2306.15830,
  https://arxiv.org/abs/2403.14464, and
  https://arxiv.org/abs/2407.05133.
- Linear-transfer-operator navigation title and DOI follow the author record at
  https://arxiv.org/abs/2210.00723; the existing bibliography uses a title variant.
- SE(3) paper and linked journal DOI checked at https://arxiv.org/abs/2305.03868.
- Remaining entries retain the lab's existing `data/publications.json` metadata.

## Review items

1. The IJRR montage is only 481 x 429 pixels, so small labels are soft on desktop.
   A higher-resolution original would improve legibility. Its supplied panel (e)
   label repeats "skidpad" although the row and requested caption identify slalom;
   the source image was not scientifically altered to correct this label.
2. The situationally aware manuscript has a title variant: the existing bibliography
   and ResearchGate URL use "Terrain Aware". The new page uses the requested
   "Situationally Aware" title supported by Project Varuna. The bibliography itself
   remains unchanged pending review.
3. The ensemble-selection and meta-adaptive publications have no verified DOI/PDF
   links in the existing data. Their entries link to the lab bibliography; no
   identifiers or page numbers were invented.
4. Project sites, arXiv records, and downloaded images/videos loaded successfully.
   The two existing YouTube videos were verified through YouTube's oEmbed endpoint
   as "Parkour Stepping Stone" and "Project Varuna Announcement". Publisher and
   ResearchGate endpoints returned automated-access challenges (403/418/202), so
   their landing pages could not all be visually verified. Links were retained
   from the bibliography or verified author/publisher metadata, not treated as 404s.

## Validation

- Browser checks at 1920, 1440, 1024, 768, 390, and 320 pixels wide.
- No horizontal overflow or intersecting grid items; image proportions preserved.
- Local asset paths and bibliography anchors resolve; unique IDs and one H1.
- All three videos decode and play; starting one pauses the previous video.
- Mobile menu and Escape behavior work; content/navigation also work without JS.
- Screenshots reviewed on desktop and mobile; figures open at full resolution.
- Shared header/footer match `page-project-details-4.html`; no shared CSS changes.
