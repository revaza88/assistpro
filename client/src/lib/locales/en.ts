import { siteCopy } from '../site-copy';

const translation = {
      // Navigation
      nav: {
        about: 'About Us', // from Text
        services: 'Services',
        team: 'Team',
        career: 'Career',
        contact: 'Contact Us', // from Text
        logo: 'ASSIST',
      },

      // Hero Section (Main Page Content)
      hero: { // Corresponds to "1.2. Main Page - English Version (Hero Section)"
        mainTitle: '"Assist": Reliable Financial & Legal Support for Your Business in Georgia',
        subtitle: 'Save time and resources, reduce risks, and focus on what truly matters – growing your business. "Assist" offers professional outsourced accounting services in Georgia, tax, and legal consulting.',
        mainCta: 'Free Consultation',
        secondaryCta: 'Our Services',
      },

      // Why Us Section (Main Page Content)
      whyUs: { // Corresponds to "1.2. ... ("Why Us?" / "Why Choose 'Assist'?" Section)"
        title: 'Why Do Small and Medium Businesses Choose "Assist"?',
        item1: 'Personalized Approach & Care: For us, every client is unique. We listen, understand, and offer individual solutions.',
        item2: 'Professionalism & Guaranteed Quality: Our team consists of certified and experienced specialists who provide the highest quality service.',
        item3: 'Modern Technologies & Efficiency: We use the latest software to save your time and simplify processes for your accounting services in Georgia for small business.',
        item4: 'Full Service in One Place: From accounting to legal support – everything your business needs, all in one place.',
        cta: 'Learn More About Us',
      },

      // Services Overview (Main Page Content)
      servicesOverview: { // Corresponds to "1.2. ... (Services Overview)"
        title: 'Our Services: Everything for Your Business\'s Stable Growth',
        accounting: {
          title: 'Accounting Services',
          description: 'Professional accounting for SMBs and large companies. Accurate bookkeeping, timely declarations, and financial reporting. We are experts in accounting services in Georgia for small business.',
          cta: 'Learn More',
        },
        tax: {
          title: 'Tax Consulting',
          description: 'Competent tax consulting in Georgia. Tax planning, risk management, and compliance with legislation, including VAT filing and refund Georgia.',
          cta: 'Learn More',
        },
        legal: {
          title: 'Legal Services',
          description: 'Reliable legal services for businesses in Georgia. Corporate law, contracts, representation in disputes.',
          cta: 'Learn More',
        },
        businessAssist: {
          title: 'Company Registration & Business Assist',
          description: 'Fast and hassle-free company registration in Georgia. Assistance in obtaining special statuses (e.g., micro business status Georgia, international company status Georgia). We simplify business formation Tbilisi, including Georgia LLC formation.',
          cta: 'Learn More',
        },
        audit: {
          title: 'Audit Services',
          description: 'An independent auditing firm offering financial and tax audits for SMBs and large organizations.',
          cta: 'Learn More',
        },
        ctaAll: 'View All Services',
      },

      // How We Work Section (Main Page Content)
      howWeWork: { // Corresponds to "1.2. ... ("How We Work?" / "Simple Steps to Collaborate" Section)"
        title: 'Start Collaborating with "Assist" in 3 Simple Steps',
        step1: 'Contact Us for a Consultation: Fill out the form or get in touch. We will analyze your needs.',
        step2: 'Receive a Tailored Offer: Considering your business specifics, we will prepare the best terms for you.',
        step3: 'Begin Partnership & Receive Ongoing Support: We take care of your financial and legal matters, while you grow your business!',
      },

      // Social Proof Section (Main Page Content)
      socialProof: { // Corresponds to "1.2. ... (Social Proof)"
        title: 'What Our Clients Say',
        testimonial1Name: 'Client Name, Company',
        testimonial1Text: '"The \'Assist\' team completely changed our attitude towards accounting. Everything is in order, and they are always ready to help."',
        testimonial2Name: 'Client Name, Startup',
        testimonial2Text: '"As a startup, their legal and tax advice proved invaluable. Highly recommend to everyone!"',
        trustedByTitle: 'Trusted By:', // Placeholder for logos
      },

      // Blog Teaser Section (Main Page Content)
      blogTeaser: { // Corresponds to "1.2. ... (Blog/Useful Resources Teaser)"
        title: 'Useful Tips & News for Your Business',
        article1Title: '"5 Tax Optimization Tips for Small Businesses in Georgia"',
        article2Title: '"How to Register a Company in Georgia: A Complete Guide"',
        cta: 'View All Articles',
      },

      // Final CTA Block (Main Page Content)
      finalCta: { // Corresponds to "1.2. ... (Final CTA Block)"
        title: 'Ready to Take Your Business to the Next Level?',
        content: "Don't postpone organizing your financial and legal affairs. \"Assist\" is here to provide professional help and create a solid foundation for your success.",
        cta1: 'Contact Us Now',
        cta2: 'Request a Personalized Offer',
        phoneLabel: 'Phone:',
        phoneValue: '[Your Number]', // Placeholder
        emailLabel: 'Email:',
        emailValue: '[Your Email]', // Placeholder
      },

      // About Section (Page: About Us)
      about: { // Corresponds to "Page: About Us (English Version)"
        h1: 'Meet "Assist" - Your Trusted and Innovative Partner for Business Growth',
        welcome: 'Welcome to the world of "Assist"! We are a youthful, dynamic, and ambitious auditing company and a team of business process outsourcing specialists, successfully supporting small to medium-sized businesses (SMBs), startups, and individual entrepreneurs in Georgia since 2015. Our primary goal is to simplify the financial and legal labyrinths for you, enabling you to fully focus on your core business activities and conquer your set goals. The "Assist" team unites highly qualified professionals ready to share their knowledge and experience, stand by your side, and become your long-term, reliable partners.',
        missionTitle: 'Our Mission: Your Business\'s Peace of Mind and Growth',
        missionText: 'Our mission is to be more than just a service provider. We strive to build close partnerships with small and medium-sized companies, individual entrepreneurs, and startup initiatives. Our aim is to help them navigate the complex business world with confidence, make informed decisions, and avoid potential risks. We create an environment where complex financial and legal issues are simplified, allowing your valuable time and energy to be entirely dedicated to your business development. We believe that your success is our success.',
        whyAssistTitle: 'Why "Assist"? Your Advantages of Partnering with Us:',
        advantage1Title: 'Youthful Energy and Innovative Vision:',
        advantage1Text: 'We are a young, enthusiastic team constantly seeking modern, effective, and unconventional solutions. We are not afraid of challenges and are ready to offer creative outsourced accounting services Georgia and tax consulting in Georgia tailored to your unique needs.',
        advantage2Title: 'Maximum Client Focus and Direct Communication:',
        advantage2Text: 'Your business success is our top priority. At "Assist," you will find a team ready to listen attentively, understand your specific requirements, and offer personalized service. Communication with us is simple, direct, and friendly.',
        advantage3Title: 'Highly Qualified and Experienced Team:',
        advantage3Text: 'Behind our youthful spirit lies deep-domain knowledge and years of practical experience. Each member of the "Assist" team is a certified professional who continually enhances their qualifications to offer you top-quality legal services for businesses in Georgia and financial consultations.',
        advantage4Title: 'Active Use of Modern Technologies at Your Service:',
        advantage4Text: 'We actively utilize the latest software, cloud services, and digital tools. This allows our services to be maximally fast, accurate, efficient, and comfortable for you. You will have constant access to your financial data through secure and modern platforms for your accounting services in Georgia for small business.',
        advantage5Title: 'Reliable Support for Startups:',
        advantage5Text: 'We particularly understand the unique needs and challenges of startups. We are ready to be your trusted partner from the very first stage of company registration in Georgia and assist you through crucial processes such as obtaining micro business status Georgia or securing international company status Georgia.',
        ourTeamTitle: 'Our Team: The Guarantee of Your Success',
        ourTeamText: '"Assist\'s" main asset and driving force is our team. We are proud of our professionals, who are true enthusiasts and experts in their field. A development-oriented, motivated, and friendly environment is what allows us to offer you the highest standard of service, establish long-term, trust-based partnerships, and celebrate your business achievements together. (A brief insert about a team photo or short introductions of a few team members would be great here once the visual is ready).',
        valuesTitle: 'Our Fundamental Values:',
        value1: 'Professionalism and Competence: Our knowledge and experience at the service of your business.',
        value2: 'Client-Orientation: Your interests and goals are the cornerstone of our work.',
        value3: 'Innovation and Continuous Growth: We learn, develop, and implement new approaches for your better service.',
        value4: 'Transparency and Accountability: We operate openly and take full responsibility for the services we provide.',
        value5: 'Teamwork and Mutual Respect: We are a unified team striving towards a common goal.',
        closingCall: '"Assist" is ready to become your trusted advisor and supporter at every stage of business management, including VAT filing and refund Georgia and overall business formation Tbilisi, including Georgia LLC formation. Contact us today, and let\'s plan the path to your success together!',
      },

      // Services
      services: {
        // Accounting Service Page (2.2. Accounting Services - English Version)
        accounting: {
          h1: 'Professional Accounting Services for Small and Medium Businesses in Georgia',
          intro: 'The financial health of your business and full compliance with legislation are our top priorities. "Assist" offers comprehensive outsourced accounting services Georgia designed to help you avoid problems caused by accounting errors, save time and money, and fully focus on your company\'s growth. We understand that accounting services in Georgia for small business require a special approach, so we offer solutions fully tailored to your needs.',
          whyOutsourcingTitle: 'Why is Accounting Outsourcing the Best Choice for Your Business?',
          benefitFinancial: 'Financial Savings', // Simplified for brevity, full text in component
          benefitTime: 'Time Savings',
          benefitRisk: 'Risk Minimization',
          benefitExpertise: 'Access to Expert Knowledge',
          benefitFocus: 'Focus on Core Activities',
          servicesIncludeTitle: '"Assist\'s" Accounting Services Include:',
          serviceList: [
            'Primary Document Processing and Recording',
            'Preparation and Submission of Monthly and Annual Tax Declarations',
            'Financial Statement Preparation (including SARAS submission)',
            'Payroll Calculation and Accounting',
            'Fixed Asset Accounting',
            'Inventory Accounting',
            'Consultations on Current Accounting Issues',
            'Representation with Tax Authorities'
          ],
          packagesTitle: 'Our Accounting Service Packages:',
          package1: 'Chief Accountant Outsourcing Service',
          package2: 'Full Accounting Outsourcing Service (Remote)',
          package3: 'Full Accounting Outsourcing Service (On-site - upon special request)',
          whyUsTitle: 'Why Entrust Your Accounting to "Assist"?',
          reasonExperience: 'Experience and Professionalism',
          reasonIndividual: 'Individual Approach',
          reasonTech: 'Modern Technologies',
          reasonConfidentiality: 'Confidentiality Guarantee',
          reasonCommunication: 'Constant Communication and Support',
          finalCtaTitle: 'Ready to Entrust Your Business Accounting to Reliable Hands?',
          finalCtaText: 'Contact us today, get a free consultation, and find out how "Assist" can help you optimize your financial processes, reduce costs, and achieve sustainable business development.',
          ctaConsultation: 'Request a Free Consultation',
          ctaContact: 'Contact Us',
        },
        // Tax Service Page (3.2. Tax Services - English Version)
        tax: {
          h1: 'Professional Tax Consulting and Services in Tbilisi and throughout Georgia',
          intro: "Georgia's constantly evolving tax legislation presents a major challenge for businesses. \"Assist\" offers comprehensive tax consulting in Georgia, helping your business stay protected, optimize tax liabilities, and comply with current legislation.",
          whyImportantTitle: 'Why is Professional Tax Service Vitally Important?',
          benefitRiskMinimization: 'Minimization of Tax Risks',
          benefitOptimization: 'Tax Optimization',
          benefitCompliance: 'Constant Compliance with Legislation',
          benefitTimeSaving: 'Time and Resource Savings',
          benefitPeaceOfMind: 'Peace of Mind and Confidence',
          servicesIncludeTitle: '"Assist\'s" Tax Services Include:',
          serviceList: [
            'Tax Consultations (all tax types, planning, benefits, VAT filing and refund Georgia, micro business status Georgia, international company status Georgia)',
            'Preparation and Submission of Tax Declarations',
            'Tax Audit',
            'Representation with Tax Authorities',
            'Tax Dispute Resolution',
            'International Taxation Issues'
          ],
          forWhomTitle: 'Who Are Our Tax Services For?',
          targetList: [
            'For Small and Medium Businesses (SMBs)',
            'For Startups',
            'For Individual Entrepreneurs',
            'For Foreign Investors and Companies',
            'For Any Company needing tax support'
          ],
          whyUsTitle: 'Why "Assist" as Your Tax Partner?',
          reasonKnowledge: 'In-depth Knowledge and Experience',
          reasonProactive: 'Proactive Approach',
          reasonResults: 'Focus on Concrete Results',
          reasonTeamwork: 'Teamwork',
          finalCtaTitle: 'Ready to Entrust Your Tax Matters to Professionals?',
          finalCtaText: 'Contact "Assist" today for a free initial consultation and receive qualified advice.',
          ctaRequestConsultation: 'Request Tax Consultation',
          ctaContact: 'Contact Us',
        },
        // Legal Service Page (4.2. Legal Services - English Version)
        legal: {
          h1: 'Comprehensive Legal Services for Businesses in Georgia - Your Legal Protection and Stability',
          intro: 'All business activities are closely intertwined with legal aspects. "Assist" offers high-quality legal services for businesses in Georgia, covering corporate law, contract law, labor law, and other relevant legal issues related to business.',
          whyImportantTitle: 'Why is Professional Legal Support Essential for Your Business?',
          benefitRiskPrevention: 'Prevention of Legal Risks',
          benefitCompliance: 'Full Compliance with Legislation',
          benefitInterestProtection: 'Protection of Your Interests',
          benefitOptimalSolutions: 'Making Optimal Decisions',
          benefitResourceEfficiency: 'Efficient Use of Time and Resources',
          servicesIncludeTitle: '"Assist\'s" Legal Services Include:',
          serviceList: [
            'Corporate Law (company registration in Georgia, reorganization, founding documents)',
            'Contract Law (contract preparation, analysis)',
            'Labor Law (employment contracts, consultations, disputes)',
            'Tax and Administrative Law',
            'Intellectual Property Law (basic consultation)',
            'Representation in Court and Arbitration',
            'Legal Outsourcing'
          ],
          forWhomTitle: 'Who Are Our Legal Services For?',
          targetList: [
            'For Small and Medium Businesses (SMBs)',
            'For Startups',
            'For Foreign Companies and Investors',
            'For Any Company needing legal assistance'
          ],
          whyUsTitle: 'Why "Assist" as Your Legal Advisor?',
          reasonExperience: 'Practical Experience and Result-Orientation',
          reasonBusinessOriented: 'Business-Oriented Approach',
          reasonComprehensiveVision: 'Comprehensive Vision',
          reasonProactivity: 'Proactivity and Prevention',
          finalCtaTitle: 'Protect Your Business Legally with "Assist"!',
          finalCtaText: 'Contact "Assist" for an initial legal consultation.',
          ctaRequestConsultation: 'Request Legal Consultation',
          ctaContact: 'Contact Us',
        },
        // Audit Service Page (5.2. Audit Services - English Version)
        audit: {
          h1: 'Independent Audit Services in Georgia - Your Financial Transparency and Credibility',
          intro: '"Assist," as a licensed auditing company, offers high-quality and independent audit services that will help you confirm the reliability of your financial information. We provide both statutory audits of financial statements and special purpose audits, including tax audits for small businesses.',
          whyImportantTitle: 'Why are Audit Services Important for Your Company?',
          benefitCredibility: 'Increased Credibility of Financial Statements',
          benefitInternalControls: 'Assessment and Improvement of Internal Control Systems',
          benefitRiskManagement: 'Risk Identification and Management',
          benefitCompliance: 'Ensuring Compliance with Legislation',
          benefitDecisionMaking: 'Improved Decision-Making',
          servicesIncludeTitle: '"Assist\'s" Audit Services Include:',
          serviceList: [
            'Audit of Financial Statements (ISA, SARAS)',
            'Agreed-Upon Procedures Engagements',
            'Internal Audit Services',
            'Tax Audit (tax audits for small businesses)',
            'Due Diligence (Financial and Tax)',
            'Compilation (Preparation of Financial Statements)'
          ],
          forWhomTitle: 'Who Are Our Audit Services For?',
          targetList: [
            'For companies legally required to undergo a statutory audit',
            'For small and medium businesses',
            'For investors and creditors',
            'For company owners and management',
            'For non-profit (non-commercial) legal entities'
          ],
          whyUsTitle: 'Why "Assist" as Your Audit Partner?',
          reasonIndependence: 'Independence and Objectivity',
          reasonQualifiedAuditors: 'Qualified and Certified Auditors',
          reasonRiskBased: 'Risk-Based Approach',
          reasonRecommendations: 'Constructive Recommendations',
          finalCtaTitle: "Ensure Your Business's Financial Transparency with \"Assist\"!",
          finalCtaText: 'Contact "Assist" for a consultation on audit services.',
          ctaRequestService: 'Request Audit Services',
          ctaContact: 'Contact Us',
        },
        // Business Assist Service Page (6.2. Business Assist - English Version)
        business: { // Replaces "Business Consulting"
          h1: 'Starting and Optimizing Your Business in Georgia: Company Registration and Tax Statuses',
          intro: '"Assist" offers comprehensive business assistant services, including swift company registration in Georgia, as well as assistance in obtaining advantageous tax statuses such as micro business status Georgia, small business status, international company status Georgia, and others. We simplify business formation Tbilisi and Georgia LLC formation.',
          whyUseTitle: 'Why Use "Assist\'s" Business Assistant Services?',
          benefitTimeSaving: 'Time Savings',
          benefitCorrectChoice: 'Correct Choices and Error Prevention',
          benefitSimplification: 'Process Simplification',
          benefitComprehensiveSupport: 'Comprehensive Support',
          benefitConsultation: 'Consultation and Clarification',
          servicesIncludeTitle: 'Our Business Assistant Services Include:',
          registrationTitle: 'Company Registration in Georgia (legal form selection, founding documents, registry, bank account)',
          statusAssistanceTitle: 'Assistance in Obtaining Special Tax Statuses:',
          statusList: [
            'Micro Business Status Georgia',
            'Small Business Status',
            'Fixed Tax Payer Status',
            'International Company Status Georgia',
            'Virtual Zone Person (VZP) Status',
            'Free Industrial Zone (FIZ) Enterprise Status'
          ],
          howToStartTitle: 'How to Get Started? (3 steps: Consultation, Strategy, Process Management)',
          finalCtaTitle: 'Start or Expand Your Business in Georgia Easily and Effectively!',
          finalCtaText: "Take advantage of Georgia's attractive business environment and tax benefits.",
          ctaRequestConsultation: 'Request Consultation to Start a Business',
          ctaLearnMoreStatuses: 'Learn More About Statuses',
        },
        // HR Service Page (Generated Content)
        hr: {
          h1: 'Professional HR Services for Your Business Growth and Employee Satisfaction',
          intro: 'At "Assist," we understand that a company\'s most valuable asset is its employees. Our HR Services team offers comprehensive solutions in human resources management to help you attract, retain, and develop talent, as well as create an effective and motivated work environment.',
          whyImportantTitle: 'Why is Professional HR Support Important?',
          benefitTalent: 'Talent Acquisition and Retention: Finding the best candidates in a competitive market and keeping them with your company.',
          benefitCompliance: 'Compliance with Labor Legislation: Accurate adherence to complex labor relations and legal nuances.',
          benefitMotivation: 'Employee Motivation and Development: Increasing productivity and enhancing employee loyalty.',
          benefitCulture: 'Strengthening Company Culture: Fostering a positive and productive work atmosphere.',
          servicesIncludeTitle: '"Assist\'s" HR Services Include:',
          serviceList: [
            'Personnel Selection and Recruitment',
            'Preparation and Administration of Employment Contracts',
            'Development of Salary and Benefit Systems',
            'Employee Appraisal and Development Systems',
            'Training and Qualification Enhancement',
            'Management of Labor Relations and Consultations',
            'Corporate Culture Development'
          ],
          finalCtaTitle: 'Develop Your Team with "Assist"!',
          finalCtaText: 'Contact us to discuss your company\'s HR needs and develop a customized strategy.',
          ctaRequestConsultation: 'Request HR Consultation',
          ctaContact: 'Contact Us',
        },
      },

      // Team (Generated Content)
      team: {
        h1: 'Meet the "Assist" Team of Professionals',
        intro: 'The main driving force behind "Assist\'s" success is our team – experienced, motivated, and client-oriented professionals ready to provide you with top-level service. We are proud of our diverse team, where each member enriches our common cause with their unique knowledge and experience.',
        valuesTitle: 'Our Team Values:',
        valueUnity: 'Unity and Collaboration: We believe that the best results are achieved through teamwork.',
        valueGrowth: 'Professional Growth: We constantly help each other develop and acquire new knowledge.',
        valueRespect: 'Respect and Support: We create an environment where everyone feels valued and supported.',
        valueInnovation: 'Innovative Thinking: We encourage new ideas and creative approaches.',
        membersSectionTitle: 'Team Member Introductions', // Placeholder
        // e.g. member1Name: 'Nino Sharashenidze', ...
        finalCtaTitle: 'Want to Become a Part of Our Team?',
        finalCtaText: 'If you share our values and want to grow in an environment of professionals, check out our vacancies.',
        ctaCareer: 'Careers at "Assist"',
        ctaOpenPositions: 'Open Positions',
      },

      // Career (Generated Content)
      career: {
        h1: 'Build Your Successful Career with "Assist"',
        intro: '"Assist" is a place where talented and ambitious people grow and develop. We are looking for professionals who want to become part of our friendly and dynamic team, contribute to the company\'s success, and reach their own career peaks.',
        whyAssistTitle: 'Why "Assist"?',
        benefitDevelopment: 'Professional Development Opportunities: We invest in the development of our employees, offering training, seminars, and the chance to work on challenging, interesting projects.',
        benefitCompensation: 'Competitive Salary and Benefits: We offer a decent salary and benefits package that matches your qualifications and experience.',
        benefitEnvironment: 'Supportive and Collaborative Environment: We are a team where mutual respect, help, and knowledge sharing are valued.',
        benefitContribution: 'Meaningful Contribution: Your work will directly impact the success of our clients and the development of the company.',
        openPositionsTitle: 'Open Positions',
        // e.g. vacancy1Title: 'Junior Auditor', ...
        noVacancyNote: 'We currently have no active vacancies, but you can send us your CV, and we will keep it for future opportunities.',
        ctaSendCv: 'Send CV',
        finalCtaTitle: 'Ready to Start a New Career Adventure?',
        finalCtaText: 'Join "Assist" and become a part of success!',
        ctaViewAllVacancies: 'View All Vacancies',
        ctaContactHr: 'Contact HR Department',
      },

      // Contact Page (7.2. Contact Us - English Version)
      contact: {
        h1: 'Get in Touch - We\'re Ready to Help!',
        intro: 'Do you have questions about our services? The "Assist" team is ready to answer all your questions. Contact us through any channel convenient for you!',
        infoTitle: 'Our Contact Information:',
        addressLabel: 'Address:',
        addressValue: '[Your Full Address]', // Placeholder
        phoneLabel: 'Phone:',
        phoneValue: '[Your Contact Number]', // Placeholder
        emailLabel: 'Email:',
        emailValue: '[e.g., info@assist.ge]', // Placeholder
        workingHoursLabel: 'Working Hours:',
        workingHoursValue: 'Monday - Friday: [09:00 - 18:00]', // Placeholder
        formTitle: 'Send Us a Message',
        fieldName: 'Name', // Changed from "First Name", "Last Name" for simplicity with one field
        fieldEmail: 'Email',
        fieldPhone: 'Phone',
        fieldCompany: 'Company',
        fieldSubject: 'Subject',
        fieldMessage: 'Message',
        ctaSend: 'Send',
        socialMediaTitle: 'Social Media:', // Placeholder
        finalMessage: 'We look forward to hearing from you.',
      },

      // Footer
      footer: {
        description: 'ASSIST - Leading company in business services in Georgia',
        quickLinks: 'Quick Links',
        services: 'Services',
        copyright: '© 2025 ASSIST. All rights reserved.',
        status: 'Status',
        support: 'Support',
        privacy: 'Privacy',
        terms: 'Terms',
        cookiePolicy: 'Cookie Policy'
      },

      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        confirm: 'Confirm',
        learnMore: 'Learn More'
      }
    };
Object.assign(translation.servicesOverview, { hr: siteCopy.en.hr });
Object.assign(translation.contact, siteCopy.en.contact);
export default translation;
