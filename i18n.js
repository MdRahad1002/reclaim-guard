// ================================
// Internationalization (i18n) Module
// Geo-based language detection for DE/AT/CH visitors
// ================================

const TRANSLATIONS = {
  en: {
    // SEO page title & meta description (swapped dynamically)
    seo_title: 'Crypto, Forex & Investment Scam Recovery | ReclaimGuard Legal',
    seo_desc: 'Lost money to a crypto, forex or investment scam, a fake trading platform, or a romance or pig-butchering fraud? ReclaimGuard Legal traces stolen funds and pursues recovery through blockchain forensics and legal action. Free case review. UK, EU and US. No win, no fee; outcomes are never guaranteed.',
    og_title: 'Crypto, Forex & Investment Scam Recovery | ReclaimGuard Legal',
    og_desc: 'Lost money to a crypto, forex, investment or fake trading-platform scam? We trace stolen funds and pursue recovery. Free case review. UK, EU and US. No win, no fee.',
    meta_keywords: 'crypto scam recovery, forex scam recovery, recover money from forex scam, forex broker scam, investment scam recovery, investment fraud recovery, recover money from investment scam, fake trading platform recovery, recover stolen bitcoin, pig butchering scam recovery, romance scam money recovery, bank transfer scam recovery, APP fraud reimbursement, chargeback fraud recovery, how to get money back from online scam, recover funds from scam broker, blockchain fraud recovery',

    // Nav
    nav_home: 'Home',
    nav_services: 'Services',
    nav_technology: 'Technology',
    nav_about: 'About',
    nav_testimonials: 'Fraud Types',
    nav_contact: 'Contact',
    nav_blog: 'Blog',
    nav_cta: 'Free Consultation',
    verify_title: 'You were scammed once. Here\'s how to know we\'re genuine.',
    verify_subtitle: 'Fraud victims are often targeted a second time by fake "recovery" services. Before trusting anyone, including us, verify their credentials and watch for these red flags.',
    verify_cred_title: 'Verify our credentials',
    verify_safety: '100% confidential. We speak with you by phone, and we never ask for any payment to release your money. Be wary of any recovery service that only chats or asks for upfront fees.',
    verify_cred_html: '<li>Regulated by the <strong>Solicitors Regulation Authority</strong>, check <strong>SRA No.&nbsp;830575</strong> on the <a href="https://www.sra.org.uk/consumers/register/" target="_blank" rel="noopener" style="color:var(--primary-color);font-weight:600;">SRA register</a>.</li><li>Registered in England &amp; Wales, <strong>Company No.&nbsp;13438429</strong> on <a href="https://find-and-update.company-information.service.gov.uk/company/13438429" target="_blank" rel="noopener" style="color:var(--primary-color);font-weight:600;">Companies House</a>.</li><li>Registered office: <strong>Altrincham, WA14&nbsp;4DR, England</strong>.</li><li>Always confirm a firm&rsquo;s regulation before you share details or send documents.</li>',
    verify_never_title: 'What we will never do',
    objfaq_title: 'Still wondering if we can help you?',
    objfaq_subtitle: 'The questions people ask us most, before they get in touch.',
    chain_title: 'How we trace stolen funds',
    chain_subtitle: 'A simplified view of a real investigation. Every case is different, and outcomes are never guaranteed.',
    chain_n1: 'Your payment',
    chain_n2: 'Scammer wallet or account',
    chain_n3: 'Exchange or off-ramp',
    chain_n4: 'KYC & freeze request',
    offer_title: 'We help you recover money lost to crypto, forex, investment and bank scams',
    offer_lead: 'We trace where your money went and pursue it back through chargebacks, bank recalls, exchange action and legal claims. Your case review is free, and it is no win, no fee.',
    offer_1_title: 'Trace',
    offer_1_text: 'We follow the money with blockchain forensics and payment-trail investigation.',
    offer_2_title: 'Recover',
    offer_2_text: 'Chargebacks, bank recalls, exchange freezes and legal action to pursue your funds.',
    offer_3_title: 'Free to start',
    offer_3_text: 'Free, confidential case review. No win, no fee, a success fee only if we recover.',
    objfaq_html: '<details><summary>Is it too late to do anything?</summary><div>Often not. Payment records and blockchain transactions are permanent, and legal steps can still be taken months later. The sooner you act the better, but older cases are still worth assessing.</div></details><details><summary>I paid by bank transfer, can that be recovered?</summary><div>Possibly. Bank-transfer (APP) fraud may be recoverable, and since October 2024 UK banks must reimburse many victims. If your bank has refused, that decision can be challenged.</div></details><details><summary>I paid in Bitcoin or crypto, is it gone for good?</summary><div>Not automatically. Crypto can usually be traced on the blockchain to the exchange it reached; recovery then depends on legal action. Tracing is possible; recovery is never guaranteed.</div></details><details><summary>I was told to pay an AML or tax fee, is that normal?</summary><div>No. No legitimate platform charges a fee to release your own money, that is part of the scam. Stop paying and have your case assessed.</div></details><details><summary>The broker or website has disappeared, is there any point?</summary><div>Yes. Even when a site vanishes, the money trail and payment records usually remain, and that is exactly what an investigation follows.</div></details>',
    verify_never_html: '<li>We will <strong>never</strong> ask you to pay a fee, &ldquo;tax&rdquo; or &ldquo;release&rdquo; charge to withdraw your own money.</li><li>We will <strong>never</strong> guarantee recovery, anyone who promises a guaranteed result is not being honest.</li><li>We will <strong>never</strong> ask you to pay in cryptocurrency, gift cards, or to a personal account.</li><li>We will <strong>never</strong> cold-call you claiming we have already found your money.</li>',

    // Blog page
    blog_hero_title: 'Fraud Recovery Guides',
    blog_hero_subtitle: 'Expert articles on crypto scam recovery, chargebacks, blockchain forensics, and how to protect yourself online written by our specialist team.',
    blog_a1_cat: 'Action Guide',
    blog_a1_title: 'What to Do in the First 24 Hours After Being Scammed Online',
    blog_a1_excerpt: "The actions you take immediately after discovering you've been scammed can make or break your chances of recovering money. Here's the exact sequence to follow.",
    blog_a1_author: 'ReclaimGuard Legal Team · 12 May 2026',
    blog_a1_url: '/blog/what-to-do-after-being-scammed',
    blog_a2_cat: 'Scam Awareness',
    blog_a2_title: 'How to Spot a Crypto Recovery Scam Before You Lose More Money',
    blog_a2_excerpt: 'Fraudsters know you\'re desperate and target victims a second time with fake recovery services. Learn the red flags that separate legitimate firms from scammers.',
    blog_a2_author: 'ReclaimGuard Legal Team · 9 May 2026',
    blog_a2_url: '/blog/how-to-spot-crypto-recovery-scam',
    blog_a3_cat: 'Scam Awareness',
    blog_a3_title: 'The 5 Most Common Crypto Scams in 2026 (And How to Avoid Them)',
    blog_a3_excerpt: 'From pig-butchering romance scams to fake crypto exchanges, these five fraud types are responsible for the majority of crypto losses worldwide. Know what to look for.',
    blog_a3_author: 'ReclaimGuard Legal Team · 6 May 2026',
    blog_a3_url: '/blog/most-common-crypto-scams-2026',
    blog_a4_cat: 'Recovery Methods',
    blog_a4_title: 'What Is a Chargeback and Can It Get Your Money Back from a Scam?',
    blog_a4_excerpt: 'A chargeback is one of the most effective tools for recovering money lost to online fraud but there are strict rules, deadlines, and limits. Here\'s everything you need to know.',
    blog_a4_author: 'ReclaimGuard Legal Team · 2 May 2026',
    blog_a4_url: '/blog/what-is-a-chargeback',
    blog_a5_cat: 'Blockchain Forensics',
    blog_a5_title: 'How Blockchain Forensics Can Trace Stolen Cryptocurrency',
    blog_a5_excerpt: 'Many people believe crypto is untraceable. It isn\'t. Here\'s how professional investigators use blockchain analysis tools to follow stolen funds and build court-ready evidence.',
    blog_a5_author: 'ReclaimGuard Legal Team · 28 Apr 2026',
    blog_a5_url: '/blog/blockchain-forensics-traces-stolen-crypto',
    blog_read_more: 'Read article →',
    home_blog_1_cat: 'Crypto Recovery',
    home_blog_1_title: 'Can I Recover My Crypto? An Honest Guide to What\'s Possible',
    home_blog_1_excerpt: 'Can you get scammed crypto back? Sometimes and it depends on a few specific factors. Here\'s the honest answer and what to do now.',
    home_blog_2_cat: 'Recovery Methods',
    home_blog_2_title: 'How to Get Your Money Back After Being Scammed Online',
    home_blog_2_excerpt: 'A step-by-step guide to recovering money lost to a scam whether you paid by card, bank transfer, or crypto.',
    home_blog_3_cat: 'Scam Awareness',
    home_blog_3_title: 'Fake Trading Platform Won\'t Let You Withdraw? Here\'s What to Do',
    home_blog_3_excerpt: 'Being blocked from withdrawing, or asked to pay "tax" or "fees" first? That\'s a classic scam. Here\'s how to respond.',
    home_blog_4_cat: 'Action Guide',
    home_blog_4_title: 'What to Do in the First 24 Hours After Being Scammed Online',
    home_blog_4_excerpt: 'The steps you take immediately after being scammed are critical. Stop payments, preserve evidence, and report here\'s exactly how.',
    home_blog_5_cat: 'Scam Awareness',
    home_blog_5_title: 'How to Spot a Crypto Recovery Scam Before You Lose More Money',
    home_blog_5_excerpt: 'Fraudulent recovery firms target victims a second time. Learn the 7 red flags that expose fake services.',
    home_blog_6_cat: 'Blockchain Forensics',
    home_blog_6_title: 'How Blockchain Forensics Can Trace Stolen Cryptocurrency',
    home_blog_6_excerpt: 'Blockchain transactions are public and permanent. Here\'s exactly how investigators trace stolen funds to exchanges.',

    // Hero
    hero_badge: 'Legal + Cybersecurity Expertise',
    situation_title: 'Does any of this sound familiar?',
    situation_lead: 'If you recognise your situation below, you\'re in the right place. Our legal and blockchain investigation team can assess your case for free no obligation, and no win, no fee.',
    situation_1: 'A trading or investment platform <strong>won\'t let you withdraw</strong> your money',
    situation_2: 'You\'re asked to pay <strong>&ldquo;tax&rdquo;, &ldquo;AML&rdquo;, &ldquo;liquidity&rdquo; or &ldquo;release&rdquo; fees</strong> before you can withdraw',
    situation_3: 'Your broker or &ldquo;account manager&rdquo; has <strong>stopped replying</strong> or disappeared',
    situation_4: 'Your account was suddenly <strong>frozen</strong>, or your withdrawal is stuck &ldquo;pending&rdquo;',
    situation_5: 'You sent <strong>crypto</strong> to an investment you now believe was a scam',
    situation_6: 'Someone you met online <strong>encouraged you to invest</strong> and the money is gone',
    situation_cta: 'Get a Free Case Review',
    situation_note: 'Confidential · No obligation · Response within 24 hours',
    hero_trust_1: 'Free & confidential',
    hero_trust_2: 'No win, no fee',
    hero_trust_3: 'Response within 24 hours',
    hero_trust_4: 'SRA-regulated (No. 830575)',
    trust_compliance_label: 'Compliance & Regulatory Standards',
    trust_b1_html: '<strong>SRA Regulated</strong><br><small>Solicitors Regulation Authority No. 830575</small>',
    trust_b2_html: '<strong>Operates under UK law</strong><br><small>All services governed by English &amp; Welsh law</small>',
    trust_b3_html: '<strong>Blockchain Forensics</strong><br><small>Industry-standard blockchain analytics tools</small>',
    trust_b4_html: '<strong>EU GDPR Compliant</strong><br><small>EU data protection standards</small>',
    faq_title: 'Common Questions About Recovering Money from Scams',
    faq_subtitle: 'Honest answers from our fraud recovery specialists',
    faq_q1: 'Can I recover money lost in a crypto scam?',
    faq_a1: 'Yes, in many cases funds can be traced and partially or fully recovered through blockchain forensics, legal action, and regulatory complaints. Recovery success depends on how quickly you act, the payment method, and which exchanges received the funds. We offer a free case review to give you an honest assessment.',
    faq_q2: 'Can I get my money back from a pig-butchering scam?',
    faq_a2: 'Pig-butchering scams involve funds sent to cryptocurrency wallets. Our investigators trace the funds through the blockchain to the exchange account where they landed. We then submit a legal freeze request to that exchange backed by a forensic report. The sooner you act after the scam, the higher the recovery chances.',
    faq_q3: 'I sent money by bank transfer to a scammer can I get it back?',
    faq_a3: 'Yes. Bank transfers to scammers may be recoverable through Authorised Push Payment (APP) fraud claims. Under UK PSR 2024 rules, banks must reimburse eligible APP fraud victims up to £85,000. We prepare and submit the full fraud complaint on your behalf. Recall requests are most effective in the first 72 hours; contact us immediately.',
    faq_q4: 'Is it too late to get my money back if it happened months ago?',
    faq_a4: 'Not necessarily. Chargeback time limits are typically 120 days from the transaction date. Blockchain forensic investigations and legal recovery actions can be pursued for years. APP fraud claims can also be filed retrospectively. Contact us for a free review even if time has passed, there are often still viable options.',
    faq_q5: 'Do I have to pay upfront for fraud recovery services?',
    faq_a5: 'No. We work on a no win, no fee basis the initial case review is completely free, and you only pay a success fee of 10-15% if funds are actually recovered. There is no upfront payment. <strong>Warning: any company demanding thousands upfront before doing any work is almost certainly a scam.</strong>',
    faq_q6: 'Can I report a crypto scam if I don\'t know who the scammer is?',
    faq_a6: 'Yes. You only need the wallet address you sent funds to. Our forensics process traces the transaction trail to identify exchange accounts, which hold identity data. We then pursue the account holder\'s identity through legal channels and report to Action Fraud (UK), FBI IC3 (US), and Europol as appropriate.',
    blog_title: 'Fraud Recovery Guides',
    blog_subtitle: 'Expert articles to help you understand your options and protect yourself',
    blog_view_all: 'View All Articles →',
    disclaimer_h4: 'Legal Disclaimer',
    footer_regnotice: 'ReclaimGuard Legal is a licensed body authorised for all legal services. Regulated by the Solicitors Regulation Authority (SRA No. 830575). Registered in England and Wales (Company No. 13438429). Registered address: Altrincham, WA14 4DR, England.',
    footer_disclaimer: '<strong>Legal Disclaimer:</strong> ReclaimGuard Legal is a licensed body authorised for all legal services, regulated by the Solicitors Regulation Authority (SRA No. 830575), registered in England and Wales (Company No. 13438429). Recovery outcomes vary based on evidence, case age, payment method, and third-party institution responses. No guaranteed outcome is promised.',
    hero_title: 'Lost money to an online trading platform or crypto scam?',
    hero_subtitle: 'If your withdrawal has been blocked, or you have been asked to pay AML, tax or "release" fees, our SRA-regulated legal and blockchain investigation team can assess your case, free, and on a no win, no fee basis.',
    hero_btn_primary: 'Check If My Case Is Recoverable',
    hero_btn_secondary: 'How Recovery Works',

    // Stats
    stat_legal: 'Legal',
    stat_legal_label: 'Action Experts',
    stat_crypto: 'Crypto',
    stat_crypto_label: 'Tracing Specialists',
    stat_coverage: 'EU/UK/US',
    stat_coverage_label: 'International Coverage',
    stat_gdpr: 'GDPR',
    stat_gdpr_label: 'Compliant',

    // Trust badges
    badge_1: 'Legal + Cybersecurity Expertise',
    badge_2: 'Blockchain & Banking Tracing',
    badge_3: 'Action Against Scammers',
    badge_4: 'Full Transparency',

    // Services
    services_title: 'Our Core Services',
    services_subtitle: 'Evidence-based recovery procedures combining legal action and digital forensics',
    service1_title: 'Crypto Recovery & Blockchain Tracing',
    service1_desc: 'We trace transactions on Bitcoin, Ethereum, BNB Chain, Solana, and 100+ networks. We identify wallets, exchanges, transaction clusters, and off-ramps used by scammers.',
    service1_f1: 'Blockchain reports',
    service1_f2: 'Evidence files',
    service1_f3: 'Exchange escalation',
    service1_f4: 'Legal freeze requests',
    service2_title: 'Card Fraud & Chargeback Recovery',
    service2_desc: 'We handle unauthorized charges, merchant disputes, subscription scams, friendly fraud, and fake trading platforms.',
    service2_f1: 'Case documentation',
    service2_f2: 'Evidence assembly',
    service2_f3: 'Full chargeback dispute filing',
    service2_f4: 'Merchant negotiations',
    service3_title: 'Bank Transfer Recovery',
    service3_desc: 'We assist victims of push-payment scams, investment platforms, business email compromise, and cross-border transfers.',
    service3_f1: 'Recall requests',
    service3_f2: 'Fraud incident reports',
    service3_f3: 'Complaints to financial authorities',
    service3_f4: 'International fund tracing',
    service4_title: 'OSINT & Fraud Investigation Reports',
    service4_desc: 'We collect digital footprints, IP traces, social media identifiers, domain ownership, and corporate shell data.',
    service4_f1: 'Scammer identification',
    service4_f2: 'Digital evidence collection',
    service4_f3: 'Support for police investigations',
    service4_f4: 'Court-ready documentation',
    service5_title: 'Legal Letters & Regulatory Complaints',
    service5_desc: 'We draft and send formal legal notices, complaints to national regulators, exchange compliance escalation, and platform takedown requests.',
    service5_f1: 'Cease & desist notices',
    service5_f2: 'Regulatory complaints',
    service5_f3: 'Exchange enforcement',
    service5_f4: 'Platform reporting',
    service6_title: 'Cases We Handle',
    service6_desc: 'Romance scams, fake trading platforms, Ponzi schemes, NFT fraud, phishing attacks, identity theft, unauthorized transactions, and business email compromise.',
    service6_f1: 'Crypto investment scams',
    service6_f2: 'Romance & pig butchering scams',
    service6_f3: 'Fake forex/binary options',
    service6_f4: 'Card & bank fraud',

    // Methodology
    method_title: 'Our Methodology',
    method_intro: 'We combine legal expertise, compliance knowledge, and advanced cybersecurity investigation techniques to trace stolen assets and initiate structured recovery procedures.',
    method1_title: 'Blockchain Analytics',
    method1_desc: 'We trace transactions on Bitcoin, Ethereum, BNB Chain, Solana, and 100+ networks. Identify wallets, exchanges, and transaction clusters used by scammers.',
    method2_title: 'Bank Dispute Protocols',
    method2_desc: 'We file recall requests, fraud incident reports, and complaints to financial authorities following strict banking dispute procedures.',
    method3_title: 'Chargeback Procedures',
    method3_desc: 'Expert handling of card disputes including unauthorized charges, merchant fraud, and subscription scams with complete documentation.',
    method4_title: 'Open-Source Intelligence',
    method4_desc: 'Digital forensics and OSINT to collect evidence including IP traces, social media identifiers, and domain ownership data.',
    method5_title: 'Digital Forensics',
    method5_desc: 'Professional evidence collection and documentation suitable for law enforcement, courts, and regulatory authorities.',
    method6_title: 'Regulatory Escalation',
    method6_desc: 'We escalate cases to banks, issuers, exchanges, and financial regulators with proper legal documentation and compliance procedures.',
    stat_blockchains: '100+',
    stat_blockchains_label: 'Blockchains Covered',
    stat_intl: 'EU/UK/US',
    stat_intl_label: 'International Coverage',
    stat_gdpr2: 'GDPR',
    stat_gdpr2_label: 'Data Compliant',

    // Process
    process_title: 'How Recovery Works',
    process_subtitle: 'Evidence-based, transparent 5-step recovery process',
    step1_title: 'Case Review (Free)',
    step1_desc: 'We evaluate documents, transactions, and fraud scenario. No obligation, no upfront payment.',
    step2_title: 'Evidence Collection',
    step2_desc: 'We map all transactions, addresses, accounts, and digital traces with professional forensic tools.',
    step3_title: 'Recovery Strategy',
    step3_desc: 'We decide the correct route: Chargeback, bank recall, exchange freeze, legal action, or regulator complaint.',
    step4_title: 'Execution',
    step4_desc: 'We prepare and file all official documents and pursue recovery through proper legal and financial channels.',
    step5_title: 'Ongoing Tracking',
    step5_desc: 'Updates, forensic reports, compliance responses, and appeal steps. Full transparency throughout.',

    // About
    about_title: 'About ReclaimGuard Legal',
    about_text1: 'ReclaimGuard Legal is an SRA-regulated digital-fraud recovery firm. We combine legal action with blockchain forensics to trace stolen assets and pursue structured recovery.',
    about_text2: 'Our mission is simple: Help victims regain control, restore justice, and recover their assets.',
    about_f1_title: 'Realistic Expectations',
    about_f1_desc: 'We operate with strict ethical standards and realistic expectations. We do not promise guaranteed recovery. We provide structured, professional recovery service with transparent results.',
    about_f2_title: 'International Reach',
    about_f2_desc: 'Operating across EU, UK, USA, Canada, and Australia. We handle cross-border fraud cases with proper jurisdiction knowledge.',
    about_f3_title: 'Evidence-Based Approach',
    about_f3_desc: 'Professional evidence collection, digital forensics, and documentation suitable for law enforcement, courts, and regulatory authorities.',
    about_f4_title: 'Full Transparency',
    about_f4_desc: 'Clear reports, documented evidence, realistic timelines. No hidden fees, no false promises. Professional service from start to finish.',
    pricing_title: 'Transparent Pricing',
    cert1: 'Free Case Review',
    cert2: 'No Win, No Fee',
    cert3: '10-15% Success Fee (only on recovery)',
    cert4: 'GDPR Compliant',
    stats_time: '2-12 Weeks',
    stats_time_label: 'Typical Case Timeline',
    stats_min: '€250+',
    stats_min_label: 'Minimum Case Size',
    stats_chains: '100+',
    stats_chains_label: 'Blockchains Covered',
    stats_cov: 'EU/UK/US',
    stats_cov_label: 'Coverage Areas',

    // Testimonials -> Types of fraud we handle
    test_title: 'Types of Fraud We Handle',
    test_subtitle: 'We assist victims across a wide range of online financial fraud. Recovery outcomes depend on the specifics of each case and are never guaranteed.',

    // FAQ
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Common questions about cryptocurrency recovery and our services',
    faq1_q: 'Can cryptocurrency really be traced and recovered?',
    faq1_a: 'Often, yes traceable. While cryptocurrency is often thought to be anonymous, the blockchain creates a permanent record of transactions. Using industry-standard blockchain forensic tools, we can trace cryptocurrency through complex transaction paths and identify where it ends up, then take legal action to pursue freezing and recovery of the funds where possible. Tracing does not guarantee recovery.',
    faq2_q: 'How long does the recovery process take?',
    faq2_a: 'The timeline varies depending on the complexity of your case. Simple cases where funds remain on exchanges may be resolved in 2-4 months. More complex cases involving multiple jurisdictions or sophisticated money laundering may take 6-12 months.',
    faq3_q: 'What tools do you use to trace stolen cryptocurrency?',
    faq3_a: 'We use industry-standard blockchain analytics tools alongside our own investigative methods to trace cryptocurrency transactions across multiple blockchains, identify links to known services and exchanges, and build evidence to support legal action and regulatory complaints. These tools do not guarantee recovery, but they strengthen the investigation.',
    faq4_q: 'What are your fees and payment terms?',
    faq4_a: 'We offer a free initial consultation to assess your case. Our fee structure is typically based on a combination of fixed fees for investigation work and success-based fees for recovered amounts. We discuss all fees transparently before you engage our services.',
    faq5_q: 'What types of scams do you handle?',
    faq5_a: 'We handle all types of cryptocurrency and financial fraud including: fake crypto exchanges, investment scams, Ponzi schemes, romance/pig butchering scams, fake brokers, NFT scams, DeFi exploits, business email compromise, wire fraud, and unauthorized banking transactions.',
    faq6_q: 'Do you work internationally?',
    faq6_a: 'Yes. Cryptocurrency fraud often crosses borders, and our international network enables us to work with legal authorities, exchanges, and financial institutions worldwide to maximize recovery chances.',
    faq7_q: 'What information do you need to start my case?',
    faq7_a: 'To begin, we need: details of how you were scammed, transaction records (bank statements, cryptocurrency transaction IDs, wallet addresses), any communications with the fraudsters, and documentation of your investments.',
    faq8_q: 'Is my case confidential?',
    faq8_a: 'Absolutely. All information you share with us is protected and will not be disclosed without your consent, except where required by law or necessary to pursue your recovery case.',

    // Contact
    contact_title: 'Get a Free Consultation',
    contact_intro: 'Fill in the form to begin your case review. Free consultation, no obligation. We provide realistic assessments and transparent service.',
    contact_phone_label: 'Phone',
    contact_phone_note: 'Response within 24 hours',
    contact_email_label: 'Email',
    contact_email_note: 'Response within 24 hours',
    contact_coverage_label: 'Coverage',
    contact_coverage_val: 'EU, UK, USA, Canada, Australia',
    contact_coverage_note: 'International fraud cases',
    contact_pricing_label: 'Pricing',
    contact_pricing_val: 'Free Case Review<br>No Win, No Fee<br>10-15% Success Fee (only on recovery)',
    disclaimer_title: '⚠️ Legal Disclaimer',
    disclaimer_text: 'ReclaimGuard Legal is a licensed body regulated by the SRA (No. 830575). We provide forensic investigation services and dispute support. No guaranteed outcome is promised. Recovery depends on evidence, case age, payment method, and third-party compliance.',

    // Form
    form_title: 'Free Case Evaluation',
    form_subtitle: "Fill out the form below and we'll contact you within 24 hours",
    form_name: 'Full Name *',
    form_email: 'Email Address *',
    form_phone: 'Phone Number *',
    form_amount: 'How much money did you lose? *',
    form_amount_placeholder: 'Select amount range',
    form_amount_0: 'Under 1,000',
    form_amount_1: '1,000 – 5,000',
    form_amount_2: '5,000 – 25,000',
    form_amount_3: '25,000 – 100,000',
    form_amount_4: 'Over 100,000',
    form_scamtype: 'What type of fraud did you experience? *',
    form_scamtype_placeholder: 'Select fraud type',
    form_scamtype_crypto: 'Crypto scam',
    form_scamtype_broker: 'Fake trading platform',
    form_scamtype_bank: 'Bank transfer scam',
    form_scamtype_card: 'Card fraud',
    form_scamtype_other: 'Other',
    form_when: 'When did the incident happen? (optional)',
    form_when_placeholder: 'Select timeframe',
    form_when_7: 'Within 7 days',
    form_when_14: '1-4 weeks',
    form_when_3m: '1-3 months',
    form_when_36m: '3-6 months',
    form_when_612m: '6-12 months',
    form_when_1y: 'Over 1 year',
    form_payment: 'How did you pay? (optional)',
    form_payment_placeholder: 'Select payment method',
    form_payment_crypto: 'Crypto',
    form_payment_card: 'Card',
    form_payment_bank: 'Bank transfer',
    form_payment_other: 'Other',
    form_message: 'Short description of what happened (optional)',
    form_message_placeholder: 'Briefly describe the fraud incident...',
    form_consent: 'I understand that ReclaimGuard Legal provides investigation services and that no guaranteed outcome is promised. I consent to being contacted about my case.',
    form_submit: 'Check If My Case Is Recoverable',
    form_urgency: 'The sooner an investigation begins, the greater the chance of preserving evidence and tracing funds.',
    form_reassure_html: '<li>&#10003; Free case review</li><li>&#10003; Confidential</li><li>&#10003; No obligation</li><li>&#10003; No guaranteed outcome promised</li>',
    form_step1_indicator: 'Step 1 of 2 · Your case',
    form_step2_indicator: 'Step 2 of 2 · Your details',
    form_continue: 'Continue →',
    form_back: '← Back',
    form_note: '🔒 GDPR compliant. All data handled confidentially. No upfront payment required for case review.',

    // Footer
    footer_desc: 'Specialized digital-fraud recovery firm combining legal expertise and cybersecurity investigation. We trace stolen assets and initiate structured recovery procedures.',
    footer_services: 'Services',
    footer_company: 'Company',
    footer_contact: 'Contact',
    footer_about: 'About Us',
    footer_methodology: 'Our Methodology',
    footer_who: 'Who We Help',
    footer_contact_us: 'Contact Us',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms & Conditions',
    footer_copy: '© 2026 ReclaimGuard Legal. All rights reserved.',
    footer_disclaimer: 'ReclaimGuard Legal is a licensed body authorised for all legal services, regulated by the Solicitors Regulation Authority (SRA No. 830575), registered in England and Wales (Company No. 13438429). We provide forensic investigation services, dispute support, and legal recovery procedures. No guaranteed outcome is promised.',

    fab_label: 'Free Consultation',
    lang_switcher_label: 'Deutsch',

    // Team section
    team_title: 'Our Team',
    team_subtitle: 'A multidisciplinary team of legal consultants, blockchain analysts, and compliance specialists',
    team1_role: 'Legal & Regulatory Team',
    team1_bio: 'Solicitors and legal consultants handling fraud disputes, chargeback claims and regulatory complaints under English & Welsh law, as an SRA-regulated body.',
    team1_tag1: 'Legal Strategy', team1_tag2: 'Regulatory Complaints',
    team2_role: 'Blockchain Investigation Team',
    team2_bio: 'Analysts who trace stolen cryptocurrency across wallets, exchanges and networks using industry-standard blockchain forensics tools.',
    team2_tag1: 'Blockchain Forensics', team2_tag2: 'Crypto Tracing',
    team3_role: 'Digital Forensics Team',
    team3_bio: 'Specialists in OSINT and evidence collection, preparing documentation suitable for banks, exchanges and legal proceedings.',
    team3_tag1: 'OSINT', team3_tag2: 'Digital Evidence',
    team4_role: 'Client Care & Compliance',
    team4_bio: 'GDPR-compliant case handling and client communication throughout the process, in English and German.',
    team4_tag1: 'GDPR Compliance', team4_tag2: 'Client Care',

    // Media section

    // Rating widget
    rating_platform: '⭐ Client Reviews',
    rating_count: 'Based on 214 verified reviews',
    rating_h1: 'Verified Reviews', rating_t1: 'All reviews verified via email',
    rating_h2: 'Confidential', rating_t2: 'Client identities protected',
    rating_h3: 'Transparent', rating_t3: 'Honest results reported',

    // About image overlay
    overlay_lbl1: 'Regulated',
    overlay_lbl2: 'International Coverage',
    overlay_lbl3: 'Compliant',

    // Form success state
    success_title: 'Case Received',
    success_msg: 'Thank you for reaching out. We have received your case details and will get back to you within 24 hours.',
    success_step1: 'Our team reviews your case details',
    success_step2: 'We assess recovery options',
    success_step3: 'You receive a personalised response within 24h',
    success_note: 'Check your email inbox a confirmation is on its way.',

    // Thank-you page
    ty_title: 'Case Received',
    ty_subtitle: 'Thank you for reaching out to ReclaimGuard Legal. We have received your case details and our team will review them shortly.',
    ty_step1_title: 'Case Review',
    ty_step1_desc: 'Our specialists review the details you provided and assess the best recovery options.',
    ty_step2_title: 'Initial Consultation',
    ty_step2_desc: 'We will contact you within 24 hours to discuss your case and next steps.',
    ty_step3_title: 'Recovery Plan',
    ty_step3_desc: 'You receive a personalised recovery strategy no upfront commitment required.',
    ty_highlight: '<strong>Check your inbox</strong> a confirmation email is on its way. If you don\'t see it within a few minutes, please check your spam folder.',
    ty_btn_home: '← Back to Home',
    ty_btn_another: 'Submit Another Case',
    ty_back: '← Back to Home',
    ty_copy: '© 2026 ReclaimGuard Legal. All rights reserved.',

    // Footer certifications & service links
    footer_cert_gdpr: 'GDPR Compliant',
    footer_cert_cov: 'EU/UK/US Coverage',
    footer_s1: 'Crypto Recovery',
    footer_s2: 'Card Fraud & Chargebacks',
    footer_s3: 'Bank Transfer Recovery',
    footer_s4: 'OSINT Investigations',
    footer_s5: 'Legal Letters',
    footer_s6: 'Regulatory Complaints',

    // Testimonial card content
    test1_text: 'Crypto investment scams, fake investment platforms and \u201cguaranteed return\u201d crypto schemes that disappear with victims\u2019 deposits.',
    test1_location: '',
    test2_text: 'Fake trading platforms & brokers, bogus forex, CFD and crypto brokers that block withdrawals or vanish overnight.',
    test2_location: '',
    test3_text: 'DeFi & NFT fraud, rug pulls, fraudulent DeFi protocols and NFT scams spread across multiple blockchains.',
    test3_location: '',
    test4_text: 'Business email compromise, invoice-redirection and wire fraud targeting companies and their suppliers.',
    test4_location: '',
    test5_text: 'Ponzi & fake mining schemes, \u201cpassive income\u201d and cloud-mining operations that pay out until they collapse.',
    test5_location: '',
    test6_text: 'Pig-butchering & romance fraud, long-term social-engineering scams that pressure victims into fake crypto or forex investments.',
    test6_location: '',
  },

  de: {
    // SEO page title & meta description (swapped dynamically)
    seo_title: 'Rückgewinnung bei Krypto-, Forex- & Anlagebetrug | ReclaimGuard Legal',
    seo_desc: 'Geld durch Krypto-, Forex- oder Anlagebetrug, eine gefälschte Handelsplattform oder Romance-/Pig-Butchering-Betrug verloren? ReclaimGuard Legal verfolgt gestohlene Gelder mittels Blockchain-Forensik und rechtlicher Schritte. Kostenlose Fallprüfung. UK, EU und US. Kein Erfolg, keine Gebühr; Ergebnisse sind nie garantiert.',
    og_title: 'Rückgewinnung bei Krypto-, Forex- & Anlagebetrug | ReclaimGuard Legal',
    og_desc: 'Geld durch Krypto-, Forex-, Anlage- oder Trading-Plattform-Betrug verloren? Wir verfolgen gestohlene Gelder und die Rückgewinnung. Kostenlose Fallprüfung. UK, EU und US. Kein Erfolg, keine Gebühr.',
    meta_keywords: 'Krypto-Betrug Geld zurückholen, Forex-Betrug Rückgewinnung, Geld von Forex-Broker zurückholen, Forex-Broker-Betrug, Anlagebetrug Rückgewinnung, Geld von Anlagebetrug zurückholen, gefälschte Handelsplattform Geld zurück, gestohlene Bitcoin zurückholen, Pig-Butchering-Betrug, Romance-Scam Geld zurück, Überweisungsbetrug Rückgewinnung, Rückbuchung bei Betrug, Geld nach Online-Betrug zurückbekommen, Krypto-Betrug Hilfe, Blockchain-Betrug Ermittlung',

    // Nav
    nav_home: 'Startseite',
    nav_services: 'Leistungen',
    nav_technology: 'Methodik',
    nav_about: 'Über uns',
    nav_testimonials: 'Betrugsarten',
    nav_contact: 'Kontakt',
    nav_blog: 'Blog',
    nav_cta: 'Kostenlose Beratung',
    verify_title: 'Sie wurden einmal betrogen. So erkennen Sie, dass wir seriös sind.',
    verify_subtitle: 'Betrugsopfer werden oft ein zweites Mal von gefälschten "Wiederbeschaffungs"-Diensten ins Visier genommen. Bevor Sie jemandem vertrauen, auch uns, überprüfen Sie die Zulassung und achten Sie auf diese Warnzeichen.',
    verify_cred_title: 'Überprüfen Sie unsere Zulassung',
    verify_safety: '100% vertraulich. Wir sprechen persönlich mit Ihnen am Telefon und verlangen niemals eine Zahlung, um Ihr Geld freizugeben. Seien Sie vorsichtig bei jedem Wiederbeschaffungsdienst, der nur chattet oder Vorabgebühren verlangt.',
    verify_cred_html: '<li>Reguliert durch die <strong>Solicitors Regulation Authority</strong>, prüfen Sie <strong>SRA-Nr.&nbsp;830575</strong> im <a href="https://www.sra.org.uk/consumers/register/" target="_blank" rel="noopener" style="color:var(--primary-color);font-weight:600;">SRA-Register</a>.</li><li>Eingetragen in England &amp; Wales, <strong>Handelsregister-Nr.&nbsp;13438429</strong> bei <a href="https://find-and-update.company-information.service.gov.uk/company/13438429" target="_blank" rel="noopener" style="color:var(--primary-color);font-weight:600;">Companies House</a>.</li><li>Eingetragener Sitz: <strong>Altrincham, WA14&nbsp;4DR, England</strong>.</li><li>Überprüfen Sie immer die Zulassung einer Kanzlei, bevor Sie Daten oder Dokumente weitergeben.</li>',
    verify_never_title: 'Was wir niemals tun',
    objfaq_title: 'Fragen Sie sich noch, ob wir Ihnen helfen können?',
    objfaq_subtitle: 'Die häufigsten Fragen, bevor Menschen uns kontaktieren.',
    chain_title: 'So verfolgen wir gestohlene Gelder',
    chain_subtitle: 'Eine vereinfachte Darstellung einer echten Ermittlung. Jeder Fall ist anders, und Ergebnisse sind nie garantiert.',
    chain_n1: 'Ihre Zahlung',
    chain_n2: 'Wallet oder Konto des Betrügers',
    chain_n3: 'Börse oder Auszahlungsstelle',
    chain_n4: 'KYC- & Sperr-Anfrage',
    offer_title: 'Wir helfen Ihnen, Geld zurückzuholen, das durch Krypto-, Forex-, Anlage- und Bankbetrug verloren ging',
    offer_lead: 'Wir verfolgen, wohin Ihr Geld geflossen ist, und holen es zurück, über Rückbuchungen, Bankrückrufe, Maßnahmen bei Börsen und rechtliche Schritte. Die Fallprüfung ist kostenlos, nach dem Prinzip No Win, No Fee.',
    offer_1_title: 'Verfolgen',
    offer_1_text: 'Wir folgen dem Geld mit Blockchain-Forensik und Zahlungsspur-Ermittlung.',
    offer_2_title: 'Zurückholen',
    offer_2_text: 'Rückbuchungen, Bankrückrufe, Börsen-Sperren und rechtliche Schritte, um Ihre Gelder zu verfolgen.',
    offer_3_title: 'Kostenlos starten',
    offer_3_text: 'Kostenlose, vertrauliche Fallprüfung. No Win, No Fee, eine Erfolgsgebühr nur bei Rückgewinnung.',
    objfaq_html: '<details><summary>Ist es zu spät, noch etwas zu tun?</summary><div>Oft nicht. Zahlungsbelege und Blockchain-Transaktionen sind dauerhaft, und rechtliche Schritte sind auch nach Monaten noch möglich. Je früher Sie handeln, desto besser, aber auch ältere Fälle lohnen eine Prüfung.</div></details><details><summary>Ich habe per Banküberweisung gezahlt, ist das rückholbar?</summary><div>Möglicherweise. Betrug per Banküberweisung (APP) kann rückholbar sein, und seit Oktober 2024 müssen britische Banken viele Opfer entschädigen. Wenn Ihre Bank abgelehnt hat, lässt sich das anfechten.</div></details><details><summary>Ich habe in Bitcoin oder Krypto gezahlt, ist es endgültig weg?</summary><div>Nicht automatisch. Krypto lässt sich meist über die Blockchain bis zur Ziel-Börse verfolgen; die Rückgewinnung hängt dann von rechtlichen Schritten ab. Verfolgung ist möglich, Rückgewinnung nie garantiert.</div></details><details><summary>Ich sollte eine AML- oder Steuergebühr zahlen, ist das normal?</summary><div>Nein. Keine seriöse Plattform verlangt eine Gebühr, um Ihr eigenes Geld freizugeben, das ist Teil des Betrugs. Zahlen Sie nicht weiter und lassen Sie Ihren Fall prüfen.</div></details><details><summary>Der Broker oder die Website ist verschwunden, hat das noch Zweck?</summary><div>Ja. Selbst wenn eine Seite verschwindet, bleiben die Geldspur und Zahlungsbelege meist erhalten, genau dem folgt eine Ermittlung.</div></details>',
    verify_never_html: '<li>Wir werden Sie <strong>niemals</strong> auffordern, eine Gebühr, &ldquo;Steuer&rdquo; oder &ldquo;Freigabegebühr&rdquo; zu zahlen, um Ihr eigenes Geld abzuheben.</li><li>Wir <strong>garantieren niemals</strong> eine Wiederbeschaffung, wer ein garantiertes Ergebnis verspricht, ist nicht ehrlich.</li><li>Wir werden Sie <strong>niemals</strong> bitten, in Kryptowährung, mit Geschenkkarten oder auf ein privates Konto zu zahlen.</li><li>Wir werden Sie <strong>niemals</strong> unaufgefordert anrufen und behaupten, wir hätten Ihr Geld bereits gefunden.</li>',

    // Blog page
    blog_hero_title: 'Betrugsrückgewinnungs-Ratgeber',
    blog_hero_subtitle: 'Expertenbeiträge über Krypto-Betrugsrückgewinnung, Rückbuchungen, Blockchain-Forensik und Schutz vor Online-Betrug, verfasst von unserem Spezialistenteam.',
    blog_a1_cat: 'Aktionsleitfaden',
    blog_a1_title: 'Was tun in den ersten 24 Stunden nach einem Online-Betrug?',
    blog_a1_excerpt: 'Die Schritte, die Sie unmittelbar nach einem Betrug unternehmen, entscheiden darüber, ob Sie Ihr Geld zurückbekommen. Hier ist die genaue Reihenfolge, die Sie befolgen sollten.',
    blog_a1_author: 'ReclaimGuard Legal Team · 12. Mai 2026',
    blog_a1_url: '/blog/de/was-tun-nach-betrug',
    blog_a2_cat: 'Betrugsaufklärung',
    blog_a2_title: 'Krypto-Rückgewinnungsbetrug erkennen, bevor Sie noch mehr Geld verlieren',
    blog_a2_excerpt: 'Betrüger wissen, dass Sie verzweifelt sind, und nehmen Opfer ein zweites Mal ins Visier. Lernen Sie die Warnsignale, die legitime Firmen von Betrügern unterscheiden.',
    blog_a2_author: 'ReclaimGuard Legal Team · 9. Mai 2026',
    blog_a2_url: '/blog/de/krypto-rueckgewinnungsbetrug-erkennen',
    blog_a3_cat: 'Betrugsaufklärung',
    blog_a3_title: 'Die 5 häufigsten Krypto-Betrugsmaschen 2026 (und wie Sie sich schützen)',
    blog_a3_excerpt: 'Von Pig-Butchering-Betrug bis zu gefälschten Kryptobörsen, diese fünf Betrugstypen sind für den Großteil der Kryptoverluste weltweit verantwortlich.',
    blog_a3_author: 'ReclaimGuard Legal Team · 6. Mai 2026',
    blog_a3_url: '/blog/de/haeufigste-krypto-betrugsmaschen-2026',
    blog_a4_cat: 'Rückgewinnungsmethoden',
    blog_a4_title: 'Was ist eine Rückbuchung und kann sie mein Geld nach einem Betrug zurückbringen?',
    blog_a4_excerpt: 'Eine Rückbuchung ist eines der wirkungsvollsten Instrumente für Betrugsopfer, aber es gibt strenge Regeln, Fristen und Einschränkungen. Alles, was Sie wissen müssen.',
    blog_a4_author: 'ReclaimGuard Legal Team · 2. Mai 2026',
    blog_a4_url: '/blog/de/was-ist-eine-rueckbuchung',
    blog_a5_cat: 'Blockchain-Forensik',
    blog_a5_title: 'Wie Blockchain-Forensik gestohlene Kryptowährung verfolgen kann',
    blog_a5_excerpt: 'Viele glauben, Krypto sei nicht verfolgbar. Das stimmt nicht. Erfahren Sie, wie Ermittler Blockchain-Analysetools einsetzen, um gestohlene Gelder zu verfolgen.',
    blog_a5_author: 'ReclaimGuard Legal Team · 28. Apr. 2026',
    blog_a5_url: '/blog/de/blockchain-forensik-krypto-verfolgen',
    blog_read_more: 'Artikel lesen →',
    home_blog_1_cat: 'Krypto-Rückgewinnung',
    home_blog_1_title: 'Kann ich meine Kryptowährung zurückbekommen? Ein ehrlicher Leitfaden',
    home_blog_1_excerpt: 'Kann man betrogene Krypto zurückbekommen? Manchmal, und es hängt von einigen konkreten Faktoren ab. Hier ist die ehrliche Antwort und was jetzt zu tun ist.',
    home_blog_2_cat: 'Rückgewinnungsmethoden',
    home_blog_2_title: 'Wie Sie nach einem Online-Betrug Ihr Geld zurückbekommen',
    home_blog_2_excerpt: 'Eine Schritt-für-Schritt-Anleitung zur Rückgewinnung von Geld nach einem Betrug, egal ob Sie per Karte, Banküberweisung oder Krypto gezahlt haben.',
    home_blog_3_cat: 'Betrugsaufklärung',
    home_blog_3_title: 'Trading-Plattform lässt keine Auszahlung zu? Das sollten Sie tun',
    home_blog_3_excerpt: 'Auszahlung blockiert oder Aufforderung, zuerst „Steuern“ oder „Gebühren“ zu zahlen? Das ist ein klassischer Betrug. So reagieren Sie richtig.',
    home_blog_4_cat: 'Handlungsleitfaden',
    home_blog_4_title: 'Was in den ersten 24 Stunden nach einem Online-Betrug zu tun ist',
    home_blog_4_excerpt: 'Die Schritte, die Sie unmittelbar nach einem Betrug unternehmen, sind entscheidend. Zahlungen stoppen, Beweise sichern und melden, hier erfahren Sie genau wie.',
    home_blog_5_cat: 'Betrugsaufklärung',
    home_blog_5_title: 'Krypto-Rückgewinnungsbetrug erkennen, bevor Sie mehr Geld verlieren',
    home_blog_5_excerpt: 'Betrügerische Rückgewinnungsfirmen nehmen Opfer ein zweites Mal ins Visier. Lernen Sie die 7 Warnzeichen, die gefälschte Dienste entlarven.',
    home_blog_6_cat: 'Blockchain-Forensik',
    home_blog_6_title: 'Wie Blockchain-Forensik gestohlene Kryptowährung verfolgen kann',
    home_blog_6_excerpt: 'Blockchain-Transaktionen sind öffentlich und dauerhaft. Hier erfahren Sie genau, wie Ermittler gestohlene Gelder bis zu Börsen verfolgen.',

    // Hero
    hero_badge: 'Rechtliche + Cybersicherheits-Expertise',
    situation_title: 'Kommt Ihnen das bekannt vor?',
    situation_lead: 'Wenn Sie Ihre Situation unten wiedererkennen, sind Sie hier richtig. Unser Team aus Rechts- und Blockchain-Ermittlern prüft Ihren Fall kostenlos und unverbindlich, nach dem Prinzip kein Erfolg, keine Gebühr.',
    situation_1: 'Eine Trading- oder Anlageplattform <strong>lässt Sie Ihr Geld nicht auszahlen</strong>',
    situation_2: 'Sie sollen <strong>&bdquo;Steuer&ldquo;-, &bdquo;AML&ldquo;-, &bdquo;Liquiditäts&ldquo;- oder &bdquo;Freigabe&ldquo;-Gebühren</strong> zahlen, bevor Sie auszahlen können',
    situation_3: 'Ihr Broker oder &bdquo;Account-Manager&ldquo; <strong>antwortet nicht mehr</strong> oder ist verschwunden',
    situation_4: 'Ihr Konto wurde plötzlich <strong>eingefroren</strong>, oder Ihre Auszahlung hängt &bdquo;in Bearbeitung&ldquo; fest',
    situation_5: 'Sie haben <strong>Krypto</strong> an eine Anlage gesendet, die Sie jetzt für Betrug halten',
    situation_6: 'Jemand, den Sie online kennengelernt haben, hat Sie <strong>zu einer Investition gedrängt</strong>, und das Geld ist weg',
    situation_cta: 'Kostenlose Fallprüfung anfordern',
    situation_note: 'Vertraulich · Unverbindlich · Antwort innerhalb von 24 Stunden',
    hero_trust_1: 'Kostenlos & vertraulich',
    hero_trust_2: 'Kein Erfolg, keine Gebühr',
    hero_trust_3: 'Antwort innerhalb von 24 Stunden',
    hero_trust_4: 'SRA-reguliert (Nr. 830575)',
    trust_compliance_label: 'Compliance & regulatorische Standards',
    trust_b1_html: '<strong>SRA-reguliert</strong><br><small>Solicitors Regulation Authority Nr. 830575</small>',
    trust_b2_html: '<strong>Tätig nach UK-Recht</strong><br><small>Alle Leistungen unterliegen dem Recht von England &amp; Wales</small>',
    trust_b3_html: '<strong>Blockchain-Forensik</strong><br><small>Branchenübliche Blockchain-Analysetools</small>',
    trust_b4_html: '<strong>EU-DSGVO-konform</strong><br><small>EU-Datenschutzstandards</small>',
    faq_title: 'Häufige Fragen zur Rückgewinnung von Geld nach Betrug',
    faq_subtitle: 'Ehrliche Antworten von unseren Spezialisten für Betrugsrückgewinnung',
    faq_q1: 'Kann ich Geld zurückbekommen, das ich bei einem Krypto-Betrug verloren habe?',
    faq_a1: 'Ja, in vielen Fällen lassen sich Gelder nachverfolgen und teilweise oder vollständig zurückgewinnen, durch Blockchain-Forensik, rechtliche Schritte und Beschwerden bei Aufsichtsbehörden. Der Erfolg hängt davon ab, wie schnell Sie handeln, von der Zahlungsmethode und davon, welche Börsen die Gelder erhalten haben. Wir bieten eine kostenlose Fallprüfung für eine ehrliche Einschätzung.',
    faq_q2: 'Kann ich mein Geld nach einem Pig-Butchering-Betrug zurückbekommen?',
    faq_a2: 'Bei Pig-Butchering-Betrug werden Gelder an Krypto-Wallets gesendet. Unsere Ermittler verfolgen die Gelder über die Blockchain bis zum Börsenkonto, auf dem sie gelandet sind. Anschließend stellen wir bei dieser Börse einen rechtlichen Antrag auf Einfrieren, gestützt auf einen forensischen Bericht. Je schneller Sie nach dem Betrug handeln, desto höher sind die Chancen auf Rückgewinnung.',
    faq_q3: 'Ich habe per Banküberweisung Geld an einen Betrüger gesendet, kann ich es zurückbekommen?',
    faq_a3: 'Ja. Banküberweisungen an Betrüger können über Ansprüche wegen autorisierter Push-Zahlungen (APP-Betrug) rückerstattbar sein. Nach den britischen PSR-Regeln von 2024 müssen Banken berechtigte APP-Betrugsopfer bis zu 85.000 £ entschädigen. Wir erstellen und reichen die vollständige Betrugsbeschwerde für Sie ein. Rückrufanträge sind in den ersten 72 Stunden am wirksamsten; kontaktieren Sie uns sofort.',
    faq_q4: 'Ist es zu spät, mein Geld zurückzubekommen, wenn es Monate her ist?',
    faq_a4: 'Nicht unbedingt. Fristen für Rückbuchungen liegen typischerweise bei 120 Tagen ab dem Transaktionsdatum. Blockchain-forensische Ermittlungen und rechtliche Rückgewinnungsmaßnahmen können jedoch über Jahre verfolgt werden. APP-Betrugsansprüche lassen sich auch nachträglich einreichen. Kontaktieren Sie uns für eine kostenlose Prüfung, auch wenn Zeit vergangen ist, oft gibt es noch sinnvolle Optionen.',
    faq_q5: 'Muss ich für Betrugsrückgewinnungsdienste im Voraus bezahlen?',
    faq_a5: 'Nein. Wir arbeiten nach dem Prinzip kein Erfolg, keine Gebühr, die erste Fallprüfung ist völlig kostenlos, und Sie zahlen nur eine Erfolgsgebühr von 10-15 %, wenn Gelder tatsächlich zurückgewonnen werden. Es gibt keine Vorauszahlung. <strong>Warnung: Jedes Unternehmen, das Tausende im Voraus verlangt, bevor es überhaupt tätig wird, ist mit ziemlicher Sicherheit ein Betrug.</strong>',
    faq_q6: 'Kann ich einen Krypto-Betrug melden, wenn ich nicht weiß, wer der Betrüger ist?',
    faq_a6: 'Ja. Sie benötigen nur die Wallet-Adresse, an die Sie Gelder gesendet haben. Unser Forensik-Prozess verfolgt die Transaktionsspur, um Börsenkonten zu identifizieren, die Identitätsdaten enthalten. Anschließend verfolgen wir die Identität des Kontoinhabers über rechtliche Wege und melden den Fall bei Action Fraud (UK), FBI IC3 (US) und Europol, sofern angebracht.',
    blog_title: 'Ratgeber zur Betrugsrückgewinnung',
    blog_subtitle: 'Fachartikel, die Ihnen helfen, Ihre Optionen zu verstehen und sich zu schützen',
    blog_view_all: 'Alle Artikel ansehen →',
    disclaimer_h4: 'Rechtlicher Hinweis',
    footer_regnotice: 'ReclaimGuard Legal ist eine für alle Rechtsdienstleistungen zugelassene Körperschaft. Reguliert durch die Solicitors Regulation Authority (SRA-Nr. 830575). Eingetragen in England und Wales (Handelsregister-Nr. 13438429). Eingetragene Anschrift: Altrincham, WA14 4DR, England.',
    footer_disclaimer: '<strong>Rechtlicher Hinweis:</strong> ReclaimGuard Legal ist eine für alle Rechtsdienstleistungen zugelassene Körperschaft, reguliert durch die Solicitors Regulation Authority (SRA-Nr. 830575), eingetragen in England und Wales (Handelsregister-Nr. 13438429). Rückgewinnungsergebnisse variieren je nach Beweislage, Alter des Falls, Zahlungsmethode und Reaktion dritter Institutionen. Es wird kein garantiertes Ergebnis versprochen.',
    hero_title: 'Geld an eine Online-Trading-Plattform oder einen Krypto-Betrug verloren?',
    hero_subtitle: 'Wenn Ihre Auszahlung blockiert wurde oder Sie aufgefordert wurden, AML-, Steuer- oder „Freigabe"-Gebühren zu zahlen, kann unser SRA-reguliertes Team aus Juristen und Blockchain-Ermittlern Ihren Fall prüfen, kostenlos und nach dem Prinzip „No Win, No Fee".',
    hero_btn_primary: 'Prüfen, ob mein Fall lösbar ist',
    hero_btn_secondary: 'So funktioniert die Rückgewinnung',

    // Stats
    stat_legal: 'Rechtliche',
    stat_legal_label: 'Experten',
    stat_crypto: 'Krypto',
    stat_crypto_label: 'Tracing-Spezialisten',
    stat_coverage: 'EU/UK/DE',
    stat_coverage_label: 'Internationale Abdeckung',
    stat_gdpr: 'DSGVO',
    stat_gdpr_label: 'Konform',

    // Trust badges
    badge_1: 'Rechtliche + Cybersicherheits-Expertise',
    badge_2: 'Blockchain- & Bankverfolgung',
    badge_3: 'Vorgehen gegen Betrüger',
    badge_4: 'Vollständige Transparenz',

    // Services
    services_title: 'Unsere Kernleistungen',
    services_subtitle: 'Faktenbasierte Rückgewinnungsverfahren, die rechtliche Maßnahmen und digitale Forensik kombinieren',
    service1_title: 'Krypto-Rückgewinnung & Blockchain-Tracing',
    service1_desc: 'Wir verfolgen Transaktionen auf Bitcoin, Ethereum, BNB Chain, Solana und 100+ Netzwerken. Wir identifizieren Wallets, Börsen, Transaktionscluster und Auszahlungswege von Betrügern.',
    service1_f1: 'Blockchain-Berichte',
    service1_f2: 'Beweisdateien',
    service1_f3: 'Eskalation bei Börsen',
    service1_f4: 'Rechtliche Einfrierungsanträge',
    service2_title: 'Kartenbetrug & Rückbuchungsrückgewinnung',
    service2_desc: 'Wir bearbeiten nicht autorisierte Abbuchungen, Händlerstreitigkeiten, Abonnementbetrug, Friendly Fraud und gefälschte Handelsplattformen.',
    service2_f1: 'Falldokumentation',
    service2_f2: 'Beweismittelsammlung',
    service2_f3: 'Vollständige Rückbuchungseinreichung',
    service2_f4: 'Händlerverhandlungen',
    service3_title: 'Banküberweisung Rückgewinnung',
    service3_desc: 'Wir unterstützen Opfer von Push-Payment-Betrug, Investitionsplattformen, Business-E-Mail-Kompromittierung und grenzüberschreitenden Überweisungen.',
    service3_f1: 'Rückrufanträge',
    service3_f2: 'Betrugsberichte',
    service3_f3: 'Beschwerden bei Finanzbehörden',
    service3_f4: 'Internationale Geldverfolgung',
    service4_title: 'OSINT & Betrugsermittlungsberichte',
    service4_desc: 'Wir sammeln digitale Spuren, IP-Verfolgungen, Social-Media-Identifikatoren, Domain-Eigentümerschaft und Daten zu Firmenmänteln.',
    service4_f1: 'Betrügeridentifikation',
    service4_f2: 'Digitale Beweissicherung',
    service4_f3: 'Unterstützung bei Polizeiermittlungen',
    service4_f4: 'Gerichtsfertige Dokumentation',
    service5_title: 'Rechtliche Schreiben & Aufsichtsbeschwerden',
    service5_desc: 'Wir verfassen und versenden formelle rechtliche Hinweise, Beschwerden an nationale Aufsichtsbehörden, Eskalationen bei Börsen und Plattform-Takedown-Anfragen.',
    service5_f1: 'Unterlassungsaufforderungen',
    service5_f2: 'Aufsichtsbeschwerden',
    service5_f3: 'Börsendurchsetzung',
    service5_f4: 'Plattformmeldungen',
    service6_title: 'Fälle, die wir bearbeiten',
    service6_desc: 'Liebesbetrug, gefälschte Handelsplattformen, Schneeballsysteme, NFT-Betrug, Phishing-Angriffe, Identitätsdiebstahl, nicht autorisierte Transaktionen und Business-E-Mail-Kompromittierung.',
    service6_f1: 'Krypto-Investitionsbetrug',
    service6_f2: 'Liebesbetrug & Pig-Butchering-Betrug',
    service6_f3: 'Gefälschte Forex-/Binäroptionen',
    service6_f4: 'Karten- & Bankbetrug',

    // Methodology
    method_title: 'Unsere Methodik',
    method_intro: 'Wir kombinieren Rechtskenntnisse, Compliance-Wissen und fortschrittliche Cybersicherheitsermittlungstechniken, um gestohlene Vermögenswerte zu verfolgen und strukturierte Rückgewinnungsverfahren einzuleiten.',
    method1_title: 'Blockchain-Analyse',
    method1_desc: 'Wir verfolgen Transaktionen auf Bitcoin, Ethereum, BNB Chain, Solana und 100+ Netzwerken. Wir identifizieren Wallets, Börsen und Transaktionscluster von Betrügern.',
    method2_title: 'Bankstreitprotokolle',
    method2_desc: 'Wir stellen Rückrufanträge, Betrugsberichte und Beschwerden bei Finanzbehörden gemäß strengen Bankstreitverfahren.',
    method3_title: 'Rückbuchungsverfahren',
    method3_desc: 'Fachkundige Bearbeitung von Kartenstreitigkeiten einschließlich nicht autorisierter Abbuchungen, Händlerbetrug und Abonnementbetrug mit vollständiger Dokumentation.',
    method4_title: 'Open-Source-Intelligenz',
    method4_desc: 'Digitale Forensik und OSINT zur Beweissicherung, einschließlich IP-Verfolgungen, Social-Media-Identifikatoren und Domain-Eigentümerdaten.',
    method5_title: 'Digitale Forensik',
    method5_desc: 'Professionelle Beweissicherung und -dokumentation, geeignet für Strafverfolgungsbehörden, Gerichte und Aufsichtsbehörden.',
    method6_title: 'Regulatorische Eskalation',
    method6_desc: 'Wir eskalieren Fälle an Banken, Emittenten, Börsen und Finanzregulatoren mit ordnungsgemäßer rechtlicher Dokumentation und Compliance-Verfahren.',
    stat_blockchains: '100+',
    stat_blockchains_label: 'Blockchains abgedeckt',
    stat_intl: 'EU/UK/DE',
    stat_intl_label: 'Internationale Abdeckung',
    stat_gdpr2: 'DSGVO',
    stat_gdpr2_label: 'Datenschutz-konform',

    // Process
    process_title: 'So funktioniert die Rückgewinnung',
    process_subtitle: 'Faktenbasierter, transparenter 5-Schritte-Rückgewinnungsprozess',
    step1_title: 'Fallprüfung (Kostenlos)',
    step1_desc: 'Wir bewerten Dokumente, Transaktionen und das Betrugsszenario. Keine Verpflichtung, keine Vorauszahlung.',
    step2_title: 'Beweissicherung',
    step2_desc: 'Wir erfassen alle Transaktionen, Adressen, Konten und digitale Spuren mit professionellen Forensik-Tools.',
    step3_title: 'Rückgewinnungsstrategie',
    step3_desc: 'Wir legen den richtigen Weg fest: Rückbuchung, Bankrückruf, Börsensperrung, rechtliche Schritte oder Behördenbeschwerde.',
    step4_title: 'Ausführung',
    step4_desc: 'Wir bereiten alle offiziellen Dokumente vor und reichen sie ein und verfolgen die Rückgewinnung über ordnungsgemäße Rechts- und Finanzkanäle.',
    step5_title: 'Laufende Verfolgung',
    step5_desc: 'Aktualisierungen, Forensikberichte, Compliance-Antworten und Rechtsmittelschritte. Vollständige Transparenz während des gesamten Prozesses.',

    // About
    about_title: 'Über ReclaimGuard Legal',
    about_text1: 'ReclaimGuard Legal ist ein SRA-reguliertes Unternehmen zur Rückgewinnung bei digitalem Betrug. Wir kombinieren rechtliche Schritte mit Blockchain-Forensik, um gestohlene Vermögenswerte zu verfolgen und strukturiert zurückzuholen.',
    about_text2: 'Unsere Mission ist einfach: Opfern helfen, die Kontrolle zurückzugewinnen, Gerechtigkeit herzustellen und ihre Vermögenswerte zurückzubekommen.',
    about_f1_title: 'Realistische Erwartungen',
    about_f1_desc: 'Wir arbeiten nach strengen ethischen Standards und mit realistischen Erwartungen. Wir versprechen keine garantierte Rückgewinnung. Wir bieten strukturierten, professionellen Rückgewinnungsservice mit transparenten Ergebnissen.',
    about_f2_title: 'Internationale Reichweite',
    about_f2_desc: 'Tätig in der EU, UK, USA, Kanada und Australien. Wir bearbeiten grenzüberschreitende Betrugsfälle mit fundiertem Jurisdiktionswissen.',
    about_f3_title: 'Faktenbasierter Ansatz',
    about_f3_desc: 'Professionelle Beweissicherung, digitale Forensik und Dokumentation, geeignet für Strafverfolgungsbehörden, Gerichte und Aufsichtsbehörden.',
    about_f4_title: 'Vollständige Transparenz',
    about_f4_desc: 'Klare Berichte, dokumentierte Beweise, realistische Zeitpläne. Keine versteckten Gebühren, keine falschen Versprechen. Professioneller Service von Anfang bis Ende.',
    pricing_title: 'Transparente Preise',
    cert1: 'Kostenlose Fallprüfung',
    cert2: 'Kein Erfolg, keine Gebühr',
    cert3: 'Nur 10–15% Erfolgsgebühr (nur bei Rückgewinnung)',
    cert4: 'DSGVO-konform',
    stats_time: '2–12 Wochen',
    stats_time_label: 'Typische Fallbearbeitungsdauer',
    stats_min: '€250+',
    stats_min_label: 'Minimale Fallgröße',
    stats_chains: '100+',
    stats_chains_label: 'Blockchains abgedeckt',
    stats_cov: 'EU/UK/DE',
    stats_cov_label: 'Abgedeckte Regionen',

    // Testimonials
    test_title: 'Betrugsarten, die wir bearbeiten',
    test_subtitle: 'Wir unterstützen Opfer bei einer Vielzahl von Online-Finanzbetrug. Die Erfolgsaussichten hängen vom Einzelfall ab und können nie garantiert werden.',

    // FAQ
    faq_title: 'Häufig gestellte Fragen',
    faq_subtitle: 'Häufige Fragen zur Kryptowährungs-Rückgewinnung und unseren Leistungen',
    faq1_q: 'Kann Kryptowährung wirklich verfolgt und zurückgewonnen werden?',
    faq1_a: 'Oft ist eine Verfolgung möglich. Obwohl Kryptowährung oft als anonym gilt, erstellt die Blockchain eine permanente Aufzeichnung der Transaktionen. Mit branchenüblichen Blockchain-Forensik-Tools können wir Kryptowährungen durch komplexe Transaktionspfade verfolgen und herausfinden, wo sie enden, und anschließend rechtliche Schritte einleiten, um nach Möglichkeit auf das Einfrieren und die Rückgewinnung der Mittel hinzuwirken. Eine Verfolgung garantiert keine Rückgewinnung.',
    faq2_q: 'Wie lange dauert der Rückgewinnungsprozess?',
    faq2_a: 'Der Zeitrahmen hängt von der Komplexität Ihres Falls ab. Einfache Fälle, bei denen die Mittel noch auf Börsen sind, können in 2–4 Monaten gelöst werden. Komplexere Fälle mit mehreren Rechtssystemen oder ausgeklügelter Geldwäsche können 6–12 Monate dauern.',
    faq3_q: 'Welche Tools verwenden Sie, um gestohlene Kryptowährung zu verfolgen?',
    faq3_a: 'Wir setzen branchenübliche Blockchain-Analysetools zusammen mit unseren eigenen Ermittlungsmethoden ein, um Kryptowährungstransaktionen über mehrere Blockchains zu verfolgen, Verbindungen zu bekannten Diensten und Börsen zu identifizieren und Beweise für rechtliche Schritte und regulatorische Beschwerden aufzubereiten. Diese Tools garantieren keine Rückgewinnung, stärken aber die Ermittlung.',
    faq4_q: 'Was sind Ihre Gebühren und Zahlungsbedingungen?',
    faq4_a: 'Wir bieten eine kostenlose Erstberatung zur Bewertung Ihres Falls. Unsere Gebührenstruktur basiert typischerweise auf einer Kombination aus Festgebühren für Ermittlungsarbeiten und erfolgsbasierten Gebühren für zurückgewonnene Beträge.',
    faq5_q: 'Welche Arten von Betrug bearbeiten Sie?',
    faq5_a: 'Wir bearbeiten alle Arten von Kryptowährungs- und Finanzbetrug, einschließlich: gefälschte Krypto-Börsen, Investitionsbetrug, Schneeballsysteme, Liebes-/Pig-Butchering-Betrug, gefälschte Broker, NFT-Betrug, DeFi-Exploits, Business-E-Mail-Kompromittierung, Überweisungsbetrug und nicht autorisierte Banktransaktionen.',
    faq6_q: 'Arbeiten Sie international?',
    faq6_a: 'Ja. Kryptowährungsbetrug überschreitet oft Grenzen, und unser internationales Netzwerk ermöglicht es uns, mit Rechtsbehörden, Börsen und Finanzinstitutionen weltweit zusammenzuarbeiten, um die Rückgewinnungschancen zu maximieren.',
    faq7_q: 'Welche Informationen benötigen Sie, um meinen Fall zu beginnen?',
    faq7_a: 'Zu Beginn benötigen wir: Details darüber, wie Sie betrogen wurden, Transaktionsnachweise (Kontoauszüge, Kryptowährungs-Transaktions-IDs, Wallet-Adressen), Kommunikation mit den Betrügern und Dokumentation Ihrer Investitionen.',
    faq8_q: 'Ist mein Fall vertraulich?',
    faq8_a: 'Absolut. Alle Informationen, die Sie mit uns teilen, sind geschützt und werden nicht ohne Ihre Zustimmung weitergegeben, außer wenn gesetzlich vorgeschrieben oder zur Verfolgung Ihres Rückgewinnungsfalls notwendig.',

    // Contact
    contact_title: 'Kostenlose Beratung erhalten',
    contact_intro: 'Füllen Sie das Formular aus, um Ihre Fallprüfung zu starten. Kostenlose Beratung, keine Verpflichtung. Wir bieten realistische Einschätzungen und transparenten Service.',
    contact_phone_label: 'Telefon',
    contact_phone_note: 'Antwort innerhalb von 24 Stunden',
    contact_email_label: 'E-Mail',
    contact_email_note: 'Antwort innerhalb von 24 Stunden',
    contact_coverage_label: 'Abdeckung',
    contact_coverage_val: 'EU, UK, USA, Kanada, Australien',
    contact_coverage_note: 'Internationale Betrugsfälle',
    contact_pricing_label: 'Preise',
    contact_pricing_val: 'Kostenlose Fallprüfung<br>Kein Erfolg, keine Gebühr<br>Nur 10–15% Erfolgsgebühr (nur bei Rückgewinnung)',
    disclaimer_title: '⚠️ Rechtlicher Hinweis',
    disclaimer_text: 'ReclaimGuard Legal ist eine von der SRA (Nr. 830575) regulierte zugelassene Körperschaft. Wir erbringen forensische Ermittlungsdienstleistungen und Unterstützung bei Streitigkeiten. Kein garantiertes Ergebnis wird versprochen. Die Rückgewinnung hängt von Beweisen, dem Fallalter, der Zahlungsmethode und der Compliance von Dritten ab.',

    // Form
    form_title: 'Kostenlose Fallbewertung',
    form_subtitle: 'Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden',
    form_name: 'Vollständiger Name *',
    form_email: 'E-Mail-Adresse *',
    form_phone: 'Telefonnummer *',
    form_amount: 'Wie viel Geld haben Sie verloren? *',
    form_amount_placeholder: 'Betrag auswählen',
    form_amount_0: 'Unter 1.000',
    form_amount_1: '1.000 – 5.000',
    form_amount_2: '5.000 – 25.000',
    form_amount_3: '25.000 – 100.000',
    form_amount_4: 'Über 100.000',
    form_scamtype: 'Welche Art von Betrug haben Sie erlebt? *',
    form_scamtype_placeholder: 'Betrugsart auswählen',
    form_scamtype_crypto: 'Krypto-Betrug',
    form_scamtype_broker: 'Gefälschte Handelsplattform',
    form_scamtype_bank: 'Banküberweisung Betrug',
    form_scamtype_card: 'Kartenbetrug',
    form_scamtype_other: 'Sonstiges',
    form_when: 'Wann ereignete sich der Vorfall? (optional)',
    form_when_placeholder: 'Zeitraum auswählen',
    form_when_7: 'Innerhalb von 7 Tagen',
    form_when_14: '1–4 Wochen',
    form_when_3m: '1–3 Monate',
    form_when_36m: '3–6 Monate',
    form_when_612m: '6–12 Monate',
    form_when_1y: 'Über 1 Jahr',
    form_payment: 'Wie haben Sie bezahlt? (optional)',
    form_payment_placeholder: 'Zahlungsmethode auswählen',
    form_payment_crypto: 'Krypto',
    form_payment_card: 'Karte',
    form_payment_bank: 'Banküberweisung',
    form_payment_other: 'Sonstiges',
    form_message: 'Kurze Beschreibung des Vorfalls (optional)',
    form_message_placeholder: 'Beschreiben Sie kurz den Betrugsvorfall...',
    form_consent: 'Ich verstehe, dass ReclaimGuard Legal Ermittlungsdienstleistungen erbringt und kein garantiertes Ergebnis versprochen wird. Ich stimme zu, bezüglich meines Falls kontaktiert zu werden.',
    form_submit: 'Prüfen, ob mein Fall lösbar ist',
    form_urgency: 'Je früher eine Ermittlung beginnt, desto größer die Chance, Beweise zu sichern und Gelder zu verfolgen.',
    form_reassure_html: '<li>&#10003; Kostenlose Fallprüfung</li><li>&#10003; Vertraulich</li><li>&#10003; Unverbindlich</li><li>&#10003; Kein garantiertes Ergebnis</li>',
    form_step1_indicator: 'Schritt 1 von 2 · Ihr Fall',
    form_step2_indicator: 'Schritt 2 von 2 · Ihre Daten',
    form_continue: 'Weiter →',
    form_back: '← Zurück',
    form_note: '🔒 DSGVO-konform. Alle Daten werden vertraulich behandelt. Keine Vorauszahlung für die Fallprüfung erforderlich.',

    // Footer
    footer_desc: 'Spezialisiertes Unternehmen für digitale Betrugsprävention, das Rechtskenntnisse und Cybersicherheitsermittlung kombiniert. Wir verfolgen gestohlene Vermögenswerte und leiten strukturierte Rückgewinnungsverfahren ein.',
    footer_services: 'Leistungen',
    footer_company: 'Unternehmen',
    footer_contact: 'Kontakt',
    footer_about: 'Über uns',
    footer_methodology: 'Unsere Methodik',
    footer_who: 'Wem wir helfen',
    footer_contact_us: 'Kontaktieren Sie uns',
    footer_privacy: 'Datenschutzrichtlinie',
    footer_terms: 'AGB',
    footer_copy: '© 2026 ReclaimGuard Legal. Alle Rechte vorbehalten.',
    footer_disclaimer: 'ReclaimGuard Legal ist eine zugelassene Körperschaft, die für alle Rechtsdienstleistungen zugelassen ist und von der Solicitors Regulation Authority (SRA Nr. 830575) reguliert wird, eingetragen in England und Wales (Unternehmensnr. 13438429). Wir erbringen forensische Ermittlungsdienstleistungen und Unterstützung bei Streitigkeiten. Kein garantiertes Ergebnis wird versprochen.',
    fab_label: 'Kostenlose Beratung',
    lang_switcher_label: 'English',

    // Team section
    team_title: 'Unser Team',
    team_subtitle: 'Ein interdisziplinäres Team aus Rechtsberatern, Blockchain-Analysten und Compliance-Spezialisten',
    team1_role: 'Rechts- & Regulierungsteam',
    team1_bio: 'Anwälte und Rechtsberater, die Betrugsstreitigkeiten, Rückbuchungsansprüche und regulatorische Beschwerden nach englischem und walisischem Recht bearbeiten, als SRA-regulierte Einheit.',
    team1_tag1: 'Rechtsstrategie', team1_tag2: 'Regulatorische Beschwerden',
    team2_role: 'Blockchain-Ermittlungsteam',
    team2_bio: 'Analysten, die gestohlene Kryptowährungen über Wallets, Börsen und Netzwerke hinweg mit branchenüblichen Blockchain-Forensik-Tools verfolgen.',
    team2_tag1: 'Blockchain-Forensik', team2_tag2: 'Krypto-Tracing',
    team3_role: 'Digitales Forensik-Team',
    team3_bio: 'Spezialisten für OSINT und Beweissicherung, die Dokumentation für Banken, Börsen und Gerichtsverfahren aufbereiten.',
    team3_tag1: 'OSINT', team3_tag2: 'Digitale Beweise',
    team4_role: 'Kundenbetreuung & Compliance',
    team4_bio: 'DSGVO-konforme Fallbearbeitung und Kundenkommunikation während des gesamten Prozesses, auf Englisch und Deutsch.',
    team4_tag1: 'DSGVO-Compliance', team4_tag2: 'Kundenbetreuung',

    // Media section

    // Rating widget
    rating_platform: '⭐ Kundenbewertungen',
    rating_count: 'Basierend auf 214 verifizierten Bewertungen',
    rating_h1: 'Verifizierte Bewertungen', rating_t1: 'Alle Bewertungen per E-Mail verifiziert',
    rating_h2: 'Vertraulich', rating_t2: 'Kundenidentitäten geschützt',
    rating_h3: 'Transparent', rating_t3: 'Ehrliche Ergebnisse berichtet',

    // About image overlay
    overlay_lbl1: 'Reguliert',
    overlay_lbl2: 'Internationale Abdeckung',
    overlay_lbl3: 'Konform',

    // Form success state
    success_title: 'Anfrage erhalten',
    success_msg: 'Vielen Dank für Ihre Kontaktaufnahme. Wir haben Ihre Falldaten erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.',
    success_step1: 'Unser Team prüft Ihre Falldetails',
    success_step2: 'Wir analysieren Rückgewinnungsoptionen',
    success_step3: 'Sie erhalten innerhalb von 24 Stunden eine persönliche Antwort',
    success_note: 'Bitte prüfen Sie Ihr E-Mail-Postfach eine Bestätigung ist unterwegs.',

    // Thank-you page
    ty_title: 'Anfrage erhalten',
    ty_subtitle: 'Vielen Dank für Ihre Kontaktaufnahme. Wir haben Ihre Falldaten erhalten und unser Team wird diese in Kürze prüfen.',
    ty_step1_title: 'Fallprüfung',
    ty_step1_desc: 'Unsere Spezialisten prüfen die von Ihnen angegebenen Details und beurteilen die besten Rückgewinnungsoptionen.',
    ty_step2_title: 'Erstberatung',
    ty_step2_desc: 'Wir melden uns innerhalb von 24 Stunden, um Ihren Fall und die nächsten Schritte zu besprechen.',
    ty_step3_title: 'Rückgewinnungsplan',
    ty_step3_desc: 'Sie erhalten eine persönliche Rückgewinnungsstrategie, keine Verpflichtung im Voraus erforderlich.',
    ty_highlight: '<strong>Prüfen Sie Ihr E-Mail-Postfach</strong> eine Bestätigung ist unterwegs. Wenn Sie diese nicht innerhalb weniger Minuten sehen, prüfen Sie bitte Ihren Spam-Ordner.',
    ty_btn_home: '← Zurück zur Startseite',
    ty_btn_another: 'Weiteren Fall einreichen',
    ty_back: '← Zurück zur Startseite',
    ty_copy: '© 2026 ReclaimGuard Legal. Alle Rechte vorbehalten.',

    // Footer certifications & service links
    footer_cert_gdpr: 'DSGVO-konform',
    footer_cert_cov: 'EU/UK/DE Abdeckung',
    footer_s1: 'Krypto-Rückgewinnung',
    footer_s2: 'Kartenbetrug & Rückbuchungen',
    footer_s3: 'Banküberweisung Rückgewinnung',
    footer_s4: 'OSINT-Ermittlungen',
    footer_s5: 'Rechtliche Schreiben',
    footer_s6: 'Aufsichtsbeschwerden',

    // Testimonial card content
    test1_text: 'Krypto-Investmentbetrug, gefälschte Investmentplattformen und Krypto-Systeme mit „garantierten Renditen“, die mit den Einlagen der Opfer verschwinden.',
    test1_location: '',
    test2_text: 'Gefälschte Handelsplattformen & Broker, betrügerische Forex-, CFD- und Krypto-Broker, die Auszahlungen blockieren oder über Nacht verschwinden.',
    test2_location: '',
    test3_text: 'DeFi- & NFT-Betrug, Rug Pulls, betrügerische DeFi-Protokolle und NFT-Betrug über mehrere Blockchains hinweg.',
    test3_location: '',
    test4_text: 'Business-E-Mail-Kompromittierung, Rechnungsumleitung und Überweisungsbetrug, der Unternehmen und ihre Lieferanten ins Visier nimmt.',
    test4_location: '',
    test5_text: 'Schneeball- & gefälschte Mining-Systeme, „passives Einkommen“ und Cloud-Mining-Angebote, die auszahlen, bis sie zusammenbrechen.',
    test5_location: '',
    test6_text: 'Pig-Butchering & Romance-Betrug, langfristige Social-Engineering-Betrügereien, die Opfer zu gefälschten Krypto- oder Forex-Investitionen drängen.',
    test6_location: '',
  },
  es: {
  "seo_title": "Recuperación de estafas de cripto, forex e inversión | ReclaimGuard Legal",
  "seo_desc": "¿Perdió dinero en una estafa de criptomonedas, forex o inversión, una plataforma de trading falsa o un fraude romántico o de tipo pig butchering? ReclaimGuard Legal rastrea los fondos robados y persigue su recuperación mediante análisis forense de blockchain y acciones legales. Evaluación gratuita del caso. Reino Unido, UE y EE. UU. Sin éxito, sin honorarios; los resultados nunca están garantizados.",
  "og_title": "Recuperación de estafas de cripto, forex e inversión | ReclaimGuard Legal",
  "og_desc": "¿Perdió dinero en una estafa de cripto, forex, inversión o una plataforma de trading falsa? Rastreamos los fondos robados y perseguimos su recuperación. Evaluación gratuita. Reino Unido, UE y EE. UU. Sin éxito, sin honorarios.",
  "meta_keywords": "recuperación estafa cripto, recuperación estafa forex, recuperar dinero de estafa forex, estafa bróker forex, recuperación estafa inversión, recuperación fraude de inversión, recuperar dinero de estafa de inversión, recuperación plataforma de trading falsa, recuperar bitcoin robado, recuperación estafa pig butchering, recuperación dinero estafa romántica, recuperación estafa transferencia bancaria, reembolso fraude APP, recuperación fraude con tarjeta, cómo recuperar dinero de una estafa online, recuperar fondos de bróker fraudulento, recuperación fraude blockchain",
  "nav_home": "Inicio",
  "nav_services": "Servicios",
  "nav_technology": "Tecnología",
  "nav_about": "Nosotros",
  "nav_testimonials": "Tipos de fraude",
  "nav_contact": "Contacto",
  "nav_blog": "Blog",
  "nav_cta": "Consulta gratuita",
  "verify_title": "Le estafaron una vez. Así puede saber que somos auténticos.",
  "verify_subtitle": "A las víctimas de fraude a menudo las atacan una segunda vez con servicios de \"recuperación\" falsos. Antes de confiar en nadie, incluidos nosotros, verifique sus credenciales y esté atento a estas señales de alarma.",
  "verify_cred_title": "Verifique nuestras credenciales",
  "verify_safety": "100% confidencial. Hablamos con usted por teléfono y nunca pedimos ningún pago para liberar su dinero. Desconfíe de cualquier servicio de recuperación que solo use chat o pida honorarios por adelantado.",
  "verify_cred_html": "<li>Regulados por la <strong>Solicitors Regulation Authority</strong>, verifique el <strong>n.º SRA&nbsp;830575</strong> en el <a href=\"https://www.sra.org.uk/consumers/register/\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--primary-color);font-weight:600;\">registro de la SRA</a>.</li><li>Registrados en Inglaterra y Gales, <strong>n.º de sociedad 13438429</strong> en <a href=\"https://find-and-update.company-information.service.gov.uk/company/13438429\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--primary-color);font-weight:600;\">Companies House</a>.</li><li>Domicilio social: <strong>Altrincham, WA14&nbsp;4DR, Inglaterra</strong>.</li><li>Confirme siempre la regulación de una firma antes de compartir datos o enviar documentos.</li>",
  "verify_never_title": "Lo que nunca haremos",
  "objfaq_title": "¿Todavía se pregunta si podemos ayudarle?",
  "objfaq_subtitle": "Las preguntas que más nos hacen, antes de ponerse en contacto.",
  "chain_title": "Cómo rastreamos los fondos robados",
  "chain_subtitle": "Una vista simplificada de una investigación real. Cada caso es distinto y los resultados nunca están garantizados.",
  "chain_n1": "Su pago",
  "chain_n2": "Wallet o cuenta del estafador",
  "chain_n3": "Exchange o punto de salida",
  "chain_n4": "Solicitud de KYC y congelación",
  "offer_title": "Le ayudamos a recuperar el dinero perdido en estafas de cripto, forex, inversión y banca",
  "offer_lead": "Rastreamos a dónde fue su dinero y lo perseguimos mediante contracargos, retrocesiones bancarias, acciones ante exchanges y reclamaciones legales. La evaluación de su caso es gratuita y es sin éxito, sin honorarios.",
  "offer_1_title": "Rastrear",
  "offer_1_text": "Seguimos el dinero con análisis forense de blockchain e investigación del rastro de pagos.",
  "offer_2_title": "Recuperar",
  "offer_2_text": "Contracargos, retrocesiones bancarias, congelaciones en exchanges y acciones legales para perseguir sus fondos.",
  "offer_3_title": "Empezar es gratis",
  "offer_3_text": "Evaluación del caso gratuita y confidencial. Sin éxito, sin honorarios; solo se cobra una comisión si recuperamos.",
  "objfaq_html": "<details><summary>¿Es demasiado tarde para hacer algo?</summary><div>A menudo no. Los registros de pago y las transacciones de blockchain son permanentes, y aún pueden tomarse medidas legales meses después. Cuanto antes actúe, mejor, pero los casos más antiguos también merecen una evaluación.</div></details><details><summary>Pagué por transferencia bancaria, ¿se puede recuperar?</summary><div>Posiblemente. El fraude por transferencia (APP) puede ser recuperable y, desde octubre de 2024, los bancos del Reino Unido deben reembolsar a muchas víctimas. Si su banco lo ha rechazado, esa decisión se puede impugnar.</div></details><details><summary>Pagué en Bitcoin o cripto, ¿se ha perdido para siempre?</summary><div>No automáticamente. La cripto suele poder rastrearse en la blockchain hasta el exchange al que llegó; la recuperación depende entonces de acciones legales. El rastreo es posible; la recuperación nunca está garantizada.</div></details><details><summary>Me pidieron pagar una tasa de AML o de impuestos, ¿es normal?</summary><div>No. Ninguna plataforma legítima cobra una tasa para liberar su propio dinero, eso es parte de la estafa. Deje de pagar y haga que evalúen su caso.</div></details><details><summary>El bróker o la web ha desaparecido, ¿tiene sentido?</summary><div>Sí. Incluso cuando un sitio desaparece, el rastro del dinero y los registros de pago suelen permanecer, y eso es exactamente lo que sigue una investigación.</div></details>",
  "verify_never_html": "<li><strong>Nunca</strong> le pediremos pagar una tasa, un “impuesto” o un cargo de “liberación” para retirar su propio dinero.</li><li><strong>Nunca</strong> garantizaremos la recuperación; quien promete un resultado garantizado no está siendo honesto.</li><li><strong>Nunca</strong> le pediremos pagar en criptomonedas, tarjetas de regalo ni a una cuenta personal.</li><li><strong>Nunca</strong> le llamaremos sin previo aviso afirmando que ya hemos encontrado su dinero.</li>",
  "blog_hero_title": "Guías de recuperación de fraude",
  "blog_hero_subtitle": "Artículos expertos sobre recuperación de estafas cripto, contracargos, análisis forense de blockchain y cómo protegerse en internet, escritos por nuestro equipo especialista.",
  "blog_a1_cat": "Guía de actuación",
  "blog_a1_title": "Qué hacer en las primeras 24 horas tras ser estafado en internet",
  "blog_a1_excerpt": "Lo que haga justo después de descubrir la estafa puede decidir sus posibilidades de recuperar el dinero. Esta es la secuencia exacta a seguir.",
  "blog_a1_author": "Equipo de ReclaimGuard Legal · 12 may 2026",
  "blog_a1_url": "/blog/what-to-do-after-being-scammed",
  "blog_a2_cat": "Alerta de estafas",
  "blog_a2_title": "Cómo detectar una estafa de recuperación de cripto antes de perder más dinero",
  "blog_a2_excerpt": "Los estafadores saben que está desesperado y atacan a las víctimas por segunda vez con servicios de recuperación falsos. Aprenda las señales que distinguen a las firmas legítimas de los estafadores.",
  "blog_a2_author": "Equipo de ReclaimGuard Legal · 9 may 2026",
  "blog_a2_url": "/blog/how-to-spot-crypto-recovery-scam",
  "blog_a3_cat": "Alerta de estafas",
  "blog_a3_title": "Las 5 estafas de cripto más comunes en 2026 (y cómo evitarlas)",
  "blog_a3_excerpt": "Desde estafas románticas de pig butchering hasta exchanges de cripto falsos, estos cinco tipos de fraude causan la mayoría de las pérdidas de cripto en el mundo. Sepa qué buscar.",
  "blog_a3_author": "Equipo de ReclaimGuard Legal · 6 may 2026",
  "blog_a3_url": "/blog/most-common-crypto-scams-2026",
  "blog_a4_cat": "Métodos de recuperación",
  "blog_a4_title": "Qué es un contracargo y si puede recuperar su dinero de una estafa",
  "blog_a4_excerpt": "Un contracargo es una de las herramientas más eficaces para recuperar dinero perdido en fraudes online, pero hay reglas, plazos y límites estrictos. Esto es todo lo que necesita saber.",
  "blog_a4_author": "Equipo de ReclaimGuard Legal · 2 may 2026",
  "blog_a4_url": "/blog/what-is-a-chargeback",
  "blog_a5_cat": "Análisis forense de blockchain",
  "blog_a5_title": "Cómo el análisis forense de blockchain puede rastrear criptomonedas robadas",
  "blog_a5_excerpt": "Mucha gente cree que la cripto no se puede rastrear. No es así. Así usan los investigadores profesionales las herramientas de análisis de blockchain para seguir fondos robados y construir pruebas válidas para un tribunal.",
  "blog_a5_author": "Equipo de ReclaimGuard Legal · 28 abr 2026",
  "blog_a5_url": "/blog/blockchain-forensics-traces-stolen-crypto",
  "blog_read_more": "Leer artículo →",
  "home_blog_1_cat": "Recuperación de cripto",
  "home_blog_1_title": "¿Puedo recuperar mi cripto? Una guía honesta de lo que es posible",
  "home_blog_1_excerpt": "¿Se puede recuperar la cripto estafada? A veces, y depende de algunos factores concretos. Aquí está la respuesta honesta y qué hacer ahora.",
  "home_blog_2_cat": "Métodos de recuperación",
  "home_blog_2_title": "Cómo recuperar tu dinero tras ser estafado en línea",
  "home_blog_2_excerpt": "Una guía paso a paso para recuperar el dinero perdido en una estafa, ya sea que pagaras con tarjeta, transferencia bancaria o cripto.",
  "home_blog_3_cat": "Alerta de estafas",
  "home_blog_3_title": "¿La plataforma de trading no te deja retirar? Esto es lo que debes hacer",
  "home_blog_3_excerpt": "¿Te bloquean la retirada o te piden pagar «impuestos» o «comisiones» primero? Es una estafa clásica. Aquí te explicamos cómo responder.",
  "home_blog_4_cat": "Guía de actuación",
  "home_blog_4_title": "Qué hacer en las primeras 24 horas tras ser estafado en línea",
  "home_blog_4_excerpt": "Los pasos que das inmediatamente después de una estafa son cruciales. Detén los pagos, conserva las pruebas y denuncia, aquí te explicamos exactamente cómo.",
  "home_blog_5_cat": "Alerta de estafas",
  "home_blog_5_title": "Cómo detectar una estafa de recuperación de cripto antes de perder más dinero",
  "home_blog_5_excerpt": "Las empresas de recuperación fraudulentas atacan a las víctimas por segunda vez. Aprende las 7 señales de alerta que delatan los servicios falsos.",
  "home_blog_6_cat": "Análisis forense de blockchain",
  "home_blog_6_title": "Cómo el análisis forense de blockchain puede rastrear criptomonedas robadas",
  "home_blog_6_excerpt": "Las transacciones en blockchain son públicas y permanentes. Aquí te explicamos exactamente cómo los investigadores rastrean fondos robados hasta los exchanges.",
  "hero_badge": "Experiencia legal + ciberseguridad",
  "situation_title": "¿Te suena algo de esto?",
  "situation_lead": "Si reconoces tu situación abajo, estás en el lugar correcto. Nuestro equipo legal y de investigación blockchain puede evaluar tu caso gratis y sin compromiso, y sin ganar no hay honorarios.",
  "situation_1": "Una plataforma de trading o inversión <strong>no te deja retirar</strong> tu dinero",
  "situation_2": "Te piden pagar comisiones de <strong>«impuestos», «AML», «liquidez» o «liberación»</strong> antes de poder retirar",
  "situation_3": "Tu bróker o «gestor de cuenta» ha <strong>dejado de responder</strong> o ha desaparecido",
  "situation_4": "Tu cuenta fue <strong>bloqueada</strong> de repente, o tu retirada está atascada «pendiente»",
  "situation_5": "Enviaste <strong>cripto</strong> a una inversión que ahora crees que era una estafa",
  "situation_6": "Alguien que conociste en línea <strong>te animó a invertir</strong> y el dinero desapareció",
  "situation_cta": "Obtener una revisión gratuita del caso",
  "situation_note": "Confidencial · Sin compromiso · Respuesta en 24 horas",
  "hero_trust_1": "Gratis y confidencial",
  "hero_trust_2": "Sin ganar no hay honorarios",
  "hero_trust_3": "Respuesta en 24 horas",
  "hero_trust_4": "Regulados por la SRA (N.º 830575)",
  "trust_compliance_label": "Cumplimiento y estándares regulatorios",
  "trust_b1_html": "<strong>Regulados por la SRA</strong><br><small>Solicitors Regulation Authority N.º 830575</small>",
  "trust_b2_html": "<strong>Opera bajo la ley del Reino Unido</strong><br><small>Todos los servicios se rigen por la ley de Inglaterra y Gales</small>",
  "trust_b3_html": "<strong>Análisis forense de blockchain</strong><br><small>Herramientas de análisis de blockchain estándar del sector</small>",
  "trust_b4_html": "<strong>Conforme al RGPD de la UE</strong><br><small>Estándares de protección de datos de la UE</small>",
  "faq_title": "Preguntas frecuentes sobre recuperar dinero de estafas",
  "faq_subtitle": "Respuestas honestas de nuestros especialistas en recuperación de fraudes",
  "faq_q1": "¿Puedo recuperar el dinero perdido en una estafa de cripto?",
  "faq_a1": "Sí, en muchos casos los fondos se pueden rastrear y recuperar parcial o totalmente mediante análisis forense de blockchain, acciones legales y denuncias ante los reguladores. El éxito depende de la rapidez con la que actúes, del método de pago y de qué exchanges recibieron los fondos. Ofrecemos una revisión gratuita del caso para darte una evaluación honesta.",
  "faq_q2": "¿Puedo recuperar mi dinero de una estafa de pig butchering?",
  "faq_a2": "Las estafas de pig butchering implican fondos enviados a billeteras de criptomonedas. Nuestros investigadores rastrean los fondos a través de la blockchain hasta la cuenta del exchange donde llegaron. Después presentamos una solicitud legal de congelación a ese exchange, respaldada por un informe forense. Cuanto antes actúes tras la estafa, mayores serán las probabilidades de recuperación.",
  "faq_q3": "Envié dinero por transferencia bancaria a un estafador, ¿puedo recuperarlo?",
  "faq_a3": "Sí. Las transferencias bancarias a estafadores pueden ser recuperables mediante reclamaciones por fraude de pago autorizado (APP). Según las normas británicas PSR 2024, los bancos deben reembolsar a las víctimas elegibles de fraude APP hasta 85.000 £. Preparamos y presentamos la denuncia de fraude completa en tu nombre. Las solicitudes de retrocesión son más eficaces en las primeras 72 horas; contáctanos de inmediato.",
  "faq_q4": "¿Es demasiado tarde para recuperar mi dinero si pasó hace meses?",
  "faq_a4": "No necesariamente. Los plazos para contracargos suelen ser de 120 días desde la fecha de la transacción. Las investigaciones forenses de blockchain y las acciones legales de recuperación pueden llevarse a cabo durante años. Las reclamaciones por fraude APP también se pueden presentar de forma retroactiva. Contáctanos para una revisión gratuita aunque haya pasado tiempo, a menudo todavía hay opciones viables.",
  "faq_q5": "¿Tengo que pagar por adelantado por los servicios de recuperación de fraude?",
  "faq_a5": "No. Trabajamos con el principio de sin ganar no hay honorarios, la revisión inicial del caso es completamente gratuita, y solo pagas una comisión de éxito del 10-15 % si los fondos se recuperan realmente. No hay pago por adelantado. <strong>Advertencia: cualquier empresa que exija miles por adelantado antes de hacer cualquier trabajo es casi con certeza una estafa.</strong>",
  "faq_q6": "¿Puedo denunciar una estafa de cripto si no sé quién es el estafador?",
  "faq_a6": "Sí. Solo necesitas la dirección de la billetera a la que enviaste los fondos. Nuestro proceso forense rastrea el recorrido de la transacción para identificar cuentas de exchange, que contienen datos de identidad. Después perseguimos la identidad del titular de la cuenta por vías legales y lo denunciamos a Action Fraud (Reino Unido), FBI IC3 (EE. UU.) y Europol, según corresponda.",
  "blog_title": "Guías de recuperación de fraudes",
  "blog_subtitle": "Artículos expertos para ayudarte a entender tus opciones y protegerte",
  "blog_view_all": "Ver todos los artículos →",
  "disclaimer_h4": "Aviso legal",
  "footer_regnotice": "ReclaimGuard Legal es una entidad autorizada para todos los servicios legales. Regulada por la Solicitors Regulation Authority (SRA N.º 830575). Registrada en Inglaterra y Gales (N.º de empresa 13438429). Domicilio social: Altrincham, WA14 4DR, Inglaterra.",
  "footer_disclaimer": "<strong>Aviso legal:</strong> ReclaimGuard Legal es una entidad autorizada para todos los servicios legales, regulada por la Solicitors Regulation Authority (SRA N.º 830575), registrada en Inglaterra y Gales (N.º de empresa 13438429). Los resultados de recuperación varían según las pruebas, la antigüedad del caso, el método de pago y la respuesta de las instituciones terceras. No se promete ningún resultado garantizado.",
  "hero_title": "¿Perdió dinero en una plataforma de trading online o una estafa de cripto?",
  "hero_subtitle": "Si le han bloqueado la retirada, o le han pedido pagar tasas de AML, impuestos o \"liberación\", nuestro equipo legal y de investigación en blockchain, regulado por la SRA, puede evaluar su caso, gratis y sin éxito, sin honorarios.",
  "hero_btn_primary": "Comprobar si mi caso es recuperable",
  "hero_btn_secondary": "Cómo funciona la recuperación",
  "stat_legal": "Legal",
  "stat_legal_label": "Expertos en acción legal",
  "stat_crypto": "Cripto",
  "stat_crypto_label": "Especialistas en rastreo",
  "stat_coverage": "UE/RU/EE. UU.",
  "stat_coverage_label": "Cobertura internacional",
  "stat_gdpr": "RGPD",
  "stat_gdpr_label": "Conforme",
  "badge_1": "Experiencia legal + ciberseguridad",
  "badge_2": "Rastreo en blockchain y banca",
  "badge_3": "Acción contra los estafadores",
  "badge_4": "Total transparencia",
  "services_title": "Nuestros servicios principales",
  "services_subtitle": "Procedimientos de recuperación basados en pruebas que combinan acción legal y análisis forense digital",
  "service1_title": "Recuperación de cripto y rastreo en blockchain",
  "service1_desc": "Rastreamos transacciones en Bitcoin, Ethereum, BNB Chain, Solana y más de 100 redes. Identificamos wallets, exchanges, grupos de transacciones y puntos de salida usados por los estafadores.",
  "service1_f1": "Informes de blockchain",
  "service1_f2": "Archivos de pruebas",
  "service1_f3": "Escalado a exchanges",
  "service1_f4": "Solicitudes legales de congelación",
  "service2_title": "Fraude con tarjeta y recuperación por contracargo",
  "service2_desc": "Gestionamos cargos no autorizados, disputas con comercios, estafas de suscripción, fraude amistoso y plataformas de trading falsas.",
  "service2_f1": "Documentación del caso",
  "service2_f2": "Preparación de pruebas",
  "service2_f3": "Presentación completa de la disputa de contracargo",
  "service2_f4": "Negociaciones con comercios",
  "service3_title": "Recuperación de transferencias bancarias",
  "service3_desc": "Asistimos a víctimas de estafas de pago autorizado, plataformas de inversión, fraude del correo corporativo y transferencias transfronterizas.",
  "service3_f1": "Solicitudes de retrocesión",
  "service3_f2": "Denuncias de incidentes de fraude",
  "service3_f3": "Reclamaciones a autoridades financieras",
  "service3_f4": "Rastreo internacional de fondos",
  "service4_title": "OSINT e informes de investigación de fraude",
  "service4_desc": "Recopilamos huellas digitales, rastros de IP, identificadores en redes sociales, titularidad de dominios y datos de sociedades pantalla.",
  "service4_f1": "Identificación de estafadores",
  "service4_f2": "Recopilación de pruebas digitales",
  "service4_f3": "Apoyo a investigaciones policiales",
  "service4_f4": "Documentación válida para tribunales",
  "service5_title": "Cartas legales y reclamaciones ante reguladores",
  "service5_desc": "Redactamos y enviamos notificaciones legales formales, reclamaciones a reguladores nacionales, escalados de cumplimiento a exchanges y solicitudes de retirada de plataformas.",
  "service5_f1": "Requerimientos de cese",
  "service5_f2": "Reclamaciones ante reguladores",
  "service5_f3": "Acción ante exchanges",
  "service5_f4": "Denuncia de plataformas",
  "service6_title": "Casos que gestionamos",
  "service6_desc": "Estafas románticas, plataformas de trading falsas, esquemas Ponzi, fraude con NFT, ataques de phishing, robo de identidad, transacciones no autorizadas y fraude del correo corporativo.",
  "service6_f1": "Estafas de inversión en cripto",
  "service6_f2": "Estafas románticas y pig butchering",
  "service6_f3": "Forex/opciones binarias falsas",
  "service6_f4": "Fraude con tarjeta y bancario",
  "method_title": "Nuestra metodología",
  "method_intro": "Combinamos experiencia legal, conocimiento de cumplimiento y técnicas avanzadas de investigación de ciberseguridad para rastrear activos robados e iniciar procedimientos de recuperación estructurados.",
  "method1_title": "Análisis de blockchain",
  "method1_desc": "Rastreamos transacciones en Bitcoin, Ethereum, BNB Chain, Solana y más de 100 redes. Identificamos wallets, exchanges y grupos de transacciones usados por los estafadores.",
  "method2_title": "Protocolos de disputa bancaria",
  "method2_desc": "Presentamos solicitudes de retrocesión, denuncias de incidentes de fraude y reclamaciones a autoridades financieras siguiendo procedimientos estrictos de disputa bancaria.",
  "method3_title": "Procedimientos de contracargo",
  "method3_desc": "Gestión experta de disputas con tarjeta, incluidos cargos no autorizados, fraude de comercios y estafas de suscripción, con documentación completa.",
  "method4_title": "Inteligencia de fuentes abiertas",
  "method4_desc": "Análisis forense digital y OSINT para recopilar pruebas, incluidos rastros de IP, identificadores en redes sociales y datos de titularidad de dominios.",
  "method5_title": "Análisis forense digital",
  "method5_desc": "Recopilación de pruebas y documentación profesional, aptas para fuerzas del orden, tribunales y autoridades reguladoras.",
  "method6_title": "Escalado ante reguladores",
  "method6_desc": "Escalamos los casos a bancos, emisores, exchanges y reguladores financieros con la documentación legal y los procedimientos de cumplimiento adecuados.",
  "stat_blockchains": "100+",
  "stat_blockchains_label": "Blockchains cubiertas",
  "stat_intl": "UE/RU/EE. UU.",
  "stat_intl_label": "Cobertura internacional",
  "stat_gdpr2": "RGPD",
  "stat_gdpr2_label": "Datos conformes",
  "process_title": "Cómo funciona la recuperación",
  "process_subtitle": "Proceso de recuperación transparente en 5 pasos, basado en pruebas",
  "step1_title": "Evaluación del caso (gratis)",
  "step1_desc": "Evaluamos documentos, transacciones y el escenario del fraude. Sin compromiso, sin pago por adelantado.",
  "step2_title": "Recopilación de pruebas",
  "step2_desc": "Mapeamos todas las transacciones, direcciones, cuentas y rastros digitales con herramientas forenses profesionales.",
  "step3_title": "Estrategia de recuperación",
  "step3_desc": "Decidimos la vía correcta: contracargo, retrocesión bancaria, congelación en exchange, acción legal o reclamación ante el regulador.",
  "step4_title": "Ejecución",
  "step4_desc": "Preparamos y presentamos todos los documentos oficiales y perseguimos la recuperación por los cauces legales y financieros adecuados.",
  "step5_title": "Seguimiento continuo",
  "step5_desc": "Actualizaciones, informes forenses, respuestas de cumplimiento y pasos de apelación. Total transparencia en todo momento.",
  "about_title": "Sobre ReclaimGuard Legal",
  "about_text1": "ReclaimGuard Legal es una firma de recuperación de fraude digital regulada por la SRA. Combinamos la acción legal con el análisis forense de blockchain para rastrear activos robados y perseguir una recuperación estructurada.",
  "about_text2": "Nuestra misión es simple: ayudar a las víctimas a recuperar el control, restaurar la justicia y recuperar sus activos.",
  "about_f1_title": "Expectativas realistas",
  "about_f1_desc": "Operamos con estrictos estándares éticos y expectativas realistas. No prometemos una recuperación garantizada. Ofrecemos un servicio de recuperación estructurado y profesional, con resultados transparentes.",
  "about_f2_title": "Alcance internacional",
  "about_f2_desc": "Operamos en la UE, Reino Unido, EE. UU., Canadá y Australia. Gestionamos casos de fraude transfronterizo con el debido conocimiento jurisdiccional.",
  "about_f3_title": "Enfoque basado en pruebas",
  "about_f3_desc": "Recopilación de pruebas, análisis forense digital y documentación profesionales, aptos para fuerzas del orden, tribunales y autoridades reguladoras.",
  "about_f4_title": "Total transparencia",
  "about_f4_desc": "Informes claros, pruebas documentadas, plazos realistas. Sin comisiones ocultas, sin falsas promesas. Servicio profesional de principio a fin.",
  "pricing_title": "Precios transparentes",
  "cert1": "Evaluación del caso gratuita",
  "cert2": "Sin éxito, sin honorarios",
  "cert3": "Comisión de éxito del 10-15% (solo sobre lo recuperado)",
  "cert4": "Conforme al RGPD",
  "stats_time": "2-12 semanas",
  "stats_time_label": "Duración típica del caso",
  "stats_min": "250 €+",
  "stats_min_label": "Importe mínimo del caso",
  "stats_chains": "100+",
  "stats_chains_label": "Blockchains cubiertas",
  "stats_cov": "UE/RU/EE. UU.",
  "stats_cov_label": "Áreas de cobertura",
  "test_title": "Tipos de fraude que gestionamos",
  "test_subtitle": "Asistimos a víctimas de una amplia gama de fraudes financieros online. Los resultados de recuperación dependen de las particularidades de cada caso y nunca están garantizados.",
  "faq_title": "Preguntas frecuentes",
  "faq_subtitle": "Preguntas habituales sobre la recuperación de criptomonedas y nuestros servicios",
  "faq1_q": "¿Se pueden realmente rastrear y recuperar las criptomonedas?",
  "faq1_a": "A menudo sí son rastreables. Aunque se suele creer que las criptomonedas son anónimas, la blockchain crea un registro permanente de las transacciones. Con herramientas forenses de blockchain estándar del sector, podemos rastrear la cripto a través de rutas de transacción complejas e identificar dónde acaba, y luego emprender acciones legales para perseguir la congelación y recuperación de los fondos cuando es posible. El rastreo no garantiza la recuperación.",
  "faq2_q": "¿Cuánto tarda el proceso de recuperación?",
  "faq2_a": "El plazo varía según la complejidad de su caso. Los casos sencillos en los que los fondos siguen en exchanges pueden resolverse en 2-4 meses. Los casos más complejos con varias jurisdicciones o blanqueo sofisticado pueden tardar 6-12 meses.",
  "faq3_q": "¿Qué herramientas usan para rastrear criptomonedas robadas?",
  "faq3_a": "Usamos herramientas de análisis de blockchain estándar del sector junto con nuestros propios métodos de investigación para rastrear transacciones de cripto en varias blockchains, identificar vínculos con servicios y exchanges conocidos, y construir pruebas que respalden acciones legales y reclamaciones ante reguladores. Estas herramientas no garantizan la recuperación, pero refuerzan la investigación.",
  "faq4_q": "¿Cuáles son sus honorarios y condiciones de pago?",
  "faq4_a": "Ofrecemos una consulta inicial gratuita para evaluar su caso. Nuestra estructura de honorarios suele basarse en una combinación de tarifas fijas por el trabajo de investigación y honorarios en función del éxito sobre los importes recuperados. Explicamos todos los honorarios de forma transparente antes de que contrate nuestros servicios.",
  "faq5_q": "¿Qué tipos de estafas gestionan?",
  "faq5_a": "Gestionamos todo tipo de fraude cripto y financiero, incluidos: exchanges de cripto falsos, estafas de inversión, esquemas Ponzi, estafas románticas/pig butchering, brókeres falsos, estafas con NFT, exploits de DeFi, fraude del correo corporativo, fraude por transferencia y transacciones bancarias no autorizadas.",
  "faq6_q": "¿Trabajan a nivel internacional?",
  "faq6_a": "Sí. El fraude cripto a menudo cruza fronteras, y nuestra red internacional nos permite trabajar con autoridades legales, exchanges e instituciones financieras de todo el mundo para maximizar las posibilidades de recuperación.",
  "faq7_q": "¿Qué información necesitan para iniciar mi caso?",
  "faq7_a": "Para empezar necesitamos: detalles de cómo le estafaron, registros de transacciones (extractos bancarios, IDs de transacciones de cripto, direcciones de wallet), cualquier comunicación con los estafadores y documentación de sus inversiones.",
  "faq8_q": "¿Mi caso es confidencial?",
  "faq8_a": "Por supuesto. Toda la información que comparta con nosotros está protegida y no se divulgará sin su consentimiento, salvo cuando lo exija la ley o sea necesario para perseguir la recuperación de su caso.",
  "contact_title": "Solicite una consulta gratuita",
  "contact_intro": "Rellene el formulario para iniciar la evaluación de su caso. Consulta gratuita, sin compromiso. Ofrecemos evaluaciones realistas y un servicio transparente.",
  "contact_phone_label": "Teléfono",
  "contact_phone_note": "Respuesta en 24 horas",
  "contact_email_label": "Correo electrónico",
  "contact_email_note": "Respuesta en 24 horas",
  "contact_coverage_label": "Cobertura",
  "contact_coverage_val": "UE, Reino Unido, EE. UU., Canadá, Australia",
  "contact_coverage_note": "Casos de fraude internacional",
  "contact_pricing_label": "Precios",
  "contact_pricing_val": "Evaluación gratuita<br>Sin éxito, sin honorarios<br>Comisión de éxito del 10-15% (solo sobre lo recuperado)",
  "disclaimer_title": "⚠️ Aviso legal",
  "disclaimer_text": "ReclaimGuard Legal es una entidad autorizada regulada por la SRA (n.º 830575). Ofrecemos servicios de investigación forense y apoyo en disputas. No se promete ningún resultado garantizado. La recuperación depende de las pruebas, la antigüedad del caso, el método de pago y la cooperación de terceros.",
  "form_title": "Evaluación gratuita del caso",
  "form_subtitle": "Rellene el formulario y le contactaremos en 24 horas",
  "form_name": "Nombre completo *",
  "form_email": "Correo electrónico *",
  "form_phone": "Número de teléfono *",
  "form_amount": "¿Cuánto dinero perdió? *",
  "form_amount_placeholder": "Seleccione un rango",
  "form_amount_0": "Menos de 1.000",
  "form_amount_1": "1.000 – 5.000",
  "form_amount_2": "5.000 – 25.000",
  "form_amount_3": "25.000 – 100.000",
  "form_amount_4": "Más de 100.000",
  "form_scamtype": "¿Qué tipo de fraude sufrió? *",
  "form_scamtype_placeholder": "Seleccione el tipo de fraude",
  "form_scamtype_crypto": "Estafa de cripto",
  "form_scamtype_broker": "Plataforma de trading falsa",
  "form_scamtype_bank": "Estafa por transferencia bancaria",
  "form_scamtype_card": "Fraude con tarjeta",
  "form_scamtype_other": "Otro",
  "form_when": "¿Cuándo ocurrió el incidente? (opcional)",
  "form_when_placeholder": "Seleccione un periodo",
  "form_when_7": "En los últimos 7 días",
  "form_when_14": "1-4 semanas",
  "form_when_3m": "1-3 meses",
  "form_when_36m": "3-6 meses",
  "form_when_612m": "6-12 meses",
  "form_when_1y": "Más de 1 año",
  "form_payment": "¿Cómo pagó? (opcional)",
  "form_payment_placeholder": "Seleccione el método de pago",
  "form_payment_crypto": "Cripto",
  "form_payment_card": "Tarjeta",
  "form_payment_bank": "Transferencia bancaria",
  "form_payment_other": "Otro",
  "form_message": "Breve descripción de lo ocurrido (opcional)",
  "form_message_placeholder": "Describa brevemente el incidente de fraude...",
  "form_consent": "Entiendo que ReclaimGuard Legal ofrece servicios de investigación y que no se promete ningún resultado garantizado. Doy mi consentimiento para que me contacten sobre mi caso.",
  "form_submit": "Comprobar si mi caso es recuperable",
  "form_urgency": "Cuanto antes empiece la investigación, mayores serán las posibilidades de preservar pruebas y rastrear los fondos.",
  "form_reassure_html": "<li>&#10003; Evaluación gratuita</li><li>&#10003; Confidencial</li><li>&#10003; Sin compromiso</li><li>&#10003; Sin resultado garantizado</li>",
  "form_step1_indicator": "Paso 1 de 2 · Su caso",
  "form_step2_indicator": "Paso 2 de 2 · Sus datos",
  "form_continue": "Continuar →",
  "form_back": "← Atrás",
  "form_note": "🔒 Conforme al RGPD. Todos los datos se tratan de forma confidencial. No se requiere pago por adelantado para la evaluación del caso.",
  "footer_desc": "Firma especializada en recuperación de fraude digital que combina experiencia legal e investigación de ciberseguridad. Rastreamos activos robados e iniciamos procedimientos de recuperación estructurados.",
  "footer_services": "Servicios",
  "footer_company": "Empresa",
  "footer_contact": "Contacto",
  "footer_about": "Sobre nosotros",
  "footer_methodology": "Nuestra metodología",
  "footer_who": "A quién ayudamos",
  "footer_contact_us": "Contáctenos",
  "footer_privacy": "Política de privacidad",
  "footer_terms": "Términos y condiciones",
  "footer_copy": "© 2026 ReclaimGuard Legal. Todos los derechos reservados.",
  "footer_disclaimer": "ReclaimGuard Legal es una entidad autorizada para todos los servicios legales, regulada por la Solicitors Regulation Authority (n.º SRA 830575), registrada en Inglaterra y Gales (n.º de sociedad 13438429). Ofrecemos servicios de investigación forense, apoyo en disputas y procedimientos legales de recuperación. No se promete ningún resultado garantizado.",
  "fab_label": "Consulta gratuita",
  "lang_switcher_label": "Idioma",
  "team_title": "Nuestro equipo",
  "team_subtitle": "Un equipo multidisciplinar de asesores legales, analistas de blockchain y especialistas en cumplimiento",
  "team1_role": "Equipo legal y regulatorio",
  "team1_bio": "Abogados y asesores legales que gestionan disputas de fraude, reclamaciones de contracargo y quejas ante reguladores bajo la ley de Inglaterra y Gales, como entidad regulada por la SRA.",
  "team1_tag1": "Estrategia legal",
  "team1_tag2": "Reclamaciones ante reguladores",
  "team2_role": "Equipo de investigación en blockchain",
  "team2_bio": "Analistas que rastrean criptomonedas robadas a través de wallets, exchanges y redes con herramientas forenses de blockchain estándar del sector.",
  "team2_tag1": "Análisis forense de blockchain",
  "team2_tag2": "Rastreo de cripto",
  "team3_role": "Equipo de análisis forense digital",
  "team3_bio": "Especialistas en OSINT y recopilación de pruebas, que preparan documentación apta para bancos, exchanges y procesos judiciales.",
  "team3_tag1": "OSINT",
  "team3_tag2": "Pruebas digitales",
  "team4_role": "Atención al cliente y cumplimiento",
  "team4_bio": "Gestión de casos conforme al RGPD y comunicación con el cliente durante todo el proceso, en inglés y alemán.",
  "team4_tag1": "Cumplimiento del RGPD",
  "team4_tag2": "Atención al cliente",
  "rating_platform": "⭐ Opiniones de clientes",
  "rating_count": "Basado en 214 opiniones verificadas",
  "rating_h1": "Opiniones verificadas",
  "rating_t1": "Todas las opiniones verificadas por correo",
  "rating_h2": "Confidencial",
  "rating_t2": "Identidad de los clientes protegida",
  "rating_h3": "Transparente",
  "rating_t3": "Resultados reportados con honestidad",
  "overlay_lbl1": "Regulados",
  "overlay_lbl2": "Cobertura internacional",
  "overlay_lbl3": "Conforme",
  "success_title": "Caso recibido",
  "success_msg": "Gracias por contactarnos. Hemos recibido los detalles de su caso y le responderemos en 24 horas.",
  "success_step1": "Nuestro equipo revisa los detalles de su caso",
  "success_step2": "Evaluamos las opciones de recuperación",
  "success_step3": "Recibe una respuesta personalizada en 24 h",
  "success_note": "Revise su bandeja de entrada, una confirmación está en camino.",
  "ty_title": "Caso recibido",
  "ty_subtitle": "Gracias por contactar con ReclaimGuard Legal. Hemos recibido los detalles de su caso y nuestro equipo los revisará en breve.",
  "ty_step1_title": "Evaluación del caso",
  "ty_step1_desc": "Nuestros especialistas revisan los detalles que ha facilitado y evalúan las mejores opciones de recuperación.",
  "ty_step2_title": "Consulta inicial",
  "ty_step2_desc": "Le contactaremos en 24 horas para hablar de su caso y de los siguientes pasos.",
  "ty_step3_title": "Plan de recuperación",
  "ty_step3_desc": "Recibe una estrategia de recuperación personalizada, sin compromiso por adelantado.",
  "ty_highlight": "<strong>Revise su bandeja de entrada</strong>, un correo de confirmación está en camino. Si no lo ve en unos minutos, revise su carpeta de spam.",
  "ty_btn_home": "← Volver al inicio",
  "ty_btn_another": "Enviar otro caso",
  "ty_back": "← Volver al inicio",
  "ty_copy": "© 2026 ReclaimGuard Legal. Todos los derechos reservados.",
  "footer_cert_gdpr": "Conforme al RGPD",
  "footer_cert_cov": "Cobertura UE/RU/EE. UU.",
  "footer_s1": "Recuperación de cripto",
  "footer_s2": "Fraude con tarjeta y contracargos",
  "footer_s3": "Recuperación de transferencias",
  "footer_s4": "Investigaciones OSINT",
  "footer_s5": "Cartas legales",
  "footer_s6": "Reclamaciones ante reguladores",
  "test1_text": "Estafas de inversión en cripto, plataformas de inversión falsas y esquemas de cripto de \"rentabilidad garantizada\" que desaparecen con los depósitos de las víctimas.",
  "test1_location": "",
  "test2_text": "Plataformas de trading y brókeres falsos, brókeres fraudulentos de forex, CFD y cripto que bloquean las retiradas o desaparecen de la noche a la mañana.",
  "test2_location": "",
  "test3_text": "Fraude con DeFi y NFT, rug pulls, protocolos DeFi fraudulentos y estafas con NFT repartidas por varias blockchains.",
  "test3_location": "",
  "test4_text": "Fraude del correo corporativo, redirección de facturas y fraude por transferencia dirigido a empresas y sus proveedores.",
  "test4_location": "",
  "test5_text": "Esquemas Ponzi y de minería falsa, operaciones de \"ingresos pasivos\" y de minería en la nube que pagan hasta que colapsan.",
  "test5_location": "",
  "test6_text": "Fraude romántico y pig butchering, estafas de ingeniería social a largo plazo que presionan a las víctimas para invertir en cripto o forex falsos.",
  "test6_location": ""
}
};

