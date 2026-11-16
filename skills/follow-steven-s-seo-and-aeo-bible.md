---
name: Follow Steven's SEO and AEO Bible
description: >-
  Use this when building, writing, auditing or measuring a site or page for
  Google rankings and AI-answer citations (ChatGPT, AI Overviews, Gemini,
  Perplexity, Claude, Copilot), including fixing wrong facts an AI states about
  a brand.
---
# Steven's SEO and AEO Bible

This is Steven Calvert's own research, kept word for word below. Use it as the default rulebook for any SEO or AEO work. If a project has its own brief, the brief wins. A copy is also on the shared box at `/workspace/shared/seo-aeo-bible.md`.

Steps:
1. Find your task under "How to use this document" and read the Parts it names.
2. Run the matching checklist in Part 13.
3. Keep the confidence tags attached. Don't quote Part 2 numbers to clients without their date and source.
4. Check Part 14 before relying on any claim that came from the research pack.
5. Review the doc every 6 months, because the Part 2 numbers age quickly.

Anti-patterns:
- Trading SEO basics for "AEO tricks" (Part 1, law 1).
- Hidden text, prompt injection, fake reviews, link farms or Reddit astroturfing (law 12).
- Changing a date without changing the content (law 9).

Source: Steven Calvert, "The SEO & AEO Bible" v1.0, 16 November 2026, built from an 80-source research pack.

---

# The SEO & AEO Bible

**Version 1.0 · 16 November 2026**
**Purpose:** One rulebook for getting any of our sites found in Google *and* cited in AI answers (ChatGPT, Google AI Overviews / AI Mode, Gemini, Perplexity, Claude, Copilot). Written for Steve and for any Claude working on a site, page, or content plan in his projects.

**Built from:** an 80-source research pack Gemini compiled (Ahrefs, Semrush, Search Engine Land, SEJ, Backlinko, Moz, Pew, Seer and others, May 2025 to Nov 2026), deduplicated, cross-checked against Google's own guidance and spot-verified on the web. Where the research was wrong, contradictory or unverifiable, that is called out (see Part 14).

---

## How to use this document

- **Building a new site?** Read Parts 1, 3, 4, 5 and run Checklist B (Part 13).
- **Writing or updating a page?** Follow Part 5 and run Checklist A.
- **Auditing an existing site?** Run Checklists C and D.
- **The AI says something wrong about us?** Go to Part 11.
- **Claude in another project:** treat the rules as defaults. If a project has its own brief, the brief wins. Don't quote the statistics in Part 2 to clients as hard fact without the date and source next to them.

**Confidence tags used throughout**

| Tag | Meaning |
|---|---|
| **[Google]** | Stated by Google itself (Search Central docs or official blog). Highest confidence. |
| **[Evidence]** | Backed by a large public study or several independent ones. Treat as reliable but dated. |
| **[Heuristic]** | Practitioner consensus or a sensible rule of thumb. Not proven, low risk to follow. |
| **[Unverified]** | Claimed in the research, could not be confirmed. Don't build strategy on it alone. |

---

## Part 1 · The twelve laws

1. **AEO is built on SEO, not instead of it.** AI Overviews and AI Mode use Google's index. ChatGPT search leans on Bing plus its own crawler. If a page isn't crawlable, indexable and decent at classic SEO, no AI tactic will save it. Google's own 2026 AI search guide says, in effect, "AEO/GEO is still SEO." **[Google]**
2. **Google still sends the traffic.** Google organic delivers somewhere between 80 and 190 times more visits than all AI assistants combined. AI referrals are growing fast but from a small base. Budget accordingly. **[Evidence]**
3. **Clicks are shrinking, so visibility and conversion matter more.** When an AI summary appears, users click an organic link far less (Pew: 8% vs 15% of visits). Measure brand mentions, citations and conversions, not just sessions. **[Evidence]**
4. **Answer first.** Every page and every section opens with a direct, self-contained answer, then gives the depth. **[Heuristic, widely evidenced]**
5. **Be the primary source.** Original data, first-hand testing, real numbers, named experts. Generic summaries of what everyone else says get absorbed by the AI and never cited. **[Evidence]**
6. **Your own site must state the facts about you, plainly.** ChatGPT runs `site:yourdomain` lookups and cites official brand sites for most factual questions (pricing, specs, features, policies). If the fact isn't stated clearly on your site, the AI guesses or uses someone else's version. **[Evidence]**
7. **Other people talking about you is the biggest AI lever.** Brand mentions on third-party sites (reviews, "best X" lists, press, YouTube, forums) correlate more strongly with AI visibility than anything on-page. **[Evidence]**
8. **Text in HTML beats everything else.** Key content must be in the server-rendered HTML as real text: no JavaScript-only content, no facts inside images, no content only behind clicks or logins. **[Google + Evidence]**
9. **Keep it fresh, for real.** AI engines cite fresher content than classic rankings do. Update with genuinely new information; changing the date alone does nothing and can hurt trust. **[Evidence]**
10. **Consistency is entity SEO.** Same name, description, prices, address and claims everywhere: site, schema, Google Business Profile, directories, social profiles. Contradictions confuse both Google and LLMs. **[Heuristic, strongly supported]**
11. **AI-assisted is fine; AI-unedited at scale is not.** Google doesn't penalise AI-written text as such. It does penalise thin, unoriginal, mass-produced pages ("scaled content abuse"). **[Google + Evidence]**
12. **No tricks.** Hidden text, prompt-injection aimed at LLMs, fake reviews, link farms, astroturfing on Reddit: all carry real penalty or reputation risk and none are needed. **[Google]**

