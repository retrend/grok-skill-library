---
name: Run a daily signal-based prospecting bot
description: >-
  Use this when building a cheap daily outbound prospecting bot: diff a
  target-account list's job boards, sites and news, have a small model (Haiku)
  tag buying signals and profile ICP fit, then score in plain code into
  email-today / wait / drop with a quoted first-line fact.
---
# Run a daily signal-based prospecting bot

Source: Alex Vacca ([@itsalexvacca](https://x.com/itsalexvacca/status/2108588892664606727)), founder of the GTM agency Frontal, in an X article from 9 Oct 2026: "Haiku 5.5 Is the Best Prospecting Model You Can Run". His repo, `signal-engine`, is gated ("comment SIGNAL"). If you don't have it, build the same design from the spec below. Commands are given as he wrote them; `<repo>` is a placeholder.

**Why it works:** Frontal sees about 15% replies when it emails right after something changes at the target company. Instantly puts the 2026 average for cold lists at 3.43%. Competitors can buy the same change alerts, so the edge comes from filtering by ICP fit first and opening with exactly what happened and when. His first run covered 11 companies for under 10 cents.

## Design: 5 steps, only 2 use the LLM
1. **Collect (plain code).** For each company, check three places:
   - its job board on Greenhouse, Lever, or Ashby
   - its home, about, careers, and pricing pages
   - Google News headlines from the last 7 days
   Save a snapshot of every page and diff it against yesterday's, so the model only reads what changed.
2. **Tag signals (LLM).** The model reads only the diff and tags reasons they might buy now, such as a new sales job or a funding round. It quotes the evidence and saves the link.
3. **Profile ICP fit (LLM, monthly).** Once a month, the model reads the site and open jobs and answers a fixed set of questions: who they sell to, whether they have a sales team, rough size, and who runs sales. It marks each ICP criterion pass, fail, or unknown, citing the page. Unknown sends the company to the wait group, so write the ICP in terms a website actually shows.
4. **Filter and score (plain code).** Drop companies that fail any ICP criterion, check how old each signal is, and score the rest out of 100.
5. **Output (plain code).** Produce a short digest plus a CSV for your email tool.

Every company lands in one of three groups: **act** (email today, with an opener fact), **hold** (wait until something new happens), or **suppress** (drop, with the reason, e.g. `size:fail (1200 vs 20-500)`).

The code steps are deterministic and easy to fix by hand, and only the LLM steps cost money. Keep each LLM request to one company's pages, and on most days just the diff.

**Day 1 vs later:**
- On day 1 there's nothing to diff, so only self-dated signals count: job posts from the last 21 days, 3 or more sales jobs posted at once, and this week's headlines.
- Website changes show up from day 2.
- A reposted job only counts if it was gone at least 7 days and came back, so those appear from week 2.

## ICP config (example)
```yaml
icp:
  industry: B2B software or services that sell to businesses
  size: {min: 20, max: 500}
  region: [US, CA, UK, EU]
  must_have: a sales team or an open sales role visible on the careers page
```
- Keep a `sales_role_keywords` list of sales job titles. The LLM uses it to tag jobs, and the code uses it to detect 3 or more sales jobs at once. If you sell to marketing teams, add marketing titles.
- A company with layoffs in the last 90 days always goes to hold.

## Signal windows and points (defaults)
| signal | counts for (days) | points (0–16) |
|---|---|---|
| funding round | 45 | 16 |
| new sales leader | 60 | 16 |
| reposted job | 30 | 14 |
| 3+ sales jobs at once | 30 | 14 |
| new market | 30 | 12 |
| new sales job | 21 | 10 |
| product launch | 21 | 10 |
| acquisition | 30 | 10 |
| switched software | 30 | 8 |
| won a contract | 30 | 8 |
| partnership | 30 | 6 |
| pricing change | 14 | 6 |
| complained publicly | 30 | 6 |
| website change | 14 | 4 |
| layoffs | 90 (hold) | 0 |

## Score = 5 parts added up (worked example: Linear, 81)
- **Fit, 40:** passed every ICP criterion.
- **Buyer, 15:** found the Head of Sales by name. A job title only is worth 8.
- **Recency, 16:** the post was 2 days old, out of a 21-day window.
- **Signal type, 10:** a new sales job.
- **Second signal, 0:** only one kind of signal, so no bonus.

If a score looks wrong, find the part that's off and change the setting behind it.

## Setup steps
1. Get the prerequisites: Python 3.11+, Claude Code logged in with a subscription (`claude` then `/login`), Mac/Linux or Windows WSL, and a CSV of `company,domain` with an optional `size` column that overrides the model's size estimate. To pay per use instead, put `ANTHROPIC_API_KEY=` and `SIGNAL_ENGINE_BACKEND=api` in `.env`.
2. Install:
   ```bash
   git clone <repo> signal-engine && cd signal-engine
   python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
   chmod +x run.sh && .venv/bin/python -m pytest -q
   ```
   These are 23 offline tests.
3. Do a sample run with `./run.sh daily`, then read the newest file in `data/digests/`.
4. Copy `config/template.yaml` to `config/<you>.yaml`. Edit the ICP first, then the signal windows and points, then `sales_role_keywords`.
5. Load your list:
   ```bash
   printf 'accounts: []\n' > accounts.yaml
   ./run.sh import leads.csv
   ./run.sh daily --tenant <you>
   ```
   The import finds each company's job board from its careers page, or guesses it. Companies with no job board still get their site and news checked. If you override `pages:` in `accounts.yaml`, list all 4 pages.
6. Review the act list number by number, and click every source link.
7. Write the opener from the quoted public fact, then ask one question about what that change means for the reader. You can have Claude draft 3 versions and edit 1 yourself. Also read the hold and suppress reasons and fix any ICP misfires.
8. Use the export in `data/export/`: company, site, buyer title or name, signal, date, link, and opener. The email column is empty, so add an email-lookup tool.
9. **Evaluate the small model against the big one before relying on it.** Label 100–200 records from `data/diffs/` into `evals/labeled.jsonl` as `{"rec": <diff line>, "expected": ["job_posting"]}`, then run `.venv/bin/python evals/agreement.py evals/labeled.jsonl`. It compares Haiku 5.5 with Sonnet 5.5 on accuracy, recall, and cost. If Haiku falls short, switch with `--model claude-sonnet-5-5` and run once with `--force` to re-profile. Watch the cost line for the first week, and double-check low-confidence tags (e.g. "Account Manager" titles).
10. **Schedule it** with `crontab -e`:
    ```bash
    PATH=/usr/local/bin:/usr/bin:/bin:/home/you/.local/bin
    0 7 * * * /home/you/signal-engine/run.sh daily --tenant <you> >> /home/you/signal-engine/data/cron.log 2>&1
    ```
    Check `cron.log` after the first run, since cron may not have your Terminal's login access.
11. **Leave the settings alone for 30 days.** Then shorten the window or lower the points for any signal type whose emails get replies at or below your usual rate.

## Not included
The bot doesn't build the list, find emails or phone numbers, watch LinkedIn or site visitors, write the full email, or send. A human edits and sends every email.