// ============================
// Geo detection + apply lang
// ============================
const GERMAN_COUNTRIES = ['DE', 'AT', 'CH'];
const GERMAN_LANG_PREFIXES = ['de'];
const SPANISH_COUNTRIES = ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR'];
const SPANISH_LANG_PREFIXES = ['es'];
const LANG_NAMES = { en: 'English', de: 'Deutsch', es: 'Español' };

// Instant check: is the browser set to German?
function detectLangFromBrowser() {
  const langs = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || ''];
  for (const l of langs) {
    const ll = l.toLowerCase();
    if (GERMAN_LANG_PREFIXES.some(p => ll.startsWith(p))) return 'de';
    if (SPANISH_LANG_PREFIXES.some(p => ll.startsWith(p))) return 'es';
  }
  return null;
}

// Primary: Vercel's built-in IP geolocation header (zero rate limit)
async function detectCountryVercel() {
  try {
    const res = await fetch('/api/geo');
    if (!res.ok) return null;
    const data = await res.json();
    return data.country || null;
  } catch {
    return null;
  }
}

// Fallback: third-party IP lookup
async function detectCountryFallback() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) return null;
    const data = await res.json();
    return data.country_code || null;
  } catch {
    return null;
  }
}

function getLang() {
  return localStorage.getItem('rg_lang') || null;
}

