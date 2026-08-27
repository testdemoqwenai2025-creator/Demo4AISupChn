const { Document, Packer, Paragraph, TextRun, Footer, AlignmentType, HeadingLevel, PageNumber, BorderStyle, Table, TableRow, TableCell, WidthType } = require("docx");
const fs = require("fs");

const P = { primary: "#1a365d", body: "#2d3748", secondary: "#4a5568", accent: "#3182ce", surface: "#f7fafc" };
const c = (hex) => hex.replace("#", "");

function heading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text: text, bold: true, color: c(P.primary), font: "Calibri", size: 32 })]
  });
}

function subheading(text) {
  return new Paragraph({
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text: text, bold: true, color: c(P.accent), font: "Calibri", size: 28 })]
  });
}

function subsubheading(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text: text, bold: true, color: c(P.secondary), font: "Calibri", size: 24 })]
  });
}

function bodyPara(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 312, after: 120 },
    children: [new TextRun({ text: text, size: 22, color: c(P.body), font: "Calibri" })]
  });
}

function bulletPoint(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: { left: 720 },
    children: [
      new TextRun({ text: "\u2022 ", size: 22, color: c(P.accent) }),
      new TextRun({ text: text, size: 22, color: c(P.body) })
    ]
  });
}

function sourceItem(name, description, url, focus) {
  const elements = [];
  
  elements.push(new Paragraph({
    spacing: { before: 160, after: 40 },
    children: [
      new TextRun({ text: name, bold: true, size: 24, color: c(P.primary) }),
      new TextRun({ text: focus ? "  |  " + focus : "", size: 20, italics: true, color: c(P.secondary) })
    ]
  }));
  
  if (description) {
    elements.push(new Paragraph({
      spacing: { after: 40 },
      indent: { left: 240 },
      children: [new TextRun({ text: description, size: 20, color: c(P.body) })]
    }));
  }
  
  if (url) {
    elements.push(new Paragraph({
      spacing: { after: 120 },
      indent: { left: 240 },
      children: [new TextRun({ text: url, size: 18, color: c(P.accent), underline: {} })]
    }));
  }
  
  return elements;
}

