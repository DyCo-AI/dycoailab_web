# Google Search Setup

Site: https://dyco-ai.github.io/dycoailab_web/

## Repository Changes

- The 11 public pages have absolute canonical URLs; the homepage uses the directory URL, not index.html.
- sitemap.xml lists those pages, excluding backups, templates, and data files. News and Contact are homepage sections, not separate pages.
- The homepage includes laboratory organization data and a title identifying Umesh Vaidya and Clemson University.
- The Publications canonical URL lives in templates/publications.html and is preserved by scripts/build-publications.cjs.
- Update sitemap.xml when adding or removing public pages. Do not add invented modification dates.

These changes must be committed, pushed, and deployed by GitHub Pages before Google can use them. Local edits do not affect search results.

## Verify Ownership and Request Indexing

1. Sign in to https://search.google.com/search-console/ using the Google account that should manage this site.
2. Add a **URL-prefix** property with exactly https://dyco-ai.github.io/dycoailab_web/ (including the trailing slash). Do not use a Domain property for github.io, whose DNS you do not control.
3. Choose HTML tag verification and provide the exact google-site-verification meta tag to the website maintainer. It belongs in the homepage head. Alternatively, provide Google's downloaded HTML verification file for deployment at the specified location. Do not send your password.
4. Deploy the verification tag or file, then click Verify in Search Console. Keep it in place afterward.
5. Under Sitemaps, submit https://dyco-ai.github.io/dycoailab_web/sitemap.xml after confirming it loads publicly.
6. Inspect the homepage with URL Inspection, run Test Live URL, and select Request Indexing. Repeat for the Research, People, and Publications pages as appropriate.
7. Monitor Page Indexing for exclusions or errors. Search Console is needed to establish Google's actual indexing status; public accessibility alone does not establish that status.

## Discovery and Maintenance

Link to the laboratory from the director's official Clemson faculty profile and other relevant profiles you control. Use a descriptive label such as "DyCoAI Laboratory at Clemson University." Keep research, publication, and people information current.

The applicable robots.txt location is https://dyco-ai.github.io/robots.txt, not a robots.txt inside this project directory. At the initial check on November 4, 2026, the root robots.txt returned 404, the homepage returned 200 without an X-Robots-Tag restriction, and sitemap.xml returned 404. A missing robots.txt does not itself prohibit crawling. No ineffective project-level robots.txt was added.

Indexing and ranking are controlled by Google, not guaranteed by these changes. Google notes that crawling can take days to weeks and a request does not guarantee inclusion.

## Official References

- https://support.google.com/webmasters/answer/9008080
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/structured-data/organization