function setLang(lang) {
  localStorage.setItem('rg_lang', lang);
}

// ============================
// Blog article language redirect
// ============================
const BLOG_EN_TO_DE = {
  '/blog/what-to-do-after-being-scammed': '/blog/de/was-tun-nach-betrug',
  '/blog/how-to-spot-crypto-recovery-scam': '/blog/de/krypto-rueckgewinnungsbetrug-erkennen',
  '/blog/most-common-crypto-scams-2026': '/blog/de/haeufigste-krypto-betrugsmaschen-2026',
  '/blog/what-is-a-chargeback': '/blog/de/was-ist-eine-rueckbuchung',
  '/blog/blockchain-forensics-traces-stolen-crypto': '/blog/de/blockchain-forensik-krypto-verfolgen',
};
const BLOG_DE_TO_EN = {
  '/blog/de/was-tun-nach-betrug': '/blog/what-to-do-after-being-scammed',
  '/blog/de/krypto-rueckgewinnungsbetrug-erkennen': '/blog/how-to-spot-crypto-recovery-scam',
  '/blog/de/haeufigste-krypto-betrugsmaschen-2026': '/blog/most-common-crypto-scams-2026',
  '/blog/de/was-ist-eine-rueckbuchung': '/blog/what-is-a-chargeback',
  '/blog/de/blockchain-forensik-krypto-verfolgen': '/blog/blockchain-forensics-traces-stolen-crypto',
};

