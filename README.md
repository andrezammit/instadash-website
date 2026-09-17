# Instagram Dashboard website

A fast, accessible, dependency-free website for Instagram Dashboard.

Live site: https://andrezammit.github.io/instadash-website/

## Local development

Requires Node.js 22 or later. Run `npm start` and open http://127.0.0.1:4173. Run `npm test` for metadata, link, and image checks.

Edit `docs/index.html` and `docs/styles.css`. Static files in `docs/` are the published website; there is no build step. Screenshots originate from the extension's illustrative store fixture, not a personal Instagram feed.

## Publishing

GitHub Pages publishes the `docs/` folder on `main`. Push a commit to update the site. Keep this repository separate from the extension.

## Search and discovery

The page includes a descriptive title, description, canonical URL, Open Graph and Twitter text metadata, SoftwareApplication JSON-LD, semantic headings, descriptive image alternatives, and an XML sitemap. It uses system fonts, no client JavaScript or analytics, compressed screenshots, fixed image dimensions, and lazy loading below the fold.

After verifying ownership in Google Search Console, submit:
https://andrezammit.github.io/instadash-website/sitemap.xml

A project-level robots.txt is intentionally omitted: crawlers read robots.txt only at the domain root, https://andrezammit.github.io/robots.txt. If a root-domain robots file exists, ensure it allows this project. Do not claim rich-result eligibility or invent reviews/ratings. Search engine indexing and ranking are not guaranteed.

If you change the repository name or use a custom domain, update the canonical URL, Open Graph URL, JSON-LD URL, sitemap, and tests together.

Installation buttons link to the public Chrome Web Store listing: https://chromewebstore.google.com/detail/bofgllabgmnckgnakhicnkbhoanfaidb. The extension source repository is private; do not link visitors to it.
