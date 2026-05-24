export type ServiceSlug =
  | "ai-consulting"
  | "data-strategy"
  | "digital-due-diligence"
  | "buy-or-build"
  | "ai-opportunity-discovery"
  | "software-solution-design"
  | "wireframing-ux-design"
  | "data-transformation-services"
  | "ai-software-development"
  | "ai-agent-development"
  | "ai-model-training"
  | "ai-integration-development"
  | "custom-web-development"
  | "custom-mobile-app-development"
  | "bespoke-customer-portal"
  | "bespoke-crm-erp-development"
  | "custom-systems-integration"
  | "software-modernization-replatforming"
  | "security-assessment"
  | "penetration-testing"
  | "security-architecture"
  | "compliance-risk"
  | "incident-response"
  | "security-training";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  category: string;
  icon: string;
  summary: string;
  detail: string;
  image: string;
  outcomes: string[];
  process: string[];
  deliverables: string[];
  technologies: string[];
};

export type ServiceGroup = {
  name: string;
  description: string;
  slugs: ServiceSlug[];
};

export type CaseStudy = {
  title: string;
  client: string;
  sector: string;
  image: string;
  challenge: string;
  solution: string;
  results: Array<{ value: string; label: string }>;
  technologies: string[];
  quote: string;
};

export const heroImage =
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2200";

export const companyImages = {
  developers:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600",
  team: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
  workflow:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1600"
};

const commonProcess = ["Discover", "Design", "Build", "Harden", "Launch"];

