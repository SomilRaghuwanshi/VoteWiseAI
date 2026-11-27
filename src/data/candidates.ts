export interface CandidateProfile {
  id: string;
  name: string;
  initials: string;
  party: string;
  partyShort: string;
  constituency: string;
  state: string;
  age: number;
  education: string;
  netAssetsMillions: number;
  liabilitiesMillions: number;
  criminalCases: number;
  seriousCases: number;
  attendanceRate: number;
  affidavitScore: number;
  assetGrowthPct: number;
  termsServed: number;
  accentGradient: string;
  aiSummary: string;
  keyHighlights: string[];
  assetHistory: { year: string; value: number }[];
  electionHistory: {
    year: string;
    constituency: string;
    result: "Won" | "Runner-up";
    voteShare: string;
  }[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName:
    | "Sparkles"
    | "Search"
    | "FileText"
    | "ShieldAlert"
    | "BarChart3"
    | "History";
  accent: string;
}

export interface PlatformStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  sublabel: string;
}

/**
 * Placeholder candidate records representing structured public election affidavit data.
 * Purely static frontend sample data (no backend or external API calls).
 */
export const CANDIDATES: CandidateProfile[] = [
  {
    id: "ananya-deshmukh",
    name: "Ananya Deshmukh",
    initials: "AD",
    party: "Civic Progress Alliance",
    partyShort: "CPA",
    constituency: "Mumbai North Central",
    state: "Maharashtra",
    age: 44,
    education: "M.P.P., Public Policy",
    netAssetsMillions: 2.8,
    liabilitiesMillions: 0.3,
    criminalCases: 0,
    seriousCases: 0,
    attendanceRate: 94,
    affidavitScore: 98,
    assetGrowthPct: 18,
    termsServed: 2,
    accentGradient: "from-indigo-500 to-cyan-400",
    aiSummary:
      "Clean judicial record across two filing cycles with consistent liquid-to-fixed asset ratios and full tax schedule disclosures.",
    keyHighlights: [
      "Zero pending criminal or civil proceedings in 2019 & 2024 filings",
      "Asset growth (+18%) closely tracks declared parliamentary salary & investments",
      "94% legislative attendance with 38 committee participation records",
    ],
    assetHistory: [
      { year: "2014", value: 1.6 },
      { year: "2019", value: 2.3 },
      { year: "2024", value: 2.8 },
    ],
    electionHistory: [
      {
        year: "2024",
        constituency: "Mumbai North Central",
        result: "Won",
        voteShare: "51.4%",
      },
      {
        year: "2019",
        constituency: "Mumbai North Central",
        result: "Won",
        voteShare: "48.7%",
      },
    ],
  },
  {
    id: "rohan-malhotra",
    name: "Rohan Malhotra",
    initials: "RM",
    party: "National Reform Front",
    partyShort: "NRF",
    constituency: "Mumbai North Central",
    state: "Maharashtra",
    age: 52,
    education: "B.Tech, Mechanical Engineering",
    netAssetsMillions: 9.4,
    liabilitiesMillions: 2.1,
    criminalCases: 2,
    seriousCases: 0,
    attendanceRate: 79,
    affidavitScore: 84,
    assetGrowthPct: 64,
    termsServed: 1,
    accentGradient: "from-violet-500 to-fuchsia-400",
    aiSummary:
      "Substantial real-estate holdings account for 71% of declared net worth; two minor municipal protest cases pending from 2021.",
    keyHighlights: [
      "64% net asset appreciation between 2019 and 2024 affidavit declarations",
      "2 non-serious public assembly cases pending; zero convictions",
      "$2.1M declared commercial credit facilities with scheduled banks",
    ],
    assetHistory: [
      { year: "2014", value: 3.9 },
      { year: "2019", value: 5.7 },
      { year: "2024", value: 9.4 },
    ],
    electionHistory: [
      {
        year: "2024",
        constituency: "Mumbai North Central",
        result: "Runner-up",
        voteShare: "43.2%",
      },
      {
        year: "2019",
        constituency: "Thane Urban",
        result: "Won",
        voteShare: "49.1%",
      },
    ],
  },
  {
    id: "meera-krishnan",
    name: "Meera Krishnan",
    initials: "MK",
    party: "Democratic Future Party",
    partyShort: "DFP",
    constituency: "Bengaluru South",
    state: "Karnataka",
    age: 39,
    education: "LL.M., Constitutional Law",
    netAssetsMillions: 1.4,
    liabilitiesMillions: 0.1,
    criminalCases: 0,
    seriousCases: 0,
    attendanceRate: 96,
    affidavitScore: 99,
    assetGrowthPct: 12,
    termsServed: 1,
    accentGradient: "from-blue-500 to-indigo-400",
    aiSummary:
      "Highest affidavit transparency score in constituency; minimal debt exposure and itemized municipal disclosures.",
    keyHighlights: [
      "99/100 AI affidavit verification completeness score",
      "Zero pending cases and zero overdue public utility dues",
      "Top quartile attendance & private member bill filings",
    ],
    assetHistory: [
      { year: "2014", value: 0.9 },
      { year: "2019", value: 1.2 },
      { year: "2024", value: 1.4 },
    ],
    electionHistory: [
      {
        year: "2024",
        constituency: "Bengaluru South",
        result: "Won",
        voteShare: "54.8%",
      },
    ],
  },
  {
    id: "vikramaditya-rao",
    name: "Vikramaditya Rao",
    initials: "VR",
    party: "United Janata Coalition",
    partyShort: "UJC",
    constituency: "Hyderabad Central",
    state: "Telangana",
    age: 57,
    education: "MBA, Finance",
    netAssetsMillions: 14.2,
    liabilitiesMillions: 3.6,
    criminalCases: 3,
    seriousCases: 1,
    attendanceRate: 71,
    affidavitScore: 76,
    assetGrowthPct: 92,
    termsServed: 3,
    accentGradient: "from-sky-500 to-violet-500",
    aiSummary:
      "Three-term incumbent with rapid asset expansion (+92% over 5 years) and one serious charge-sheeted regulatory dispute.",
    keyHighlights: [
      "1 serious IPC section flagged in 2024 Form-26 judicial annexure",
      "3.6M declared liabilities across corporate guarantees",
      "3 consecutive terms representing Hyderabad Central",
    ],
    assetHistory: [
      { year: "2014", value: 4.1 },
      { year: "2019", value: 7.4 },
      { year: "2024", value: 14.2 },
    ],
    electionHistory: [
      {
        year: "2024",
        constituency: "Hyderabad Central",
        result: "Won",
        voteShare: "46.5%",
      },
      {
        year: "2019",
        constituency: "Hyderabad Central",
        result: "Won",
        voteShare: "47.9%",
      },
      {
        year: "2014",
        constituency: "Hyderabad Central",
        result: "Won",
        voteShare: "44.2%",
      },
    ],
  },
];

