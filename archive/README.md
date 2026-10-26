# Previous Website

The redesigned pages are active at the normal website paths:

- [Home](../index.html)
- [Research](../page-Research.html)
- [Publications](../page-publication.html)

The pre-redesign website is preserved in
`previous-website-2026-10-26/`. This is a complete snapshot from the local `main`
baseline, updated to commit `64fb05de85829c0f059f95a2c1f700e6e3e21bd7` before
publishing the redesign. Its HTML, CSS, JavaScript, images, fonts, and papers are
unchanged copies of that commit. The earlier Publications page from commit
`3a83ed0` is also retained as `page-publication-pre-sync.html`. No original files
were deleted.

Open the archived pages directly:

- [Previous Home](previous-website-2026-10-26/index.html)
- [Previous Research](previous-website-2026-10-26/page-Research.html)
- [Previous Publications](previous-website-2026-10-26/page-publication.html)

The archive includes supporting pages so its relative links remain within the
snapshot. External links and services retain their original behavior; their
availability is not guaranteed by the archive.

Maintain the active pages in the repository root, not in this archive. The active
Publications page is generated from `data/publications.json` using
`node scripts/build-publications.cjs`; `templates/publications.html` is source
material, not a browser preview. See `docs/publications-redesign.md` for details.

The archive is published alongside the active redesign for future reference.
