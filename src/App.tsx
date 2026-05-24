import { FormEvent, Suspense, lazy, useEffect, useMemo, useState, type MouseEventHandler, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bot,
  Brain,
  Building2,
  Check,
  CheckCircle2,
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
  Quote,
  RefreshCcw,
  Rocket,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Siren,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  Workflow,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CursorSpotlight from "./CursorSpotlight";
import Marquee from "./Marquee";
import {
  caseStudies,
  companyImages,
  heroImage,
  serviceBySlug,
  serviceGroups,
  services,
  techStacks,
  type CaseStudy,
  type Service,
  type ServiceGroup,
  type ServiceSlug
} from "./cynx-data";

const PixelBlast = lazy(() => import("./PixelBlast"));

type View = "home" | "about" | ServiceSlug;

type NavTabId = "about" | "services" | "work" | "resources" | "process" | "hire";

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

const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type MotionButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

function MotionButton({ children, ...props }: MotionButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={shouldReduceMotion ? undefined : { scale: 1.025, y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ damping: 22, stiffness: 360, type: "spring" }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

const techLogos: Record<string, string> = {
  ".NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  "AI SDK": "https://assets.vercel.com/image/upload/v1662130559/front/favicon/vercel/180x180.png",
  "API testing": "https://owasp.org/assets/images/logo.svg",
  Airflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg",
  Analytics: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  APIs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Azure AI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "BigQuery": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  Charts: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
  Cloud: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  Containers: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  CrowdStrike: "https://www.crowdstrike.com/favicon.ico",
  dbt: "https://avatars.githubusercontent.com/u/16597377?s=200&v=4",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Elastic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "Fortinet": "https://upload.wikimedia.org/wikipedia/commons/6/62/Fortinet_logo.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  GraphQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  LangChain: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
  MLflow: "https://avatars.githubusercontent.com/u/39938107?s=200&v=4",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  OpenAI: "https://cdn.brandfetch.io/openai.com/w/400/h/400",
  OWASP: "https://owasp.org/assets/images/logo.svg",
  "Palo Alto": "https://www.paloaltonetworks.com/etc/designs/pan/favicon.ico",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "Power BI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  PyTorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "Ruby on Rails": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg",
  Snowflake: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/snowflake/snowflake-original.svg",
  "Snyk": "https://avatars.githubusercontent.com/u/19733683?s=200&v=4",
  TensorFlow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  Terraform: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Vercel: "https://assets.vercel.com/image/upload/v1662130559/front/favicon/vercel/180x180.png",
  "Vector DBs": "https://avatars.githubusercontent.com/u/85681964?s=200&v=4",
  "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
};

const partnerBrandLogos = [
  { name: "British Gas", mark: "BG" },
  { name: "BT", mark: "BT" },
  { name: "Michelin", mark: "MI" },
  { name: "NHS", mark: "NHS" },
  { name: "Samsung", mark: "SA" },
  { name: "Virgin Media", mark: "VM" },
  { name: "Premier FS", mark: "PF" },
  { name: "TechCorp", mark: "TC" }
];

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

const serviceGroupIconSrc: Partial<Record<ServiceGroup["name"], string>> = {
  "AI & Data Strategy": "/icons/ai-data-strategy.svg",
  "Solution Design & Discovery": "/icons/solution-design-discovery.svg",
  "AI Development & Implementation": "/icons/ai-development-implementation.svg",
  "Software Development": "/icons/software-development.svg",
  "Cyber Security": "/icons/cyber-security.svg"
};

function ServiceGroupIcon({ group }: { group: ServiceGroup }) {
  const iconSrc = serviceGroupIconSrc[group.name];

  if (iconSrc) {
    return (
      <span className="service-icon service-icon-image" aria-hidden="true">
        <img alt="" src={iconSrc} />
      </span>
    );
  }

  return <ServiceIcon service={serviceBySlug(group.slugs[0]) ?? services[0]} />;
}

function TechLogoCard({ name, liftOnHover = true }: { name: string; liftOnHover?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const logo = techLogos[name];
  const initials = name
    .split(/[\s.&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      className="tech-logo-card"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: "easeOut" }}
      viewport={{ amount: 0.25, once: true }}
      whileHover={!liftOnHover || shouldReduceMotion ? undefined : { scale: 1.04, y: -5 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <span className="tech-logo-mark" aria-hidden="true">
        {logo ? (
          <img
            alt=""
            loading="lazy"
            src={logo}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}
        <span>{initials}</span>
      </span>
      <strong>{name}</strong>
    </motion.div>
  );
}

function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
      aria-hidden="true"
      className="hero-visual"
      initial={shouldReduceMotion ? false : { opacity: 0, x: 36 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        animate={shouldReduceMotion ? undefined : { rotate: [0, 1.2, 0], y: [0, -12, 0] }}
        className="hero-window hero-window-main"
        transition={shouldReduceMotion ? undefined : { duration: 7, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="window-controls">
          <span />
          <span />
          <span />
        </div>
        <div className="code-lines">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="dashboard-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
      </motion.div>
      <motion.div
        animate={shouldReduceMotion ? undefined : { rotate: [0, -2, 0], y: [0, 14, 0] }}
        className="hero-window hero-window-side"
        transition={shouldReduceMotion ? undefined : { delay: 0.3, duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <Sparkles size={24} />
        <strong>AI</strong>
        <span>workflow ready</span>
      </motion.div>
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: [0, 9, 0], y: [0, -9, 0] }}
        className="hero-window hero-window-mobile"
        transition={shouldReduceMotion ? undefined : { delay: 0.5, duration: 6.8, ease: "easeInOut", repeat: Infinity }}
      >
        <div />
        <div />
        <div />
      </motion.div>
    </motion.div>
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
  const [activeNav, setActiveNav] = useState<NavTabId | null>(null);
  const [activeServiceGroup, setActiveServiceGroup] = useState(serviceGroups[0].name);
  const [mobileServiceGroup, setMobileServiceGroup] = useState(serviceGroups[0].name);
  const shouldReduceMotion = useReducedMotion();

  const isServiceView = currentView !== "home" && currentView !== "about";
  const activeGroup = serviceGroups.find((group) => group.name === activeServiceGroup) ?? serviceGroups[0];
  const activeMegaServices = activeGroup.slugs
    .map((slug) => serviceBySlug(slug))
    .filter((service): service is Service => Boolean(service));
  const featuredService = activeMegaServices[0];

  useEffect(() => {
    setActiveNav((current) => {
      if (currentView === "about") return "about";
      if (currentView !== "home") return "services";
      return current === "about" || current === "services" ? null : current;
    });
  }, [currentView]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 981px)");
    const closeDesktopDrawer = () => {
      if (query.matches) setMobileOpen(false);
    };

    closeDesktopDrawer();
    query.addEventListener("change", closeDesktopDrawer);

    return () => query.removeEventListener("change", closeDesktopDrawer);
  }, []);

  const navigate = (view: View) => {
    setActiveNav(view === "about" ? "about" : view === "home" ? null : "services");
    onNavigate(view);
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const section = (sectionId: string, navId: NavTabId) => {
    setActiveNav(navId);
    onSection(sectionId);
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const contact = () => {
    setActiveNav("hire");
    onContact();
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const navTabs: Array<{
    gradient: string;
    icon: LucideIcon;
    id: NavTabId;
    title: string;
    onClick: () => void;
  }> = [
    { gradient: "nav-gradient-coral", icon: Users, id: "about", title: "About us", onClick: () => navigate("about") },
    { gradient: "nav-gradient-violet", icon: Sparkles, id: "services", title: "Services", onClick: () => setServicesOpen((open) => !open) },
    { gradient: "nav-gradient-blue", icon: LayoutDashboard, id: "work", title: "Case Studies", onClick: () => section("work", "work") },
    { gradient: "nav-gradient-green", icon: FileCheck2, id: "resources", title: "Blog", onClick: () => section("resources", "resources") },
    { gradient: "nav-gradient-indigo", icon: Workflow, id: "process", title: "How it Works", onClick: () => section("process", "process") },
    { gradient: "nav-gradient-rose", icon: Zap, id: "hire", title: "Hire", onClick: contact }
  ];

  const isNavActive = (id: NavTabId) => {
    if (servicesOpen) return id === "services";
    if (id === "services" && isServiceView) return true;
    return activeNav === id;
  };

  const renderNavContent = (tab: (typeof navTabs)[number], includeChevron = false) => {
    const Icon = tab.icon;

    return (
      <span className="nav-button-content">
        <Icon size={16} />
        <span>{tab.title}</span>
        {includeChevron ? <ChevronDown size={15} /> : null}
      </span>
    );
  };

  const servicesMegaMenu = (
    <AnimatePresence>
      {servicesOpen ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="services-menu"
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
        >
          <div className="services-menu-rail" aria-label="Service categories">
            <span>Services</span>
            {serviceGroups.map((group) => (
              <button
                className={activeGroup.name === group.name ? "is-current" : ""}
                key={group.name}
                type="button"
                onMouseEnter={() => setActiveServiceGroup(group.name)}
                onFocus={() => setActiveServiceGroup(group.name)}
                onClick={() => setActiveServiceGroup(group.name)}
              >
                <ServiceGroupIcon group={group} />
                <span>
                  <strong>{group.name}</strong>
                  <small>{group.description}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="services-menu-content">
            <div className="services-menu-heading">
              <div>
                <p className="eyebrow">{activeGroup.name}</p>
                <h3>{activeGroup.description}</h3>
              </div>
              <button className="services-menu-cta" type="button" onClick={contact}>
                Not sure? Book discovery <ArrowRight size={16} />
              </button>
            </div>
            <div className="services-menu-cards">
              {activeMegaServices.map((service) => (
                <button
                  className={currentView === service.slug ? "is-current" : ""}
                  key={service.slug}
                  type="button"
                  onClick={() => navigate(service.slug)}
                >
                  <ServiceIcon service={service} />
                  <span>
                    <strong>{service.shortTitle}</strong>
                    <small>{service.summary}</small>
                  </span>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </div>
          <div className="services-menu-feature">
            <p className="eyebrow light">Featured path</p>
            <h3>{featuredService?.title ?? "Start with discovery"}</h3>
            <p>{featuredService?.detail ?? activeGroup.description}</p>
            <button type="button" onClick={() => (featuredService ? navigate(featuredService.slug) : contact())}>
              Explore this service <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand-button" type="button" onClick={() => navigate("home")}>
          <Logo />
        </button>

        <nav className="desktop-nav gradient-tabs-nav" aria-label="Main navigation">
          {navTabs.map((tab) => {
            const isActive = isNavActive(tab.id);

            if (tab.id === "services") {
              return (
                <div className="nav-dropdown" key={tab.id}>
                  <motion.button
                    aria-expanded={servicesOpen}
                    className={isActive ? "is-active" : ""}
                    type="button"
                    onClick={tab.onClick}
                  >
                    {isActive ? (
                      <motion.span
                        className={`nav-active-gradient ${tab.gradient}`}
                        layoutId="desktop-nav-gradient"
                        transition={{ damping: 30, stiffness: 500, type: "spring" }}
                      />
                    ) : null}
                    {renderNavContent(tab, true)}
                  </motion.button>
                </div>
              );
            }

            return (
              <motion.button className={isActive ? "is-active" : ""} key={tab.id} type="button" onClick={tab.onClick}>
                {isActive ? (
                  <motion.span
                    className={`nav-active-gradient ${tab.gradient}`}
                    layoutId="desktop-nav-gradient"
                    transition={{ damping: 30, stiffness: 500, type: "spring" }}
                  />
                ) : null}
                {renderNavContent(tab)}
              </motion.button>
            );
          })}
        </nav>

        <div className="header-actions">
          <button className="ghost-button small" type="button" onClick={contact}>
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

      {servicesMegaMenu}

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mobile-panel"
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          >
            <div className="mobile-nav-tabs">
              {navTabs.map((tab) => {
                const isActive = isNavActive(tab.id);
                return (
                  <button
                    className={`mobile-nav-tab ${isActive ? `is-active ${tab.gradient}` : ""}`}
                    key={tab.id}
                    type="button"
                    onClick={tab.id === "services" ? () => section("services", "services") : tab.onClick}
                  >
                    {renderNavContent(tab)}
                  </button>
                );
              })}
              <button className="mobile-nav-tab" type="button" onClick={contact}>
                <span className="nav-button-content">
                  <Mail size={16} />
                  <span>Contact</span>
                </span>
              </button>
            </div>
            <div className="mobile-services">
              <span>Services</span>
              {serviceGroups.map((group) => {
                const groupServices = group.slugs
                  .map((slug) => serviceBySlug(slug))
                  .filter((service): service is Service => Boolean(service));
                const isOpen = mobileServiceGroup === group.name;
                const isCurrentGroup = groupServices.some((service) => service.slug === currentView);

                return (
                  <div className="mobile-service-group" key={group.name}>
                    <button
                      aria-expanded={isOpen}
                      className={isCurrentGroup ? "is-current" : ""}
                      type="button"
                      onClick={() => setMobileServiceGroup(isOpen ? "" : group.name)}
                    >
                      <span>
                        <strong>{group.name}</strong>
                        <small>{group.description}</small>
                      </span>
                      <ChevronDown size={17} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="mobile-service-links"
                          exit={{ height: 0, opacity: 0 }}
                          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                        >
                          {groupServices.map((service) => (
                            <button
                              className={currentView === service.slug ? "is-current" : ""}
                              key={service.slug}
                              type="button"
                              onClick={() => navigate(service.slug)}
                            >
                              <span>{service.shortTitle}</span>
                              <ArrowRight size={15} />
                            </button>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
  const shouldReduceMotion = useReducedMotion();

  const activeGroup = serviceGroups.find((group) => group.name === activeGroupName) ?? serviceGroups[0];
  const activeServices = activeGroup.slugs
    .map((slug) => serviceBySlug(slug))
    .filter((service): service is Service => Boolean(service));
  const revealInitial = shouldReduceMotion ? false : { opacity: 0, y: 28 };
  const revealTransition = { duration: shouldReduceMotion ? 0 : 0.7, ease: motionEase };

  return (
    <>
      <main>
        <motion.section
          animate={{ opacity: 1 }}
          className="hero figma-hero"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
        >
          {!shouldReduceMotion ? (
            <div className="hero-pixelblast" aria-hidden="true">
              <Suspense fallback={null}>
                <PixelBlast
                  color="#8f55ff"
                  edgeFade={0.28}
                  enableRipples
                  liquid
                  liquidRadius={1.1}
                  liquidStrength={0.08}
                  liquidWobbleSpeed={4.8}
                  patternDensity={1.36}
                  patternScale={2.65}
                  pixelSize={5}
                  pixelSizeJitter={0.45}
                  rippleIntensityScale={1.4}
                  rippleSpeed={0.36}
                  rippleThickness={0.12}
                  speed={0.52}
                  transparent
                  variant="circle"
                />
              </Suspense>
            </div>
          ) : null}
          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.035, 1] }}
            className="hero-bg-image"
            style={{ backgroundImage: `url(${heroImage})` }}
            transition={shouldReduceMotion ? undefined : { duration: 12, ease: "easeInOut", repeat: Infinity }}
          />
          <div className="container hero-content">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="hero-copy"
              initial={revealInitial}
              transition={revealTransition}
            >
              <p className="eyebrow">CYNX LTD</p>
              <h1>
                Great <span>Product</span> is built by great <span>teams</span>
              </h1>
              <p>
                We help build and manage world-class software, AI, data, and security teams to
                bring ambitious digital products to life.
              </p>
              <div className="hero-actions">
                <MotionButton className="primary-button shimmer-line-button" type="button" onClick={onContact}>
                  <span className="shimmer-light" aria-hidden="true" />
                  <span className="button-label">Let&apos;s get started!</span>
                  <ArrowRight size={18} />
                </MotionButton>
                <MotionButton className="secondary-button" type="button" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
                  See case studies
                </MotionButton>
              </div>
            </motion.div>
            <HeroVisual />
          </div>
        </motion.section>

        <motion.section
          aria-label="Partner logos"
          className="partner-strip"
          initial={revealInitial}
          transition={revealTransition}
          viewport={{ amount: 0.35, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="container partner-inner">
            <span>Trusted delivery patterns for teams around</span>
            <Marquee className="partner-marquee" pauseOnHover repeat={5} speed={34}>
              {partnerBrandLogos.map((partner) => (
                <strong
                  aria-label={partner.name}
                  className="partner-logo"
                  key={partner.name}
                >
                  <span>{partner.mark}</span>
                  {partner.name}
                </strong>
              ))}
            </Marquee>
          </div>
        </motion.section>

        <section className="section" id="services">
          <div className="container">
            <SectionIntro
              copy="Advisory, product design, AI engineering, custom software, systems integration, and cyber security stay connected from first decision to production release."
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
                  Each service opens into a focused delivery view with outcomes, process,
                  deliverables, technology choices, and a clear path into a project conversation.
                </p>
              </div>
              <AnimatePresence mode="popLayout">
                {activeServices.map((service) => (
                  <motion.button
                    animate={{ opacity: 1, y: 0 }}
                    className="service-card"
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                    key={service.slug}
                    layout
                    transition={{ damping: 24, stiffness: 260, type: "spring" }}
                    type="button"
                    whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                    onClick={() => onNavigate(service.slug)}
                  >
                    <ServiceIcon service={service} />
                    <span>{service.shortTitle}</span>
                    <p>{service.summary}</p>
                    <ArrowRight size={18} />
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="section muted" id="process">
          <div className="container process-layout">
            <SectionIntro
              copy="The delivery model is intentionally simple: discover the opportunity, design the system, build the product, harden the risk profile, and launch with measurable operations."
              eyebrow="Method"
              title="Strategy and engineering stay connected."
            />
            <div className="process-list">
              {["Discover", "Design", "Build", "Harden", "Launch"].map((step, index) => (
                <motion.div
                  className="process-item"
                  initial={revealInitial}
                  key={step}
                  transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : index * 0.06 }}
                  viewport={{ amount: 0.28, once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="container">
            <SectionIntro
              copy="Representative digital transformation work across AI operations, enterprise portals, mobile banking, security hardening, and healthcare data platforms."
              eyebrow="Case studies"
              title="Work shaped around measurable business change."
            />
            <div className="case-grid">
              {caseStudies.map((study, index) => (
                <motion.article
                  className="case-card"
                  initial={revealInitial}
                  key={study.title}
                  transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : index * 0.05 }}
                  viewport={{ amount: 0.2, once: true }}
                  whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <img alt="" src={study.image} />
                  <div>
                    <p className="eyebrow">{study.sector}</p>
                    <h3>{study.title}</h3>
                    <p>{study.solution}</p>
                    <MotionButton className="text-button" type="button" onClick={() => setActiveCase(study)}>
                      Open case study <ArrowRight size={17} />
                    </MotionButton>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section muted" id="technology">
          <div className="container">
            <SectionIntro
              copy="From backend platforms to AI tooling and security products, we match technology choices to operating constraints, integration needs, and long-term ownership."
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
              <div className="tech-marquee-frame">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="tech-marquee-panel"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  key={`tech-marquee-${activeTech}`}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
                >
                  <Marquee className="tech-marquee" key={`marquee-${activeTech}`} pauseOnHover repeat={5} speed={28}>
                    {techStacks[activeTech].map((tech) => (
                      <TechLogoCard key={`${activeTech}-${tech}`} liftOnHover={false} name={tech} />
                    ))}
                  </Marquee>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="resources">
          <div className="container">
            <SectionIntro
              copy="Short, decision-focused notes for leaders planning AI adoption, software modernization, and security improvements."
              eyebrow="Blog"
              title="Practical thinking for digital teams."
            />
            <div className="resource-grid">
              {[
                {
                  title: "How to score AI opportunities before funding a pilot",
                  tag: "AI Strategy",
                  copy: "A lightweight framework for comparing value, feasibility, data readiness, and operational risk."
                },
                {
                  title: "When a bespoke portal beats another SaaS subscription",
                  tag: "Software",
                  copy: "Signals that custom workflows, permissions, integrations, or reporting justify a tailored build."
                },
                {
                  title: "Security architecture decisions that save rework later",
                  tag: "Cyber Security",
                  copy: "The controls worth deciding early when web, mobile, data, and AI systems come together."
                }
              ].map((resource, index) => (
                <motion.article
                  className="resource-card"
                  initial={revealInitial}
                  key={resource.title}
                  transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                  viewport={{ amount: 0.24, once: true }}
                  whileHover={shouldReduceMotion ? undefined : { y: -7 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <p className="eyebrow">{resource.tag}</p>
                  <h3>{resource.title}</h3>
                  <p>{resource.copy}</p>
                  <MotionButton className="text-button" type="button" onClick={onContact}>
                    Discuss this topic <ArrowRight size={17} />
                  </MotionButton>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          className="section about-preview"
          initial={revealInitial}
          transition={revealTransition}
          viewport={{ amount: 0.2, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="container about-grid">
            <div>
              <p className="eyebrow">About CYNX</p>
              <h2>Senior product, AI, and engineering capability without the agency fog.</h2>
              <p>
                CYNX works with leadership and delivery teams who need clear decisions, strong
                technical execution, and systems that survive real operational pressure.
              </p>
              <MotionButton className="secondary-button dark" type="button" onClick={() => onNavigate("about")}>
                Meet the company <ArrowRight size={18} />
              </MotionButton>
            </div>
            <div className="image-stack">
              <img alt="" src={companyImages.developers} />
              <img alt="" src={companyImages.workflow} />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="cta-band"
          initial={revealInitial}
          transition={revealTransition}
          viewport={{ amount: 0.25, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="container cta-inner">
            <div>
              <p className="eyebrow light">Build with CYNX</p>
              <h2>Bring a complex digital product from idea to production with one senior team.</h2>
            </div>
            <MotionButton className="primary-button light" type="button" onClick={onContact}>
              Book a consultation <ArrowRight size={18} />
            </MotionButton>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>{activeCase ? <CaseStudyModal study={activeCase} onClose={() => setActiveCase(null)} /> : null}</AnimatePresence>
    </>
  );
}

function AboutPage({ onContact }: { onContact: () => void }) {
  return (
    <main className="page-shell">
      <section className="page-hero about-hero">
        <div className="container page-hero-grid">
          <div>
            <p className="eyebrow light">About CYNX LTD</p>
            <h1>Secure, scalable digital solutions for businesses that need technology to perform.</h1>
            <p>
              CYNX is a technology consultancy and software development company delivering web
              applications, mobile platforms, artificial intelligence, cyber security, and DevOps.
            </p>
          </div>
          <img alt="" src={companyImages.team} />
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Company</p>
            <h2>Engineering excellence, security by design, and business alignment.</h2>
          </div>
          <div className="rich-copy">
            <p>
              We provide end-to-end support across product planning, architecture, implementation,
              integration, launch, and post-launch improvement. The work is shaped around commercial
              objectives, maintainability, and measurable operational value.
            </p>
            <p>
              Every engagement is designed to reduce complexity for the client: direct senior
              ownership, clear trade-offs, and production-grade delivery standards from day one.
            </p>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <SectionIntro
            copy="Our mission is to be a trusted long-term technology partner for organisations that require reliability, security, and innovation in equal measure."
            eyebrow="Mission"
            title="CYNX creates value through systems that hold up under real use."
          />
          <div className="value-grid">
            {[
              "Production-grade software that can scale with business growth.",
              "Cyber security and compliance embedded into solution design.",
              "AI and automation that reduce operational overhead.",
              "Modern DevOps and cloud practices for resilience and speed."
            ].map((value) => (
              <div className="value-card" key={value}>
                <Check size={18} />
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-image-feature">
          <img alt="" src={companyImages.developers} />
          <div>
            <p className="eyebrow">Why partner with CYNX</p>
            <h2>Cross-functional depth without losing accountability.</h2>
            <div className="rich-copy">
              <p>
                Teams work with CYNX when they need one partner who can connect software
                engineering, AI, cyber security, DevOps, and commercial judgement.
              </p>
              <p>
                That combination helps organisations modernise confidently, improve resilience,
                and build digital capability that keeps delivering after launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <SectionIntro
            copy="Leadership stays close to the strategy, architecture, delivery quality, and commercial outcomes."
            eyebrow="Leadership"
            title="Direct senior ownership."
          />
          <div className="founders-grid">
            {[
              {
                name: "David Smith",
                role: "Co-Founder & CEO",
                copy:
                  "Responsible for strategic direction, commercial performance, governance, client relationships, and long-term growth initiatives."
              },
              {
                name: "Drilon Bardhi",
                role: "Co-Founder & CTO",
                copy:
                  "Leads technical strategy, architecture, engineering standards, cyber security quality, and complex enterprise delivery."
              }
            ].map((founder) => (
              <article className="founder-card" key={founder.name}>
                <div className="founder-avatar">{founder.name.split(" ").map((part) => part[0]).join("")}</div>
                <p className="eyebrow">{founder.role}</p>
                <h3>{founder.name}</h3>
                <p>{founder.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow light">Work with CYNX</p>
            <h2>Start with the decision you need to make next.</h2>
          </div>
          <button className="primary-button light" type="button" onClick={onContact}>
            Schedule a consultation <ArrowRight size={18} />
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-modal="true"
      className="modal-backdrop"
      exit={{ opacity: 0 }}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      role="dialog"
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      onClick={onClose}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="case-modal"
        exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 20 }}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 28 }}
        transition={{ damping: 25, stiffness: 300, type: "spring" }}
        onClick={(event) => event.stopPropagation()}
      >
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
          <blockquote>
            <Quote size={24} />
            <span>{study.quote}</span>
          </blockquote>
          <div className="tech-grid compact">
            {study.technologies.map((technology) => (
              <div className="tech-chip" key={technology}>
                {technology}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ContactForm>(emptyContactForm);
  const [focusedField, setFocusedField] = useState<keyof ContactForm | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
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
      setMessage("Thanks for reaching out. CYNX will respond within 24 hours.");
      setForm(emptyContactForm);
      window.setTimeout(onClose, 2600);
    } catch {
      setStatus("error");
      setMessage("Unable to send message. Please try again.");
    }
  }

  const fields: Array<{ id: keyof ContactForm; label: string; required?: boolean; type?: string }> = [
    { id: "firstName", label: "First Name", required: true },
    { id: "lastName", label: "Last Name", required: true },
    { id: "role", label: "Job Title", required: true },
    { id: "company", label: "Company Name", required: true },
    { id: "email", label: "Business Email", required: true, type: "email" },
    { id: "phone", label: "Phone Number" }
  ];

  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-modal="true"
      className="modal-backdrop contact-backdrop"
      exit={{ opacity: 0 }}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      role="dialog"
      transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
      onClick={onClose}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="contact-modal enhanced"
        exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 18 }}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 28 }}
        transition={{ damping: 24, stiffness: 300, type: "spring" }}
        onClick={(event) => event.stopPropagation()}
      >
        <button aria-label="Close contact form" className="icon-button modal-close contact-close" type="button" onClick={onClose}>
          <X size={22} />
        </button>
        <motion.div
          animate={shouldReduceMotion ? undefined : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          className="contact-intro"
          transition={shouldReduceMotion ? undefined : { duration: 12, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="contact-intro-glow" />
          <Logo />
          <span className="modal-pill">
            <Zap size={15} /> Start your journey
          </span>
          <h2>
            Let&apos;s build something <span>extraordinary</span>
          </h2>
          <p>Transform your vision into a secure, scalable digital product with senior CYNX delivery support.</p>
          <div className="contact-value-list">
            {[
              { icon: Rocket, title: "Rapid Innovation", copy: "From MVP to enterprise platform with momentum." },
              { icon: Target, title: "Precision Execution", copy: "Clear scope, accountable delivery, practical decisions." },
              { icon: TrendingUp, title: "Scalable Solutions", copy: "Architecture built to grow with the business." }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}>
                  <Icon size={22} />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.copy}</small>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="contact-lines">
            <span>
              <Mail size={17} /> hello@cynx.com
            </span>
            <span>
              <Phone size={17} /> UK: +44 20 1234 5678
            </span>
          </div>
        </motion.div>
        <form className="contact-form" onSubmit={submitForm}>
          <div className="contact-form-heading">
            <h3>Get in touch</h3>
            <p>Share a few details and the team will respond within 24 hours.</p>
          </div>
          {fields.map((field) => (
            <label className="floating-field" key={field.id}>
              <span className={focusedField === field.id || form[field.id] ? "is-raised" : ""}>
                {field.label}
                {field.required ? " *" : ""}
              </span>
              <input
                required={field.required}
                type={field.type ?? "text"}
                value={form[field.id]}
                onBlur={() => setFocusedField(null)}
                onFocus={() => setFocusedField(field.id)}
                onChange={(event) => setForm({ ...form, [field.id]: event.target.value })}
              />
            </label>
          ))}
          <label className="floating-field full">
            <span className={focusedField === "message" || form.message ? "is-raised" : ""}>
              Tell us about your project *
            </span>
            <textarea
              required
              rows={5}
              value={form.message}
              onBlur={() => setFocusedField(null)}
              onFocus={() => setFocusedField("message")}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
          </label>
          <label className="privacy-field full">
            <input required type="checkbox" />
            <span>I agree to CYNX&apos;s privacy policy and consent to be contacted about my inquiry.</span>
          </label>
          {message ? <p className={`form-message ${status}`}>{message}</p> : null}
          <MotionButton className="primary-button form-submit" disabled={status === "loading"} type="submit">
            {status === "loading" ? "Sending" : status === "success" ? "Message sent" : "Send message"}{" "}
            {status === "success" ? <CheckCircle2 size={18} /> : <Send size={18} />}
          </MotionButton>
        </form>
      </motion.div>
    </motion.div>
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
  const shouldReduceMotion = useReducedMotion();

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
      <CursorSpotlight />
      <Header
        currentView={view}
        onContact={() => setContactOpen(true)}
        onNavigate={navigate}
        onSection={goToSection}
      />
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -18 }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          key={view}
          transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: "easeOut" }}
        >
          {view === "home" ? (
            <HomePage onContact={() => setContactOpen(true)} onNavigate={navigate} />
          ) : view === "about" ? (
            <AboutPage onContact={() => setContactOpen(true)} />
          ) : service ? (
            <ServicePage onContact={() => setContactOpen(true)} onNavigate={navigate} service={service} />
          ) : (
            <HomePage onContact={() => setContactOpen(true)} onNavigate={navigate} />
          )}
        </motion.div>
      </AnimatePresence>
      <Footer onNavigate={navigate} />
      <AnimatePresence>{contactOpen ? <ContactModal onClose={() => setContactOpen(false)} /> : null}</AnimatePresence>
    </div>
  );
}
