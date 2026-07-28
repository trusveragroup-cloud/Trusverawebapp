export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: "Intent Data" | "Demand Generation" | "Account Profiling" | "Lead Generation" | "Market Research" | "Email Marketing"
  author: string
  authorRole: string
  authorInitials: string
  date: string
  readTime: string
  coverImage: string
  featured: boolean
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "intent-data-strategy-enterprise-b2b",
    title: "Intent Data Strategy for Enterprise B2B Teams",
    excerpt:
      "Buyer intent signals are reshaping how enterprise sales teams prioritize accounts, allocate budget, and cut acquisition costs. Here is how the best teams are building intent into their go to market motion.",
    category: "Intent Data",
    author: "Rohan Mehta",
    authorRole: "Head of Strategy",
    authorInitials: "RM",
    date: "July 14, 2026",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    featured: true,
    tags: ["Intent Data", "B2B Strategy", "Demand Generation"],
    content: `
      <h2>Why intent data changes the sales math</h2>
      <p>Enterprise sales cycles are long, expensive, and full of accounts that never had any intention of buying. Intent data solves a specific problem: it tells a revenue team where real buying behavior is happening before a prospect ever fills out a form. That shift, from guessing to observing, is the single biggest lever available to teams trying to reduce customer acquisition cost today.</p>
      <p>Most enterprise organizations still allocate outbound effort evenly across a target account list, treating every logo as equally warm. Intent data breaks that assumption apart. When a defined set of accounts starts researching topics tied to your category, that surge in activity is a measurable signal, and it should reorder your entire outreach queue.</p>
      <blockquote>Teams that act on intent signals within 48 hours of a surge see meaningfully higher connect rates than teams working a static list, because timing is doing half the work that messaging used to do.</blockquote>
      <h2>Building an intent driven prioritization model</h2>
      <p>The mechanics are simple even when the underlying data is complex. Intent providers track content consumption, search behavior, and firmographic activity across the web, then roll that activity up into account level scores. The strategic work is deciding which signals actually correlate with your win rate, rather than treating every spike as equally important.</p>
      <p>A mature intent program layers three things together: a defined ideal customer profile, a topic taxonomy mapped to your product categories, and a scoring threshold that triggers action. Without all three, teams either drown in noise or miss the accounts that matter most.</p>
      <ul>
        <li>Define the topic taxonomy before you buy a data source, not after</li>
        <li>Route surging accounts to reps within hours, not days</li>
        <li>Pair intent with firmographic fit so volume does not override quality</li>
        <li>Feed outcomes back into the model so scoring improves every quarter</li>
      </ul>
      <h2>What good looks like six months in</h2>
      <p>Teams that operationalize intent data well tend to report two outcomes: shorter sales cycles because reps engage earlier in the buying journey, and lower CAC because marketing spend concentrates on accounts already in market. Neither outcome happens automatically. It requires sales and marketing to agree on what a qualified signal looks like and to hold each other accountable to acting on it.</p>
      <p>The organizations that get the most value are not the ones with the most expensive data source. They are the ones that built a disciplined, repeatable process around a smaller set of high confidence signals and refused to let the list grow faster than their capacity to act on it.</p>
    `,
  },
  {
    id: "2",
    slug: "bant-framework-modern-b2b-sales",
    title: "The BANT Framework Reimagined for Modern B2B Sales",
    excerpt:
      "Budget, Authority, Need, and Timeline still matter, but the way modern buyers reveal them has changed. Here is how to layer intent signals onto a decades old qualification model.",
    category: "Lead Generation",
    author: "Priya Desai",
    authorRole: "Senior Demand Strategist",
    authorInitials: "PD",
    date: "July 07, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    featured: false,
    tags: ["BANT", "Lead Qualification", "Sales Strategy"],
    content: `
      <h2>BANT was never wrong, it was just incomplete</h2>
      <p>Budget, Authority, Need, and Timeline has been the backbone of B2B qualification for decades, and for good reason: it forces reps to confirm the fundamentals before investing real time into an opportunity. The criticism it receives today is usually aimed at how rigidly it gets applied, not at the framework itself.</p>
      <p>The problem is that buyers rarely disclose budget or timeline honestly on a first call anymore. They research privately for weeks before a rep ever hears from them, which means the classic BANT conversation now happens far later in the buying journey than the framework assumes.</p>
      <blockquote>A qualification framework built for a world of scarce information does not disappear when information becomes abundant, it just needs new inputs.</blockquote>
      <h2>Layering intent signals onto each BANT pillar</h2>
      <p>Modern qualification treats BANT as a set of hypotheses to confirm rather than questions to ask cold. Intent data gives reps a head start on every pillar before the first conversation even happens.</p>
      <ol>
        <li>Need can be inferred from the specific topics an account is researching, well before a discovery call</li>
        <li>Timeline can be estimated from the intensity and recency of research activity across the buying committee</li>
        <li>Authority becomes easier to map when intent data reveals which titles are engaging with which content</li>
        <li>Budget is still best confirmed directly, but firmographic data narrows the range before that conversation starts</li>
      </ol>
      <p>Reps who walk into a call already holding informed hypotheses close faster, because the conversation shifts from discovery to confirmation. That shift alone shortens cycles without changing anything about the product or the pricing.</p>
      <p>The teams that resist this shift keep running BANT as a checklist applied uniformly to every lead. The teams that outperform them treat BANT as a living scorecard, continuously updated by external signal, not just by what a prospect chooses to say out loud.</p>
    `,
  },
  {
    id: "3",
    slug: "abm-vs-demand-generation",
    title: "Account-Based Marketing vs Broad Demand Generation: Which Wins?",
    excerpt:
      "Both approaches can drive pipeline, but they solve different problems. Here is a practical framework for deciding which one deserves your next quarter of budget.",
    category: "Demand Generation",
    author: "Arjun Kulkarni",
    authorRole: "Growth Analyst",
    authorInitials: "AK",
    date: "June 30, 2026",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    featured: false,
    tags: ["ABM", "Demand Generation", "Marketing Strategy"],
    content: `
      <h2>Two philosophies, not two tactics</h2>
      <p>Account-based marketing and broad demand generation are frequently pitched as competing strategies, but the framing misses what actually separates them. ABM concentrates finite resources on a defined list of named accounts. Broad demand generation casts a wide net and lets volume and conversion rate do the work. Neither is inherently superior, they answer different business questions.</p>
      <p>The real question to ask is not which approach is better in the abstract, but which one matches your total addressable market. A company selling into five hundred named enterprise accounts has a fundamentally different math problem than one selling into a market of fifty thousand mid sized businesses.</p>
      <h2>A practical framework for choosing</h2>
      <p>Start with market size and deal concentration. If a small number of accounts represent the majority of realistic revenue, ABM lets you personalize outreach and content in a way that broad demand generation simply cannot afford to replicate at scale.</p>
      <p>If your addressable market is large and deal sizes are smaller, the economics flip. Broad demand generation, supported by strong content and paid distribution, produces enough volume that a lower per lead conversion rate still generates healthy pipeline.</p>
      <blockquote>The mistake most marketing teams make is not picking the wrong strategy, it is running both at half intensity and getting the benefits of neither.</blockquote>
      <p>Many mature organizations eventually run both in parallel, but deliberately: ABM for a tier of strategic accounts, and broad demand generation to fill the pipeline underneath it. The key discipline is keeping the two programs from competing for the same budget without a clear allocation rule.</p>
      <p>Whichever path you choose, intent data improves the outcome. It sharpens the account list for ABM and improves lead scoring for broad demand generation, which means the decision is less about which channel to invest in and more about which one your data infrastructure is ready to support today.</p>
    `,
  },
  {
    id: "4",
    slug: "email-deliverability-b2b-2026",
    title: "Email Deliverability in 2026: What B2B Marketers Must Know",
    excerpt:
      "Inbox providers have tightened enforcement again this year. Here is what every B2B marketer needs to know about DMARC, DKIM, and sender reputation to keep campaigns landing in the inbox.",
    category: "Email Marketing",
    author: "Sneha Joshi",
    authorRole: "Email Marketing Lead",
    authorInitials: "SJ",
    date: "June 23, 2026",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1596526131083-e8c633064d28?w=1200&q=80",
    featured: false,
    tags: ["Email Marketing", "Deliverability", "B2B"],
    content: `
      <h2>Authentication is no longer optional</h2>
      <p>The major inbox providers have continued tightening enforcement on unauthenticated mail, and by 2026 the margin for error has essentially disappeared. Campaigns sent without properly configured DMARC, DKIM, and SPF records are now routinely filtered before a recipient ever sees them, regardless of how relevant the content is.</p>
      <p>What makes this especially costly for B2B teams is that domain reputation is shared across every sender using it. A single poorly targeted campaign can quietly damage deliverability for every other email leaving that domain for weeks afterward.</p>
      <h2>Building sender reputation deliberately</h2>
      <p>Sender reputation is not a switch you flip, it is a trend inbox providers track over time based on engagement, complaint rates, and list hygiene. Ramping a new domain or IP too aggressively is one of the fastest ways to trigger filtering that takes months to reverse.</p>
      <p>The good news is that the fundamentals have not changed even as enforcement has tightened, they have simply become non negotiable rather than nice to have. Teams that treat deliverability as an engineering discipline, not just a marketing setting, consistently outperform those that do not.</p>
      <ul>
        <li>Publish and monitor DMARC, DKIM, and SPF records on every sending domain</li>
        <li>Warm up new sending domains gradually with your most engaged contacts first</li>
        <li>Remove unengaged contacts from active sequences on a defined cadence</li>
        <li>Segment cold outbound from transactional and lifecycle email infrastructure</li>
        <li>Monitor complaint and bounce rates weekly, not just after a campaign underperforms</li>
      </ul>
      <p>None of this is glamorous work, but it is the foundation everything else in an email program sits on. A brilliant subject line cannot rescue a message that never reaches the inbox in the first place.</p>
    `,
  },
  {
    id: "5",
    slug: "whitepapers-drive-pipeline-playbook",
    title: "How Whitepapers Drive Pipeline: A Demand Generation Playbook",
    excerpt:
      "Gated whitepapers remain one of the most reliable top of funnel assets in B2B, especially when paired with intent data. Here is a practical playbook for making them work harder.",
    category: "Market Research",
    author: "Rohan Mehta",
    authorRole: "Head of Strategy",
    authorInitials: "RM",
    date: "June 16, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    featured: false,
    tags: ["Whitepapers", "Content Marketing", "Pipeline"],
    content: `
      <h2>Why the format still works</h2>
      <p>Whitepapers get dismissed by some marketers as an outdated format, but the data tells a different story. Buyers doing serious research still exchange contact information for a well researched, credible piece of content, especially at the point in the journey where they are trying to build an internal business case.</p>
      <p>The reason whitepapers underperform for some teams is rarely the format itself, it is the execution. A generic asset promoted to a generic audience produces generic results. A sharply scoped whitepaper promoted to accounts already showing research intent on that exact topic produces something very different.</p>
      <h2>The playbook that turns downloads into pipeline</h2>
      <p>Start by mapping whitepaper topics directly to the intent topics your ideal accounts are already researching. This is the single highest leverage decision in the entire program, because it determines whether the asset reaches people who are already curious or people who are not.</p>
      <blockquote>A whitepaper is not a lead magnet, it is a filter, and the quality of what comes through it depends entirely on how precisely you define what it is filtering for.</blockquote>
      <p>Once the asset is live, distribution matters as much as the content itself. Promote it through channels where your buying committee already spends time, and prioritize follow up speed with accounts that show elevated intent activity around the topic after downloading.</p>
      <ul>
        <li>Scope each whitepaper narrowly around a single buying committee problem</li>
        <li>Promote to accounts already showing intent signal on the covered topic</li>
        <li>Route downloads from high fit accounts to sales within hours, not days</li>
        <li>Retarget engaged downloaders with a logical next step, not a generic demo ask</li>
      </ul>
    `,
  },
  {
    id: "6",
    slug: "b2b-market-research-methodology",
    title: "B2B Market Research Methodology: From ICP to Insight",
    excerpt:
      "Rigorous market research is the foundation every other go to market motion depends on. Here is a practical methodology for moving from a defined ICP to insight your teams can actually act on.",
    category: "Market Research",
    author: "Priya Desai",
    authorRole: "Senior Demand Strategist",
    authorInitials: "PD",
    date: "June 09, 2026",
    readTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    featured: false,
    tags: ["Market Research", "ICP", "B2B Intelligence"],
    content: `
      <h2>Start with a defined, testable ICP</h2>
      <p>Every credible market research effort begins with a clearly defined ideal customer profile, yet many organizations skip this step or leave it vague enough to be useless. A testable ICP specifies firmographic criteria, technographic signals, and the business problems a company needs to have before it qualifies as a fit.</p>
      <p>Without that specificity, research findings end up describing the entire market rather than the segment that actually matters, and the insight becomes too broad to act on.</p>
      <h2>Combining primary and secondary research</h2>
      <p>Secondary research, industry reports, public filings, and existing data sources, gives a fast, low cost view of the landscape. It is useful for orientation but rarely specific enough to drive a go to market decision on its own.</p>
      <p>Primary research closes that gap. Structured interviews, surveys, and win loss analysis with real buyers inside the defined ICP produce insight that is specific to your market position, not the market in general. The combination of both is what separates a rigorous research process from a generic industry summary with your logo on it.</p>
      <blockquote>Secondary research tells you what the market looks like, primary research tells you what your market thinks of you, and only one of those is actionable.</blockquote>
      <h2>Turning insight into action</h2>
      <p>Research that stays in a slide deck has not accomplished anything. The final stage of a rigorous methodology is translating findings into specific changes: messaging adjustments, ICP refinements, or shifts in channel investment that a revenue team can actually execute against.</p>
      <p>The organizations that get the most value from market research build a repeatable cadence rather than treating it as a one time project, revisiting the ICP and buyer insight on a regular schedule as the market and the product both continue to evolve.</p>
      <ul>
        <li>Define a specific, testable ICP before any research begins</li>
        <li>Pair secondary research for orientation with primary research for specificity</li>
        <li>Run structured win loss interviews on a consistent cadence</li>
        <li>Translate every finding into a specific, owned action item</li>
      </ul>
    `,
  },
]

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getRelatedPosts(currentSlug: string, category: string, count: number = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, count)
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((p) => p.featured === true)
}

export function getGridPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured !== true)
}