export const services: Service[] = [
  {
    slug: "ai-consulting",
    title: "AI Consulting Services",
    shortTitle: "AI Consulting",
    category: "AI & Data Strategy",
    icon: "brain",
    summary: "Make AI practical with a roadmap, governance model, and measurable business case.",
    detail:
      "CYNX helps leadership teams move from AI interest to scoped initiatives that can be shipped, measured, and governed. We assess workflows, data readiness, operating risk, and integration constraints before defining a practical delivery plan.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Prioritized AI roadmap", "Governance model", "Proof-of-impact plan"],
    process: ["Opportunity audit", "Data readiness review", "Risk model", "Pilot plan"],
    deliverables: ["AI strategy deck", "Use-case scorecard", "Implementation backlog"],
    technologies: ["OpenAI", "LangChain", "Python", "Vector databases", "Azure AI"]
  },
  {
    slug: "data-strategy",
    title: "Data Strategy Consulting",
    shortTitle: "Data Strategy",
    category: "AI & Data Strategy",
    icon: "database",
    summary: "Turn fragmented data into a trusted foundation for reporting, automation, and AI.",
    detail:
      "We design data operating models that align ownership, quality, access, security, and architecture so teams can improve reliability without disrupting operations.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Data maturity baseline", "Target architecture", "Governance plan"],
    process: ["Source inventory", "Stakeholder interviews", "Risk mapping", "Roadmap definition"],
    deliverables: ["Data strategy", "Integration map", "Quality rules"],
    technologies: ["PostgreSQL", "dbt", "Snowflake", "BigQuery", "Power BI"]
  },
  {
    slug: "digital-due-diligence",
    title: "Digital Due Diligence",
    shortTitle: "Digital Due Diligence",
    category: "AI & Data Strategy",
    icon: "shield",
    summary: "Assess software, security, scalability, and delivery risk before investment.",
    detail:
      "CYNX reviews product architecture, code quality, cloud operations, security posture, technical debt, and engineering process so investors and operators can make informed decisions.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Investment risk view", "Remediation plan", "Scalability profile"],
    process: ["Architecture review", "Dependency review", "Security assessment", "Risk report"],
    deliverables: ["Diligence report", "Risk register", "Post-close roadmap"],
    technologies: ["SAST", "Cloud audit", "Dependency scanning", "Architecture review"]
  },
  {
    slug: "buy-or-build",
    title: "Buy or Build Software Analysis",
    shortTitle: "Buy or Build",
    category: "AI & Data Strategy",
    icon: "scale",
    summary: "Choose between custom build, SaaS, integrations, and hybrid platforms.",
    detail:
      "We compare total cost, strategic control, time-to-market, security, customization, and vendor risk so teams avoid expensive platform decisions based on incomplete assumptions.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Decision framework", "Cost model", "Implementation recommendation"],
    process: ["Requirements mapping", "Market scan", "Cost analysis", "Recommendation"],
    deliverables: ["Buy/build scorecard", "Vendor comparison", "Delivery plan"],
    technologies: ["SaaS evaluation", "API analysis", "TCO modeling", "Architecture planning"]
  },
  {
    slug: "ai-opportunity-discovery",
    title: "AI Opportunity Discovery",
    shortTitle: "AI Discovery",
    category: "Solution Design & Discovery",
    icon: "search",
    summary: "Find automation opportunities with the best balance of value, feasibility, and risk.",
    detail:
      "We run structured discovery across workflows, data, systems, and team constraints to identify AI use cases that can move from prototype to production.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Ranked opportunity backlog", "Feasibility scoring", "Pilot selection"],
    process: ["Workflow mapping", "Data check", "Impact scoring", "Pilot design"],
    deliverables: ["Opportunity matrix", "Prototype brief", "ROI hypothesis"],
    technologies: ["Process mining", "LLMs", "Automation APIs", "Analytics"]
  },
  {
    slug: "software-solution-design",
    title: "Software Solution Design",
    shortTitle: "Solution Design",
    category: "Solution Design & Discovery",
    icon: "layout",
    summary: "Define architecture, flows, integrations, and release plans before development.",
    detail:
      "CYNX turns business goals into buildable software blueprints: system boundaries, data flows, technical options, security controls, and release milestones.",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Build-ready specification", "Technical architecture", "Delivery estimate"],
    process: ["Requirements workshop", "Architecture design", "Integration planning", "Scoping"],
    deliverables: ["Solution blueprint", "User stories", "Technical roadmap"],
    technologies: ["React", "Node.js", "PostgreSQL", "Cloud architecture", "API design"]
  },
  {
    slug: "wireframing-ux-design",
    title: "Wireframing & UX Design",
    shortTitle: "Wireframing & UX",
    category: "Solution Design & Discovery",
    icon: "pen-tool",
    summary: "Prototype usable interfaces before engineering investment.",
    detail:
      "We translate complex operational needs into clear screens, interaction patterns, and design systems that accelerate development and reduce rework.",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Validated user journeys", "Interactive prototypes", "Design system direction"],
    process: ["Journey mapping", "Wireframes", "Prototype review", "Design handoff"],
    deliverables: ["Clickable prototype", "Component inventory", "UX recommendations"],
    technologies: ["Figma", "Design systems", "Accessibility", "Usability testing"]
  },
  {
    slug: "data-transformation-services",
    title: "Data Transformation Services",
    shortTitle: "Data Transformation",
    category: "Solution Design & Discovery",
    icon: "refresh",
    summary: "Clean, migrate, integrate, and model data for modern products and reporting.",
    detail:
      "We help companies move from brittle spreadsheets and disconnected systems to structured, trusted data flows that support automation, analytics, and AI.",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Reliable pipelines", "Clean migration plan", "Reusable data models"],
    process: ["Data profiling", "Mapping", "Pipeline build", "Monitoring"],
    deliverables: ["Migration scripts", "Quality rules", "Integration documentation"],
    technologies: ["ETL", "PostgreSQL", "Python", "Airflow", "dbt"]
  },
  {
    slug: "ai-software-development",
    title: "AI Software Development",
    shortTitle: "AI Software",
    category: "AI Development & Implementation",
    icon: "code",
    summary: "Build production AI features into web, mobile, and internal applications.",
    detail:
      "CYNX develops AI products that are secure, observable, and maintainable. We connect models to workflows, permissions, business data, and user interfaces.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Production AI features", "Secure model integration", "Evaluation loop"],
    process: commonProcess,
    deliverables: ["AI feature codebase", "Evaluation harness", "Release playbook"],
    technologies: ["OpenAI", "React", "TypeScript", "Node.js", "PostgreSQL"]
  },
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    shortTitle: "AI Agents",
    category: "AI Development & Implementation",
    icon: "bot",
    summary: "Create workflow agents that reason, call tools, escalate, and stay controlled.",
    detail:
      "We design agentic systems with explicit permissions, auditability, retrieval, tool calling, human review, and failure modes so automation remains safe.",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Task automation", "Tool-connected agents", "Human review controls"],
    process: ["Workflow selection", "Tool design", "Agent build", "Safety testing"],
    deliverables: ["Agent runtime", "Tool registry", "Monitoring dashboard"],
    technologies: ["Agents SDK", "MCP", "Vector search", "Queues", "Node.js"]
  },
  {
    slug: "ai-model-training",
    title: "AI Model Training",
    shortTitle: "Model Training",
    category: "AI Development & Implementation",
    icon: "cpu",
    summary: "Train, fine-tune, evaluate, and deploy models for your domain and data.",
    detail:
      "From data preparation to model evaluation, CYNX builds training workflows that balance accuracy, reliability, cost, and compliance.",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Domain-specific models", "Evaluation benchmarks", "Deployment workflow"],
    process: ["Dataset preparation", "Training plan", "Evaluation", "Deployment"],
    deliverables: ["Training dataset", "Model report", "Inference setup"],
    technologies: ["Python", "PyTorch", "TensorFlow", "Hugging Face", "MLflow"]
  },
  {
    slug: "ai-integration-development",
    title: "AI Integration Development",
    shortTitle: "AI Integration",
    category: "AI Development & Implementation",
    icon: "plug",
    summary: "Connect AI to CRMs, ERPs, data platforms, support tools, and internal systems.",
    detail:
      "We build integration layers, APIs, permissions, and data pipelines that let AI features work inside the systems teams already use.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["System-connected AI", "Secure API layer", "Operational automation"],
    process: ["System audit", "API design", "Integration build", "Release support"],
    deliverables: ["Integration services", "API documentation", "Monitoring setup"],
    technologies: ["Node.js", "REST", "GraphQL", "Webhooks", "OAuth"]
  },
  {
    slug: "custom-web-development",
    title: "Custom Web App Development",
    shortTitle: "Web Apps",
    category: "Software Development",
    icon: "monitor",
    summary: "Build scalable web applications, portals, SaaS products, and internal systems.",
    detail:
      "CYNX delivers custom web applications with modern frontends, secure backends, clean APIs, and maintainable infrastructure.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Scalable platform", "Secure backend", "Modern user experience"],
    process: commonProcess,
    deliverables: ["React application", "Node.js APIs", "Deployment pipeline"],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Vite"]
  },
  {
    slug: "custom-mobile-app-development",
    title: "Custom Mobile App Development",
    shortTitle: "Mobile Apps",
    category: "Software Development",
    icon: "smartphone",
    summary: "Create native and cross-platform mobile apps with reliable APIs and polished UX.",
    detail:
      "We build mobile applications for customer, employee, and partner workflows, backed by secure cloud services and practical release processes.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Cross-platform app", "Secure backend", "Release support"],
    process: ["Product scope", "UX prototype", "Mobile build", "Store release"],
    deliverables: ["Mobile app", "Backend APIs", "Release checklist"],
    technologies: ["React Native", "Flutter", "TypeScript", "Firebase", "Node.js"]
  },
  {
    slug: "bespoke-customer-portal",
    title: "Bespoke Customer Portal",
    shortTitle: "Customer Portals",
    category: "Software Development",
    icon: "users",
    summary: "Give customers secure self-service for requests, documents, payments, and support.",
    detail:
      "CYNX designs customer portals that reduce manual support, improve transparency, and integrate with existing operational systems.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Self-service workflows", "Secure access", "Reduced admin load"],
    process: ["Workflow mapping", "Portal design", "Integration build", "Launch"],
    deliverables: ["Portal application", "Authentication setup", "Admin tools"],
    technologies: ["React", "Auth", "Stripe", "Node.js", "PostgreSQL"]
  },
  {
    slug: "bespoke-crm-erp-development",
    title: "Bespoke CRM & ERP Development",
    shortTitle: "CRM & ERP",
    category: "Software Development",
    icon: "building",
    summary: "Build operational systems that match how teams sell, deliver, and report.",
    detail:
      "We replace disconnected spreadsheets and rigid tools with systems tailored to real processes, roles, permissions, and reporting needs.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Unified operations", "Role-based workflows", "Management reporting"],
    process: ["Process analysis", "Data model", "Workflow build", "Rollout"],
    deliverables: ["CRM/ERP platform", "Dashboards", "Migration plan"],
    technologies: ["React", "PostgreSQL", "Node.js", "Charts", "APIs"]
  },
  {
    slug: "custom-systems-integration",
    title: "Custom Systems Integration",
    shortTitle: "Systems Integration",
    category: "Software Development",
    icon: "workflow",
    summary: "Connect the tools your business relies on with resilient APIs and data flows.",
    detail:
      "CYNX integrates CRMs, ERPs, payment platforms, communication tools, analytics, and internal databases so teams can work from consistent data.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Connected systems", "Reduced manual work", "Reliable data"],
    process: ["System map", "API planning", "Integration build", "Monitoring"],
    deliverables: ["Integration services", "Automation flows", "Runbooks"],
    technologies: ["REST", "GraphQL", "Webhooks", "Queues", "Node.js"]
  },
  {
    slug: "software-modernization-replatforming",
    title: "Software Modernization & Replatforming",
    shortTitle: "Modernization",
    category: "Software Development",
    icon: "rocket",
    summary: "Modernize legacy systems without losing business logic or continuity.",
    detail:
      "We assess legacy platforms, define migration paths, rebuild critical modules, and move teams to maintainable modern architecture.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Reduced debt", "Modern architecture", "Safer releases"],
    process: ["Legacy audit", "Migration strategy", "Incremental rebuild", "Cutover"],
    deliverables: ["Modernization roadmap", "Replatformed services", "Migration tools"],
    technologies: ["React", "Node.js", "Cloud", "Containers", "PostgreSQL"]
  },
  {
    slug: "security-assessment",
    title: "Security Assessment & Auditing",
    shortTitle: "Security Assessment",
    category: "Cyber Security",
    icon: "lock",
    summary: "Identify technical, operational, and compliance gaps before incidents happen.",
    detail:
      "CYNX assesses applications, cloud configuration, dependencies, identity, access, and operations to produce a prioritized remediation plan.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Posture baseline", "Risk register", "Remediation roadmap"],
    process: ["Scope", "Assessment", "Evidence review", "Executive report"],
    deliverables: ["Audit report", "Risk register", "Remediation backlog"],
    technologies: ["OWASP", "SAST", "Cloud security", "IAM", "Dependency scanning"]
  },
  {
    slug: "penetration-testing",
    title: "Penetration Testing",
    shortTitle: "Penetration Testing",
    category: "Cyber Security",
    icon: "crosshair",
    summary: "Test web applications, APIs, cloud surfaces, and infrastructure.",
    detail:
      "We perform controlled security testing focused on realistic attack paths, exploitable vulnerabilities, and practical fixes.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Validated vulnerabilities", "Exploit evidence", "Fix guidance"],
    process: ["Rules of engagement", "Testing", "Validation", "Remediation review"],
    deliverables: ["Pen test report", "Evidence appendix", "Retest summary"],
    technologies: ["Burp Suite", "OWASP", "API testing", "Cloud testing", "Scripting"]
  },
  {
    slug: "security-architecture",
    title: "Security Architecture Design",
    shortTitle: "Security Architecture",
    category: "Cyber Security",
    icon: "shield",
    summary: "Design secure-by-default applications, infrastructure, identity, and releases.",
    detail:
      "CYNX helps teams choose security controls that fit their architecture and operating model, from authentication to network boundaries and auditability.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Secure architecture", "Control mapping", "Implementation plan"],
    process: ["Threat model", "Control design", "Architecture review", "Support"],
    deliverables: ["Security architecture", "Threat model", "Control checklist"],
    technologies: ["Zero trust", "IAM", "Encryption", "Secrets management", "Cloud security"]
  },
  {
    slug: "compliance-risk",
    title: "Compliance & Risk Management",
    shortTitle: "Compliance & Risk",
    category: "Cyber Security",
    icon: "file-check",
    summary: "Prepare for audits, manage technology risk, and align controls.",
    detail:
      "We translate compliance requirements into practical engineering, process, evidence, and governance work that teams can maintain.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Control gap analysis", "Audit readiness", "Risk cadence"],
    process: ["Requirement mapping", "Evidence review", "Gap closure", "Reporting"],
    deliverables: ["Control matrix", "Policy recommendations", "Audit evidence plan"],
    technologies: ["ISO 27001", "SOC 2", "GDPR", "Risk registers", "Security policies"]
  },
  {
    slug: "incident-response",
    title: "Incident Response & Forensics",
    shortTitle: "Incident Response",
    category: "Cyber Security",
    icon: "siren",
    summary: "Prepare for, investigate, contain, and recover from security incidents.",
    detail:
      "CYNX supports incident response planning and technical investigation, helping teams preserve evidence, reduce blast radius, and improve controls.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Incident readiness", "Containment plan", "Lessons learned"],
    process: ["Triage", "Containment", "Forensic review", "Recovery plan"],
    deliverables: ["IR playbook", "Incident report", "Remediation plan"],
    technologies: ["SIEM", "Logs", "Forensics", "Endpoint telemetry", "Cloud audit"]
  },
  {
    slug: "security-training",
    title: "Security Training & Awareness",
    shortTitle: "Security Training",
    category: "Cyber Security",
    icon: "graduation",
    summary: "Build stronger security habits across engineering, operations, and leadership.",
    detail:
      "We deliver role-specific security training focused on practical decisions, secure development, incident escalation, and risk awareness.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1400",
    outcomes: ["Reduced human risk", "Role-specific awareness", "Better escalation"],
    process: ["Audience analysis", "Training design", "Workshops", "Exercises"],
    deliverables: ["Training materials", "Secure development checklist", "Awareness plan"],
    technologies: ["OWASP", "Secure SDLC", "Phishing awareness", "Policy training"]
  }
];

