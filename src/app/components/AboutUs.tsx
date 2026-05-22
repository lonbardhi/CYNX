import { useState } from 'react';
import ConsultationModal from './ConsultationModal';
import teamCollaboration from 'figma:asset/e7b6fc49fb6a971b8cd98460779b620594d6fce2.png';
import imgDrilonBardhi from 'figma:asset/a4ae814c26541f3dd5198737a0f648aa92cd9c78.png';
import imgDavidSmith from 'figma:asset/329ba71a6fb36a8f881e6fc1f1794bdd5b91e733.png';

interface AboutUsProps {
  onNavigateHome?: () => void;
  onNavigateToContact?: () => void;
}

export default function AboutUs({ onNavigateHome, onNavigateToContact }: AboutUsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleNavigateHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="about-us" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-8 pt-16">
          <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            <button 
              onClick={handleNavigateHome}
              className="hover:text-[#57007b] transition-colors"
            >
              Home
            </button>
            {' > '}
            <span className="text-[#57007b]">About Us</span>
          </p>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 
            className="bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-6"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '56px', lineHeight: '1.2' }}
          >
            About CYNX LTD
          </h1>
          
          <p 
            className="text-gray-600 text-xl max-w-4xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
          >
            CYNX LTD is a technology consultancy and software development company focused on delivering secure, scalable, and high-performance digital solutions for businesses across a range of industries.
          </p>
        </div>

        {/* Company Overview */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <p 
              className="text-gray-700 text-lg mb-6"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
            >
              We provide end-to-end services covering web applications, mobile applications, artificial intelligence, cyber security, and DevOps, enabling our clients to modernise their technology stack, streamline operations, and create new value through digital transformation.
            </p>
            <p 
              className="text-gray-700 text-lg"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
            >
              Our approach combines engineering excellence, security by design, and business alignment, ensuring that every solution we deliver is robust, maintainable, and aligned with clearly defined commercial objectives.
            </p>
          </div>
        </div>

        {/* Team Collaboration Visual */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={teamCollaboration} 
              alt="CYNX team collaboration - Software development team working together on innovative solutions" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Mission & Value Proposition */}
        <div className="mb-20">
          <h2 
            className="text-center bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-12"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '40px' }}
          >
            Mission & Value Proposition
          </h2>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 mb-8">
            <p 
              className="text-gray-800 text-xl text-center mb-8"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8', fontWeight: 500 }}
            >
              Our mission is to be a trusted long-term technology partner for organisations that require reliability, security, and innovation in equal measure.
            </p>
            
            <div className="bg-white rounded-2xl p-8">
              <h3 
                className="text-gray-900 mb-6 text-center"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '24px' }}
              >
                CYNX LTD creates value for its clients and stakeholders by:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p 
                    className="text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7', fontSize: '17px' }}
                  >
                    Delivering production-grade software that can scale with business growth.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p 
                    className="text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7', fontSize: '17px' }}
                  >
                    Embedding cyber security and compliance into architectures from the outset.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p 
                    className="text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7', fontSize: '17px' }}
                  >
                    Applying AI and automation to reduce operational overhead and unlock new capabilities.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p 
                    className="text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7', fontSize: '17px' }}
                  >
                    Implementing modern DevOps and cloud practices to improve resilience, performance, and time-to-market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Services */}
        <div className="mb-20">
          <h2 
            className="text-center bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-12"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '40px' }}
          >
            Core Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Application Development */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 
                className="text-gray-900 mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '22px' }}
              >
                Web Application Development
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                Design, development, and maintenance of modern web platforms, portals, and internal systems built for performance, scalability, and maintainability.
              </p>
            </div>

            {/* Mobile Application Development */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 
                className="text-gray-900 mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '22px' }}
              >
                Mobile Application Development
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                Native and cross-platform mobile solutions with a focus on reliability, user experience, and long-term support.
              </p>
            </div>

            {/* Artificial Intelligence & Automation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 
                className="text-gray-900 mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '22px' }}
              >
                Artificial Intelligence & Automation
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                AI-driven features, data-driven decision support tools, and workflow automation that enhance efficiency and competitiveness.
              </p>
            </div>

            {/* Cyber Security */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 
                className="text-gray-900 mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '22px' }}
              >
                Cyber Security
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                Security architecture, hardening, assessments, and advisory services to protect critical assets and minimise risk exposure.
              </p>
            </div>

            {/* DevOps & Cloud Engineering */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 
                className="text-gray-900 mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '22px' }}
              >
                DevOps & Cloud Engineering
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                CI/CD pipelines, infrastructure automation, observability, and cloud optimisation to ensure stable, predictable, and secure operations.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-20">
          <h2 
            className="text-center bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-12"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '40px' }}
          >
            Leadership
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* David Smith - CEO */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                  <img 
                    src={imgDavidSmith} 
                    alt="David Smith - Co-Founder & CEO" 
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <div>
                  <h3 
                    className="text-gray-900 mb-1"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px' }}
                  >
                    David Smith
                  </h3>
                  <p 
                    className="text-[#57007b]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px' }}
                  >
                    Co-Founder & CEO
                  </p>
                </div>
              </div>
              <p 
                className="text-gray-700"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                David Smith is responsible for the overall strategic direction and commercial performance of CYNX LTD. He oversees corporate governance, client relationships, and long-term growth initiatives, ensuring that the company's operations and delivery capabilities are closely aligned with market needs and investor expectations.
              </p>
            </div>

            {/* Drilon Bardhi - CTO */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                  <img 
                    src={imgDrilonBardhi} 
                    alt="Drilon Bardhi - Co-Founder & CTO" 
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <div>
                  <h3 
                    className="text-gray-900 mb-1"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px' }}
                  >
                    Drilon Bardhi
                  </h3>
                  <p 
                    className="text-[#57007b]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px' }}
                  >
                    Co-Founder & CTO
                  </p>
                </div>
              </div>
              <p 
                className="text-gray-700"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                As CTO, Drilon Bardhi leads the technical strategy and engineering organisation. With a strong background in software development, advanced technology stacks, and cybersecurity, he is responsible for defining the technical architecture, guiding technology selection, ensuring rigorous quality standards, and delivering complex, enterprise-grade solutions with security at their core.
              </p>
            </div>
          </div>
        </div>

        {/* Why Partner with CYNX LTD */}
        <div className="mb-20">
          <h2 
            className="text-center bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-12"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '40px' }}
          >
            Why Partner with CYNX LTD
          </h2>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 
                    className="text-gray-900 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
                  >
                    Security and Reliability
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                  >
                    Security, resilience, and compliance are embedded into our delivery processes and solution design.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 
                    className="text-gray-900 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
                  >
                    Technical Depth
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                  >
                    Cross-functional expertise across software engineering, AI, cyber security, and DevOps.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 
                    className="text-gray-900 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
                  >
                    Business Alignment
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                  >
                    Clear focus on measurable outcomes, ROI, and long-term value creation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 
                    className="text-gray-900 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
                  >
                    Scalable Delivery Model
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                  >
                    Processes and tooling designed to support growth, complexity, and evolving client needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 md:col-span-2">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 
                    className="text-gray-900 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
                  >
                    Long-Term Partnerships
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
                  >
                    Emphasis on ongoing collaboration, continuous improvement, and post-launch support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] rounded-3xl p-12 shadow-2xl">
          <h2 
            className="text-white mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '36px' }}
          >
            Ready to Partner with CYNX LTD?
          </h2>
          <p 
            className="text-white text-lg mb-8 max-w-2xl mx-auto opacity-90"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
          >
            Let's discuss how we can help transform your technology capabilities and drive your business forward.
          </p>
          <button 
            className="bg-white text-[#57007b] px-10 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px' }}
            onClick={openModal}
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}