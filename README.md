# DigiKhata

**AI spending coach for India's first-time earners**

---

## Problem

80M+ young Indians enter the workforce every year earning ₹15K–₹1L/month. They have zero financial muscle memory. Existing tools (CRED, Walnut, ET Money) assume financial literacy and retroactively show dashboards *after* money is already gone.

**Result:** Month-end shock. No savings. Guilt. Repeat.

## Insight

The spending decision happens *before* the swipe, not after. The intervention window is **30 seconds** — when a user is standing at the counter deciding between ₹300 and ₹900 headphones. No one opens a pie chart in that moment.

## Solution

DigiKhata is a **proactive spending coach** that learns *when, where, and why* users overspend — then intervenes in real time.

| Layer | What it does |
|---|---|
| **Behavioural Model** | Learns personal overspend triggers (day of week, time, category, merchant) from transaction history |
| **Nudge Engine** | Delivers contextual micro-nudges *before* high-risk spending windows — not month-end reports |
| **Weekly Pulse** | 60-second weekly review with one clear action item (not 12 charts) |
| **Streak System** | Gamified savings streaks tied to peer benchmarks ("You saved more than 73% of earners your age this week") |

### What we are NOT building
- ❌ Another expense tracker
- ❌ A budgeting spreadsheet in an app
- ❌ A credit score monitor

## Target User

| Attribute | Detail |
|---|---|
| **Age** | 21–28 |
| **Income** | ₹15K–₹1L/month |
| **Profile** | First job, living alone or with roommates, UPI-native, Instagram/YouTube-heavy |
| **Financial literacy** | Low — can't distinguish SIP from FD |
| **Pain** | "I don't know where my money goes" |
| **Current workaround** | Screenshot bank balance on the 1st, panic on the 25th |

## Market

| Metric | Value |
|---|---|
| First-time earners entering workforce (next 5 yrs) | 80M+ |
| Average monthly discretionary spend | ₹6,000–₹12,000 |
| Total addressable annual spend pool | ~₹4.8 lakh crore |
| Serviceable addressable market (SAM) — Tier 1+2 UPI-active | ~₹1.2 lakh crore |
| Penetration of any financial coaching tool | <2% |

## Business Model

```
┌──────────────────────────────────────────────────────┐
│                   Revenue Streams                    │
├──────────────┬───────────────┬────────────────────────┤
│  Freemium    │  Distribution │  B2B Data              │
│  ₹99/mo      │  Referral fee │  Behavioural insights  │
│  Premium     │  per product  │  licensing to FIs      │
│  nudges,     │  (SIPs, cards,│                        │
│  deep        │  insurance)   │  (anonymised,          │
│  analytics   │               │  aggregated)           │
└──────────────┴───────────────┴────────────────────────┘
```

**Unit economics target (Month 18):**
- CAC: ₹80 (organic + referral loops)
- ARPU: ₹45/month (blended free + paid)
- LTV: ₹2,700 (60-month horizon at 5% monthly churn)
- LTV:CAC > 30x

## Validation

| Signal | Result |
|---|---|
| Prototype cohort | 5 users, 2 weeks |
| Impulse spend reduction | **23%** |
| NPS | **72** |
| Unprompted re-engagement | 4 of 5 users opened nudge within 2 min |

## Competitive Landscape

| | DigiKhata | CRED | Walnut | ET Money |
|---|---|---|---|---|
| **Target income** | ₹15K–₹1L | ₹1L+ | Any | ₹50K+ |
| **Core hook** | Pre-spend nudge | Reward on bill pay | Auto-categorise | Invest + track |
| **Intervention timing** | Before purchase | After payment | After transaction | Monthly review |
| **Requires financial literacy** | No | Moderate | Low | High |
| **Moat type** | Behavioural data | Brand + rewards | SMS parsing | MF distribution |

## Moat

1. **Behavioural lock-in at 23:** Own someone's financial identity at their first job → influence their money decisions for 40 years
2. **Proprietary nudge model:** Every interaction trains a per-user spending model. More usage = smarter nudges = harder to leave
3. **Network data effects:** Aggregate anonymised cohort data enables peer benchmarking that no competitor without this demographic can replicate

## Roadmap

| Phase | Timeline | Milestone |
|---|---|---|
| **v0.1 — Prove the nudge** | Month 1–3 | Manual nudge pipeline, 50-user cohort, validate 20%+ impulse reduction |
| **v0.2 — Automate** | Month 4–6 | ML-based trigger detection, UPI SMS parsing, 500 users |
| **v1.0 — Launch** | Month 7–9 | App store launch, streak system, premium tier, 5K users |
| **v1.5 — Monetise** | Month 10–14 | Financial product distribution, B2B pilot with 1 NBFC |
| **v2.0 — Scale** | Month 15–24 | Vernacular support, WhatsApp-first UX, Tier 2/3 expansion |

## Key Metrics (North Stars)

| Metric | Why it matters |
|---|---|
| **Weekly active nudge open rate** | Proxy for trust — are users listening? |
| **% reduction in impulse spend (vs. baseline)** | Core value delivery |
| **Day-28 retention** | Product-market fit signal |
| **Streak length distribution** | Engagement depth |
| **Referral coefficient** | Organic growth engine |

## Team Ask

| Role | Why |
|---|---|
| Full-stack engineer (React Native + Node) | Ship the MVP |
| Applied ML / data science | Build the nudge model |
| Designer (mobile-first, Gen-Z aesthetic) | UX that doesn't feel like a "finance app" |

## Architecture

Full technical architecture covering the 8-layer pipeline → [ARCHITECTURE.md](./ARCHITECTURE.md)

```
User Data → Parser → AI Categoriser → Behaviour Engine → Anakin (Context) → Risk Prediction → Warning → Dashboard
```

---

> *"The best financial product for a 23-year-old isn't a mutual fund. It's someone who stops them from ordering Swiggy at 2 AM for the third time this week."*
