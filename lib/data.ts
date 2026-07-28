export const matchData = [
  { name: "High", value: 82, color: "#C8973E" },
  { name: "Medium", value: 14, color: "#166B4A" },
  { name: "Low", value: 4, color: "#2D8B67" },
];

export const engagementData = [
  { name: "Apr 21", imp: 45, eng: 28 },
  { name: "Apr 28", imp: 55, eng: 38 },
  { name: "May 5", imp: 48, eng: 32 },
  { name: "May 13", imp: 62, eng: 42 },
  { name: "May 12", imp: 72, eng: 50 },
  { name: "May 19", imp: 85, eng: 58 },
];

export const intentSignals = [
  { label: "Data Center Modernization", level: "High" },
  { label: "Cybersecurity Solutions", level: "High" },
  { label: "Cloud Migration", level: "Medium" },
  { label: "AI / Machine Learning", level: "Medium" },
  { label: "IT Infrastructure", level: "Low" },
];

type NavLeaf = { label: string; href: string; dropdown?: undefined };
type NavDropdownItem = string | { label: string; href: string };
type NavDropdown = {
  label: string;
  href?: undefined;
  dropdown: { group: string; items: NavDropdownItem[] }[];
};

export const NAV: (NavLeaf | NavDropdown)[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    dropdown: [
      {
        group: "B2B Services",
        items: [
          { label: "Intent Data", href: "/services/intent-data" },
          { label: "Account Profiling", href: "/services/account-profiling" },
          { label: "BANT Qualified Leads", href: "/services/bant-qualified-leads" },
          { label: "Lead Generation", href: "/services/lead-generation" },
          { label: "Email Marketing", href: "/services/email-marketing" },
          { label: "Whitepaper Promotion", href: "/services/whitepaper-promotion" },
        ],
      },
    ],
  },
  { label: "Market Research", href: "/services/market-research" },
  {
    label: "Publishing",
    dropdown: [
      {
        group: "",
        items: [
          { label: "Tech", href: "https://bytesphere.com" },
          { label: "Business", href: "https://bytesphere.com" },
          { label: "Energy", href: "https://bytesphere.com" },
          { label: "Finance", href: "https://bytesphere.com" },
          { label: "Healthcare", href: "https://bytesphere.com" },
          { label: "Logistics", href: "https://bytesphere.com" },
          { label: "Marketing", href: "https://bytesphere.com" },
          { label: "Startups", href: "https://bytesphere.com" },
        ],
      },
    ],
  },
  { label: "Blogs", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const INTENT_SIGNALS = [
  { icon: "FileText", title: "Content Engagement", desc: "Repeated downloads, reads, and shares of content tied to a specific buying category.", category: "Behavioral" },
  { icon: "Repeat2", title: "Website Revisits", desc: "Multiple visits from the same account within a short window, especially to pricing or solution pages.", category: "Behavioral" },
  { icon: "Clock", title: "Dwell Time", desc: "Time spent per session on high-intent pages, a strong predictor of active evaluation.", category: "Behavioral" },
  { icon: "Search", title: "Competitive Research", desc: "Searches and content consumption that show a buyer comparing vendors.", category: "Behavioral" },
  { icon: "MousePointerClick", title: "Ad and Social Interaction", desc: "Clicks, views, and engagement with category-specific paid and organic campaigns.", category: "Engagement" },
  { icon: "Building2", title: "Firmographic Triggers", desc: "Funding rounds, leadership changes, expansions, and product launches that create new buying windows.", category: "Firmographic" },
];

export const INTENT_TYPES = [
  {
    icon: "Fingerprint",
    title: "First-Party Intent Data",
    desc: "Signals collected directly from your own digital properties: website analytics, email engagement, and your marketing automation platform. First-party data tells you what a prospect has done specifically with your brand.",
  },
  {
    icon: "Globe",
    title: "Third-Party Intent Data",
    desc: "Signals aggregated across the wider web: publisher networks, review sites, and content syndication partners. Third-party data reveals what a prospect is doing everywhere else, before they ever land on your site.",
  },
];

export const INTENT_COMPARISON_ROWS = [
  { label: "Captures", firstParty: "Your own site, email, and CRM activity", thirdParty: "Behavior across the wider web" },
  { label: "Best For", firstParty: "Confirming active interest in your brand specifically", thirdParty: "Discovering demand before a buyer knows your brand" },
  { label: "Example Signal", firstParty: "A repeat visit to your pricing page", thirdParty: "Reading a competitor comparison on an industry publication" },
  { label: "Data Freshness", firstParty: "Real-time, as it happens on your properties", thirdParty: "Aggregated across a partner network, updated continuously" },
];

export const INTENT_ENGINE_STATS: { value: number; suffix: string; prefix?: string; label: string; desc: string; decimals?: number; chartValue: number }[] = [
  { value: 150, suffix: "M+", label: "Technology Buyer Profiles", desc: "A continuously refreshed database of enterprise technology buyers across every major vertical.", chartValue: 40 },
  { value: 111, suffix: "K+", label: "Intent Signals Tracked Monthly", desc: "Behavioral and firmographic signals captured and scored every month.", chartValue: 30 },
  { value: 97, suffix: "%", label: "Client Retention", desc: "Clients stay because the accounts we surface convert.", chartValue: 15 },
  { value: 1.2, suffix: "B+", prefix: "$", label: "Pipeline Influenced", desc: "Revenue pipeline directly influenced by intent-qualified accounts we have delivered.", decimals: 1, chartValue: 15 },
];

export const INTENT_BENEFITS = [
  { icon: "Rocket", outcome: "Weeks Off Your Sales Cycle", title: "Faster Sales Cycles", desc: "Prioritize accounts already in-market instead of cold outreach, cutting weeks off the average sales cycle." },
  { icon: "Users", outcome: "One List. No More Arguments.", title: "Sales and Marketing Alignment", desc: "A shared, intent-scored account list keeps both teams focused on the same opportunities." },
  { icon: "Target", outcome: "Your Best Reps On Your Hottest Accounts", title: "Smarter Account Prioritization", desc: "Route your best reps to your hottest accounts and stop spending hours on prospects who are not ready." },
  { icon: "Crosshair", outcome: "Reach Them While They Are Still Deciding", title: "Competitive Displacement", desc: "Identify accounts actively researching your competitors and reach them while they are still evaluating." },
];

export const PROFILE_LAYERS = [
  {
    icon: "Building2",
    title: "Firmographic Intelligence",
    desc: "Company size, industry vertical, annual revenue, employee headcount, growth trajectory, and geographic footprint. The structural context that tells you whether an account fits your ICP before a single call is made.",
    tag: "Foundation Layer",
  },
  {
    icon: "Cpu",
    title: "Technographic Signals",
    desc: "The full technology stack an account runs today: CRM, marketing automation, data warehouse, cloud infrastructure, and every adjacent tool. Know what they use, what they are replacing, and where your solution fits.",
    tag: "Stack Layer",
  },
  {
    icon: "Users",
    title: "Buying Committee Mapping",
    desc: "Decision-makers, budget holders, technical evaluators, and champions mapped by role, seniority, and influence. Reach the right person in the right sequence instead of guessing who owns the budget.",
    tag: "People Layer",
  },
  {
    icon: "TrendingUp",
    title: "Growth and Trigger Signals",
    desc: "Funding rounds, executive hires, product launches, geographic expansions, and M and A activity. The events that open budget cycles and create urgency where none existed before.",
    tag: "Signal Layer",
  },
  {
    icon: "Calendar",
    title: "Budget Cycle Intelligence",
    desc: "Fiscal year start and end, historical procurement patterns, and renewal windows. Reach accounts when budget is available, not after it has already been allocated elsewhere.",
    tag: "Timing Layer",
  },
  {
    icon: "Target",
    title: "ICP Fit Scoring",
    desc: "Every account scored against your ideal customer profile using firmographic, technographic, and behavioral criteria. Your team sees a ranked list, not a raw data dump.",
    tag: "Score Layer",
  },
];

export const COMMITTEE_ROLES = [
  { icon: "Crown", title: "Economic Buyer", desc: "The executive who controls the budget and signs the final approval. Typically a VP, SVP, or C-suite leader with P and L responsibility." },
  { icon: "ShieldCheck", title: "Technical Evaluator", desc: "The person validating fit, security, and integration. Usually a director or senior manager in IT, engineering, or operations." },
  { icon: "Megaphone", title: "Champion", desc: "The internal advocate who wants the problem solved and is willing to sell on your behalf. Often a manager or director who will use the product daily." },
  { icon: "UserCheck", title: "End User", desc: "The team that will live in the product after purchase. Their adoption determines renewal and expansion." },
];

export const PROFILING_STATS: { value: number; suffix: string; label: string; desc: string; decimals?: number; chartValue: number }[] = [
  { value: 150, suffix: "M+", label: "Buyer Profiles", desc: "Technology buyer records continuously updated across every major vertical.", chartValue: 40 },
  { value: 98, suffix: "%", label: "Data Accuracy", desc: "Every profile validated for contact accuracy, employment status, and firmographic correctness.", chartValue: 25 },
  { value: 45, suffix: "+", label: "Data Points Per Account", desc: "Firmographic, technographic, people, signals, and timing data combined into one structured profile.", chartValue: 20 },
  { value: 72, suffix: "hr", label: "Profile Delivery", desc: "From account list to fully enriched profiles delivered to your team within 72 hours.", chartValue: 15 },
];

export const PROFILING_BENEFITS = [
  {
    icon: "Zap",
    outcome: "Outreach That Opens Doors",
    title: "Higher Response Rates",
    desc: "Personalized outreach built on real account intelligence consistently outperforms cold, generic sequences.",
  },
  {
    icon: "Clock",
    outcome: "Less Time Wasted on Bad Fits",
    title: "Faster Qualification",
    desc: "When reps already know the tech stack, the budget cycle, and the buying committee, discovery calls convert at a higher rate.",
  },
  {
    icon: "PieChart",
    outcome: "Every Rep Selling at Full Potential",
    title: "Shorter Ramp Time",
    desc: "New reps with structured account intelligence close their first deal weeks faster than those starting cold.",
  },
  {
    icon: "Handshake",
    outcome: "Land, Expand, Retain",
    title: "Account-Led Growth",
    desc: "Deep account knowledge does not stop at the first sale. It powers expansion conversations, renewal intelligence, and competitive defense.",
  },
];

export const BANT_CRITERIA = [
  {
    icon: "Wallet",
    letter: "B",
    criterion: "Budget",
    question: "Does this account have confirmed budget for a solution like yours?",
    whatTVGVerifies: "We confirm active budget allocation, fiscal year purchase windows, and historical spend patterns in your technology category before a lead is passed to your team.",
    whyItMatters: "A lead with no budget is a conversation, not an opportunity. Budget confirmation is the single most important filter between a productive pipeline and a time-consuming one.",
    color: "gold",
  },
  {
    icon: "UserCog",
    letter: "A",
    criterion: "Authority",
    question: "Are we talking to the person who can say yes?",
    whatTVGVerifies: "We map the full buying committee, identify the economic buyer, and confirm that the contact we deliver has direct purchasing authority or a verified path to the decision maker.",
    whyItMatters: "Selling to the wrong person is the most common reason deals stall. Authority verification ensures your reps spend their time with people who can actually move a deal forward.",
    color: "forest",
  },
  {
    icon: "AlertCircle",
    letter: "N",
    criterion: "Need",
    question: "Does this account have a real, active problem your solution solves?",
    whatTVGVerifies: "We use intent signals, content consumption patterns, and direct research to confirm that the account is actively experiencing the pain point your product addresses, not just browsing.",
    whyItMatters: "Need separates accounts who are genuinely in-market from those who are curious. Without confirmed need, even a well-funded, senior contact is the wrong person at the wrong time.",
    color: "gold",
  },
  {
    icon: "CalendarCheck",
    letter: "T",
    criterion: "Timeline",
    question: "Is this account ready to buy within a window your team can work with?",
    whatTVGVerifies: "We confirm active purchase timelines through direct outreach, trigger event analysis, and fiscal year mapping. Every lead we deliver is flagged with an estimated decision window.",
    whyItMatters: "Timeline is what converts a good fit into a live opportunity. An account that is 18 months away from a decision needs nurturing, not a sales call. We only deliver accounts that are ready now.",
    color: "forest",
  },
];

export const TVG_DELIVERY_STEPS = [
  {
    step: "01",
    icon: "Radar",
    title: "Intent Signal Detection",
    desc: "Our engine identifies accounts showing active buying behavior in your technology category across 150M+ buyer profiles.",
  },
  {
    step: "02",
    icon: "ScanSearch",
    title: "Account Profiling",
    desc: "We build a full firmographic, technographic, and buying-committee profile on every flagged account before BANT verification begins.",
  },
  {
    step: "03",
    icon: "ClipboardCheck",
    title: "BANT Verification",
    desc: "Our research team confirms Budget, Authority, Need, and Timeline through direct outreach, public signals, and proprietary data sources.",
  },
  {
    step: "04",
    icon: "Send",
    title: "Lead Delivered to Your CRM",
    desc: "A fully enriched, BANT-verified lead lands in your CRM with contact details, account intelligence, and a decision-window flag. Your rep opens it ready to close.",
  },
];

export const BANT_SCOREBOARD: { value: number; suffix: string; prefix?: string; label: string; desc: string; decimals?: number; accentColor: string }[] = [
  { value: 20, suffix: "K+", label: "BANT Leads Delivered", desc: "Verified leads delivered to B2B technology sales teams across every major vertical.", accentColor: "gold" },
  { value: 97, suffix: "%", label: "Client Retention", desc: "Clients renew because our leads actually convert into pipeline.", accentColor: "gold" },
  { value: 3, suffix: "x", label: "Higher Close Rate", desc: "BANT-qualified leads close at three times the rate of cold outreach lists on average.", accentColor: "gold" },
  { value: 1.2, suffix: "B+", prefix: "$", label: "Pipeline Influenced", desc: "Revenue pipeline directly influenced by BANT-qualified leads we have delivered.", decimals: 1, accentColor: "gold" },
];

export const BANT_ADVANTAGES = [
  {
    icon: "TrendingUp",
    title: "Your Reps Close, Not Prospect",
    desc: "When every lead entering the pipeline is already BANT-verified, your sales team spends its time on conversations that can close, not qualification calls that go nowhere.",
  },
  {
    icon: "ShieldCheck",
    title: "No More Bad Pipeline",
    desc: "Unqualified leads do not just waste time. They distort your forecast, demoralize your team, and hide the real conversion rate of your sales motion. BANT verification removes the noise.",
  },
  {
    icon: "Clock",
    title: "Shorter Sales Cycles",
    desc: "A lead that enters your pipeline pre-qualified moves through it faster. Discovery is shorter, objections are anticipated, and the path to close is cleaner.",
  },
];

export const CONTACT_SERVICES = [
  { value: "", label: "Select a service" },
  { value: "Intent Data", label: "Intent Data" },
  { value: "Account Profiling", label: "Account Profiling" },
  { value: "BANT Qualified Leads", label: "BANT Qualified Leads" },
  { value: "Lead Generation", label: "Lead Generation" },
  { value: "Email Marketing", label: "Email Marketing" },
  { value: "Whitepaper Promotion", label: "Whitepaper Promotion" },
  { value: "Market Research", label: "Market Research" },
  { value: "Staffing and Recruitment", label: "Staffing and Recruitment" },
];

export const CONTACT_STATS = [
  { value: "20K+", label: "Leads delivered" },
  { value: "97%", label: "Client retention" },
  { value: "$1.2B+", label: "Pipeline influenced" },
];

export const CONTACT_TRUST = [
  { icon: "Clock", text: "Reply within one business day" },
  { icon: "Lock", text: "Your details are never shared" },
  { icon: "ShieldCheck", text: "GDPR and CCPA compliant" },
];

export const FUNNEL_STATS = [
  { value: 111, suffix: "k+", label: "Intent Data", desc: "In-market buyer signals tracked monthly", decimals: 0 },
  { value: 27, suffix: "k+", label: "MQL", desc: "Marketing Qualified Leads delivered", decimals: 0 },
  { value: 20, suffix: "k+", label: "HQL", desc: "Highly Qualified Leads, intent-verified", decimals: 0 },
  { value: 15, suffix: "k+", label: "SQL", desc: "Sales Qualified Leads, sales-ready", decimals: 0 },
  { value: 22.7, suffix: "k+", label: "BANT", desc: "Budget, Authority, Need, Timeline qualified", decimals: 1 },
];

export const PARTNERS = [
  { name: "HubSpot", color: "#FF7A59", weight: 800 },
  { name: "Clutch", color: "#1B1B1B", weight: 700 },
  { name: "G2", color: "#FF492C", weight: 900, badge: true },
  { name: "TrustRadius", color: "#1B4F9B", weight: 600 },
  { name: "Envato", color: "#81B441", weight: 700 },
  { name: "Anywhere", color: "#444444", weight: 600 },
];

export const DELIVER = [
  {
    title: "Intent Data",
    stat: "111k+ signals/mo",
    desc: "Real-time buyer intent signals from companies actively researching solutions in your category. We surface in-market accounts before your competitors do, using first-party and third-party intent data sources.",
    tags: ["First-party data", "Third-party signals", "Real-time alerts"],
    href: "/services/intent-data",
  },
  {
    title: "Account Profiling",
    stat: "274k+ org profiles",
    desc: "Deep firmographic, technographic, and behavioural profiles on every target account. Know their tech stack, buying committee, budget cycles, and intent triggers before your first outreach.",
    tags: ["Firmographic data", "Technographic intel", "Buying committee maps"],
    href: "/services/account-profiling",
  },
  {
    title: "BANT Qualified Leads",
    stat: "22.7k+ per month",
    desc: "Every lead we deliver is pre-qualified across Budget, Authority, Need, and Timeline. No cold lists. Only verified decision-makers with confirmed purchase intent and active budget discussions.",
    tags: ["Budget confirmed", "Decision-maker verified", "Timeline established"],
    href: "/services/bant-qualified-leads",
  },
  {
    title: "Whitepaper Promotion",
    stat: "3.4x avg. lead lift",
    desc: "We syndicate your whitepapers, ebooks, and thought leadership content to our network of 150M+ technology buyers. Content-led demand generation that builds brand authority and fills your top-of-funnel pipeline.",
    tags: ["Content syndication", "Demand generation", "Brand authority"],
    href: "/services/whitepaper-promotion",
  },
];

export const SOLUTIONS = [
  { title: "Audience Intelligence", desc: "Identify and prioritize high-fit target accounts using firmographic, technographic, and behavioural data to build a precision ICP-matched pipeline." },
  { title: "Intent and Signal Targeting", desc: "Leverage real-time buyer intent signals to engage decision-makers at the exact moment they are actively researching solutions in your market." },
  { title: "Multi-Channel Engagement", desc: "Orchestrate personalised, multi-channel outreach campaigns across email, content, and digital channels that drive meaningful sales conversations." },
  { title: "Pipeline Acceleration", desc: "Convert marketing engagement into qualified sales pipeline with proven account nurture sequences, handoff workflows, and revenue attribution." },
  { title: "Measurement and Optimisation", desc: "Track campaign performance, attribute revenue to pipeline activities, and continuously optimise spend and targeting for maximum ROI." },
];

export const STEPS = [
  { num: 1, title: "Discover", desc: "We align on your Ideal Customer Profile, revenue goals, and success metrics to build a precision targeting strategy." },
  { num: 2, title: "Identify", desc: "We build and score high-fit account lists using intent data, firmographic filters, and buying-signal relevance scoring." },
  { num: 3, title: "Engage", desc: "We activate personalised multi-channel campaigns that reach the right decision-makers and drive qualified buyer interest." },
  { num: 4, title: "Accelerate", desc: "We deliver BANT-qualified opportunities and measurable sales pipeline impact with full revenue attribution reporting." },
];

export const BLOGS = [
  {
    category: "Intent Data",
    title: "How B2B Intent Data Identifies In-Market Technology Buyers Before Your Competitors Do",
    excerpt: "Intent data has fundamentally changed how technology companies prospect. Learn how to use first-party and third-party signals to reach buyers in their active research phase.",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #0D2E20 0%, #0F3D2E 100%)",
  },
  {
    category: "BANT Leads",
    title: "Why BANT Qualification Still Wins in 2026: A Data-Driven Guide for Enterprise Sales Teams",
    excerpt: "Budget, Authority, Need, Timeline. The four pillars of lead qualification that separate high-converting sales pipelines from wasted outreach. Here is how TrusVera delivers pre-verified BANT leads at scale.",
    date: "May 28, 2026",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #0D2E20 0%, #15503A 100%)",
  },
  {
    category: "Account Profiling",
    title: "The Complete Guide to Account-Based Marketing Profiling for Technology Companies",
    excerpt: "Deep account profiling goes beyond firmographics. Technographic intelligence, buying committee mapping, and budget cycle timing are the signals that turn cold accounts into pipeline.",
    date: "May 14, 2026",
    readTime: "10 min read",
    gradient: "linear-gradient(135deg, #081C13 0%, #0D2E20 100%)",
  },
];

export const COMPLIANCE = [
  { title: "Privacy First", desc: "TrusVera operates with the highest standards of data privacy and protection across all demand generation campaigns and data processing workflows.", stat: "ISO 27001 Aligned" },
  { title: "GDPR and CCPA Compliant", desc: "Global compliance frameworks including GDPR and CCPA are built into every data sourcing process, campaign workflow, and lead delivery pipeline.", stat: "100% Regulation Compliant" },
  { title: "Premium Data Sources", desc: "All buyer data is curated from 200+ trusted, enterprise-grade sources and continuously verified for accuracy, deliverability, and relevance.", stat: "200+ Verified Sources" },
  { title: "Real-Time Validation", desc: "Every contact and account in our database is continuously validated for accuracy, email deliverability, employment status, and buying intent signals.", stat: "Real-Time Refresh Cycle" },
];

export const RESOURCES = [
  {
    tag: "EBOOK",
    tagColor: "#C8973E",
    title: "The B2B Tech Marketer's Guide to Audience Intelligence and Intent Data",
    cta: "Get Now",
    href: "/contact?interest=Whitepaper+Promotion&source=ebook",
  },
  {
    tag: "WHITEPAPER",
    tagColor: "#6DD4A0",
    title: "Intent Data: The New Competitive Advantage for Enterprise Sales",
    cta: "Get Now",
    href: "/contact?interest=Whitepaper+Promotion&source=whitepaper",
  },
];

export const LEADGEN_CHANNELS = [
  {
    icon: "Mail",
    channel: "Email Outreach",
    tag: "Highest Volume",
    tagColor: "gold",
    desc: "Personalised multi-touch email sequences sent to verified, role-matched contacts. Every sequence is written specifically for your ICP, not repurposed from a generic template.",
    tvgApproach: "We write, test, and manage the sequences. You receive the replies.",
    metric: "3 to 7 touch sequence per contact",
  },
  {
    icon: "Linkedin",
    channel: "LinkedIn Outreach",
    tag: "Decision Maker Reach",
    tagColor: "gold",
    desc: "Connection requests, InMail, and follow-up messages targeted at senior buyers who are active on LinkedIn and match your buyer persona.",
    tvgApproach: "We run the outreach from a managed profile or your own, whichever you prefer.",
    metric: "Director to C-suite targeting",
  },
  {
    icon: "Phone",
    channel: "Phone and SDR Outreach",
    tag: "Fastest Qualification",
    tagColor: "forest",
    desc: "Direct phone outreach by trained SDRs who can qualify, handle objections, and book meetings in real time. Not a call centre. A dedicated team that knows your product.",
    tvgApproach: "SDRs are briefed on your product, your ICP, and your objection-handling playbook before the first call.",
    metric: "Dedicated SDR per campaign",
  },
  {
    icon: "FileText",
    channel: "Content Syndication",
    tag: "Top of Funnel",
    tagColor: "forest",
    desc: "Your whitepapers, reports, and guides distributed across our publisher network to capture leads who are actively researching your category of solution.",
    tvgApproach: "We match your content to the right audience segment and gate it behind a lead capture form on partner properties.",
    metric: "150M+ buyer profile reach",
  },
];

export const BAD_LEADGEN_COSTS = [
  {
    icon: "TrendingDown",
    problem: "Wasted Sales Hours",
    desc: "The average B2B sales rep spends 40 percent of their time on prospecting that goes nowhere. That is two days every week not spent closing.",
  },
  {
    icon: "AlertTriangle",
    problem: "Distorted Pipeline",
    desc: "When bad leads enter the CRM, your forecast becomes unreliable. Quota calculations break. Management loses confidence in the numbers.",
  },
  {
    icon: "UserX",
    problem: "Rep Attrition",
    desc: "Nothing demoralizes a sales team faster than a pipeline full of contacts who will never buy. Bad leads drive good reps out the door.",
  },
  {
    icon: "DollarSign",
    problem: "Budget Burn",
    desc: "Every unqualified lead you pay for and then discard is direct cost with no return. The real cost of bad lead generation is three times the price of the list.",
  },
];

export const CAMPAIGN_TIMELINE = [
  {
    phase: "Week 1",
    title: "Campaign Setup",
    color: "gold",
    items: [
      "ICP and buyer persona alignment",
      "Channel mix selection",
      "Messaging and sequence writing",
      "Contact list build and verification",
    ],
  },
  {
    phase: "Weeks 2 to 3",
    title: "Campaign Launch",
    color: "gold",
    items: [
      "Outreach sequences activated",
      "First replies and meetings booked",
      "A and B message variant testing",
      "Daily reply monitoring and handling",
    ],
  },
  {
    phase: "Week 4 and Beyond",
    title: "Optimise and Scale",
    color: "gold",
    items: [
      "Conversion data reviewed",
      "Best-performing sequences scaled",
      "Underperforming channels adjusted",
      "Weekly pipeline report delivered to you",
    ],
  },
];

export const LEADGEN_RESULTS = [
  {
    value: 150,
    suffix: "M+",
    label: "Buyer Profiles",
    desc: "Verified technology buyer records we draw from to build every campaign contact list.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Contact Accuracy",
    desc: "Every contact verified for email deliverability and employment status before the first outreach.",
  },
  {
    value: 3,
    suffix: "x",
    label: "Average Reply Rate Uplift",
    desc: "Personalised, ICP-matched outreach consistently outperforms generic cold sequences.",
  },
  {
    value: 72,
    suffix: "hr",
    label: "First Lead Delivered",
    desc: "From campaign kickoff to first qualified lead in your CRM, typically within 72 hours.",
  },
];

export const EMAIL_ANATOMY_LAYERS = [
  {
    icon: "Zap",
    layer: "Subject Line",
    number: "01",
    desc: "The only thing standing between your email and the delete key. We write and A/B test subject lines built around the recipient's role, pain point, and current buying context, not generic curiosity gaps.",
    metric: "Open rate impact: up to 47%",
  },
  {
    icon: "User",
    layer: "Personalisation",
    number: "02",
    desc: "First name is a minimum, not a strategy. Every TVG email references the recipient's company, role, technology stack, or a recent trigger event to signal that this message was written for them specifically.",
    metric: "Reply rate uplift: 3x vs generic",
  },
  {
    icon: "Clock",
    layer: "Send Timing",
    number: "03",
    desc: "Day of week, time of day, and sequence spacing all affect whether your email lands in an active inbox or gets buried. We test and optimise timing per segment, not per campaign.",
    metric: "Optimal window: Tuesday to Thursday 9am to 11am",
  },
  {
    icon: "MousePointerClick",
    layer: "Call to Action",
    number: "04",
    desc: "A strong CTA does one thing and asks for one thing. We write CTAs sized to the stage of the relationship: low-friction for cold outreach, higher-commitment for warm nurture sequences.",
    metric: "Single CTA outperforms multi-CTA by 42%",
  },
];

export const EMAIL_SEQUENCE_TYPES = [
  {
    type: "Cold Outreach",
    icon: "Send",
    tag: "Top of Funnel",
    tagColor: "gold",
    purpose: "Reach verified decision-makers who match your ICP but have never engaged with your brand. The goal is a reply, not a purchase.",
    steps: [
      { day: "Day 1", action: "Personalised intro email, single CTA, under 120 words" },
      { day: "Day 4", action: "Follow-up referencing the first email, different angle" },
      { day: "Day 8", action: "Value-add email: insight, stat, or relevant case study" },
      { day: "Day 14", action: "Soft breakup email, low pressure, high reply rate" },
    ],
    result: "Typically generates 60 to 80 percent of all new replies in a campaign",
  },
  {
    type: "Nurture Sequence",
    icon: "TrendingUp",
    tag: "Mid Funnel",
    tagColor: "forest",
    purpose: "Move contacts who have engaged once but not converted. Builds familiarity, trust, and product understanding over a longer window.",
    steps: [
      { day: "Week 1", action: "Educational content relevant to their role and pain point" },
      { day: "Week 2", action: "Customer story or use case aligned to their industry" },
      { day: "Week 3", action: "Feature or capability spotlight tied to a specific problem" },
      { day: "Week 4", action: "Direct meeting or demo invitation with clear value proposition" },
    ],
    result: "Converts 2 to 3 times more contacts than a single cold sequence alone",
  },
  {
    type: "Re-engagement",
    icon: "RefreshCw",
    tag: "Dormant Contacts",
    tagColor: "gold",
    purpose: "Re-activate contacts who went cold after an initial conversation. Often the highest-converting sequence because they already know who you are.",
    steps: [
      { day: "Touch 1", action: "Acknowledge the gap, reference the last conversation" },
      { day: "Touch 2", action: "New angle: what has changed at TVG or in the market" },
      { day: "Touch 3", action: "Final value offer: resource, insight, or limited-time conversation slot" },
    ],
    result: "Re-engages 15 to 25 percent of dormant contacts within 30 days",
  },
];

export const EMAIL_DELIVERABILITY = [
  {
    icon: "ShieldCheck",
    title: "Domain Reputation Management",
    desc: "Your sending domain's reputation determines whether your emails land in the inbox or the spam folder. We monitor your domain health, sender score, and blacklist status continuously and act before problems affect deliverability.",
  },
  {
    icon: "ListFilter",
    title: "List Hygiene",
    desc: "Sending to invalid, outdated, or unengaged contacts damages your reputation and wastes budget. Every TVG campaign list is validated for email deliverability, employment status, and engagement history before a single send.",
  },
  {
    icon: "ChartBar",
    title: "Inbox Placement Testing",
    desc: "We test every campaign across major email clients (Gmail, Outlook, Apple Mail) and corporate spam filters before sending. What looks fine in your preview may be flagged as spam on your recipient's mail server.",
  },
  {
    icon: "Settings",
    title: "Technical Configuration",
    desc: "SPF, DKIM, and DMARC records correctly configured are non-negotiable for modern email deliverability. We audit and set up every technical requirement before campaign launch so your emails are authenticated from day one.",
  },
];

export const EMAIL_STATS = [
  {
    value: "42%",
    label: "Average open rate",
    context: "Across TVG-managed B2B email campaigns",
  },
  {
    value: "98%",
    label: "Inbox placement rate",
    context: "Maintained through active deliverability management",
  },
  {
    value: "3x",
    label: "Reply rate vs industry average",
    context: "Result of ICP-matched personalisation at scale",
  },
  {
    value: "72hr",
    label: "Campaign launch time",
    context: "From brief to first send, for a standard outreach sequence",
  },
];

export const RESEARCH_QUESTIONS = [
  {
    number: "01",
    question: "Where exactly is my opportunity and how large is it really?",
    answer: "Most TAM estimates are pulled from industry reports written for a different audience with different criteria. TrusVera Group builds TAM sizing from the account level up: actual companies that match your ICP, filtered by geography, vertical, headcount, and technology profile. The output is not a number. It is a prioritised account list you can act on the same week.",
    service: "Feeds into Intent Data targeting",
    icon: "Map",
  },
  {
    number: "02",
    question: "Who is my ideal customer and what does their buying journey actually look like?",
    answer: "An ICP built from assumptions ages out in six months. An ICP built from real conversion data, intent signal patterns, and buyer behaviour analysis stays accurate. We analyse your best-fit accounts, identify the firmographic and technographic characteristics they share, and map the buying journey from first signal to closed deal so every downstream campaign is aimed at the right target.",
    service: "Feeds into Lead Generation targeting",
    icon: "Target",
  },
  {
    number: "03",
    question: "What are my competitors doing and where are the gaps I can win in?",
    answer: "Competitive positioning is not about monitoring your competitors' websites. It is about understanding how buyers perceive the category, what language they use to describe the problem, what objections they raise, and where existing vendors are falling short. We map the competitive landscape from the buyer's perspective, not the vendor's, and identify the specific positioning gaps your message can own.",
    service: "Feeds into Email Marketing messaging",
    icon: "Crosshair",
  },
  {
    number: "04",
    question: "Why am I winning deals and why am I losing them?",
    answer: "Win/loss analysis done correctly is the highest-ROI research a sales organisation can commission. We analyse patterns across won and lost opportunities in your market category, identify the systemic factors driving each outcome, and deliver a clear set of recommendations your sales and marketing teams can act on in the next campaign cycle.",
    service: "Feeds into BANT qualification criteria",
    icon: "ChartBar",
  },
  {
    number: "05",
    question: "Which technology trends are creating new buying urgency right now?",
    answer: "Technology adoption cycles create buying windows. A company moving from on-premise to cloud, replacing a legacy CRM, or adopting a new data infrastructure is in an active evaluation posture across multiple adjacent categories. We track adoption trends at the account level across our 150M+ buyer profile database and surface the segments where buying urgency is highest right now.",
    service: "Feeds into Account Profiling triggers",
    icon: "TrendingUp",
  },
  {
    number: "06",
    question: "What do my buyers actually care about and how should I be talking to them?",
    answer: "Buyer persona research built from job descriptions and LinkedIn profiles tells you what people say they do. Research built from content consumption patterns, intent signals, and direct engagement tells you what they actually care about. We build persona profiles from real behavioural data so your messaging speaks to the problems buyers are actively trying to solve, not the ones you assume they have.",
    service: "Feeds into all outreach messaging",
    icon: "Users",
  },
];

export const RESEARCH_DELIVERABLES = [
  {
    icon: "FileText",
    name: "TAM Account List",
    desc: "A scored, prioritised list of every company in your addressable market that meets your ICP criteria, filtered by geography, vertical, headcount, and technology profile. Not a number. An actionable list.",
    enables: "Intent Data targeting and Lead Generation contact build",
  },
  {
    icon: "Compass",
    name: "ICP Framework Document",
    desc: "A structured definition of your ideal customer profile built from real conversion data and intent signal analysis. Covers firmographic fit, technographic signals, buying committee structure, and trigger events.",
    enables: "All outreach campaign targeting and qualification criteria",
  },
  {
    icon: "Map",
    name: "Competitive Positioning Map",
    desc: "A visual and narrative map of the competitive landscape from the buyer's perspective. Covers how buyers perceive the category, where existing vendors fall short, and the specific positioning gaps your message can own.",
    enables: "Email marketing messaging and sales objection handling",
  },
  {
    icon: "Users",
    name: "Buyer Persona Profiles",
    desc: "Role-by-role profiles of every stakeholder in the buying committee: their priorities, their objections, their content consumption patterns, and the language they use to describe the problem your solution solves.",
    enables: "Personalised outreach sequences and content strategy",
  },
  {
    icon: "Activity",
    name: "Technology Adoption Report",
    desc: "An account-level view of technology adoption trends in your target market. Which tools are being adopted, which are being replaced, and which segments are in the highest buying urgency right now.",
    enables: "Account Profiling technographic targeting",
  },
  {
    icon: "TrendingUp",
    name: "Win/Loss Pattern Analysis",
    desc: "A structured analysis of the systemic factors driving wins and losses in your market category, with specific recommendations for sales positioning, qualification criteria, and campaign targeting.",
    enables: "BANT qualification refinement and sales playbook",
  },
];

export const RESEARCH_WHO = [
  {
    icon: "Globe",
    role: "CRO Entering a New Market",
    scenario: "You are expanding into a new vertical or geography and need to understand the opportunity size, the buyer landscape, and the competitive dynamics before committing budget to execution.",
  },
  {
    icon: "RefreshCw",
    role: "VP Marketing Rebuilding ICP",
    scenario: "Your current ICP was defined two years ago and conversion rates are slipping. You need a fresh, data-driven definition of who actually buys and why before the next campaign cycle begins.",
  },
  {
    icon: "Rocket",
    role: "Founder Preparing GTM",
    scenario: "You are preparing a go-to-market strategy for a new product or a Series A raise and need credible, account-level market sizing and competitive positioning to underpin your plan.",
  },
  {
    icon: "ChartBar",
    role: "Sales Leader Diagnosing Win Rate",
    scenario: "Your win rate has dropped and you need to understand whether the problem is the target, the message, the qualification criteria, or the competitive positioning before you can fix it.",
  },
];

export const RESEARCH_PROCESS = [
  {
    phase: "Phase 01",
    title: "Brief and Scope",
    duration: "Week 1",
    icon: "ClipboardList",
    color: "gold",
    steps: [
      "Discovery session with your team to define research objectives",
      "Market and vertical scope confirmation",
      "Deliverable set agreed and timeline locked",
      "Research methodology and data sources confirmed",
    ],
  },
  {
    phase: "Phase 02",
    title: "Research and Analysis",
    duration: "Weeks 2 to 4",
    icon: "Search",
    color: "gold",
    steps: [
      "Account-level TAM build from our 150M+ buyer database",
      "Intent signal and behavioural data analysis",
      "Competitive landscape and positioning research",
      "Buyer persona and win/loss pattern analysis",
    ],
  },
  {
    phase: "Phase 03",
    title: "Delivery and Activation",
    duration: "Week 5",
    icon: "Send",
    color: "gold",
    steps: [
      "Full deliverable set presented to your team",
      "Findings walkthrough with actionable recommendations",
      "Handoff to TVG execution services where applicable",
      "30-day follow-up to review activation results",
    ],
  },
];

export const CONTACT_NEXT_STEPS = [
  {
    step: "01",
    icon: "FileSearch",
    title: "We Review Your Brief",
    desc: "A senior member of our team reads every submission personally. We assess your pipeline challenge, your target market, and which TVG services are the right fit before we respond.",
  },
  {
    step: "02",
    icon: "Calendar",
    title: "We Schedule a Discovery Call",
    desc: "Within one business day we send you a calendar link to book a 30-minute discovery call. No pitch deck. A real conversation about your pipeline goals.",
  },
  {
    step: "03",
    icon: "FileText",
    title: "We Propose an Engagement",
    desc: "After the discovery call we prepare a tailored proposal covering the recommended services, timeline, and commercial terms. Most proposals are delivered within 48 hours of the call.",
  },
];

export const CONTACT_REACH = [
  {
    icon: "Mail",
    label: "Email Us Directly",
    value: "info@trusveragroup.com",
    href: "mailto:info@trusveragroup.com",
    desc: "For general inquiries, partnership discussions, or press.",
  },
  {
    icon: "Linkedin",
    label: "Connect on LinkedIn",
    value: "TrusVera Group",
    href: "https://www.linkedin.com/company/trusveragroup",
    desc: "Follow us for demand generation insights and company updates.",
  },
  {
    icon: "Phone",
    label: "Call Our Team",
    value: "+1 504 541 5406",
    href: "tel:+15045415406",
    desc: "Available Monday to Friday during business hours.",
  },
];

export const CONTACT_OFFICES = [
  {
    city: "Pune",
    country: "India",
    flag: "IN",
    address: "Kasarwadi, PCMC, Pune - 411034",
    phone: "+1 504 541 5406",
    timezone: "Asia/Kolkata",
    tzLabel: "IST",
    mapX: 67,
    mapY: 52,
  },
];

export const CONTACT_FAQ = [
  {
    question: "How quickly can TrusVera Group start a campaign?",
    answer: "Most campaigns launch within five business days of brief confirmation. For BANT-qualified lead programs, the first leads typically arrive within 72 hours of campaign launch. Market research engagements begin within five business days and deliver the first preview at the end of Week 2.",
  },
  {
    question: "Do you work with companies outside the United States?",
    answer: "Yes. TrusVera Group works with B2B technology companies globally. Our buyer database covers technology decision-makers across North America, Europe, APAC, and the Middle East. All campaigns are GDPR and CCPA compliant regardless of geography.",
  },
  {
    question: "What is the minimum engagement size?",
    answer: "We do not publish fixed minimums because engagement scope varies significantly by service and objective. The best way to understand what an engagement looks like for your specific situation is a 30-minute discovery call, which is free and carries no obligation.",
  },
  {
    question: "Do you offer a pilot or trial program?",
    answer: "Yes. For lead generation and BANT-qualified lead programs, we offer a pilot engagement that lets you evaluate the quality of our output before committing to a full campaign. Speak to our team about pilot options during your discovery call.",
  },
];

export const CONTACT_TRUST_SIGNALS = [
  { icon: "ShieldCheck", text: "GDPR and CCPA compliant across every engagement" },
  { icon: "UserCheck", text: "Dedicated account manager from day one" },
  { icon: "Database", text: "150M+ verified technology buyer profiles" },
  { icon: "Clock", text: "Response within one business day, guaranteed" },
];

export const WHITEPAPER_CHANNELS = [
  {
    icon: "Globe",
    channel: "Publisher Network Distribution",
    tag: "Widest Reach",
    tagColor: "gold",
    desc: "Your whitepaper distributed across our network of B2B technology publisher properties, industry newsletters, and content aggregators. Every placement is targeted to the vertical and buyer role your content was written for.",
    tvgApproach: "We match your content topic to publisher audiences with the highest concentration of your ICP before a single placement goes live.",
    metric: "150M+ buyer profile reach",
  },
  {
    icon: "Mail",
    channel: "Email to Intent-Matched Contacts",
    tag: "Highest Quality Leads",
    tagColor: "gold",
    desc: "Your whitepaper promoted directly via email to contacts from our verified buyer database who are actively researching your content category right now. Intent-matched distribution converts at three to five times the rate of broad syndication.",
    tvgApproach: "Every contact on the email distribution list is verified, role-matched to your ICP, and flagged as showing active intent in your category.",
    metric: "Intent-matched targeting",
  },
  {
    icon: "Linkedin",
    channel: "LinkedIn Sponsored Distribution",
    tag: "Decision Maker Reach",
    tagColor: "forest",
    desc: "Sponsored content and document ads targeting senior technology buyers on LinkedIn by job title, seniority, company size, and industry. Your whitepaper reaches the people who make the decisions, not just the people who read about them.",
    tvgApproach: "We manage the campaign setup, audience targeting, budget allocation, and creative optimisation across the campaign lifecycle.",
    metric: "Director to C-suite targeting",
  },
  {
    icon: "BarChart2",
    channel: "Programmatic Content Promotion",
    tag: "Always On",
    tagColor: "forest",
    desc: "Programmatic display and native advertising that promotes your whitepaper to in-market buyers across the web based on behavioral and firmographic targeting signals. Runs continuously alongside other channels to maximise total reach.",
    tvgApproach: "We set up, manage, and optimise the programmatic layer so your content stays in front of buyers throughout their research cycle.",
    metric: "Continuous campaign optimisation",
  },
];

export const WHITEPAPER_DELIVERABLES = [
  {
    icon: "Users",
    name: "Verified Lead List",
    desc: "Every person who downloaded your whitepaper, delivered with full contact details: first name, last name, work email, job title, company name, and LinkedIn profile. All contacts verified before delivery.",
    format: "CSV and CRM-ready format",
  },
  {
    icon: "BarChart2",
    name: "Download Analytics Report",
    desc: "A full breakdown of campaign performance: total downloads, downloads by channel, downloads by day, top-performing placements, and audience engagement metrics. Delivered weekly during the campaign.",
    format: "Weekly PDF report",
  },
  {
    icon: "Building2",
    name: "Account-Level Engagement Data",
    desc: "Which companies downloaded your content, how many contacts from each company engaged, and which accounts showed the highest engagement level. Feeds directly into account-based targeting.",
    format: "Account list with engagement scores",
  },
  {
    icon: "Target",
    name: "ICP-Matched Lead Scoring",
    desc: "Every lead scored against your ideal customer profile using firmographic and engagement data. Your sales team receives a prioritised list, not a flat download log.",
    format: "Scored and ranked lead list",
  },
];

export const WHITEPAPER_STATS = [
  {
    value: "150",
    suffix: "M+",
    label: "Buyer Profiles",
    context: "Technology buyer records we target whitepaper campaigns against",
  },
  {
    value: "3",
    suffix: "x",
    label: "Higher Conversion",
    context: "Intent-matched distribution vs broad content syndication",
  },
  {
    value: "98",
    suffix: "%",
    label: "Contact Accuracy",
    context: "Every lead contact verified before delivery to your team",
  },
  {
    value: "72",
    suffix: "hr",
    label: "Campaign Launch",
    context: "From content submission to first leads arriving in your CRM",
  },
];

export const WHITEPAPER_QUALITY_POINTS = [
  {
    icon: "ShieldCheck",
    title: "Intent-Matched Distribution",
    desc: "We only promote your whitepaper to contacts who are actively researching your content category. Not everyone who fits your ICP on paper. Only those currently in-market.",
  },
  {
    icon: "UserCheck",
    title: "Verified Contact Data",
    desc: "Every lead captured from a whitepaper download is verified for email deliverability, employment status, and role accuracy before it is included in your delivery. No ghost inboxes. No outdated job titles.",
  },
  {
    icon: "Filter",
    title: "BANT Pre-Screening on Request",
    desc: "For high-value content campaigns, we offer BANT pre-screening on every lead: confirming that the downloader has budget, authority, active need, and a timeline before handing the contact to your sales team.",
  },
  {
    icon: "BarChart2",
    title: "Real-Time Performance Monitoring",
    desc: "Every campaign is monitored in real time for download rate, lead quality, and channel performance. Underperforming placements are replaced. High-performing channels receive additional budget automatically.",
  },
];
