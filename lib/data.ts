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
          "Account Profiling",
          "BANT Qualified Leads",
          "Lead Generation",
          "Email Marketing",
        ],
      },
      { group: "More Services", items: ["Market Research", "Staffing and Recruitment", "Whitepaper Promotion"] },
    ],
  },
  { label: "Publishing", dropdown: [{ group: "", items: ["Case Studies", "Whitepapers", "Ebooks", "Webinars"] }] },
  { label: "Case Study", href: "#casestudy" },
  { label: "Blogs", href: "#blogs" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
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
  },
  {
    title: "Account Profiling",
    stat: "274k+ org profiles",
    desc: "Deep firmographic, technographic, and behavioural profiles on every target account. Know their tech stack, buying committee, budget cycles, and intent triggers before your first outreach.",
    tags: ["Firmographic data", "Technographic intel", "Buying committee maps"],
  },
  {
    title: "BANT Qualified Leads",
    stat: "22.7k+ per month",
    desc: "Every lead we deliver is pre-qualified across Budget, Authority, Need, and Timeline. No cold lists. Only verified decision-makers with confirmed purchase intent and active budget discussions.",
    tags: ["Budget confirmed", "Decision-maker verified", "Timeline established"],
  },
  {
    title: "Whitepaper Promotion",
    stat: "3.4x avg. lead lift",
    desc: "We syndicate your whitepapers, ebooks, and thought leadership content to our network of 150M+ technology buyers. Content-led demand generation that builds brand authority and fills your top-of-funnel pipeline.",
    tags: ["Content syndication", "Demand generation", "Brand authority"],
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
  { tag: "EBOOK", tagColor: "#C8973E", title: "The B2B Tech Marketer's Guide to Audience Intelligence and Intent Data", cta: "Download Now" },
  { tag: "WHITEPAPER", tagColor: "#6DD4A0", title: "Intent Data: The New Competitive Advantage for Enterprise Sales", cta: "Download Now" },
  { tag: "WEBINAR", tagColor: "#8DC4FF", title: "Driving Pipeline with Smarter Account Targeting and BANT Qualification", cta: "Watch On-Demand" },
  { tag: "BLOG", tagColor: "#A8E6CF", title: "5 Ways to Improve Pipeline Quality with Better Buyer Intent Data", cta: "Read Article" },
];
