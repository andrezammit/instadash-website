# Instagram Dashboard website

A fast, accessible, dependency-free website for Instagram Dashboard, including its published privacy policy.

Live site: https://instadash.andrezammit.com/

## Local development

Requires Node.js 22 or later. Run `npm start` and open http://127.0.0.1:4173. Run `npm test` for metadata, link, and image checks.

Edit `docs/index.html`, `docs/privacy-policy.html`, and `docs/styles.css`. Static files in `docs/` are the published website; there is no build step. Screenshots originate from the extension's illustrative store fixture, not a personal Instagram feed.

## Publishing

GitHub Pages publishes the `docs/` folder on `main`. Push a commit to update the site. Keep this repository separate from the extension. The Chrome Web Store privacy-policy URL is [https://instadash.andrezammit.com/privacy-policy.html](https://instadash.andrezammit.com/privacy-policy.html); keep its extension data-practice details current before releasing a change that affects them.

## Search and discovery

The page includes a descriptive title, description, canonical URL, Open Graph and Twitter text metadata, SoftwareApplication JSON-LD, semantic headings, descriptive image alternatives, an XML sitemap, and Google Analytics. It uses system fonts, compressed screenshots, fixed image dimensions, and lazy loading below the fold.

After verifying ownership in Google Search Console, submit:
https://instadash.andrezammit.com/sitemap.xml

A project-level robots.txt is intentionally omitted: crawlers read robots.txt only at the domain root, https://instadash.andrezammit.com/robots.txt. If a root-domain robots file exists, ensure it allows this project. Do not claim rich-result eligibility or invent reviews/ratings. Search engine indexing and ranking are not guaranteed.

If you change the custom domain, update the canonical URL, Open Graph URL, JSON-LD URL, sitemap, and tests together.

Installation buttons link to the public Chrome Web Store listing: https://chromewebstore.google.com/detail/bofgllabgmnckgnakhicnkbhoanfaidb. The extension source repository is private; do not link visitors to it.