---

## Part 2 · The landscape in numbers (late 2026)

Use these to set expectations, not as precise targets. Every number is from one study at one point in time.

| What | Finding | Source & caveat |
|---|---|---|
| Google vs AI traffic | Google organic sends ~80x (one study) to ~190x (another) more visits than AI assistants. About 1.25 AI sessions per 100 Google organic sessions. | SEOcrawl (3,949 sites, 2026); Ahrefs (2026). **[Evidence]** |
| AI referral share | ChatGPT ~83%, Gemini ~6%, Perplexity ~5%, Claude ~4%, Copilot ~2%. Claude and Gemini growing fastest. | SEOcrawl, Mar–Aug 2026. Referrers from mobile apps are often lost, so real AI traffic is higher than measured. **[Evidence]** |
| Google organic clicks | Down ~15% year on year across 16,661 sites. | SEOcrawl 2026. **[Evidence]** |
| Click rate with an AI summary | Users click an organic result on 8% of visits with an AI summary vs 15% without; end the session 26% vs 16%. | Pew Research, 2025. **[Evidence]** |
| CTR drop for #1 result | AI Overviews cut #1 organic CTR by roughly 35% to 58%. | Ahrefs, Seer (2025–26). **[Evidence]** |
| Being cited helps | Brands cited inside an AI Overview get ~35% higher organic CTR than uncited ones. | Seer Interactive. **[Evidence]** |
| AI Overviews on commercial queries | 88% of a tracked set of commercial keywords (US desktop) showed an AI Overview in Aug 2026, up from ~46%. A separate e-commerce study found 14% of retail keywords. | Semrush Sensor; LEAP x SISTRIX. The two disagree because they track different keyword sets. Takeaway: assume "best X", "X vs Y", "X alternatives" queries are AI-mediated. **[Evidence, sample-dependent]** |
| How often ChatGPT searches | Only ~1 in 7 ChatGPT responses trigger a live web search, averaging ~1.6 sub-queries. The rest come from the model's training data. | Ahrefs, 66.6M responses, 2026. **[Evidence]** |
| Who ChatGPT cites | Factual questions: ~63% of citations go to official brand sites. Comparison questions: ~54% go to third-party reviews/comparisons. Reddit citations in ChatGPT fell sharply in 2026. | Ahrefs 2026, Semrush. **[Evidence]** |
| Google rank vs AI citation | AI Overview citations from Google's top 10 fell from ~76% (mid 2025) to ~38% (later update). For ChatGPT and other assistants, only ~12% of cited URLs rank top 10 for the original prompt. | Ahrefs. Rankings still help, but fan-out sub-queries let lower-ranked pages win. **[Evidence]** |
| Freshness | AI-cited pages are ~26% fresher than classic top-10 pages. | Ahrefs, 17M citations. **[Evidence]** |
| Citation churn | Around half of AI citations for a given prompt change within ~11 days. | Profound (the research wrongly credits Kevin Indig). This measures churn in a volatile system, not a rule that you must refresh every 11 days. **[Evidence, often misread]** |
| GEO writing tactics | Adding citations, quotations and statistics raised visibility up to ~40% in generative engines. | Princeton/Georgia Tech GEO paper (KDD 2024), tested on a research benchmark, not live ChatGPT. **[Evidence, lab setting]** |
| AI content | ~74% of new pages contain some AI text; no measurable ranking penalty for AI-assisted content when quality is equal. | Ahrefs (900k and 600k page studies, 2025). **[Evidence]** |
| Zero-volume keywords | ~95% of keywords get 10 or fewer searches a month. | Ahrefs. Low-volume does not mean low-value. **[Evidence]** |
| Title rewrites | Google rewrites title tags ~33% of the time, more for long titles; rewrites meta descriptions ~63%. | Ahrefs (studies from 2020–22, still quoted). **[Evidence, older]** |

---

## Part 3 · Strategy before tactics

### 3.1 Decide what you'll own
- **Rule:** Write down, per site: who exactly it's for (a specific audience, never "everyone"), the 3 to 10 topics you can be genuinely expert in, what proof you have (data, experience, results), and the 1 or 2 business KPIs that matter (leads, sales, sign-ups). **[Heuristic]**
- **Rule:** Go narrow and deep before broad. Thin coverage of 40 topics loses to excellent coverage of 8. **[Heuristic]**
- **Rule:** Start content planning from where you have real proof, then map keywords onto it. Not the other way round. **[Heuristic]**

### 3.2 Prioritise money pages first
- Bottom-of-funnel pages (pricing, "X vs Y", "X alternatives", "best X for [specific use]", service/location pages, product pages) convert best and are where AI answers now shape buying decisions. Build and polish these before informational blog posts. **[Evidence]**
- Informational "what is X" content still matters, but treat it as brand-building and as a feeder that links into money pages, not as the main traffic engine. **[Heuristic]**
- A simple scoring model for content ideas: Business value 40%, Buyer intent 30%, Realistic chance to rank/be cited 20%, Usefulness to sales 10%. **[Heuristic]**

