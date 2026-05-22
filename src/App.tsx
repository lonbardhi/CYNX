import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  Building2,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Crosshair,
  Database,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Menu,
  Monitor,
  PenTool,
  Phone,
  PlugZap,
  RefreshCcw,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Siren,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  caseStudies,
  companyImages,
  heroImage,
  partners,
  serviceBySlug,
  serviceGroups,
  services,
  techStacks,
  type CaseStudy,
  type Service,
  type ServiceSlug
} from "./cynx-data";

type View = "home" | "about" | ServiceSlug;

type ContactForm = {
  company: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phone: string;
  role: string;
};

const emptyContactForm: ContactForm = {
  company: "",
  email: "",
  firstName: "",
  lastName: "",
  message: "",
  phone: "",
  role: ""
};

const iconMap: Record<string, LucideIcon> = {
  bot: Bot,
  brain: Brain,
  building: Building2,
  code: Code2,
  cpu: Cpu,
  crosshair: Crosshair,
  database: Database,
  "file-check": FileCheck2,
  graduation: GraduationCap,
  layout: LayoutDashboard,
  lock: LockKeyhole,
  monitor: Monitor,
  "pen-tool": PenTool,
  plug: PlugZap,
  refresh: RefreshCcw,
  rocket: Rocket,
  scale: Scale,
  search: Search,
  shield: ShieldCheck,
  siren: Siren,
  smartphone: Smartphone,
  users: Users,
  workflow: Workflow
};

