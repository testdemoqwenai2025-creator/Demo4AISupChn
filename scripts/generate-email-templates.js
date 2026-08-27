const { Document, Packer, Paragraph, TextRun, Footer, AlignmentType, HeadingLevel, PageNumber, BorderStyle } = require("docx");
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
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text: text, bold: true, color: c(P.secondary), font: "Calibri", size: 26 })]
  });
}

function bodyPara(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 312, after: 120 },
    children: [new TextRun({ text: text, size: 24, color: c(P.body), font: "Calibri" })]
  });
}

function emailTemplate(subject, fromLine, dateLine, bodyText, signature) {
  const elements = [];
  
  elements.push(new Paragraph({
    spacing: { before: 200, after: 100 },
    shading: { fill: c(P.surface) },
    children: [
      new TextRun({ text: "Subject: ", bold: true, size: 24, color: c(P.primary) }),
      new TextRun({ text: subject, italics: true, size: 24, color: c(P.accent) })
    ]
  }));
  
  if (fromLine) {
    elements.push(new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: "From: ", bold: true, size: 22, color: c(P.secondary) }),
        new TextRun({ text: fromLine, size: 22, color: c(P.body) })
      ]
    }));
  }
  
  if (dateLine) {
    elements.push(new Paragraph({
      spacing: { after: 160 },
      children: [
        new TextRun({ text: "Date: ", bold: true, size: 22, color: c(P.secondary) }),
        new TextRun({ text: dateLine, size: 22, color: c(P.body) })
      ]
    }));
  }
  
  const paragraphs = bodyText.split('\n\n');
  paragraphs.forEach(function(para) {
    if (para.trim()) {
      elements.push(new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { line: 312, after: 160 },
        children: [new TextRun({ text: para.trim(), size: 24, color: c(P.body), font: "Calibri" })]
      }));
    }
  });
  
  if (signature) {
    elements.push(new Paragraph({ spacing: { before: 200, after: 40 }, children: [] }));
    const sigLines = signature.split('\n');
    sigLines.forEach(function(line) {
      elements.push(new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 40 },
        children: [new TextRun({ text: line, size: 24, color: c(P.body) })]
      }));
    });
  }
  
  elements.push(new Paragraph({
    spacing: { before: 300, after: 300 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: c(P.accent) } },
    children: []
  }));
  
  return elements;
}