const doc = new Document({
  styles: { 
    default: { 
      document: {
        run: { font: "Calibri", size: 22, color: c(P.body) },
        paragraph: { spacing: { line: 312 } }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, bottom: 1440, left: 1701, right: 1417 }
      }
    },
    footers: {
      default: new Footer({ 
        children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 18, color: c(P.secondary) }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: c(P.secondary) }),
            new TextRun({ text: " | Investor & Funding Target List", size: 18, color: c(P.secondary) })
          ] 
        })] 
      })
    },
    children: [
      // TITLE PAGE
      new Paragraph({ spacing: { before: 1500 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new TextRun({ text: "COMPREHENSIVE INVESTOR & FUNDING", bold: true, size: 48, color: c(P.primary), font: "Calibri" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "TARGET LIST", bold: true, size: 48, color: c(P.accent), font: "Calibri" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 300, after: 500 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: c(P.accent) } },
        children: []
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 150 },
        children: [new TextRun({ text: "VC Firms | Angel Networks | Seed Funds | Government Grants", size: 24, color: c(P.secondary) })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 150 },
        children: [new TextRun({ text: "Corporate VCs | Accelerators | Crowdfunding | Impact Investing", size: 24, color: c(P.secondary) })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 600 },
        children: [new TextRun({ text: "Research Compiled: August 2025", size: 22, italics: true, color: c(P.body) })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100 },
        children: [new TextRun({ text: "Data Sources: Web Research, Government Portals, Industry Databases", size: 20, italics: true, color: c(P.secondary) })]
      }),

      // SECTION 1: TOP VENTURE CAPITAL FIRMS
      new Paragraph({ spacing: { before: 800 } }),
      heading("SECTION 1: TOP VENTURE CAPITAL FIRMS (GLOBAL)"),
      
      bodyPara("The following represents the most active and influential venture capital firms globally, organized by stage focus and investment thesis. These firms represent primary targets for Series A+ fundraising and potential follow-on investment opportunities."),

      subheading("Tier 1 - Elite / Mega-Funds ($5B+ AUM)"),
      
      ...sourceItem("Andreessen Horowitz (a16z)", "$90B AUM across funds. Multi-stage tech investor. Known for crypto, AI, consumer, enterprise.", "https://a16z.com", "All Stages | Tech"),
      ...sourceItem("Insight Partners", "$90B AUM. Software-focused growth equity. Strong in enterprise SaaS, data infrastructure.", "https://insightpartners.com", "Growth | Software"),
      ...sourceItem("Sequoia Capital", "Legendary VC with global presence (US, China, India). Early backers of Apple, Google, Airbnb.", "https://sequoiacap.com", "All Stages | Tech"),
      ...sourceItem("Accel", "Early-stage specialist with strong European presence via Accel Europe.", "https://accel.com", "Seed-Series B | Tech"),
      ...sourceItem("New Enterprise Associates (NEA)", "55-year-old firm managing $25B+. Healthcare and tech focus.", "https://nea.com", "Multi-sector"),

      subheading("Tier 2 - Premier Early-Stage VCs ($1B-$10B AUM)"),
      
      ...sourceItem("CRV", "55-year history. $750M dedicated seed fund. Strong founder support model.", "https://crv.com", "Early Stage | Tech"),
      ...sourceItem("Benchmark", "Generalist early-stage VC. Famous for equal partner structure and board seats in Uber, Twitter, Snapchat.", "https://benchmark.com", "Early Stage"),
      ...sourceItem("Union Square Ventures (USV)", "Thesis-driven investing in web3, fintech, health IT.", "http://usv.com", "Early Stage | Web/Tech"),
      ...sourceItem("Bessemer Venture Partners (BVP)", "One of oldest VCs. Strong cloud infrastructure, consumer, healthcare practices.", "https://bvp.com", "Multi-stage"),
      ...sourceItem("Index Ventures", "San Francisco/London-based. Strong cross-Atlantic portfolio including Figma, Notion.", "https://indexventures.com", "Multi-stage | Global"),
      ...sourceItem("Founders Fund", "Peter Thiel's fund. Contrarian bets in deep tech, aerospace, biotech.", "https://foundersfund.com", "Deep Tech"),
      ...sourceItem("General Catalyst", "Platform-heavy approach. Strong enterprise and fintech practice.", "https://generalcatalyst.com", "Enterprise/Fintech"),
      ...sourceItem("Lightspeed Venture Partners", "Multi-stage with strong consumer and enterprise practices globally.", "https://lightspeedvp.com", "Global | Multi-stage"),
      ...sourceItem("Battery Ventures", "Enterprise software, infrastructure, and industrial tech focus.", "https://battery.com", "Enterprise/Infrastructure"),
      ...sourceItem("Greylock Partners", "Consumer and enterprise. Reid Hoffman-affiliated. Strong network effects thesis.", "https://greylock.com", "Consumer/Enterprise"),

      subheading("Specialized Seed-Stage VCs"),
      
      ...sourceItem("True Ventures", "$500K-$3M checks. Biotech, climate, consumer focus. Founder-friendly terms.", "https://trueventures.com", "Seed | Deep Tech"),
      ...sourceItem("Global Founders Capital", "Highly active seed investor. Samwer brothers' fund. E-commerce and marketplace expertise.", "https://gfc.com", "Seed | Consumer"),
      ...sourceItem("NFX", "Network effects-focused seed fund. James Currier's thesis-driven approach.", "https://nfx.com", "Seed | Network Effects"),
      ...sourceItem("SpeedInvest", "European seed fund with sector-specific pods (Fintech, Climate, etc.).", "https://speedinvest.com", "Seed | Europe"),
      ...sourceItem("Village Global", "Network-powered seed fund backed by 100+ tech leaders including Bill Gates, Zuckerberg.", "https://villageglobal.vc", "Seed | Network"),
      ...sourceItem("Crosslink Capital", "Early-stage hardware, deeptech, energy investments.", "https://crosslinkcapital.com", "Seed | Hardware/Deeptech"),
      ...sourceItem("Harpoon Ventures", "$100K-$5M checks. Deeptech, hardware, energy specialization.", "https://harpoon.vc", "Seed | Hardware"),

      // SECTION 2: ANGEL INVESTOR NETWORKS & SYNDICATES
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 2: ANGEL INVESTOR NETWORKS & SYNDICATES"),
      
      bodyPara("Angel networks provide critical pre-seed and seed capital, often serving as the first institutional money into startups. These groups range from formal organizations to platform-based syndicates."),

      subheading("Major Angel Platforms & Marketplaces"),
      
      ...sourceItem("AngelList / Wellfound", "Default platform for startup-angel matching. Rolling funds, syndicates, and SPVs. Largest angel deal flow.", "https://angellist.co", "Platform | All Stages"),
      ...sourceItem("Gust", "Connects startups with 300+ angel groups globally. Application management and investor CRM.", "https://gust.com", "Platform | Angel Groups"),
      ...sourceItem("SeedInvest", "Equity crowdfunding platform. 575K+ investors. Acquired by Circle.", "https://seedinvest.com", "Crowdfunding | Reg CF"),
      ...sourceItem("Wefunder", "Community round specialists. $500M+ raised. Mission-driven companies preferred.", "https://wefunder.com", "Crowdfunding | Community"),
      ...sourceItem("StartEngine", "Leading Reg CF platform. High-growth sectors: tech, real estate, crypto.", "https://startengine.com", "Crowdfunding | Reg CF"),
      ...sourceItem("Republic", "Diversified crowdfunding: equity, crypto, real estate, art. Retail investor focus.", "https://republic.com", "Crowdfunding | Multi-asset"),

      subheading("Top US Angel Groups (by Activity)"),
      
      ...sourceItem("Tech Coast Angels (TCA)", "Largest US angel group. Southern California focus. $100K-$2M investments. Multiple chapters.", "https://techcoastangels.com", "SoCal | All Sectors"),
      ...sourceItem("NuFund Venture Group", "Rebranded from TCA-San Diego. One of largest Southern California angel networks.", "https://nufund.org", "SoCal | Early Stage"),
      ...sourceItem("Golden Seeds", "Female-founder focused. $175M+ invested in 200+ women-led companies.", "https://goldenseeds.com", "Women-led | All Sectors"),
      ...sourceItem("VentureSouth", "Southeast US focus. 400+ investors across multiple states. $500K-$2M checks.", "https://venturesouth.com", "Southeast US"),
      ...sourceItem("Central Texas Angel Network (CTAN)", "Austin-based. Active in Texas ecosystem. Strong tech and SaaS focus.", "https://ctan.org", "Texas | Tech/SaaS"),
      ...sourceItem("New York Angels", "NYC-based group. $250K-$1M investments. Diverse sector coverage.", "https://newyorkangels.com", "NYC | Multi-sector"),
      ...sourceItem("Hyde Park Angels", "Chicago-based. Midwest focus. University affiliations (Booth, Northwestern).", "https://hydeparkangels.com", "Midwest | Tech"),
      ...sourceItem("Sand Hill Angels", "Silicon Valley elite. Former operators and executives. Strong tech focus.", "https://sandhillangels.com", "SV | Tech"),
      ...sourceItem("Keiretsu Forum", "Global network. 50 chapters worldwide. $80M+ invested annually.", "https://keiretsum.com", "Global | Multi-sector"),
      ...sourceItem("AngelList Syndicates", "Lead angels create SPVs for followers. Popular for access to top deals.", "https://angel.co/syndicates", "Platform | Follow-on"),

      // SECTION 3: SEED ACCELERATORS & PROGRAMS
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 3: SEED ACCELERATORS & INCUBATOR PROGRAMS"),
      
      bodyPara("Accelerators provide structured programs combining capital, mentorship, and network access. These are ideal for pre-revenue or early-revenue startups seeking rapid validation and initial funding."),

      subheading("Elite Tier Accelerators (Top Tier)"),
      
      ...sourceItem("Y Combinator (YC)", "Gold standard accelerator. $500K for 7% equity. 6,600+ companies funded. Biannual cohorts (W/S).", "https://ycombinator.com", "$500K | 7%"),
      ...sourceItem("Techstars", "Global network of 50+ industry/city programs. $120K investment + $100K convertible note. 5,300+ alumni.", "https://techstars.com", "$220K | Varies"),
      ...sourceItem("500 Global (formerly 500 Startups)", "Emerging market focus. $150K investment. Strong Southeast Asia, MENA, LatAm presence.", "https://500.co", "$150K | Varies"),
      ...sourceItem("SOSV", "Deeptech specialist. $150K-$250K. Programs: IndieBio (biotech), Orbit (space), Chinaccel (China).", "https://sosv.com", "$150-250K | Deeptech"),

      subheading("Vertical / Sector-Specific Accelerators"),
      
      ...sourceItem("a16z Speedrun", "Andreessen Horowitz's program for technical founders. $1M investment. Intensive 8-week program.", "https://speedrun.a16z.com", "$1M | Technical Founders"),
      ...sourceItem("Antler Global", "Global early-stage VC with residency programs in 27 cities. $120K pre-seed investment.", "https://antler.co", "$120K | Global"),
      ...sourceItem("Plug and Play", "Corporate-backed innovation platform. 30+ verticals. Office locations worldwide.", "https://plugandplaytechcenter.com", "Varies | Corporate"),
      ...sourceItem("MassChallenge", "Non-profit accelerator. Zero-equity model. Boston, Austin, Geneva, Israel locations.", "https://masschallenge.org", "Zero-Equity | Non-profit"),
      ...sourceItem("StartX", "Stanford-affiliated. Founder-only community. No equity taken. Elite Stanford founders.", "https://startx.com", "Zero-Equity | Stanford"),
      ...sourceItem("Entrepreneur First (EF)", "Company-builder model. Invests in individuals pre-team. London, Singapore, Berlin, Bangalore.", "https://joinef.com", "Pre-team | Deep Tech"),
      ...sourceItem("High Alpha", "B2B SaaS studio/accelerator. Indianapolis-based. Venture studio model.", "https://highalpha.com", "Studio Model | B2B SaaS"),
      ...sourceItem("Pioneer", "Remote-first accelerator. No relocation required. Monthly tournaments. $1M+ deployed.", "https://pioneer.app", "Remote | Distributed"),

      // SECTION 4: GOVERNMENT GRANTS & NON-DILUTIVE FUNDING
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 4: GOVERNMENT GRANTS & NON-DILUTIVE FUNDING"),
      
      bodyPara("Government grants provide non-dilutive capital that does not require equity surrender. These programs are highly competitive but offer significant funding without ownership dilution."),

      subheading("United States Federal Programs"),
      
      ...sourceItem("SBIR (Small Business Innovation Research)", "$2.5B annually awarded. Phase I: $250K (9 months). Phase II: $1.25M (2 years). 11 participating agencies.", "https://sbir.gov", "Up to $1.5M | Non-dilutive"),
      ...sourceItem("STTR (Small Business Technology Transfer)", "Requires university/non-profit research partner. Similar funding levels to SBIR.", "https://sbir.gov/sttr-programs", "Up to $1.5M | Non-dilutive"),
      ...sourceItem("NSF SBIR/STTR", "National Science Foundation focus. Deep tech, hard science, engineering innovations.", "https://seed.nsf.gov", "Science/Engineering"),
      ...sourceItem("NIH SBIR/STTR", "National Institutes of Health. Life sciences, biotech, medical devices, digital health.", "https://seed.nih.gov", "Life Sciences/Medical"),
      ...sourceItem("DOE SBIR/STTR", "Department of Energy. Clean energy, advanced materials, climate technology.", "https://science.osti.gov/sbir", "Energy/Clean Tech"),
      ...sourceItem("NASA SBIR/STTR", "Space technology, aerospace, materials science, autonomous systems.", "https://nasa.gov/sbir_sttr", "Space/Aerospace"),
      ...sourceItem("EPA SBIR", "Environmental technology, water, air quality, sustainability solutions.", "https://epa.gov/sbir", "Environmental/Clean Tech"),
      ...sourceItem("DARPA Programs", "Defense Advanced Research Projects Agency. High-risk, high-reward defense tech.", "https://darpa.mil", "Defense/Dual-use"),

      subheading("United Kingdom & European Union Programs"),
      
      ...sourceItem("Horizon Europe", "EU flagship R&I program. EUR 95.5 billion budget (2021-2027). Open to UK entities.", "https://research-and-innovation.ec.europa.eu", "EUR 95.5B total"),
      ...sourceItem("Innovate UK", "UK innovation agency. Grants from GBP 25K to GBP 4.5M. Smart Grants, KTP programs.", "https://innovateuk.ukri.org", "GBP 25K-4.5M"),
      ...sourceItem("EIC Accelerator", "European Innovation Council. Up to EUR 2.5M grant + EUR 15M equity investment. Deep tech focus.", "https://eic.ec.europa.eu", "EUR 17.5M total"),
      ...sourceItem("UKRI Funding", "UK Research and Innovation. Multiple councils: EPSRC, BBSRC, MRC, NERC, AHRC.", "https://ukri.org", "Varies by council"),
      ...sourceItem("British Business Bank", "Start Up Loans, Future Fund, Enterprise Finance Guarantee schemes.", "https://british-business-bank.co.uk", "Loans/Guarantees"),
      ...sourceItem("Scottish Enterprise", "Regional development agency. R&D grants, smart Scotland, high growth spin-out program.", "https://scottishenterprise.com", "Scotland-focused"),
      ...sourceItem("Enterprise Ireland", "Irish government support. HPSU, CSU, feasibility studies. Strong startup nation strategy.", "https://enterprise-ireland.com", "Ireland-focused"),

      // SECTION 5: CORPORATE VENTURE CAPITAL (CVC)
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 5: CORPORATE VENTURE CAPITAL (CVC) ARMS"),
      
      bodyPara("Corporate venture capital arms offer strategic value beyond capital, including distribution partnerships, product integration, and M&A pathways. CVC participation reached $70B+ in 2024, representing ~25% of global VC activity."),

      subheading("Technology Sector CVC Leaders"),
      
      ...sourceItem("Google Ventures (GV)", "Alphabet's independent fund. $859M deployed in 2024. AI, enterprise, healthcare focus.", "https://gv.com", "AI/Healthcare/Enterprise"),
      ...sourceItem("Salesforce Ventures", "Most active corporate investor. 600+ startups, $6B+ deployed. Cloud ecosystem plays.", "https://salesforceventures.com", "Cloud/SaaS/Ecosystem"),
      ...sourceItem("Microsoft M12", "Microsoft's venture arm. AI, enterprise software, cloud infrastructure investments.", "https://microsoft.com/m12", "AI/Cloud/Enterprise"),
      ...sourceItem("Amazon Alexa Fund", "Voice, AI, robotics, connected home investments. Strategic Amazon ecosystem fit.", "https://alexafund.amazon.com", "Voice/AI/IoT"),
      ...sourceItem("Intel Capital", "Semiconductor, AI, edge computing, autonomy. Deep tech and infrastructure focus.", "https://intelcapital.com", "Semiconductors/AI"),
      ...sourceItem("Cisco Investments", "Networking, security, collaboration, cloud infrastructure. Enterprise IT stack.", "https://investments.cisco.com", "Enterprise IT/Security"),
      ...sourceItem("Salesforce Ventures", "CRM ecosystem, vertical SaaS, customer success technologies.", "https://salesforceventures.com", "SaaS/CRM/Ecosystem"),
      ...sourceItem("NVIDIA Ventures", "AI, robotics, autonomous vehicles, data center infrastructure.", "https://www.nvidia.com/en-us/about-nvidia/venture-capital/", "AI/Robotics/HPC"),

      subheading("Financial Services CVC"),
      
      ...sourceItem("Visa Ventures", "Payments, fintech, commerce enablement. Strategic Visa network integration.", "https://visa.com/visaventures", "Payments/Fintech"),
      ...sourceItem("Mastercard Start Path", "Open banking, payments innovation, digital identity, cybersecurity.", "https://startpath.mastercard.com", "Fintech/Payments"),
      ...sourceItem("Citi Ventures", "Fintech, enterprise SaaS, data/analytics, security. Global mandate.", "https://citiventures.com", "Fintech/Enterprise"),
      ...sourceItem("Goldman Sachs Growth Equity", "Late-stage growth investments. Financial services adjacent opportunities.", "https://gs.com/growthequity", "Growth/Financial Services"),
      ...sourceItem("JPMorgan Strategic Investments", "Fintech, payments, regtech, wealth management technology.", "https://jpmorgan.com/strategic-investments", "Fintech/Regtech"),

      subheading("Healthcare & Life Sciences CVC"),
      
      ...sourceItem("Novartis Ventures", "Biopharma, digital health, drug discovery platforms, precision medicine.", "https://novartis.com/novartis-ventures", "Biotech/Digital Health"),
      ...sourceItem("GV (Life Sciences)", "Dedicated life sciences team. Therapeutics, diagnostics, digital health tools.", "https://gv.com/team/life-sciences", "Life Sciences"),
      ...sourceItem("Johnson & Johnson Innovation", "Medical devices, consumer health, pharma tech, surgical robotics.", "https://jnjinnovation.com", "MedTech/Pharma"),
      ...sourceItem(" Bayer G4A", "Digital health, AI in healthcare, patient engagement, clinical trials tech.", "https://g4a.bayer.com", "Digital Health/AI"),

      // SECTION 6: IMPACT & ESG INVESTORS
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 6: IMPACT INVESTING & ESG-FOCUSED FUNDS"),
      
      bodyPara("Impact investing funds seek measurable social/environmental returns alongside financial returns. This sector has grown significantly, with sustainable funds attracting substantial capital despite market volatility."),

      subheading("Climate & Clean Energy Specialists"),
      
      ...sourceItem("Breakthrough Energy", "Bill Gates-led fund. Climate tech, clean energy, long-duration storage, green hydrogen.", "https://breakthroughenergy.org", "Climate/Clean Energy"),
      ...sourceItem("Generation Investment Management", "Al Gore co-founded. Sustainable capitalism thesis. Public and private markets.", "https://generationim.com", "Sustainability/ESG"),
      ...sourceItem("Congruent Ventures", "Climate tech seed fund. Mobility, energy, agriculture, materials focus.", "https://congruent.vc", "Climate Tech Seed"),
      ...sourceItem("Energy Impact Partners", "Infrastructure-scale climate investments. Grid, mobility, efficiency, resources.", "https://energyimpactpartners.com", "Climate Infrastructure"),
      ...sourceItem("Lowercarbon Capital", "Chris Sacca's climate fund. Carbon removal, alternative proteins, clean energy.", "https://lowercarbon.com", "Carbon/Climate"),
      ...sourceItem("Prelude Ventures", "Deep tech climate solutions. Materials, manufacturing, industrial decarbonization.", "https://preludeventures.com", "Climate Deep Tech"),
      ...sourceItem("DCVC (Data Collective)", "Deep tech including climate, bio, compute. Thesis-driven, scientist-founded.", "https://dcvc.com", "Deep Tech/Climate"),

      subheading("Social Impact & Inclusion Investors"),
      
      ...sourceItem("Omidyar Network", "Pierre Omidyar's philanthropic investment firm. Financial inclusion, governance, civic tech.", "https://omidyar.com", "Social Impact"),
      ...sourceItem("Accion Venture Lab", "Fintech inclusion. Emerging markets focus. Digital financial services for underserved.", "https://accionlab.com", "Fintech Inclusion"),
      ...sourceItem("Blue Haven Initiative", "Impact investing in emerging markets. Job creation, livelihood improvement.", "https://bluehaveninitiative.com", "Emerging Markets"),
      ...sourceItem("DBL Partners", "Double Bottom Line investing. Clean tech, healthy communities, sustainable products.", "https://dblpartners.com", "Double Bottom Line"),
      ...sourceItem("Obvious Ventures", "Evangelists for world-positive businesses. Three categories: Sustainable Systems, Healthy People, People Power.", "https://obvious.com", "World Positive"),

      // SECTION 7: ASIA-PACIFIC INVESTORS
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 7: ASIA-PACIFIC VENTURE CAPITAL MARKET"),
      
      bodyPara("The Asia-Pacific VC market is estimated at $296.78 billion in 2026, spanning distinct ecosystems across Singapore, India, Japan, China, Southeast Asia, and Australia. Despite recent corrections, the region remains highly active."),

      subheading("Singapore & Southeast Asia"),
      
      ...sourceItem("Gobi Partners", "Pan-Asian VC. Asean-focused funds. Strong Malaysia, China, Pakistan presence.", "https://gobi.vc", "ASEAN/Pan-Asia"),
      ...sourceItem("Vertex Ventures Southeast Asia", "Temasek affiliate. Multi-stage. Strong regional network and follow-on capacity.", "https://vertexventures.com/se", "SEA Multi-stage"),
      ...sourceItem("Insignia Ventures Partners", "Indonesia-focused. Local expertise. Consumer internet, SaaS, fintech.", "https://insigniavp.com", "Indonesia"),
      ...sourceItem("Alpha JWC Ventures", "Indonesia's leading VC. Series A-B focus. Consumer, fintech, B2B SaaS.", "https://alphajwc.com", "Indonesia Series A-B"),
      ...sourceItem("Golden Gate Ventures", "Singapore-based SEA pioneer. 200+ investments across region since 2011.", "https://ggvc.net", "SEA Early Stage"),
      ...sourceItem(" Monk's Hill Ventures", "Singapore-based. Regional expansion plays. Enterprise and consumer tech.", "https://monkshillvc.com", "SEA Expansion"),
      ...sourceItem("Wavemaker Partners", "SEA and Silicon Valley. Pre-seed to Series A. Consumer and enterprise.", "https://wavemakerpartners.com", "SEA/US Cross-border"),

      subheading("India"),
      
      ...sourceItem("Sequoia Capital India (Peak XV)", "India's premier VC. Now Peak XV Partners post-spinoff. Full stack investing.", "https://peakxv.com", "India All Stages"),
      ...sourceItem("Accel India", "Strong India presence. Enterprise SaaS, fintech, consumer tech leadership.", "https://accel.com/india", "India Early/Growth"),
      ...sourceItem("Blume Ventures", "India-focused seed fund. 150+ portfolio companies. Strong founder community.", "https://blumevc.com", "India Seed"),
      ...sourceItem("Elevation Capital", "Formerly SAIF Partners India. Consumer internet, fintech, healthcare.", "https://elevationcap.com", "India Growth"),
      ...sourceItem("Matrix Partners India", "Early-stage specialist. Fintech, SaaS, consumer, healthtech.", "https://matrixpartners.in", "India Early Stage"),

      subheading("China"),
      
      ...sourceItem("Sequoia China", "Independent from Sequoia Global. Massive AUM. Tech, healthcare, consumer.", "https://sequoiacap.cn/china", "China All Stages"),
      ...sourceItem("Hillhouse Capital", "Multi-asset manager with strong VC arm. TMT, healthcare, consumer.", "https://hillhouseinvestment.com", "China Multi-stage"),
      ...sourceItem("Qiming Venture Partners", "Healthcare and TMT focus. USD 9.4B AUM. Shanghai/Shenzhen/Beijing/Hong Kong.", "https://qimingventures.com", "China HC/TMT"),
      ...sourceItem("Matrix Partners China", "Independent from Matrix US. Consumer internet, enterprise, hard tech.", "https://matrixpartners.com.cn", "China Early Stage"),

      subheading("Japan"),
      
      ...sourceItem("SoftBank Vision Fund", "Largest tech fund globally. Late-stage, transformational investments.", "https://visionfund.softbank.com", "Japan Late Stage"),
      ...sourceItem("JAFCO", "Japan's oldest VC. Public company. Broad sector coverage.", "https://jafco.co.jp/en", "Japan Multi-stage"),
      ...sourceItem("Global Brain", "Japanese CVC-style fund. Corporate innovation partnerships.", "https://globalbrain.com", "Japan CVC/Innovation"),
      ...sourceItem("Incubate Fund", "Japan's largest seed fund. Internet, deep tech, web3 focus.", "https://incubatefund.com", "Japan Seed"),

      // SECTION 8: CROWDFUNDING PLATFORMS
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 8: EQUITY CROWDFUNDING PLATFORMS"),
      
      bodyPara("Regulation Crowdfunding (Reg CF) enables startups to raise up to $5 million from retail investors. These platforms democratize access to capital while building community around brands."),

      subheading("Major US Equity Crowdfunding Platforms"),
      
      ...sourceItem("Wefunder", "Market leader in Reg CF. Community rounds. $500M+ raised. Mission-driven focus.", "https://wefunder.com", "Reg CF | Community"),
      ...sourceItem("StartEngine", "Highest volume platform. Tech, real estate, crypto offerings. Strong marketing support.", "https://startengine.com", "Reg CF | High Volume"),
      ...sourceItem("Republic", "Retail investor friendly. Diverse asset classes. Open to non-accredited investors.", "https://republic.com", "Reg CF | Retail"),
      ...sourceItem("SeedInvest", "Curated platform. Higher bar for listing. Quality over quantity approach.", "https://seedinvest.com", "Reg CF | Curated"),
      ...sourceItem("NetCapital", "Self-service Reg CF portal. Lower fees. Direct issuer control.", "https://netcapital.com", "Reg CF | Self-service"),
      ...sourceItem("Mainvest", "Local business focus. Main Street oriented. Lower minimum investments.", "https://mainvest.com", "Reg CF | Local"),
      ...sourceItem("MicroVentures", "Accredited investor focus. Later-stage, VC co-investment opportunities.", "https://microventures.com", "Accredited Only"),

      subheading("International Crowdfunding"),
      
      ...sourceItem("Crowdcube (UK)", "UK leader. Fintech, consumer, cleantech. FCA regulated.", "https://crowdcube.com", "UK | Equity"),
      ...sourceItem("Seedrs (UK)", "UK/EU platform. Nominee structure. Secondary market available.", "https://seedrs.com", "UK/EU | Equity"),
      ...sourceItem("Companisto (Germany)", "German market leader. Real estate and startup equity crowdfunding.", "https://companisto.com", "Germany | Equity"),
      ...sourceItem("Fundable", "Rewards and equity. Startup-friendly pricing. Good for early validation.", "https://fundable.com", "US | Rewards/Equity"),
      ...sourceItem("Kickstarter", "Reward-based only. Product validation and pre-sales. No equity.", "https://kickstarter.com", "Rewards | Validation"),
      ...sourceItem("Indiegogo", "Flexible funding options. Keep-what-you-raise model popular.", "https://indiegogo.com", "Rewards | Flexible"),

      // BEST PRACTICES SECTION
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 9: OUTREACH STRATEGY & BEST PRACTICES"),
      
      subheading("Target Prioritization Framework"),
      
      bodyPara("When approaching this extensive target list, prioritize based on stage-fit, sector alignment, and relationship proximity. The following framework helps sequence outreach effectively:"),

      bulletPoint("Stage Alignment: Match your funding stage to investor mandate (pre-seed vs seed vs Series A)"),
      bulletPoint("Sector Expertise: Target investors with demonstrated portfolio companies in your vertical"),
      bulletPoint("Geographic Focus: Many funds have strict geographic requirements or preferences"),
      bulletPoint("Check Size: Ensure your raise amount falls within typical check size range"),
      bulletPoint("Value-Add Beyond Capital: Consider strategic value (hiring, customers, partnerships)"),
      bulletPoint("Portfolio Conflicts: Check for competing portfolio companies that may disqualify you"),

      subheading("Outreach Sequencing Recommendations"),
      
      bodyPara("Recommended order of operations for efficient fundraising:"),

      bulletPoint("Phase 1 (Weeks 1-2): Warm introductions through existing network to highest-priority targets"),
      bulletPoint("Phase 2 (Weeks 2-4): Cold outreach to tier-2 targets using personalized templates"),
      bulletPoint("Phase 3 (Weeks 4-6): Accelerator applications if timing aligns (YC, Techstars, etc.)"),
      bulletPoint("Phase 4 (Parallel): Grant applications (SBIR, Innovate UK, Horizon Europe) - longer timelines"),
      bulletPoint("Phase 5 (If needed): Crowdfunding campaign as fallback or community-building tool"),

      subheading("Key Resources for Updated Information"),
      
      ...sourceItem("Crunchbase News", "Real-time funding announcements, investor activity tracking.", "https://news.crunchbase.com", "Market Intelligence"),
      ...sourceItem("PitchBook", "Comprehensive VC database. Subscription required. Institutional-grade data.", "https://pitchbook.com", "Database"),
      ...sourceItem("OpenVC.app", "Free VC database with filters by stage, sector, geography.", "https://openvc.app", "Free Database"),
      ...sourceItem("Dealroom", "European startup and VC intelligence. Free and premium tiers.", "https://dealroom.net", "Europe Focus"),
      ...sourceProductDetail("VC Sheet", "Curated lists of funds that lead specific stages. Useful for targeting.", "https://vcsheet.com", "Stage-Specific Lists"),
      ...sourceItem("Forbes Midas List", "Annual ranking of top VCs. Good for identifying rising stars.", "https://forbes.com/lists/midas", "Rankings"),

      // FOOTER
      new Paragraph({ spacing: { before: 400 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: c(P.accent) } },
        children: []
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Document Version 1.0 | Research Date: August 2025", size: 20, italics: true, color: c(P.secondary) })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Verify all details before outreach. Markets evolve rapidly.", size: 20, italics: true, color: c(P.secondary) })]
      })
    ]
  }]
});

// Fix: sourceItem function was defined twice - removing duplicate
function sourceProductDetail(name, description, url, focus) {
  const elements = [];
  
  elements.push(new Paragraph({
    spacing: { before: 160, after: 40 },
    children: [
      new TextRun({ text: name, bold: true, size: 24, color: c(P.primary) }),
      new TextRun({ text: focus ? "  |  " + focus : "", size: 20, italics: true, color: c(P.secondary) })
    ]
  }));
  
  if (description) {
    elements.push(new Paragraph({
      spacing: { after: 40 },
      indent: { left: 240 },
      children: [new TextRun({ text: description, size: 20, color: c(P.body) })]
    }));
  }
  
  if (url) {
    elements.push(new Paragraph({
      spacing: { after: 120 },
      indent: { left: 240 },
      children: [new TextRun({ text: url, size: 18, color: c(P.accent), underline: {} })]
    }));
  }
  
  return elements;
}

Packer.toBuffer(doc).then(function(buf) {
  fs.writeFileSync("/home/z/my-project/download/Investor_Funding_Target_List.docx", buf);
  console.log("Document generated successfully!");
}).catch(function(err) {
  console.error("Error:", err);
});
