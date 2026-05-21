import { useState, memo, useMemo } from "react";
import burpSuiteLogo from "figma:asset/e49318554e2cb7371cde94d84c1b0c71022c7c74.png";
import strapiLogo from "figma:asset/e3952c61fe3f5d4217108b095b6513ad16cb1b3b.png";
import contentfulLogo from "figma:asset/efe33c6afde62be6027008927c60d8905eef314b.png";
import paloAltoLogo from "figma:asset/8cb86d6f000b63703ae6d76f5c5e950a7c64e31f.png";
import crowdStrikeLogo from "figma:asset/5fd898737aa09249e9019e40ef519ef06ec57856.png";

const techStackData = {
  Backend: [
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Ruby on Rails", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
  ],
  Frontend: [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  ],
  Databases: [
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
  ],
  CMS: [
    { name: "WordPress", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
    { name: "Drupal", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/drupal/drupal-original.svg" },
    { name: "Strapi", logo: strapiLogo },
    { name: "Contentful", logo: contentfulLogo },
    { name: "Sanity", logo: "https://avatars.githubusercontent.com/u/17177659?s=200&v=4" },
    { name: "Ghost", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ghost/ghost-original.svg" },
  ],
  "Cloud Testing": [
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Jest", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    { name: "Selenium", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
    { name: "Cypress", logo: "https://avatars.githubusercontent.com/u/8908513?s=200&v=4" },
  ],
  DevOps: [
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
    { name: "GitHub Actions", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "GitLab CI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
    { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  ],
  "Cyber Security": [
    { name: "Fortinet", logo: "https://upload.wikimedia.org/wikipedia/commons/6/62/Fortinet_logo.svg" },
    { name: "Palo Alto", logo: paloAltoLogo },
    { name: "CrowdStrike", logo: crowdStrikeLogo },
    { name: "Snyk", logo: "https://avatars.githubusercontent.com/u/19733683?s=200&v=4" },
    { name: "OWASP", logo: "https://owasp.org/assets/images/logo.svg" },
    { name: "Burp Suite", logo: burpSuiteLogo },
  ],
  "AI & Machine Learning": [
    { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "OpenAI", logo: "https://cdn.brandfetch.io/openai.com/w/400/h/400" },
    { name: "LangChain", logo: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    { name: "Hugging Face", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
  ],
  "Mobile Apps": [
    { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Xamarin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg" },
    { name: "Ionic", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
  ],
};

// Memoized tech logo item to prevent unnecessary re-renders
const TechLogoItem = memo(({ tech, index }: { tech: { name: string; logo: string }; index: number }) => {
  return (
    <div
      className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 touch-manipulation"
      style={{ minHeight: '140px' }}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
        <img
          src={tech.logo}
          alt={tech.name}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={(e) => {
            // Fallback to a colored circle with initials if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                  ${tech.name.substring(0, 2).toUpperCase()}
                </div>
              `;
            }
          }}
        />
      </div>
      <span
        className="text-sm text-gray-700 font-medium text-center"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {tech.name}
      </span>
    </div>
  );
});

TechLogoItem.displayName = 'TechLogoItem';

export default function TechStackTabs() {
  const [activeTab, setActiveTab] = useState("Backend");

  // Memoize tab keys to prevent re-computing
  const tabKeys = useMemo(() => Object.keys(techStackData), []);

  // Memoize current tech stack to prevent re-computing
  const currentTechStack = useMemo(
    () => techStackData[activeTab as keyof typeof techStackData],
    [activeTab]
  );

  return (
    <div className="space-y-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
        {tabKeys.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 touch-manipulation min-h-[44px] ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#F76680] to-[#57007b] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105 active:scale-95"
            }`}
            style={{ fontFamily: "Inter, sans-serif" }}
            aria-label={`View ${tab} technologies`}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tech Logos Grid */}
      <div className="min-h-[300px] sm:min-h-[280px] flex items-center justify-center px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl">
          {currentTechStack.map((tech, index) => (
            <TechLogoItem key={`${tech.name}-${index}`} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}