function redirectBlogIfNeeded(lang) {
  const path = window.location.pathname.replace(/\.html$/, '');
  if (lang === 'de' && BLOG_EN_TO_DE[path]) {
    window.location.replace(BLOG_EN_TO_DE[path]);
    return true;
  }
  if (lang === 'en' && BLOG_DE_TO_EN[path]) {
    window.location.replace(BLOG_DE_TO_EN[path]);
    return true;
  }
  return false;
}

function t(key) {
  const lang = getLang() || 'en';
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['en'][key] || key;
}

// Apply all translations to the DOM
function applyTranslations() {
  const lang = getLang() || 'en';
  document.documentElement.lang = lang;

  // Helper to set text safely
  const setText = (sel, key) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = t(key);
  };
  const setHTML = (sel, key) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = t(key);
  };
  const setAttr = (sel, attr, key) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, t(key));
  };
  const setAll = (sel, key) => {
    document.querySelectorAll(sel).forEach(el => { el.textContent = t(key); });
  };

  // Generic attribute-driven translation: any element with data-i18n gets its
  // textContent set, data-i18n-html gets innerHTML. Lets whole sections be
  // translated by markup alone, without a setText call per element.
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.getAttribute('data-i18n'));
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-html'));
    if (v) el.innerHTML = v;
  });

  // ── SEO: swap title + meta description per language ──────────────────
  const seoTitle = t('seo_title');
  const seoDesc  = t('seo_desc');
  const ogTitle  = t('og_title');
  const ogDesc   = t('og_desc');
  if (seoTitle) document.title = seoTitle;
  const descEl  = document.getElementById('seo-desc');  if (descEl)  descEl.setAttribute('content', seoDesc);
  const ogTEl   = document.getElementById('og-title');  if (ogTEl)   ogTEl.setAttribute('content', ogTitle);
  const ogDEl   = document.getElementById('og-desc');   if (ogDEl)   ogDEl.setAttribute('content', ogDesc);
  const twTEl   = document.getElementById('tw-title');  if (twTEl)   twTEl.setAttribute('content', ogTitle);
  const twDEl   = document.getElementById('tw-desc');   if (twDEl)   twDEl.setAttribute('content', ogDesc);
  const kwEl    = document.getElementById('seo-keywords'); if (kwEl) kwEl.setAttribute('content', t('meta_keywords'));
  // Swap og:locale
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', lang === 'de' ? 'de_DE' : lang === 'es' ? 'es_ES' : 'en_GB');

  // Nav
  // Map each nav link by its href (robust to link order, which differs
  // between the homepage and sub-pages like blog/privacy/terms).
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((el) => {
    const href = (el.getAttribute('href') || '').toLowerCase();
    let key = null;
    if      (href.indexOf('#home') !== -1)         key = 'nav_home';
    else if (href.indexOf('#services') !== -1)     key = 'nav_services';
    else if (href.indexOf('#technology') !== -1)   key = 'nav_technology';
    else if (href.indexOf('#about') !== -1)        key = 'nav_about';
    else if (href.indexOf('#testimonials') !== -1) key = 'nav_testimonials';
    else if (href.indexOf('#contact') !== -1)      key = 'nav_contact';
    else if (href.indexOf('blog') !== -1)          key = 'nav_blog';
    if (key) el.textContent = t(key);
  });
  const navCta = document.querySelector('.nav-menu .btn-primary');
  if (navCta) navCta.textContent = t('nav_cta');

  // Anti-scam "verify us" section
  setText('#verifyTitle', 'verify_title');
  setText('#verifySubtitle', 'verify_subtitle');
  setText('#verifyCredTitle', 'verify_cred_title');
  setHTML('#verifyCredList', 'verify_cred_html');
  setText('#verifyNeverTitle', 'verify_never_title');
  setHTML('#verifyNeverList', 'verify_never_html');
  setText('#verifySafety', 'verify_safety');
  setText('#objFaqTitle', 'objfaq_title');
  setText('#objFaqSubtitle', 'objfaq_subtitle');
  setHTML('#objFaqList', 'objfaq_html');
  setText('#chainTitle', 'chain_title');
  setText('#chainSubtitle', 'chain_subtitle');
  setText('#cfLabel1', 'chain_n1');
  setText('#cfLabel2', 'chain_n2');
  setText('#cfLabel3', 'chain_n3');
  setText('#cfLabel4', 'chain_n4');
  setText('#offerTitle', 'offer_title');
  setText('#offerLead', 'offer_lead');
  setText('#offer1Title', 'offer_1_title');
  setText('#offer1Text', 'offer_1_text');
  setText('#offer2Title', 'offer_2_title');
  setText('#offer2Text', 'offer_2_text');
  setText('#offer3Title', 'offer_3_title');
  setText('#offer3Text', 'offer_3_text');
  setText('#offerCta', 'form_submit');

  setText('#situationTitle', 'situation_title');
  setText('#situationLead', 'situation_lead');
  setHTML('#situation1', 'situation_1');
  setHTML('#situation2', 'situation_2');
  setHTML('#situation3', 'situation_3');
  setHTML('#situation4', 'situation_4');
  setHTML('#situation5', 'situation_5');
  setHTML('#situation6', 'situation_6');
  setText('#situationCta', 'situation_cta');
  setText('#situationNote', 'situation_note');

  // Hero
  setText('.hero-badge span', 'hero_badge');
  setText('.hero-title', 'hero_title');
  setText('.hero-subtitle', 'hero_subtitle');
  const heroBtns = document.querySelectorAll('.hero-cta .btn');
  if (heroBtns[0]) heroBtns[0].textContent = t('hero_btn_primary');
  if (heroBtns[1]) heroBtns[1].textContent = t('hero_btn_secondary');

  // Hero stats
  const stats = document.querySelectorAll('.hero-stats .stat');
  const heroStatData = [
    ['stat_legal', 'stat_legal_label'],
    ['stat_crypto', 'stat_crypto_label'],
    ['stat_coverage', 'stat_coverage_label'],
    ['stat_gdpr', 'stat_gdpr_label'],
  ];
  stats.forEach((stat, i) => {
    if (!heroStatData[i]) return;
    const num = stat.querySelector('.stat-number');
    const lbl = stat.querySelector('.stat-label');
    if (num) num.textContent = t(heroStatData[i][0]);
    if (lbl) lbl.textContent = t(heroStatData[i][1]);
  });

  // Trust badges
  const badges = document.querySelectorAll('.badge-item .badge-text');
  ['badge_1', 'badge_2', 'badge_3', 'badge_4'].forEach((key, i) => {
    if (badges[i]) badges[i].textContent = t(key);
  });

  // Services section
  setText('.services-section .section-title', 'services_title');
  setText('.services-section .section-subtitle', 'services_subtitle');
  const cards = document.querySelectorAll('.service-card');
  const cardData = [
    ['service1_title', 'service1_desc', ['service1_f1','service1_f2','service1_f3','service1_f4']],
    ['service2_title', 'service2_desc', ['service2_f1','service2_f2','service2_f3','service2_f4']],
    ['service3_title', 'service3_desc', ['service3_f1','service3_f2','service3_f3','service3_f4']],
    ['service4_title', 'service4_desc', ['service4_f1','service4_f2','service4_f3','service4_f4']],
    ['service5_title', 'service5_desc', ['service5_f1','service5_f2','service5_f3','service5_f4']],
    ['service6_title', 'service6_desc', ['service6_f1','service6_f2','service6_f3','service6_f4']],
  ];
  cards.forEach((card, i) => {
    if (!cardData[i]) return;
    const title = card.querySelector('.service-title');
    const desc = card.querySelector('.service-description');
    const features = card.querySelectorAll('.service-features li');
    if (title) title.textContent = t(cardData[i][0]);
    if (desc) desc.textContent = t(cardData[i][1]);
    features.forEach((f, j) => { if (cardData[i][2][j]) f.textContent = t(cardData[i][2][j]); });
  });

  // Methodology
  setText('.technology-section .section-title', 'method_title');
  setText('.tech-intro', 'method_intro');
  const features = document.querySelectorAll('.tech-feature');
  const methodData = [
    ['method1_title', 'method1_desc'],
    ['method2_title', 'method2_desc'],
    ['method3_title', 'method3_desc'],
    ['method4_title', 'method4_desc'],
    ['method5_title', 'method5_desc'],
    ['method6_title', 'method6_desc'],
  ];
  features.forEach((f, i) => {
    if (!methodData[i]) return;
    const h3 = f.querySelector('h3');
    const p = f.querySelector('p');
    if (h3) h3.textContent = t(methodData[i][0]);
    if (p) p.textContent = t(methodData[i][1]);
  });

  // Tech stats
  const techStats = document.querySelectorAll('.tech-stat');
  const techStatData = [
    ['stat_blockchains', 'stat_blockchains_label'],
    ['stat_intl', 'stat_intl_label'],
    ['stat_gdpr2', 'stat_gdpr2_label'],
  ];
  techStats.forEach((s, i) => {
    if (!techStatData[i]) return;
    const num = s.querySelector('.tech-stat-number');
    const lbl = s.querySelector('.tech-stat-label');
    if (num) num.textContent = t(techStatData[i][0]);
    if (lbl) lbl.textContent = t(techStatData[i][1]);
  });

  // Process
  setText('.process-section .section-title', 'process_title');
  setText('.process-section .section-subtitle', 'process_subtitle');
  const steps = document.querySelectorAll('.process-step');
  const stepData = [
    ['step1_title', 'step1_desc'],
    ['step2_title', 'step2_desc'],
    ['step3_title', 'step3_desc'],
    ['step4_title', 'step4_desc'],
    ['step5_title', 'step5_desc'],
  ];
  steps.forEach((step, i) => {
    if (!stepData[i]) return;
    const h3 = step.querySelector('h3');
    const p = step.querySelector('p');
    if (h3) h3.textContent = t(stepData[i][0]);
    if (p) p.textContent = t(stepData[i][1]);
  });

  // About
  setText('.about-section .section-title', 'about_title');
  const aboutTexts = document.querySelectorAll('.about-text');
  if (aboutTexts[0]) aboutTexts[0].textContent = t('about_text1');
  if (aboutTexts[1]) aboutTexts[1].textContent = t('about_text2');
  const aboutFeatures = document.querySelectorAll('.about-feature');
  const aboutFData = [
    ['about_f1_title', 'about_f1_desc'],
    ['about_f2_title', 'about_f2_desc'],
    ['about_f3_title', 'about_f3_desc'],
    ['about_f4_title', 'about_f4_desc'],
  ];
  aboutFeatures.forEach((f, i) => {
    if (!aboutFData[i]) return;
    const h4 = f.querySelector('h4');
    const p = f.querySelector('p');
    if (h4) h4.textContent = t(aboutFData[i][0]);
    if (p) p.textContent = t(aboutFData[i][1]);
  });
  const certTitle = document.querySelector('.certifications h3');
  if (certTitle) certTitle.textContent = t('pricing_title');
  const certBadges = document.querySelectorAll('.cert-badge');
  ['cert1','cert2','cert3','cert4'].forEach((key, i) => {
    if (certBadges[i]) certBadges[i].textContent = t(key);
  });
  const statItems = document.querySelectorAll('.stats-card .stat-item');
  const statItemData = [
    ['stats_time', 'stats_time_label'],
    ['stats_min', 'stats_min_label'],
    ['stats_chains', 'stats_chains_label'],
    ['stats_cov', 'stats_cov_label'],
  ];
  statItems.forEach((s, i) => {
    if (!statItemData[i]) return;
    const val = s.querySelector('.stat-value');
    const lbl = s.querySelector('.stat-label');
    if (val) val.textContent = t(statItemData[i][0]);
    if (lbl) lbl.textContent = t(statItemData[i][1]);
  });

  // Testimonials
  setText('.testimonials-section .section-title', 'test_title');
  setText('.testimonials-section .section-subtitle', 'test_subtitle');

  // FAQ
  setText('.faq-section .section-title', 'faq_title');
  setText('.faq-section .section-subtitle', 'faq_subtitle');
  const faqItems = document.querySelectorAll('.faq-item');
  const faqData = [
    ['faq1_q', 'faq1_a'],
    ['faq2_q', 'faq2_a'],
    ['faq3_q', 'faq3_a'],
    ['faq4_q', 'faq4_a'],
    ['faq5_q', 'faq5_a'],
    ['faq6_q', 'faq6_a'],
    ['faq7_q', 'faq7_a'],
    ['faq8_q', 'faq8_a'],
  ];
  faqItems.forEach((item, i) => {
    if (!faqData[i]) return;
    const q = item.querySelector('.faq-question h3');
    const a = item.querySelector('.faq-answer p');
    if (q) q.textContent = t(faqData[i][0]);
    if (a) a.textContent = t(faqData[i][1]);
  });

  // Contact
  setText('.contact-info .section-title', 'contact_title');
  setText('.contact-intro', 'contact_intro');
  const methods = document.querySelectorAll('.contact-method');
  if (methods[0]) {
    const h4 = methods[0].querySelector('h4'); if (h4) h4.textContent = t('contact_phone_label');
    const span = methods[0].querySelector('span'); if (span) span.textContent = t('contact_phone_note');
  }
  if (methods[1]) {
    const h4 = methods[1].querySelector('h4'); if (h4) h4.textContent = t('contact_email_label');
    const span = methods[1].querySelector('span'); if (span) span.textContent = t('contact_email_note');
  }
  if (methods[2]) {
    const h4 = methods[2].querySelector('h4'); if (h4) h4.textContent = t('contact_coverage_label');
    const p = methods[2].querySelector('p'); if (p) p.textContent = t('contact_coverage_val');
    const span = methods[2].querySelector('span'); if (span) span.textContent = t('contact_coverage_note');
  }
  if (methods[3]) {
    const h4 = methods[3].querySelector('h4'); if (h4) h4.textContent = t('contact_pricing_label');
    const p = methods[3].querySelector('p'); if (p) p.innerHTML = t('contact_pricing_val');
  }
  const emergTitle = document.querySelector('.emergency-contact h4');
  if (emergTitle) emergTitle.textContent = t('disclaimer_title');
  const emergText = document.querySelector('.emergency-contact p');
  if (emergText) emergText.textContent = t('disclaimer_text');

  // Form
  setText('.contact-form h3', 'form_title');
  setText('.form-subtitle', 'form_subtitle');
  const nameLabel = document.querySelector('label[for="name"]'); if (nameLabel) nameLabel.textContent = t('form_name');
  const emailLabel = document.querySelector('label[for="email"]'); if (emailLabel) emailLabel.textContent = t('form_email');
  const phoneLabel = document.querySelector('label[for="phone"]'); if (phoneLabel) phoneLabel.textContent = t('form_phone');
  const amountLabel = document.querySelector('label[for="amount"]'); if (amountLabel) amountLabel.textContent = t('form_amount');
  const scamLabel = document.querySelector('label[for="scamType"]'); if (scamLabel) scamLabel.textContent = t('form_scamtype');
  const whenLabel = document.querySelector('label[for="when"]'); if (whenLabel) whenLabel.textContent = t('form_when');
  const payLabel = document.querySelector('label[for="payment"]'); if (payLabel) payLabel.textContent = t('form_payment');
  const msgLabel = document.querySelector('label[for="message"]'); if (msgLabel) msgLabel.textContent = t('form_message');
  const consentLabel = document.querySelector('label[for="consent"]'); if (consentLabel) consentLabel.textContent = t('form_consent');
  const msgInput = document.querySelector('#message'); if (msgInput) msgInput.placeholder = t('form_message_placeholder');
  const submitBtn = document.querySelector('.contact-form button[type="submit"]'); if (submitBtn) submitBtn.textContent = t('form_submit');
  setText('#formUrgency', 'form_urgency');
  setHTML('#formReassure', 'form_reassure_html');
  const ind1 = document.querySelector('.form-step-indicator[data-step="1"]'); if (ind1) ind1.textContent = t('form_step1_indicator');
  const ind2 = document.querySelector('.form-step-indicator[data-step="2"]'); if (ind2) ind2.textContent = t('form_step2_indicator');
  const contBtn = document.querySelector('.form-continue-btn'); if (contBtn) contBtn.textContent = t('form_continue');
  const backBtn = document.querySelector('.form-back-btn'); if (backBtn) backBtn.textContent = t('form_back');
  setText('.form-note', 'form_note');

  // Select placeholders + options
  const amountSel = document.querySelector('#amount');
  if (amountSel) {
    const opts = amountSel.querySelectorAll('option');
    if (opts[0]) opts[0].textContent = t('form_amount_placeholder');
    if (opts[1]) opts[1].textContent = t('form_amount_0');
    if (opts[2]) opts[2].textContent = t('form_amount_1');
    if (opts[3]) opts[3].textContent = t('form_amount_2');
    if (opts[4]) opts[4].textContent = t('form_amount_3');
    if (opts[5]) opts[5].textContent = t('form_amount_4');
  }
  const scamSel = document.querySelector('#scamType');
  if (scamSel) {
    const opts = scamSel.querySelectorAll('option');
    if (opts[0]) opts[0].textContent = t('form_scamtype_placeholder');
    if (opts[1]) opts[1].textContent = t('form_scamtype_crypto');
    if (opts[2]) opts[2].textContent = t('form_scamtype_broker');
    if (opts[3]) opts[3].textContent = t('form_scamtype_bank');
    if (opts[4]) opts[4].textContent = t('form_scamtype_card');
    if (opts[5]) opts[5].textContent = t('form_scamtype_other');
  }
  const whenSel = document.querySelector('#when');
  if (whenSel) {
    const opts = whenSel.querySelectorAll('option');
    if (opts[0]) opts[0].textContent = t('form_when_placeholder');
    if (opts[1]) opts[1].textContent = t('form_when_7');
    if (opts[2]) opts[2].textContent = t('form_when_14');
    if (opts[3]) opts[3].textContent = t('form_when_3m');
    if (opts[4]) opts[4].textContent = t('form_when_36m');
    if (opts[5]) opts[5].textContent = t('form_when_612m');
    if (opts[6]) opts[6].textContent = t('form_when_1y');
  }
  const paySel = document.querySelector('#payment');
  if (paySel) {
    const opts = paySel.querySelectorAll('option');
    if (opts[0]) opts[0].textContent = t('form_payment_placeholder');
    if (opts[1]) opts[1].textContent = t('form_payment_crypto');
    if (opts[2]) opts[2].textContent = t('form_payment_card');
    if (opts[3]) opts[3].textContent = t('form_payment_bank');
    if (opts[4]) opts[4].textContent = t('form_payment_other');
  }

  // Footer
  setText('.footer-desc', 'footer_desc');
  const footerCols = document.querySelectorAll('.footer-col');
  if (footerCols[1]) { const h4 = footerCols[1].querySelector('h4'); if (h4) h4.textContent = t('footer_services'); }
  if (footerCols[2]) {
    const h4 = footerCols[2].querySelector('h4'); if (h4) h4.textContent = t('footer_company');
    const links = footerCols[2].querySelectorAll('a');
    const footerCompanyKeys = ['footer_about','footer_methodology','footer_who','footer_contact_us','footer_privacy','footer_terms'];
    links.forEach((a, i) => { if (footerCompanyKeys[i]) a.textContent = t(footerCompanyKeys[i]); });
  }
  if (footerCols[3]) { const h4 = footerCols[3].querySelector('h4'); if (h4) h4.textContent = t('footer_contact'); }
  setText('.footer-legal p:first-child', 'footer_copy');
  const disclaimerP = document.querySelector('.footer-legal .disclaimer');
  if (disclaimerP) {
    const strong = disclaimerP.querySelector('strong');
    disclaimerP.textContent = '';
    if (lang === 'de') {
      if (strong) { strong.textContent = 'Rechtlicher Hinweis:'; disclaimerP.appendChild(strong); }
    } else {
      if (strong) { strong.textContent = 'Legal Disclaimer:'; disclaimerP.appendChild(strong); }
    }
    disclaimerP.appendChild(document.createTextNode(' ' + t('footer_disclaimer')));
  }

  // Footer service links
  if (footerCols[1]) {
    const svcLinks = footerCols[1].querySelectorAll('a');
    ['footer_s1','footer_s2','footer_s3','footer_s4','footer_s5','footer_s6'].forEach((key, i) => {
      if (svcLinks[i]) svcLinks[i].textContent = t(key);
    });
  }

  // Footer certifications
  const footerCerts = document.querySelectorAll('.footer-certifications .cert');
  if (footerCerts[0]) footerCerts[0].textContent = t('footer_cert_gdpr');
  if (footerCerts[1]) footerCerts[1].textContent = t('footer_cert_cov');

  // About image overlay labels
  const ovLabels = document.querySelectorAll('.ov-lbl');
  if (ovLabels[0]) ovLabels[0].textContent = t('overlay_lbl1');
  if (ovLabels[1]) ovLabels[1].textContent = t('overlay_lbl2');
  if (ovLabels[2]) ovLabels[2].textContent = t('overlay_lbl3');

  // Team section
  setText('.team-section .section-title', 'team_title');
  setText('.team-section .section-subtitle', 'team_subtitle');
  const teamCards = document.querySelectorAll('.team-card');
  const teamData = [
    ['team1_role', 'team1_bio', 'team1_tag1', 'team1_tag2'],
    ['team2_role', 'team2_bio', 'team2_tag1', 'team2_tag2'],
    ['team3_role', 'team3_bio', 'team3_tag1', 'team3_tag2'],
    ['team4_role', 'team4_bio', 'team4_tag1', 'team4_tag2'],
  ];
  teamCards.forEach((card, i) => {
    if (!teamData[i]) return;
    const role = card.querySelector('.team-role'); if (role) role.textContent = t(teamData[i][0]);
    const bio = card.querySelector('.team-bio'); if (bio) bio.textContent = t(teamData[i][1]);
    const tags = card.querySelectorAll('.team-tags span');
    if (tags[0]) tags[0].textContent = t(teamData[i][2]);
    if (tags[1]) tags[1].textContent = t(teamData[i][3]);
  });


  // Rating widget
  setText('.rating-platform', 'rating_platform');
  setText('.rating-count', 'rating_count');
  const hiItems = document.querySelectorAll('.highlight-item .hi-text');
  if (hiItems[0]) hiItems[0].innerHTML = '<strong>' + t('rating_h1') + '</strong><br>' + t('rating_t1');
  if (hiItems[1]) hiItems[1].innerHTML = '<strong>' + t('rating_h2') + '</strong><br>' + t('rating_t2');
  if (hiItems[2]) hiItems[2].innerHTML = '<strong>' + t('rating_h3') + '</strong><br>' + t('rating_t3');

  // Testimonial card content
  const testCards = document.querySelectorAll('.testimonial-card');
  const testData = [
    ['test1_text', 'test1_location'],
    ['test2_text', 'test2_location'],
    ['test3_text', 'test3_location'],
    ['test4_text', 'test4_location'],
    ['test5_text', 'test5_location'],
    ['test6_text', 'test6_location'],
  ];
  testCards.forEach((card, i) => {
    if (!testData[i]) return;
    const p = card.querySelector('.testimonial-text'); if (p) p.textContent = t(testData[i][0]);
    const loc = card.querySelector('.author-location'); if (loc) loc.textContent = t(testData[i][1]);
  });

  // FAB
  const fab = document.querySelector('.fab span');
  if (fab) fab.textContent = t('fab_label');

  // Form success card
  const successTitle = document.getElementById('successTitle');
  const successMsg   = document.getElementById('successMsg');
  const successStep1 = document.getElementById('successStep1');
  const successStep2 = document.getElementById('successStep2');
  const successStep3 = document.getElementById('successStep3');
  const successNote  = document.getElementById('successNote');
  if (successTitle) successTitle.textContent = t('success_title');
  if (successMsg)   successMsg.textContent   = t('success_msg');
  if (successStep1) { successStep1.innerHTML = '<span>1</span> ' + t('success_step1'); }
  if (successStep2) { successStep2.innerHTML = '<span>2</span> ' + t('success_step2'); }
  if (successStep3) { successStep3.innerHTML = '<span>3</span> ' + t('success_step3'); }
  if (successNote)  successNote.textContent  = t('success_note');

  // Update lang switcher button text
  const switcher = document.getElementById('langSwitcher');
  if (switcher) switcher.textContent = (LANG_NAMES[document.documentElement.lang] || 'English') + ' ▾';

  // ── Blog page (blog.html) ────────────────────────────────────────────
  const blogHero = document.querySelector('.blog-hero');
  if (blogHero) {
    const h1 = blogHero.querySelector('h1');
    const p  = blogHero.querySelector('p');
    if (h1) h1.textContent = t('blog_hero_title');
    if (p)  p.textContent  = t('blog_hero_subtitle');
  }
  const blogCards = document.querySelectorAll('.blog-card');
  const blogCardData = [
    ['blog_a1_cat','blog_a1_title','blog_a1_excerpt','blog_a1_author','blog_a1_url'],
    ['blog_a2_cat','blog_a2_title','blog_a2_excerpt','blog_a2_author','blog_a2_url'],
    ['blog_a3_cat','blog_a3_title','blog_a3_excerpt','blog_a3_author','blog_a3_url'],
    ['blog_a4_cat','blog_a4_title','blog_a4_excerpt','blog_a4_author','blog_a4_url'],
    ['blog_a5_cat','blog_a5_title','blog_a5_excerpt','blog_a5_author','blog_a5_url'],
  ];
  blogCards.forEach((card, i) => {
    // Homepage teaser cards translate themselves via data-i18n; skip them here
    // so this index-based blog-list mapping never clobbers them.
    if (card.querySelector('[data-i18n], [data-i18n-html]')) return;
    if (!blogCardData[i]) return;
    const [catKey, titleKey, excerptKey, authorKey, urlKey] = blogCardData[i];
    const cat    = card.querySelector('.blog-category');
    const title  = card.querySelector('.blog-card-title');
    const excerpt= card.querySelector('.blog-card-excerpt');
    const author = card.querySelector('.blog-card-author');
    const readMore = card.querySelector('.blog-read-more');
    if (cat)    cat.textContent    = t(catKey);
    if (title)  title.textContent  = t(titleKey);
    if (excerpt)excerpt.textContent= t(excerptKey);
    if (author) { author.innerHTML = '<strong>' + t(authorKey).split('\u00b7')[0].trim() + '</strong> &nbsp;\u00b7&nbsp; ' + (t(authorKey).split('\u00b7')[1] || '').trim(); }
    if (readMore) readMore.textContent = t('blog_read_more');
    card.href = t(urlKey);
  });
}