export const serviceGroups: ServiceGroup[] = [
  {
    name: "AI & Data Strategy",
    description: "Roadmaps, due diligence, governance, and platform decisions.",
    slugs: ["ai-consulting", "data-strategy", "digital-due-diligence", "buy-or-build"]
  },
  {
    name: "Solution Design & Discovery",
    description: "From opportunity discovery to build-ready product blueprints.",
    slugs: [
      "ai-opportunity-discovery",
      "software-solution-design",
      "wireframing-ux-design",
      "data-transformation-services"
    ]
  },
  {
    name: "AI Development & Implementation",
    description: "Production AI software, agents, integrations, and model workflows.",
    slugs: [
      "ai-software-development",
      "ai-agent-development",
      "ai-model-training",
      "ai-integration-development"
    ]
  },
  {
    name: "Software Development",
    description: "Web apps, mobile apps, portals, CRMs, integrations, and modernization.",
    slugs: [
      "custom-web-development",
      "custom-mobile-app-development",
      "bespoke-customer-portal",
      "bespoke-crm-erp-development",
      "custom-systems-integration",
      "software-modernization-replatforming"
    ]
  },
  {
    name: "Cyber Security",
    description: "Security assessments, penetration testing, architecture, compliance, and response.",
    slugs: [
      "security-assessment",
      "penetration-testing",
      "security-architecture",
      "compliance-risk",
      "incident-response",
      "security-training"
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    title: "AI Customer Support Automation",
    client: "Global Services Group",
    sector: "Customer Operations",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1400",
    challenge:
      "The client needed to reduce first-line ticket pressure while protecting service quality and escalation paths.",
    solution:
      "CYNX built an AI-assisted support workflow with retrieval, human handoff, quality checks, and analytics.",
    results: [
      { value: "42%", label: "Lower first-line workload" },
      { value: "24/7", label: "Assisted response coverage" },
      { value: "31%", label: "Faster resolution" },
      { value: "18w", label: "Launch timeline" }
    ],
    technologies: ["React", "OpenAI", "Node.js", "PostgreSQL", "Vector search"],
    quote:
      "CYNX turned AI from a concept into a controlled operational tool our support teams trust."
  },
  {
    title: "Enterprise Resource Management Portal",
    client: "TechCorp Industries",
    sector: "Enterprise Operations",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400",
    challenge:
      "Procurement and supplier management were split across spreadsheets, email, and legacy systems.",
    solution:
      "CYNX delivered a secure portal with approvals, supplier records, dashboards, and ERP integrations.",
    results: [
      { value: "65%", label: "Faster processing" },
      { value: "$8.5M", label: "Cost reduction" },
      { value: "45", label: "Facilities connected" },
      { value: "92%", label: "User satisfaction" }
    ],
    technologies: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL"],
    quote:
      "The portal changed how our global teams manage procurement. It is intuitive, measurable, and reliable."
  },
  {
    title: "Mobile Banking Platform",
    client: "Premier Financial Services",
    sector: "FinTech",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1400",
    challenge:
      "A regional bank needed a modern mobile experience without compromising security or legacy integration.",
    solution:
      "CYNX built a cross-platform mobile banking app with biometric auth, notifications, and real-time APIs.",
    results: [
      { value: "500K+", label: "Active users" },
      { value: "4.8", label: "App rating" },
      { value: "85%", label: "Digital adoption" },
      { value: "2M+", label: "Monthly transactions" }
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "AWS", "Plaid API"],
    quote:
      "The CYNX team combined product thinking with deep engineering discipline from start to launch."
  },
  {
    title: "Healthcare Data Intelligence Hub",
    client: "Regional Care Network",
    sector: "Healthcare",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1400",
    challenge:
      "Clinical and operations teams were making decisions from delayed reports spread across disconnected systems.",
    solution:
      "CYNX designed a secure data hub with governed pipelines, dashboards, and AI-assisted insight workflows.",
    results: [
      { value: "38%", label: "Faster reporting" },
      { value: "12", label: "Sources unified" },
      { value: "99.9%", label: "Pipeline uptime" },
      { value: "6w", label: "Pilot delivery" }
    ],
    technologies: ["PostgreSQL", "Python", "dbt", "Power BI", "Azure AI"],
    quote:
      "CYNX gave our teams a trusted data foundation without slowing down frontline operations."
  },
  {
    title: "Security Architecture Modernization",
    client: "ScaleUp Commerce Group",
    sector: "Cyber Security",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1400",
    challenge:
      "Rapid product growth had outpaced identity, access, cloud controls, and release governance.",
    solution:
      "CYNX mapped the risk model, redesigned security architecture, and delivered a prioritized hardening roadmap.",
    results: [
      { value: "54", label: "Controls mapped" },
      { value: "72%", label: "Critical risk reduction" },
      { value: "SOC 2", label: "Readiness path" },
      { value: "10w", label: "Roadmap window" }
    ],
    technologies: ["OWASP", "Snyk", "Cloud security", "IAM", "Terraform"],
    quote:
      "The work turned security from a blocker into a clear operating model for product growth."
  }
];

export const techStacks = {
  Backend: ["Node.js", "Python", "Java", ".NET", "PHP", "Ruby on Rails"],
  Frontend: ["React", "TypeScript", "Vite", "Next.js", "Vue.js", "Tailwind CSS"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase", "Elastic"],
  "AI & Machine Learning": ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Vector DBs", "MLflow"],
  DevOps: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Vercel", "AWS"],
  "Cyber Security": ["OWASP", "Burp Suite", "Snyk", "Fortinet", "Palo Alto", "CrowdStrike"]
};

export const partners = [
  "British Gas",
  "BT",
  "Michelin",
  "NHS",
  "Samsung",
  "Virgin Media",
  "Premier FS",
  "TechCorp"
];

export function serviceBySlug(slug: ServiceSlug) {
  return services.find((service) => service.slug === slug);
}