export const FEATURES: FeatureItem[] = [
  {
    id: "ai-comparison",
    title: "AI Comparison",
    description:
      "Side-by-side synthesis of two or more candidates across net worth, pending cases, education, and voting attendance.",
    tag: "Multi-Entity Diff",
    iconName: "Sparkles",
    accent: "from-indigo-500/20 to-violet-500/20 text-indigo-300",
  },
  {
    id: "smart-search",
    title: "Smart Search",
    description:
      "Natural-language query engine across candidate names, constituencies, party affiliations, and affidavit clauses.",
    tag: "Semantic Index",
    iconName: "Search",
    accent: "from-blue-500/20 to-cyan-500/20 text-cyan-300",
  },
  {
    id: "affidavit-analysis",
    title: "Affidavit Analysis",
    description:
      "Structured extraction from dense scanned Form-26 PDFs into verified, citation-backed civic intelligence.",
    tag: "Document AI",
    iconName: "FileText",
    accent: "from-violet-500/20 to-purple-500/20 text-violet-300",
  },
  {
    id: "criminal-record-insights",
    title: "Criminal Record Insights",
    description:
      "Clear categorization of pending charges, IPC sections, and case timelines without sensationalism or partisan spin.",
    tag: "Judicial Clarity",
    iconName: "ShieldAlert",
    accent: "from-amber-500/20 to-rose-500/20 text-amber-300",
  },
  {
    id: "asset-visualization",
    title: "Asset Visualization",
    description:
      "Interactive breakdowns of movable, immovable, and liability declarations tracked across multiple election cycles.",
    tag: "Wealth Delta",
    iconName: "BarChart3",
    accent: "from-emerald-500/20 to-teal-500/20 text-emerald-300",
  },
  {
    id: "election-history",
    title: "Election History",
    description:
      "Longitudinal record of past constituencies, party switches, vote share margins, and legislative participation.",
    tag: "Timeline View",
    iconName: "History",
    accent: "from-sky-500/20 to-indigo-500/20 text-sky-300",
  },
];

export const PLATFORM_STATS: PlatformStat[] = [
  {
    id: "candidates",
    label: "Candidates",
    value: 14820,
    suffix: "+",
    sublabel: "Indexed civic profiles",
  },
  {
    id: "constituencies",
    label: "Constituencies",
    value: 543,
    suffix: "",
    sublabel: "National & state districts",
  },
  {
    id: "affidavits",
    label: "Affidavits",
    value: 38400,
    suffix: "+",
    sublabel: "Parsed public filings",
  },
  {
    id: "comparisons",
    label: "Comparisons",
    value: 126500,
    suffix: "+",
    sublabel: "AI side-by-side briefs",
  },
];

export const SEARCH_SUGGESTIONS = [
  "Ananya Deshmukh",
  "Mumbai North Central",
  "Bengaluru South",
  "Zero criminal record",
  "Civic Progress Alliance",
];