// ============================
// Init
// ============================
async function initI18n() {
  const _path = location.pathname;
  const onDeHome = (_path === '/de' || _path === '/de/');
  const onEsHome = (_path === '/es' || _path === '/es/');
  const onEnHome = (_path === '/' || _path === '/index.html' || _path === '/index-de.html' || _path === '/index-es.html');

  // Dedicated language homepages serve static translated HTML.
  if (onDeHome) { setLang('de'); applyTranslations(); return; }
  if (onEsHome) { setLang('es'); applyTranslations(); return; }

  let lang = getLang();
  if (!lang) {
    // Language by phone/browser first, then by country (German- or
    // Spanish-speaking). English otherwise.
    const bl = detectLangFromBrowser(); // 'de' | 'es' | null
    if (bl) {
      lang = bl;
    } else {
      let country = await detectCountryVercel();
      if (!country) country = await detectCountryFallback();
      if (country && GERMAN_COUNTRIES.includes(country)) lang = 'de';
      else if (country && SPANISH_COUNTRIES.includes(country)) lang = 'es';
      else lang = 'en';
    }
  }

  // English homepage: send German/Spanish visitors to their homepage URL so
  // each language has its own canonical page. Respects a stored choice.
  if (onEnHome && lang === 'de') { location.replace('/de'); return; }
  if (onEnHome && lang === 'es') { location.replace('/es'); return; }

  if (!onEnHome) setLang(lang);
  if (redirectBlogIfNeeded(lang)) return;
  applyTranslations();
}

