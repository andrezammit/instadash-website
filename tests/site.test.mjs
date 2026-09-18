import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const html = await readFile("docs/index.html", "utf8");
const canonical = "https://instadash.andrezammit.com/";

test("indexable page has consistent SEO and structured application metadata", async function () {
    assert.match(html, /<html lang="en">/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /<title>Instagram Dashboard[^<]+<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]{100,170}">/);
    assert.ok(html.includes('rel="canonical" href="' + canonical + '"'));
    assert.ok(html.includes('property="og:url" content="' + canonical + '"'));
    assert.ok(!html.includes("noindex"));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/)[1]);
    assert.equal(schema["@type"], "SoftwareApplication");
    assert.equal(schema.url, canonical);
    assert.equal(schema.offers.price, "0");
    assert.equal(schema.aggregateRating, undefined);
    assert.ok((await readFile("docs/sitemap.xml", "utf8")).includes("<loc>" + canonical + "</loc>"));
    const robots = await readFile("docs/robots.txt", "utf8");
    assert.ok(robots.includes("User-agent: *"));
    assert.ok(robots.includes("Allow: /"));
    assert.ok(robots.includes("Sitemap: " + canonical + "sitemap.xml"));
});

test("all local assets and fragment links resolve", async function () {
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
        const value = match[1];
        if (value.startsWith("https:") || value === "./") continue;
        if (value.startsWith("#")) {
            assert.ok(html.includes('id="' + value.slice(1) + '"'), value);
        } else {
            await access(resolve("docs", value));
        }
    }
    await access("docs/.nojekyll");
    assert.ok(!html.includes("https://github.com/andrezammit/instadash" + String.fromCharCode(34)));
});

test("images reserve space and prioritize the main screenshot", function () {
    for (const match of html.matchAll(/<img\b[^>]+>/g)) {
        assert.match(match[0], /alt="[^"]*"/);
        assert.match(match[0], /width="\d+"/);
        assert.match(match[0], /height="\d+"/);
    }
    const hero = html.match(/<img src="assets\/dashboard.jpg"[^>]+>/)[0];
    assert.match(hero, /fetchpriority="high"/);
    assert.doesNotMatch(hero, /loading="lazy"/);
});

test("installation buttons use the provided public Chrome Web Store listing", function () {
    const storeUrl = "https://chromewebstore.google.com/detail/bofgllabgmnckgnakhicnkbhoanfaidb";
    const installLinks = [...html.matchAll(/<a class="(?:button|nav-install)" href="([^"]+)"/g)];
    assert.equal(installLinks.length, 3);
    for (const link of installLinks) assert.equal(link[1], storeUrl);
    assert.ok(!html.includes("Coming soon"));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/)[1]);
    assert.equal(schema.installUrl, storeUrl);
});

test("public page omits GitHub links and removed light-theme claims", function () {
    assert.ok(!html.includes("https://github.com"));
    assert.doesNotMatch(html, /light (?:or dark|and dark|theme|mode)|Light on\./i);
});

test("hero starts closer to the site header without changing screenshot spacing", async function () {
    const css = await readFile("docs/styles.css", "utf8");
    assert.match(css, /\.hero \{ padding-top: 40px; text-align: center; \}/);
    assert.match(css, /\.hero \{ padding-top: 30px; \}/);
    assert.match(css, /\.hero-note \{ margin: 17px 0 45px;/);
});

test("Google Analytics uses the supplied measurement ID", function () {
    const measurementId = "G-05XWKX7V2Q";
    assert.ok(html.includes('src="https://www.googletagmanager.com/gtag/js?id=' + measurementId + '"'));
    assert.ok(html.includes('gtag("config", "' + measurementId + '")'));
    assert.ok(html.includes('rel="preconnect" href="https://www.googletagmanager.com"'));
});

test("Google Search Console verification file is published at the site root", async function () {
    assert.equal(
        await readFile("docs/google161838d06d5000d8.html", "utf8"),
        "google-site-verification: google161838d06d5000d8.html\n",
    );
});