const doc = new Document({
  styles: { 
    default: { 
      document: {
        run: { font: "Calibri", size: 24, color: c(P.body) },
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
            new TextRun({ text: " | Email Template Library", size: 18, color: c(P.secondary) })
          ] 
        })] 
      })
    },
    children: [
      // TITLE
      new Paragraph({ spacing: { before: 2000 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "PROFESSIONAL OUTREACH", bold: true, size: 56, color: c(P.primary), font: "Calibri" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "EMAIL TEMPLATE LIBRARY", bold: true, size: 48, color: c(P.accent), font: "Calibri" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 600 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: c(P.accent) } },
        children: []
      }),

      // SECTION 1
      new Paragraph({ spacing: { before: 800 } }),
      heading("SECTION 1: INVESTOR-TO-STARTUP OUTREACH"),
      
      subheading("Template 1A: Cold Email to Startup (Initial Outreach)"),
      ...emailTemplate(
        "Opportunity to Connect: Interest in [Startup Name]",
        "[Your Name] at [Your Firm]",
        "[Date]",
        "Dear [Founder Name],\n\nI hope this message finds you well. I have been following [Startup Name]'s progress with great interest, particularly your recent [specific milestone or news].\n\nAt [Your Firm], we specialize in backing exceptional founders who are transforming industries through innovative technology. Your approach to [specific problem] resonates strongly with our investment thesis.\n\nI would welcome the opportunity to learn more about your vision and explore how we might support your journey. Would you be available for a brief introductory call next week?\n\nLooking forward to connecting.\n\nBest regards,",
        "[Your Name]\n[Title]\n[Company Name]\n[Email]\n[Phone]"
      ),

      subheading("Template 1B: Follow-up (One Week Later)"),
      ...emailTemplate(
        "Re: Following Up on [Startup Name]",
        "[Your Name] at [Your Firm]",
        "[Date]",
        "Dear [Founder Name],\n\nI wanted to briefly follow up on my previous note regarding [Startup Name]. I understand inbox management can be challenging for growing companies.\n\nSince reaching out, I noticed [recent development], which reinforces our belief in your team's execution capabilities.\n\nNo pressure on timing - I simply wanted to ensure this did not get lost. Even 15 minutes would be valuable.\n\nWarm regards,",
        "[Your Name]\n[Title]\n[Company Name]"
      ),

      // SECTION 2
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 2: STARTUP-TO-INVESTOR FUNDRAISING"),
      
      subheading("Template 2A: Introduction to VC Firm"),
      ...emailTemplate(
        "[Startup Name] - Raising [Round Size]",
        "[Founder Name], Co-founder at [Startup Name]",
        "[Date]",
        "Dear [Partner Name],\n\nI am writing to introduce [Startup Name], a [brief description] that we are building at the intersection of [key trends].\n\nWe are currently raising our [Seed/Series A] round of [$X million] to [use of funds].\n\nKey traction metrics:\n- [Metric 1]\n- [Metric 2]\n- [Metric 3]\n\nWhat makes this compelling is [unique differentiator]. We have validated product-market fit and are focused on scaling.\n\nWould you be open to reviewing our deck? Happy to work around your schedule.\n\nBest regards,",
        "[Founder Name]\nCo-founder & CEO\n[Startup Name]\n[Email] | [Phone]"
      ),

      // SECTION 3
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 3: LP / FUNDRAISING OUTREACH"),
      
      subheading("Template 3A: Approach to Family Office"),
      ...emailTemplate(
        "Private Investment Opportunity: Fund [Number]",
        "[GP Name], Managing Partner",
        "[Date]",
        "Dear [Family Office Principal],\n\nI am writing to introduce [Fund Name] and explore whether our investment mandate might align with your allocation strategy.\n\n[Fund Name] is a [stage]-focused venture fund investing at the intersection of [thesis areas]. We are currently raising our [Fund number] fund with target of [$ amount].\n\nOur team brings [credibility markers], including prior roles at [notable firms]. Our portfolio has demonstrated [track record].\n\nWhat distinguishes us:\n- [Differentiator 1]\n- [Differentiator 2]\n- [Differentiator 3]\n\nWould you be open to receiving our PPM and scheduling an introductory call?\n\nRespectfully submitted,",
        "[GP Name]\nManaging Partner\n[Fund Name]\n[Contact Information]"
      ),

      // SECTION 4
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 4: ANGEL INVESTOR OUTREACH"),
      
      subheading("Template 4A: Angel Introduction to Founder"),
      ...emailTemplate(
        "Angel Investment Inquiry: [Startup Name]",
        "[Angel Name], Angel Investor",
        "[Date]",
        "Hi [Founder Name],\n\nI came across [Startup Name] through [source] and was compelled by what you are building.\n\nQuick background: I am an angel investor who [credibility]. I typically invest [behavior] and pride myself on being helpful when asked.\n\nWhat caught my eye:\n- [Specific observation 1]\n- [Specific observation 2]\n- [Personal connection to problem]\n\nI would love to learn more about participating in your current round.\n\nBest,",
        "[Angel Name]\nAngel Investor\n[LinkedIn/Twitter]\n[Email/Phone]"
      ),

      // SECTION 5
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 5: CORPORATE PARTNERSHIP OUTREACH"),
      
      subheading("Template 5A: Strategic Partnership Proposal"),
      ...emailTemplate(
        "Partnership Opportunity: [Your Company] x [Target Company]",
        "[Your Name], [Title]",
        "[Date]",
        "Dear [Contact Name],\n\nI am reaching out from [Your Company] to explore a potential strategic partnership.\n\n**About [Your Company]**\n\n[2-3 sentence overview focusing on relevance to target company]\n\n**The Opportunity**\n\nBased on [Target Company]'s recent [initiative/news], I see collaboration opportunities:\n\n1. **[Area 1]**: [Benefit description]\n2. **[Area 2]**: [Benefit description]\n3. **[Area 3]**: [Benefit description]\n\n**Next Steps**\n\nI would welcome an exploratory call to discuss further.\n\nBest regards,",
        "[Your Name]\n[Title]\n[Your Company]\n[Email] | [Phone] | [LinkedIn]"
      ),

      // SECTION 6
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 6: ACCELERATOR RECRUITMENT"),
      
      subheading("Template 6A: Startup Recruitment for Cohort"),
      ...emailTemplate(
        "Invitation to Apply: [Program Name] | [Startup Name]",
        "[Recruiter Name], [Title]",
        "[Date]",
        "Dear [Founder Name],\n\nI am reaching out from [Accelerator Name] to invite [Startup Name] to apply for our upcoming cohort.\n\n**Why We Are Interested**\n\nYour work in [space] stands out. Specifically, [observation showing genuine research].\n\n**What [Program Name] Provides**\n\n- [$ amount] capital / Investment at [terms]\n- [Duration]-week program focused on [themes]\n- 1:1 mentorship from experienced operators\n- Demo Day to [number]+ investors\n- Lifetime alumni network access\n\nApplications close [deadline]. As a recruited founder, your application receives expedited review.\n\nHope to see you in the cohort!\n\nBest,",
        "[Recruiter Name]\n[Title]\n[Accelerator Name]\n[Website]"
      ),

      // SECTION 7
      new Paragraph({ spacing: { before: 600 } }),
      heading("SECTION 7: NETWORKING & RELATIONSHIP BUILDING"),
      
      subheading("Template 7A: Post-Event Follow-up"),
      ...emailTemplate(
        "Great Meeting You at [Event Name]",
        "[Your Name], [Title]",
        "[Date]",
        "Hi [Person's Name],\n\nIt was a pleasure meeting you at [Event Name]. Our conversation about [topic discussed] really resonated.\n\nAs mentioned, I am focused on [brief description], and would love to stay connected.\n\nA few thoughts post-conversation:\n- [Relevant article/resource]\n- [Introduction offer]\n- [Reflection on their insight]\n\nLet us definitely stay in touch!\n\nAll the best,",
        "[Your Name]\n[Title]\n[Company/Affiliation]\n[LinkedIn]\n[Email]"
      ),

      // BEST PRACTICES
      new Paragraph({ spacing: { before: 600 } }),
      heading("BEST PRACTICES & CUSTOMIZATION GUIDE"),
      
      bodyPara("This template library serves as a starting point for professional outreach communications. Key principles for effectiveness:"),
      
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [new TextRun({ text: "1. Personalization is Non-Negotiable", bold: true, size: 24, color: c(P.primary) })]
      }),
      bodyPara("Every template includes placeholders marked with [brackets]. Generic emails generate generic results. Customize at least 3-4 specific references per email."),

      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [new TextRun({ text: "2. Respect Timing and Channel Preferences", bold: true, size: 24, color: c(P.primary) })]
      }),
      bodyPara("Follow-up sequences: initial email, follow-up at 7 days, second at 14 days. Avoid excessive frequency. Consider if email is optimal or if LinkedIn/warm introduction would be better."),

      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [new TextRun({ text: "3. Focus on Value for Recipient", bold: true, size: 24, color: c(P.primary) })]
      }),
      bodyPara("Every communication should articulate what is in it for them. Lead with value, not asks."),

      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [new TextRun({ text: "4. Maintain Professional Persistence", bold: true, size: 24, color: c(P.primary) })]
      }),
      bodyPara("Most meaningful relationships require multiple touchpoints. Do not interpret silence as rejection - people are busy."),

      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [new TextRun({ text: "5. Track, Test, and Iterate", bold: true, size: 24, color: c(P.primary) })]
      }),
      bodyPara("Monitor response rates across templates and timing. A/B test variations before scaling successful patterns."),

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
        children: [new TextRun({ text: "Document Version 1.0 | Professional Use Only", size: 20, italics: true, color: c(P.secondary) })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Customize all [placeholders] before sending.", size: 20, italics: true, color: c(P.secondary) })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(function(buf) {
  fs.writeFileSync("/home/z/my-project/download/Professional_Email_Template_Library.docx", buf);
  console.log("Document generated successfully!");
}).catch(function(err) {
  console.error("Error:", err);
});