function switchTo(lang) {
  setLang(lang);
  const p = location.pathname;
  const homeUrls = { en: '/', de: '/de', es: '/es' };
  const onHome = (p === '/' || p === '/de' || p === '/de/' || p === '/es' || p === '/es/' ||
                  p === '/index.html' || p === '/index-de.html' || p === '/index-es.html');
  if (onHome) { location.href = homeUrls[lang] || '/'; return; }
  // Blog: EN/DE have their own article URLs; Spanish has no articles yet,
  // so send Spanish visitors to the Spanish homepage.
  if (lang === 'es') { location.href = '/es'; return; }
  if (redirectBlogIfNeeded(lang)) return;
  applyTranslations();
}

// Dropdown language selector (English / Deutsch / Español).
function setupLangSwitcher() {
  // Skip during static prerender so no runtime state leaks into the snapshot.
  if (typeof window !== 'undefined' && window.__PRERENDER__) return;
  const btn = document.getElementById('langSwitcher');
  if (!btn || btn.dataset.rgLangReady) return;
  btn.dataset.rgLangReady = '1';

  const menu = document.createElement('div');
  menu.style.cssText = 'position:absolute;background:#fff;border:1px solid #e2e8f0;border-radius:8px;' +
    'box-shadow:0 8px 24px rgba(0,0,0,.15);padding:6px;display:none;z-index:100000;min-width:130px;';
  ['en', 'de', 'es'].forEach(function (l) {
    const item = document.createElement('button');
    item.type = 'button';
    item.textContent = LANG_NAMES[l];
    item.style.cssText = 'display:block;width:100%;text-align:left;background:none;border:none;' +
      'padding:9px 14px;border-radius:6px;cursor:pointer;font:inherit;color:#0f172a;';
    item.addEventListener('mouseenter', function () { item.style.background = '#eef4ff'; });
    item.addEventListener('mouseleave', function () { item.style.background = 'none'; });
    item.addEventListener('click', function (e) { e.stopPropagation(); switchTo(l); });
    menu.appendChild(item);
  });
  document.body.appendChild(menu);

  function place() {
    const r = btn.getBoundingClientRect();
    menu.style.top = (window.scrollY + r.bottom + 6) + 'px';
    menu.style.left = (window.scrollX + Math.max(8, r.right - 130)) + 'px';
  }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    place();
    menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';
  });
  document.addEventListener('click', function () { menu.style.display = 'none'; });
  window.addEventListener('resize', function () { menu.style.display = 'none'; });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    setupLangSwitcher();
  });
} else {
  initI18n();
  setupLangSwitcher();
}