function Logo() {
  return (
    <span className="logo" aria-label="CYNX">
      <span className="logo-brace">{"{"}</span>
      <span className="logo-word">CYNX</span>
      <span className="logo-brace">{"}"}</span>
    </span>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy
}: {
  copy: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function ServiceIcon({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] ?? Sparkles;
  return (
    <span className="service-icon" aria-hidden="true">
      <Icon size={22} strokeWidth={2.2} />
    </span>
  );
}

function Header({
  currentView,
  onContact,
  onNavigate,
  onSection
}: {
  currentView: View;
  onContact: () => void;
  onNavigate: (view: View) => void;
  onSection: (sectionId: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navigate = (view: View) => {
    onNavigate(view);
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const section = (sectionId: string) => {
    onSection(sectionId);
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand-button" type="button" onClick={() => navigate("home")}>
          <Logo />
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          <button type="button" onClick={() => navigate("about")}>
            About
          </button>
          <div className="nav-dropdown">
            <button
              aria-expanded={servicesOpen}
              className={servicesOpen ? "is-active" : ""}
              type="button"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services <ChevronDown size={16} />
            </button>
            {servicesOpen ? (
              <div className="services-menu">
                {serviceGroups.map((group) => (
                  <div className="services-menu-group" key={group.name}>
                    <strong>{group.name}</strong>
                    {group.slugs.map((slug) => {
                      const service = serviceBySlug(slug);
                      if (!service) return null;
                      return (
                        <button key={slug} type="button" onClick={() => navigate(slug)}>
                          {service.shortTitle}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <button type="button" onClick={() => section("work")}>
            Work
          </button>
          <button type="button" onClick={() => section("technology")}>
            Technology
          </button>
        </nav>

        <div className="header-actions">
          <button className="ghost-button small" type="button" onClick={onContact}>
            <Mail size={17} /> Contact
          </button>
          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="icon-button mobile-toggle"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mobile-panel">
          <button type="button" onClick={() => navigate("about")}>
            About
          </button>
          <button type="button" onClick={() => section("work")}>
            Work
          </button>
          <button type="button" onClick={() => section("technology")}>
            Technology
          </button>
          <button type="button" onClick={onContact}>
            Contact
          </button>
          <div className="mobile-services">
            <span>Services</span>
            {services.slice(0, 12).map((service) => (
              <button
                className={currentView === service.slug ? "is-current" : ""}
                key={service.slug}
                type="button"
                onClick={() => navigate(service.slug)}
              >
                {service.shortTitle}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HomePage({
  onContact,
  onNavigate
}: {
  onContact: () => void;
  onNavigate: (view: View) => void;
}) {
  const [activeGroupName, setActiveGroupName] = useState(serviceGroups[0].name);
  const [activeTech, setActiveTech] = useState<keyof typeof techStacks>("Backend");
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);

  const activeGroup = serviceGroups.find((group) => group.name === activeGroupName) ?? serviceGroups[0];
  const activeServices = activeGroup.slugs
    .map((slug) => serviceBySlug(slug))
    .filter((service): service is Service => Boolean(service));

  return (
    <>
      <main>
        <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow light">AI, software, data, and cyber security</p>
              <h1>CYNX builds intelligent systems for serious teams.</h1>
              <p>
                We turn strategy, product design, AI engineering, custom software, and security
                into one disciplined delivery flow for ambitious organisations.
              </p>
              <div className="hero-actions">
                <button className="primary-button" type="button" onClick={onContact}>
                  Start a project <ArrowRight size={18} />
                </button>
                <button className="secondary-button" type="button" onClick={() => onNavigate("ai-consulting")}>
                  Explore services
                </button>
              </div>
            </div>
            <div className="hero-panel" aria-label="CYNX delivery highlights">
              <div>
                <span>24</span>
                <p>consulting, software, AI, data, and security services</p>
              </div>
              <div>
                <span>5</span>
                <p>delivery tracks from strategy through production operations</p>
              </div>
              <div>
                <span>2026</span>
                <p>modern React, TypeScript, Node.js, and Vite build</p>
              </div>
            </div>
          </div>
        </section>

        <section className="partner-strip" aria-label="Partner logos">
          <div className="container partner-inner">
            <span>Trusted delivery patterns for teams around</span>
            <div className="partner-list">
              {partners.map((partner) => (
                <strong key={partner}>{partner}</strong>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <SectionIntro
              copy="The Figma Make service catalogue is represented as typed data and surfaced through reusable React views instead of a brittle generated page."
              eyebrow="Services"
              title="A full consultancy surface from boardroom decision to shipped product."
            />

            <div className="segmented-control" role="tablist" aria-label="Service groups">
              {serviceGroups.map((group) => (
                <button
                  aria-selected={activeGroupName === group.name}
                  className={activeGroupName === group.name ? "is-active" : ""}
                  key={group.name}
                  role="tab"
                  type="button"
                  onClick={() => setActiveGroupName(group.name)}
                >
                  {group.name}
                </button>
              ))}
            </div>

            <div className="services-grid">
              <div className="service-group-copy">
                <p className="eyebrow">{activeGroup.name}</p>
                <h3>{activeGroup.description}</h3>
                <p>
                  Each service opens into a dedicated detail view with outcomes, process,
                  deliverables, technology choices, and a project contact path.
                </p>
              </div>
              {activeServices.map((service) => (
                <button
                  className="service-card"
                  key={service.slug}
                  type="button"
                  onClick={() => onNavigate(service.slug)}
                >
                  <ServiceIcon service={service} />
                  <span>{service.shortTitle}</span>
                  <p>{service.summary}</p>
                  <ArrowRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section muted">
          <div className="container process-layout">
            <SectionIntro
              copy="The delivery model is intentionally simple: discover the opportunity, design the system, build the product, harden the risk profile, and launch with measurable operations."
              eyebrow="Method"
              title="Strategy and engineering stay connected."
            />
            <div className="process-list">
              {["Discover", "Design", "Build", "Harden", "Launch"].map((step, index) => (
                <div className="process-item" key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  <p>
                    {[
                      "Map users, data, systems, risks, and measurable business goals.",
                      "Shape the architecture, UX, delivery backlog, and success criteria.",
                      "Ship production software with TypeScript, Node.js, AI services, and cloud tooling.",
                      "Validate security, privacy, observability, resilience, and maintainability.",
                      "Release with documentation, analytics, handover, and iteration cadence."
                    ][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="container">
            <SectionIntro
              copy="The Figma design includes rich case-study modal flows. These have been rebuilt as typed React modals using the shared case study data."
              eyebrow="Case studies"
              title="Work shaped around measurable business change."
            />
            <div className="case-grid">
              {caseStudies.map((study) => (
                <article className="case-card" key={study.title}>
                  <img alt="" src={study.image} />
                  <div>
                    <p className="eyebrow">{study.sector}</p>
                    <h3>{study.title}</h3>
                    <p>{study.solution}</p>
                    <button className="text-button" type="button" onClick={() => setActiveCase(study)}>
                      Open case study <ArrowRight size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section muted" id="technology">
          <div className="container">
            <SectionIntro
              copy="Technology tabs from the Figma Make file are represented as accessible segmented controls and stable grids."
              eyebrow="Technology"
              title="The stack is chosen around the product, not the other way around."
            />
            <div className="tech-shell">
              <div className="tech-tabs" role="tablist" aria-label="Technology categories">
                {(Object.keys(techStacks) as Array<keyof typeof techStacks>).map((stack) => (
                  <button
                    aria-selected={activeTech === stack}
                    className={activeTech === stack ? "is-active" : ""}
                    key={stack}
                    role="tab"
                    type="button"
                    onClick={() => setActiveTech(stack)}
                  >
                    {stack}
                  </button>
                ))}
              </div>
              <div className="tech-grid">
                {techStacks[activeTech].map((tech) => (
                  <div className="tech-chip" key={tech}>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section about-preview">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">About CYNX</p>
              <h2>Senior product, AI, and engineering capability without the agency fog.</h2>
              <p>
                CYNX works with leadership and delivery teams who need clear decisions, strong
                technical execution, and systems that survive real operational pressure.
              </p>
              <button className="secondary-button dark" type="button" onClick={() => onNavigate("about")}>
                Meet the company <ArrowRight size={18} />
              </button>
            </div>
            <div className="image-stack">
              <img alt="" src={companyImages.developers} />
              <img alt="" src={companyImages.workflow} />
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container cta-inner">
            <div>
              <p className="eyebrow light">Build with CYNX</p>
              <h2>Bring the Figma idea into a production codebase.</h2>
            </div>
            <button className="primary-button light" type="button" onClick={onContact}>
              Book a consultation <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {activeCase ? <CaseStudyModal study={activeCase} onClose={() => setActiveCase(null)} /> : null}
    </>
  );
}

function AboutPage({ onContact }: { onContact: () => void }) {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <p className="eyebrow light">About CYNX</p>
            <h1>Technology consulting with product judgement and engineering depth.</h1>
            <p>
              CYNX helps organisations decide what to build, prove it, engineer it, secure it,
              and evolve it with disciplined delivery.
            </p>
          </div>
          <img alt="" src={companyImages.team} />
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Company</p>
            <h2>Focused teams, direct senior ownership, useful systems.</h2>
          </div>
          <div className="rich-copy">
            <p>
              The CYNX model combines advisory work, UX and systems design, software delivery,
              AI implementation, data architecture, and security review. The goal is not to create
              a larger project than needed; it is to identify the highest-value path and ship it
              with quality.
            </p>
            <p>
              The original Figma Make file presented the brand as a technology consultancy with
              strong AI, custom development, data, and cyber security capabilities. This React app
              keeps that positioning while giving the repo a maintainable structure.
            </p>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container founders-grid">
          {["David Smith", "Drilon Bardhi"].map((name, index) => (
            <article className="founder-card" key={name}>
              <div className="founder-avatar">{name.split(" ").map((part) => part[0]).join("")}</div>
              <p className="eyebrow">Co-founder</p>
              <h3>{name}</h3>
              <p>
                {index === 0
                  ? "Advisory, product strategy, commercial planning, and delivery governance."
                  : "Technical architecture, engineering leadership, implementation, and systems quality."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow light">Work with CYNX</p>
            <h2>Start with the decision you need to make next.</h2>
          </div>
          <button className="primary-button light" type="button" onClick={onContact}>
            Contact the team <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}

function ServicePage({
  onContact,
  onNavigate,
  service
}: {
  onContact: () => void;
  onNavigate: (view: View) => void;
  service: Service;
}) {
  const related = services.filter((candidate) => candidate.category === service.category && candidate.slug !== service.slug).slice(0, 3);

  return (
    <main className="page-shell">
      <section className="service-hero">
        <div className="container service-hero-grid">
          <div>
            <p className="eyebrow light">{service.category}</p>
            <h1>{service.title}</h1>
            <p>{service.detail}</p>
            <div className="hero-actions">
              <button className="primary-button light" type="button" onClick={onContact}>
                Talk to CYNX <ArrowRight size={18} />
              </button>
              <button className="secondary-button inverted" type="button" onClick={() => onNavigate("home")}>
                Back to home
              </button>
            </div>
          </div>
          <img alt="" src={service.image} />
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-grid">
          <div className="detail-panel">
            <p className="eyebrow">Outcomes</p>
            <ul className="check-list">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>
                  <Check size={18} /> {outcome}
                </li>
              ))}
            </ul>
          </div>
          <div className="detail-panel">
            <p className="eyebrow">Deliverables</p>
            <ul className="check-list">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable}>
                  <Check size={18} /> {deliverable}
                </li>
              ))}
            </ul>
          </div>
          <div className="detail-panel wide">
            <p className="eyebrow">Process</p>
            <div className="mini-process">
              {service.process.map((step, index) => (
                <div key={step}>
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Technology</p>
            <h2>Selected around your existing systems and risk profile.</h2>
          </div>
          <div className="tech-grid compact">
            {service.technologies.map((technology) => (
              <div className="tech-chip" key={technology}>
                {technology}
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section">
          <div className="container">
            <SectionIntro
              copy="The same delivery track often combines advisory, design, implementation, and security work."
              eyebrow="Related"
              title={`More from ${service.category}`}
            />
            <div className="related-grid">
              {related.map((candidate) => (
                <button
                  className="service-card"
                  key={candidate.slug}
                  type="button"
                  onClick={() => onNavigate(candidate.slug)}
                >
                  <ServiceIcon service={candidate} />
                  <span>{candidate.shortTitle}</span>
                  <p>{candidate.summary}</p>
                  <ArrowRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function CaseStudyModal({ onClose, study }: { onClose: () => void; study: CaseStudy }) {
  return (
    <div aria-modal="true" className="modal-backdrop" role="dialog" onClick={onClose}>
      <div className="case-modal" onClick={(event) => event.stopPropagation()}>
        <button aria-label="Close case study" className="icon-button modal-close" type="button" onClick={onClose}>
          <X size={22} />
        </button>
        <img alt="" src={study.image} />
        <div className="modal-body">
          <p className="eyebrow">{study.sector}</p>
          <h2>{study.title}</h2>
          <p className="modal-client">{study.client}</p>
          <div className="modal-columns">
            <div>
              <h3>Challenge</h3>
              <p>{study.challenge}</p>
            </div>
            <div>
              <h3>Solution</h3>
              <p>{study.solution}</p>
            </div>
          </div>
          <div className="result-grid">
            {study.results.map((result) => (
              <div key={`${result.value}-${result.label}`}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </div>
            ))}
          </div>
          <blockquote>{study.quote}</blockquote>
          <div className="tech-grid compact">
            {study.technologies.map((technology) => (
              <div className="tech-chip" key={technology}>
                {technology}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ContactForm>(emptyContactForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/contact", {
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Unable to send message." }))) as {
        error?: string;
      };
      setStatus("error");
      setMessage(payload.error ?? "Unable to send message.");
      return;
    }

    setStatus("success");
    setMessage("Thanks. CYNX has received your project note.");
    setForm(emptyContactForm);
  }

  return (
    <div aria-modal="true" className="modal-backdrop" role="dialog" onClick={onClose}>
      <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
        <button aria-label="Close contact form" className="icon-button modal-close" type="button" onClick={onClose}>
          <X size={22} />
        </button>
        <div className="contact-intro">
          <Logo />
          <h2>Start a CYNX project</h2>
          <p>Share the decision, product, AI workflow, or security issue you need to move forward.</p>
          <div className="contact-lines">
            <span>
              <Mail size={17} /> hello@cynx.co.uk
            </span>
            <span>
              <Phone size={17} /> Consultation request
            </span>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitForm}>
          <label>
            First name
            <input
              required
              value={form.firstName}
              onChange={(event) => setForm({ ...form, firstName: event.target.value })}
            />
          </label>
          <label>
            Last name
            <input
              required
              value={form.lastName}
              onChange={(event) => setForm({ ...form, lastName: event.target.value })}
            />
          </label>
          <label>
            Company
            <input
              required
              value={form.company}
              onChange={(event) => setForm({ ...form, company: event.target.value })}
            />
          </label>
          <label>
            Role
            <input required value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </label>
          <label className="full">
            Project note
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
          </label>
          {message ? <p className={`form-message ${status}`}>{message}</p> : null}
          <button className="primary-button form-submit" disabled={status === "loading"} type="submit">
            {status === "loading" ? "Sending" : "Send request"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function Footer({ onNavigate }: { onNavigate: (view: View) => void }) {
  const topServices = useMemo(() => services.slice(0, 8), []);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            AI consulting, data strategy, product design, software engineering, and cyber security
            for teams that need decisions and delivery.
          </p>
        </div>
        <div>
          <strong>Services</strong>
          {topServices.map((service) => (
            <button key={service.slug} type="button" onClick={() => onNavigate(service.slug)}>
              {service.shortTitle}
            </button>
          ))}
        </div>
        <div>
          <strong>Company</strong>
          <button type="button" onClick={() => onNavigate("about")}>
            About CYNX
          </button>
          <a href="mailto:hello@cynx.co.uk">hello@cynx.co.uk</a>
          <span>Copyright 2026 CYNX LTD</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [contactOpen, setContactOpen] = useState(false);

  function navigate(nextView: View) {
    setView(nextView);
    window.scrollTo({ behavior: "smooth", top: 0 });
  }

  function goToSection(sectionId: string) {
    if (view !== "home") {
      setView("home");
      window.setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 80);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  const service = view !== "home" && view !== "about" ? serviceBySlug(view) : undefined;

  return (
    <div className="app">
      <Header
        currentView={view}
        onContact={() => setContactOpen(true)}
        onNavigate={navigate}
        onSection={goToSection}
      />
      {view === "home" ? (
        <HomePage onContact={() => setContactOpen(true)} onNavigate={navigate} />
      ) : view === "about" ? (
        <AboutPage onContact={() => setContactOpen(true)} />
      ) : service ? (
        <ServicePage onContact={() => setContactOpen(true)} onNavigate={navigate} service={service} />
      ) : (
        <HomePage onContact={() => setContactOpen(true)} onNavigate={navigate} />
      )}
      <Footer onNavigate={navigate} />
      {contactOpen ? <ContactModal onClose={() => setContactOpen(false)} /> : null}
    </div>
  );
}