### 3.3 Keyword and prompt research
1. **Pull real customer language** from sales calls, enquiries, emails, support tickets, reviews. These are the exact questions people type into ChatGPT. **[Heuristic]**
2. **Search Console "striking distance":** queries where you rank 8–20 with good impressions. Improve those pages first. **[Heuristic]**
3. **People Also Ask, Reddit, YouTube autocomplete, forums** for conversational phrasing and follow-up questions. **[Heuristic]**
4. **Don't discard low-volume keywords.** Most buyer-intent queries show as zero or near-zero in tools. **[Evidence]**
5. **Group by intent, not wording.** One page per distinct intent. Several near-identical keywords belong on one page, never several (avoids cannibalisation). **[Google + Evidence]**
6. **Think in prompt clusters.** For each core topic, list the main question plus the 3–5 follow-ups a buyer asks next (cost, timeline, risks, alternatives, "is it right for me"). Your page or cluster should answer all of them. This is how AI "query fan-out" works. **[Evidence]**

### 3.4 Site architecture (topical map)
- **Shape:** one core topic for the site → a handful of pillar/hub pages → supporting pages under each. Scale to resources. A small business site might be 1 pillar + 6–10 supporting pages per service. A content site might run 3–8 pillars with 20+ pages each. **[Heuristic]** (The research gave three different "ideal" numbers; none is proven. Every page must answer a distinct question, or don't make it.)
- **Internal links:** every page links up to its hub and across to siblings with descriptive anchor text. No orphan pages. Any important page within 3 clicks of the homepage. **[Google + Heuristic]**
- **Link informational pages into commercial ones**, so authority flows to the pages that earn money. **[Heuristic]**
- **Evergreen URLs:** `/seo-checklist/`, never `/27-seo-tips-2026/`. Years and counts go in the title, not the URL. **[Heuristic]**

---

## Part 4 · Technical foundation

### 4.1 Crawl, render, index
- [ ] All primary content, headings, links, prices, FAQs and tables are present in the **initial server HTML** (SSR or static generation). Check "View source", not the browser inspector. Client-only single-page apps are the #1 cause of silent invisibility to AI crawlers, most of which don't run JavaScript. **[Evidence]**
- [ ] No important content hidden only inside tabs/accordions that load on click, modals, or behind logins. (Content in the HTML but visually collapsed is fine for Google; content fetched by JS on click is not.) **[Evidence]**
- [ ] HTTPS everywhere; one canonical host (www or non-www), one trailing-slash convention, lowercase URLs; everything else 301s to it in **one hop**. **[Google]**
- [ ] `rel="canonical"` on every indexable page, self-referencing unless deliberately pointing elsewhere. **[Google]**
- [ ] XML sitemap lists only canonical, indexable, 200-status URLs. `<lastmod>` changes only when content meaningfully changes. Submit in Google Search Console **and Bing Webmaster Tools**. **[Google]**
- [ ] **Bing matters for AI:** ChatGPT search and Copilot draw on Bing's index. Verify the site in Bing Webmaster Tools and enable **IndexNow** (many CMSs and plugins support it) so new and updated pages get picked up quickly. **[Evidence]**
- [ ] No broken internal links, redirect chains, soft 404s, or crawl traps (infinite filters, calendars, parameter loops). **[Google]**
- [ ] Faceted navigation / filters (e-commerce) controlled with canonicals, `noindex` or `robots.txt`, so millions of thin combinations don't get crawled. **[Google]**
- [ ] International sites: `hreflang` reciprocal and correct (two-thirds of sites using it get it wrong). **[Evidence]**
- [ ] Automated checks in the build/deploy pipeline for status codes, canonicals, `robots.txt`, schema validity, so a release can't silently break SEO. **[Heuristic]**

### 4.2 Speed and Core Web Vitals
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, measured on mobile field data (Search Console CWV report / PageSpeed Insights). **[Google]**
- [ ] Images in WebP/AVIF, sized correctly, lazy-loaded below the fold only, with width/height set. **[Google]**
- Note: CWV is a modest ranking factor. Fix failures, but don't chase perfect scores at the expense of content. **[Google]**

### 4.3 AI crawler access (the most common self-inflicted wound)
Know the difference between **training** crawlers (feed future models) and **search/retrieval** crawlers (fetch your page to cite it in an answer now). Blocking search crawlers removes you from AI answers.

| Crawler | Owner | Purpose | Default stance |
|---|---|---|---|
| `Googlebot` | Google | Search **and** AI Overviews / AI Mode | **Allow** (blocking it = gone from Google) |
| `Google-Extended` | Google | Gemini training/grounding opt-out token. Does **not** affect AI Overviews | Your choice |
| `Bingbot` | Microsoft | Bing, Copilot, feeds ChatGPT search | **Allow** |
| `OAI-SearchBot` | OpenAI | ChatGPT search index | **Allow** |
| `ChatGPT-User` | OpenAI | Live fetch when a user asks | **Allow** |
| `GPTBot` | OpenAI | Model training | Your choice |
| `Claude-SearchBot` | Anthropic | Claude search index | **Allow** |
| `Claude-User` | Anthropic | Live fetch when a user asks | **Allow** |
| `ClaudeBot` | Anthropic | Model training | Your choice |
| `PerplexityBot` | Perplexity | Perplexity search index | **Allow** |
| `Perplexity-User` | Perplexity | Live fetch when a user asks | **Allow** |
| `CCBot` | Common Crawl | Open dataset used for training | Your choice |
| `Applebot` / `Applebot-Extended` | Apple | Siri/Spotlight search / training opt-out | Allow / your choice |

**Default for our projects:** allow everything unless there's a reason not to. We *want* to be in training data too, because 6 in 7 ChatGPT answers come from the model's memory, not live search. **[Evidence]**

Starter `robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /cart/
Disallow: /*?sort=
# Add other private or crawl-trap paths here

Sitemap: https://www.example.com/sitemap.xml
```

- [ ] **Check the CDN/firewall, not just robots.txt.** Cloudflare has blocked AI crawlers by default on new domains since mid-2025, and "bot fight" modes can block `OAI-SearchBot` and others silently. Check Cloudflare → Security → Bots / AI Crawl Control, and any WAF rules. **[Evidence]**
- [ ] Confirm in server logs that the search bots above get HTTP 200, not 403/429/challenge pages. **[Heuristic]**
- [ ] On very large dynamic sites, rate-limit aggressive bots rather than blocking them. **[Heuristic]**
- [ ] Don't use `nosnippet` or very low `max-snippet` on pages you want cited; these controls also limit use in AI Overviews. **[Google]**

### 4.4 `llms.txt`
- A markdown file at `/llms.txt` listing your key pages for AI agents. **No major engine has confirmed it uses it;** Google has called it speculative and doesn't use it. **[Google]**
- **Rule:** Optional, 15-minute job, zero ranking value. Do it on docs-heavy or developer-facing sites if you like. Never prioritise it over anything else here. **[Heuristic]**

---

## Part 5 · Writing pages that rank and get cited

### 5.1 Page structure
- **One `<h1>`**, matching the page's main promise and closely aligned with the `<title>` (reduces Google rewriting your title). **[Evidence]**
- **Title tag** ≤ ~60 characters, main topic near the front, a reason to click (specific benefit, number, first-hand proof: "I tested 12…"). **[Evidence]**
- **Meta description** ~150 characters, written for humans. Google rewrites most anyway; it still helps where it's used. **[Evidence]**
- **Opening:** the direct answer or summary in the first 1–3 sentences (roughly 40–60 words), before any backstory. No throat-clearing intros. **[Heuristic, widely evidenced]**
- **Headings** (`<h2>`/`<h3>`) mirror the real sub-questions people ask. Use natural descriptive headings; a question format is fine where it reads naturally, but don't force every heading into a question. **[Heuristic]**
- **Section rule:** under each heading, the first sentence answers that heading on its own. Each section should make sense if lifted out alone (roughly 100–300 words). **[Heuristic]** Note: Google says you don't need to artificially "chunk" content for AI. This rule is simply good, scannable writing, which also happens to extract well.
- **Short paragraphs:** one idea each, usually 2–4 sentences. **[Heuristic]**
- **Use real HTML structures:** `<ol>` for steps, `<ul>` for lists, `<table>` for comparisons, specs and pricing. **Never put a comparison or price table in an image.** **[Evidence]**
- **Say who, what, how much explicitly.** Repeat the subject's name instead of relying on "it"/"they" across paragraphs, so a passage pulled out alone still says what it's about. **[Heuristic]**

### 5.2 Substance (what actually wins)
- **Information gain:** every section should add something the top results don't: your data, your test results, a worked example, a clear framework, a real price, a caveat nobody mentions. Cut paragraphs that only restate common knowledge. **[Evidence]**
- **Concrete over vague:** "cuts setup from 3 days to 4 hours across 40 client installs" beats "industry-leading speed." **[Evidence]**
- **Cite sources and quote experts.** Link to primary sources for statistics; attribute quotes to named people with credentials. This is the best-evidenced single GEO writing tactic. **[Evidence]**
- **State limitations honestly** (who it's not for, what it doesn't do). AI engines cross-check marketing claims against reviews; honest pages get trusted. **[Heuristic]**
- **Cover the follow-ups:** for money pages, answer the 3–5 questions a buyer asks next (price/model, timeline, risks, how it compares, next step) on the page or in tightly linked sub-pages. **[Evidence]**
- **Add "un-summarisable" assets** where possible: calculators, templates, original charts, tools, video. They give people a reason to click through and earn links. **[Heuristic]**

### 5.3 E-E-A-T (Experience, Expertise, Authority, Trust)
- [ ] Named author with a real bio page (credentials, experience, links to LinkedIn etc.). **[Google]**
- [ ] Show first-hand experience: own photos, screenshots, test data, case studies, "what happened when we…". **[Google]**
- [ ] Clear "About", contact details, business address where relevant, editorial/review policy for advice content. **[Google]**
- [ ] YMYL topics (health, money, legal, safety): expert-written or expert-reviewed, sources cited. **[Google]**

### 5.4 Using AI to write
- **Allowed and normal:** research, outlines, clustering, first drafts, schema generation, audits. **[Google + Evidence]**
- **Mandatory before publishing:** a human (or a Claude working from real source data) adds original data/examples, fact-checks every claim and number, removes filler, and checks brand voice. **[Heuristic]**
- **Never** mass-publish unedited AI pages. That's "scaled content abuse" in Google's spam policies. **[Google]**
- Don't bother with "AI detector" scores; judge drafts on usefulness and originality. **[Evidence]**

### 5.5 Dates and freshness on the page
- Show a visible "Last updated" date on content that changes, and put matching `datePublished` / `dateModified` in schema. **[Evidence]**
- Only change the date when the content materially changes. **[Google]**
- Keep year references current on time-sensitive pages (pricing, "best X" lists, statistics). **[Evidence]**

### 5.6 Images and video
- Descriptive file names and `alt` text; compressed modern formats. **[Google]**
- Embed relevant video near the top of the page with `VideoObject` schema. **[Google]**
- For **YouTube** (a heavily cited source in Google's AI): write a full description (several hundred words: summary, key points, entities, link back to the page) and add **manual chapter timestamps** with descriptive labels. One controlled test saw AI retrievals of updated videos jump several-fold in two weeks. Upload proper captions. **[Evidence, small study]**

---

## Part 6 · Structured data (schema)

**What schema does:** helps search engines understand entities and makes pages eligible for rich results. Google says it is **not required** for AI Overviews and gives no special AI boost, but it removes ambiguity and powers shopping/merchant features. **[Google]** Treat it as hygiene: worth doing well, not a magic lever.

### 6.1 Rules
- Use **JSON-LD**. **[Google]**
- **Schema must match visible content.** Prices, availability, ratings, FAQs in schema must be on the page. Mismatches violate Google's policy. **[Google]**
- Link entities with stable `@id`s into one graph: `Organization` → `WebSite` → `WebPage` → `Article`/`Product`/`Service`, with `author` → `Person`. **[Heuristic]**
- Add `sameAs` on `Organization` and `Person` pointing to official profiles (LinkedIn, Wikipedia/Wikidata if you have them, Crunchbase, G2, Trustpilot, social). This helps engines know which "you" you are. **[Heuristic]**
- Validate with Google's Rich Results Test and the Schema.org validator. **[Google]**

### 6.2 What to use where

| Page type | Schema |
|---|---|
| Every site | `Organization` (or `LocalBusiness`), `WebSite`, `BreadcrumbList` |
| Blog/article | `Article` / `BlogPosting` with `author` (`Person`), `datePublished`, `dateModified` |
| Product | `Product` + `Offer` (price, currency, availability) + `AggregateRating`/`Review` only if genuine reviews are shown on the page |
| Local business | `LocalBusiness` subtype with NAP, opening hours, geo, `areaServed` |
| Service | `Service` linked to the `Organization` |
| Video | `VideoObject` (name, description, thumbnail, uploadDate, duration, key moments) |
| News | `NewsArticle` |
| Software | `SoftwareApplication` |

### 6.3 Outdated advice to ignore
- **FAQ rich results** were restricted in 2023 to well-known government and health sites. `FAQPage` markup still describes content, but don't expect FAQ snippets in Google. Put the Q&A in visible page text; that's what gets extracted. **[Google]**
- **HowTo rich results** were removed by Google in 2023. `HowTo` markup earns nothing visible in Google. **[Google]**
- The research recommends both repeatedly; that advice is out of date.

---

## Part 7 · Off-site authority: mentions, links, reviews

This is where AI visibility is mostly won. Ahrefs' study of 75,000 brands found branded web mentions had the strongest correlation with AI Overview visibility. **[Evidence]**

### 7.1 Get mentioned where AI looks
1. **Find who gets cited now.** Run your top 10–30 buyer prompts in ChatGPT, Google AI Mode/Overviews, Perplexity (logged out / temporary chat). List the third-party pages and domains cited. **[Heuristic]**
2. **Get onto those pages:** pitch inclusion in "best X" lists and roundups, get reviewed, offer data or expert comment to the authors. **[Evidence]**
3. **Co-occurrence:** aim to be mentioned *alongside* category leaders and category terms ("tools like A, B and You"). This teaches models what you are. **[Evidence]**
4. **Unlinked mentions count** for AI. Links still matter for Google. Track both. **[Evidence]**

### 7.2 Links (still vital for Google)
- Earn links with **linkable assets**: original research, data studies, calculators, free tools, definitive guides. **[Evidence]**
- **Digital PR:** newsworthy data with a clear angle, pitched to the specific journalists who cover the beat. Fast expert commentary on breaking industry news. **[Evidence]**
- Reclaim unlinked mentions and broken links to you. **[Heuristic]**
- Partner content with non-competitors (joint webinars, integration guides, co-research). **[Heuristic]**
- Judge link prospects by real traffic and relevance, not DA/DR scores. **[Heuristic]**
- **Never** buy links from farms/PBNs or join guest-post networks. **[Google]**

### 7.3 Reviews and reputation
- Systematically ask happy customers for reviews (Google Business Profile, Trustpilot, G2/Capterra, industry sites). Respond to all, naturally. **[Google + Evidence]**
- LLMs read review sentiment when recommending. Fix recurring complaints at the source. **[Heuristic]**
- Never fake or incentivise reviews in breach of platform rules (and of UK/US consumer law). **[Google]**

### 7.4 Platforms worth a presence

| Platform | Why |
|---|---|
| **YouTube** | Heavily cited by Google AI; optimise descriptions + chapters (Part 5.6). |
| **LinkedIn** | Reported as the most-cited domain for B2B/professional queries. Company page plus founder/expert posts and articles. **[Evidence, single source]** |
| **Reddit / Quora / niche forums** | Strong in Google AI and Perplexity; much less in ChatGPT since 2026. Participate genuinely as a named expert; never astroturf (bans and negative sentiment get picked up). |
| **Google Business Profile** | Essential for anything local; Google AI favours its own properties. |
| **Wikipedia / Wikidata** | Only if you're genuinely notable. Never write your own Wikipedia article. A Wikidata entry is lower bar. |
| **Review sites & directories** | The third-party sources AI uses for comparison questions. |

---

## Part 8 · Engine-by-engine notes

| Engine | What it relies on | What to emphasise |
|---|---|---|
| **Google AI Overviews / AI Mode** | Google's index and ranking systems; query fan-out; heavy use of YouTube, Reddit, Google's own properties | Classic SEO first; answer-first structure; YouTube; GBP for local; reviews. Search Console now reports AI impressions. AI Mode is multi-turn, so answer follow-up questions. |
| **ChatGPT** | Mostly model memory (6 in 7 answers); when it searches, Bing + OpenAI's own index; ~1.6 sub-queries; often `site:` searches of official brand sites; sub-queries frequently include "price", "review", "official" and the current year | Crystal-clear official pages for pricing, specs, features, policies, integrations; get into third-party comparisons/reviews for "vs" questions; Bing Webmaster Tools; allow OAI-SearchBot. Long term: be talked about widely so you're in the training data. |
| **Perplexity** | Its own index, live retrieval, cites many sources; weights community discussions more | Freshness, citations, forum presence. Small share of traffic (~5%) and reportedly shrinking. |
| **Claude** | Brave-powered web search plus its own crawler | Allow Claude-SearchBot/Claude-User; same fundamentals. Small but fast-growing referral share. |
| **Gemini app** | Google Search grounding | Same as Google. |
| **Copilot** | Bing | Bing Webmaster Tools, IndexNow. |

**Rule:** Optimise for fundamentals that work everywhere. Don't contort content for one engine; their retrieval changes month to month. **[Heuristic]**

---

## Part 9 · Special site types

### 9.1 Local businesses
- [ ] Google Business Profile fully complete: correct primary category plus relevant secondary ones, services, attributes, hours, real photos, regular posts. **[Google]**
- [ ] **Business name exactly as it is in real life.** Keyword-stuffing the GBP name risks suspension. **[Google]**
- [ ] Identical NAP (name, address, phone) on site, GBP, and the main directories (Apple Business Connect, Bing Places, Yelp, industry/local directories). **[Evidence]**
- [ ] A dedicated page per service, and per location only if you genuinely serve it, with unique local detail (projects there, local reviews, photos), not city-name swaps. **[Google]**
- [ ] Steady flow of genuine reviews; reply to all. **[Evidence]**
- [ ] `LocalBusiness` schema. **[Google]**
- [ ] Track with geo-grid rank tracking (BrightLocal, Local Falcon etc.), not one rank check from one spot. **[Heuristic]**

### 9.2 E-commerce
- [ ] Map keywords to page types: home (brand), category (head commercial terms), product (specific SKUs), buying guides (comparisons). **[Heuristic]**
- [ ] Category pages need unique buying advice, comparison tables and curated picks, not just a product grid. **[Evidence]**
- [ ] Product pages: unique descriptions (never the manufacturer's copy), full specs in HTML, real Q&A, review pros/cons, `Product` + `Offer` schema. **[Evidence]**
- [ ] Clean, complete **Google Merchant Center** feed (Google's AI shopping pulls from it). **[Google]**
- [ ] Faceted navigation controlled (Part 4.1). **[Google]**

### 9.3 Programmatic / templated pages at scale
- Only when each page offers **unique, useful data** (real prices, specs, reviews, stats per row) that a single hub page can't. Swapping city or product names into boilerplate = doorway pages / scaled content abuse. **[Google]**
- Launch in batches; watch Search Console for "Crawled – currently not indexed"; prune or merge pages with no impressions after 60–90 days. **[Heuristic]**
- Don't launch thousands of templated pages on a new, low-authority domain. **[Evidence]**

### 9.4 News / publishing
- Lead paragraph with the hard facts (who, what, when, numbers). `NewsArticle` schema, news sitemap, Google Publisher Center. **[Google]**
- Ask loyal readers to add you as a **Preferred Source** in Google (Top Stories feature). **[Google]** The research's claim that this "doubles clicks" is **[Unverified]**.
- Hard paywalls without previews tend to get bypassed for open sources. **[Heuristic]**

---

## Part 10 · Keeping content alive

### 10.1 Refresh cadence (tiered)
The research gives contradictory cadences (11 days, 90 days, quarterly, "continuous"). The sensible synthesis: **[Heuristic]**

| Content type | Review cadence |
|---|---|
| Pricing, plans, product specs, policies | Immediately on any change, plus monthly check |
| "Best X", comparisons, statistics pages, anything with a year in the title | Quarterly |
| Core service and pillar pages | Every 6 months |
| Evergreen guides | Yearly, or when traffic/citations drop |

A refresh means new information: updated data, new examples, new sections answering new questions, removed outdated content. Not word swaps. **[Google]**

### 10.2 Content triage (for audits)
For each page, choose one action: **[Heuristic]**
- **Update:** valuable topic, declining performance, fixable gaps.
- **Merge:** several pages compete for the same intent. Combine into the best URL, 301 the others.
- **Prune / noindex:** no traffic, no links, no conversions, no purpose. *Check backlinks and internal links first.*
- **Keep:** performing well. Protect it.

Before cutting a page because Google clicks fell, check whether it's being **cited by AI** or assisting conversions. Lower clicks may just be AI Overviews answering the query, with your brand still being shown. **[Heuristic]**

### 10.3 After a Google core update
- Don't make big changes during the ~2-week rollout. Wait for completion, then compare before/after. **[Heuristic]**
- Separate "rank dropped" (quality problem → improve content/E-E-A-T) from "rank same but clicks fell" (SERP layout change, e.g. bigger AI Overview). **[Heuristic]**
- Recovery usually needs real section-wide improvement and often only shows at the next core update. **[Google]**

---

## Part 11 · When AI gets your facts wrong

When an AI says something false about you, it's usually repeating an ambiguous page of yours or an outdated third-party page. **[Evidence, case study]**

1. **List your critical facts:** name, what you do, who for, prices/plans, key features, locations served, contact, policies (refunds, compliance).
2. **Test** each fact with 3–5 phrasings across ChatGPT, Google AI Mode/Overviews, Perplexity, Gemini, in logged-out/temporary sessions. Log the answer, date and cited URLs.
3. **Fix the source:** add an explicit, plain statement to your own site ("Yes, X offers a public API, available on all plans"). Ask cited third-party sites to correct errors.
4. **Make sure the fixed page is crawlable and indexed** (request indexing in Search Console; IndexNow for Bing).
5. **Re-test with the exact same wording** after a few days to weeks.

---

## Part 12 · Measurement

### 12.1 Google Search Console
- Core: queries, pages, CTR, position; Indexing report; Core Web Vitals. **[Google]**
- **Search generative AI performance reports** (launched mid-2026, now worldwide): show **impressions** from AI Overviews and AI Mode by page, country, device. They don't show clicks or queries, and those impressions are **already included** in the normal web totals, so don't add them on top. **[Google]**

### 12.2 GA4: track AI referrals
Create a custom channel group "AI assistants" with source/referrer matching:
```
.*(chatgpt\.com|chat\.openai\.com|openai\.com|gemini\.google\.com|bard\.google\.com|perplexity\.ai|claude\.ai|copilot\.microsoft\.com|copilot\.com|you\.com|phind\.com|meta\.ai|deepseek\.com|grok\.com|x\.ai).*
```
Place it **above** "Referral" in the channel order. AI Overview/AI Mode clicks show as normal Google organic and can't be separated. App traffic often arrives as "Direct". Measured AI traffic is a floor. **[Evidence]**

### 12.3 AI visibility tracking (prompt panel)
- Build a fixed list of **30–100 prompts** your buyers would use (mix of "best X", "X vs Y", "how do I", "is X good", branded questions). **[Evidence]**
- Run monthly in clean sessions across the main engines, or use a tracker (Ahrefs Brand Radar, Semrush AI toolkit, Profound, Peec AI, Otterly). **[Heuristic]**
- Record: are we mentioned (share of voice), are we linked (citation), is the description accurate and positive, who's cited instead.
- AI answers are random-ish run to run. Look at trends across the whole panel over weeks, never single screenshots. **Never change prompt wording** between runs. **[Evidence]**

### 12.4 KPIs to report
Per site, keep it to a handful: conversions/leads from organic; branded search volume (a proxy for word of mouth and AI exposure); non-branded organic clicks; AI share of voice across the prompt panel; AI referral sessions and conversions. Rankings and impressions are diagnostics, not goals. **[Heuristic]**

---

## Part 13 · Checklists

### Checklist A: Before publishing any page
- [ ] Targets one clear intent; no other page on the site targets the same one
- [ ] Title ≤ 60 chars, aligned with the H1, compelling
- [ ] Direct answer/summary in the first 1–3 sentences
- [ ] Descriptive H2/H3s covering the real sub-questions and follow-ups
- [ ] Each section's first sentence answers its heading
- [ ] At least one piece of information gain (own data, test, example, price, insight)
- [ ] Facts specific and sourced; stats link to primary sources
- [ ] Comparisons/specs/prices in HTML tables, steps in lists
- [ ] Named author with bio; visible "updated" date if time-sensitive
- [ ] 3+ internal links in (from relevant pages) and out (to hub and money pages), descriptive anchors
- [ ] Images: alt text, compressed, sized; video with chapters if used
- [ ] Schema added, matches visible content, validates
- [ ] Content in raw HTML (View source check)
- [ ] Evergreen URL slug
- [ ] Human-checked: every fact true, no filler, brand voice right
- [ ] In sitemap; request indexing (GSC) and IndexNow ping

### Checklist B: New site launch
- [ ] Strategy written (audience, 3–10 topics, proof, 1–2 KPIs) (Part 3.1)
- [ ] Topical map and URL structure planned; money pages first
- [ ] SSR/static rendering confirmed; HTTPS; one canonical host; clean redirects
- [ ] `robots.txt` allows search and AI crawlers; CDN/WAF bot settings checked
- [ ] XML sitemap; GSC and Bing Webmaster Tools verified; IndexNow on
- [ ] Core Web Vitals pass on mobile
- [ ] `Organization`/`LocalBusiness`, `WebSite`, `BreadcrumbList` schema with `sameAs`
- [ ] About, contact, author pages; privacy/terms
- [ ] Official facts pages are explicit: pricing, features/services, areas served, policies
- [ ] GBP (if local), social profiles, key directories, with consistent NAP and description
- [ ] GA4 with key events and the AI-assistant channel group
- [ ] Baseline prompt-panel run recorded

### Checklist C: Quarterly SEO audit
- [ ] Crawl (Screaming Frog/Sitebulb/Ahrefs): broken links, redirect chains, orphan pages, missing/multiple H1, missing alt, duplicate titles, non-canonical URLs in sitemap
- [ ] GSC: indexing errors, "crawled – not indexed" trends, CWV, manual actions
- [ ] GSC: striking-distance queries (pos 8–20) → improve those pages
- [ ] Content triage (update/merge/prune/keep) on declining pages
- [ ] Refresh time-sensitive pages (Part 10.1)
- [ ] Schema still validates; prices/stock in schema match the page
- [ ] Backlinks and mentions gained/lost; competitor gap check
- [ ] robots.txt and CDN bot rules still allow search/AI crawlers (releases and CDN changes break this)

### Checklist D: AI visibility audit (monthly light, quarterly full)
- [ ] Run the fixed prompt panel; record share of voice, citations, accuracy, sentiment
- [ ] List third-party domains cited for our prompts → outreach targets
- [ ] Check brand facts for errors → fix via Part 11
- [ ] GSC generative AI impressions trend by page
- [ ] GA4 AI-assistant sessions and conversions
- [ ] Server logs: AI search bots receiving 200s
- [ ] Review/mention growth on key platforms
- [ ] YouTube: descriptions and chapters on new videos

---

## Part 14 · Corrections to the research

The Gemini research is useful but AI-generated. These are the points where it was wrong, contradictory, or unverifiable, and how this bible resolves them.

| Research claim | Problem | What this bible says |
|---|---|---|
| Use `FAQPage` and `HowTo` schema to win AEO | Google restricted FAQ rich results (2023) and dropped HowTo rich results (2023) | Visible Q&A text yes; don't expect rich results (Part 6.3) |
| AI Overviews overlap with Google's top 10 only 17–38% | Ahrefs measured ~76% in mid-2025, then ~38% in a later update; the figure moves | Rankings still help a lot for AI Overviews; less so for ChatGPT |
| "Half-life of an AI citation is 11 days", credited to Kevin Indig | The study is from Profound. It measures citation churn, not a required refresh rate | Tiered refresh cadence (Part 10.1) |
| Answer blocks should be 40–60 words / 150–200 words / 100–250 words (three sources) | Contradictory, none proven; Google says artificial chunking isn't needed | Answer in the first 1–3 sentences; sections that stand alone (Part 5.1) |
| Topical maps need 3–8 pillars and 20–80 pages each / 1 pillar + 6–10 posts / 8–10 subjects | Contradictory heuristics | Scale to resources; every page must earn its place (Part 3.4) |
| AI Overviews on 88% of commercial keywords vs 14.2% of retail keywords | Both real, different keyword sets | Assume comparison/"best" queries are AI-mediated |
| `llms.txt` as part of GEO setup | No major engine confirms using it; Google calls it speculative | Optional, zero priority (Part 4.4) |
| "Patent US12393768B2" defines HTML extractability standards | Could not be verified; looks invented or misattributed | Ignored; the underlying advice (text in HTML) stands on other evidence |
| Google AI Mode "1B monthly users, powered by Gemini 3.5 Flash / Gemini 4 Argon" | Unverified model names and figures | Not used |
| Preferred Sources "doubles click likelihood" | Unverified figure | Feature is real; benefit figure tagged [Unverified] |
| Stats presented as 2026 (title rewrite 33.4%, meta rewrite 62.78%, 96.55% of pages get no traffic) | Many are from 2020–2023 Ahrefs studies | Kept, labelled as older |
| Mobile pages should load "<3s" | Not a Google metric | Use Core Web Vitals thresholds (Part 4.2) |
| GEO tactics give "up to 40%" lift | True in the Princeton paper's lab benchmark, not proven on live engines | Kept, labelled lab setting |
| Reddit is key for AI visibility (some sources) vs ChatGPT Reddit citations down 88% (others) | Both true, for different engines | Reddit matters for Google AI and Perplexity, much less for ChatGPT (Part 7.4) |

Also missing from the research and added here: Bing Webmaster Tools and IndexNow for ChatGPT/Copilot, `Claude-User` and `Perplexity-User` crawlers, Cloudflare's default AI-bot blocking, `nosnippet`/`max-snippet` effects on AI Overviews, and Google's 2026 statement that AEO/GEO is still SEO.

---

## Part 15 · Key sources

- Google Search Central: AI features and your website; Search Essentials; spam policies (scaled content abuse, site reputation abuse); structured data guidelines; core updates guidance
- Google Search Central blog (June 2026): Search generative AI performance reports in Search Console
- Ahrefs: How ChatGPT does query fan-out (2026); AI Overview citations and top 10 (2025, updated); 75k brands AI visibility study; freshness (17M citations); AI content studies (600k / 900k pages); SEO statistics
- Semrush: AI Overviews on commercial keywords (2026); Reddit citations in ChatGPT; Feature Upvote AI Overview case study
- Pew Research Center (2025): user clicks with and without AI summaries
- Seer Interactive: CTR when cited in AI Overviews
- Profound: The half-life of an AI citation
- Aggarwal et al., "GEO: Generative Engine Optimization" (KDD 2024)
- SEOcrawl (2026): AEO traffic study, 16,661 sites
- Peec AI / Search Engine Land (Nov 2026): YouTube descriptions and AI retrievals
- LEAP x SISTRIX (2026): e-commerce AI & SEO study

*Review this document every 6 months. AI search changes fast, and the numbers in Part 2 age quickly.*
