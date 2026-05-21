import { useState } from 'react';
import ConsultationModal from './ConsultationModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aiConsultingImage from 'figma:asset/0bb1f0000216d2b7f4221d2e5dc94a60e4143438.png';

interface AIConsultingServicesProps {
  onNavigateHome?: () => void;
  onNavigateToContact?: () => void;
}

export default function AIConsultingServices({ onNavigateHome, onNavigateToContact }: AIConsultingServicesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleNavigateHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToContact = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      handleNavigateHome();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="ai-consulting" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            <button 
              onClick={handleNavigateHome}
              className="hover:text-[#57007b] transition-colors"
            >
              Services
            </button>
            {' > '}
            <span className="text-[#57007b]">AI & Data Strategy Services</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 
                className="bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: '1.2' }}
              >
                AI Consulting Services
              </h1>
              
              <p 
                className="text-gray-600 text-lg mb-8"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
              >
                Partner with expert AI consultants who make AI practical. From roadmap to ROI, 
                we guide your business through every step with strategy, governance, and proof of impact.
              </p>

              <button 
                className="bg-gradient-to-r from-[#F76680] to-[#57007b] text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                onClick={openModal}
              >
                Book a Free Consultation
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-gray-200">
              <p 
                className="text-sm text-gray-500 mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Trusted by leading organizations
              </p>
              <div className="flex items-center gap-8 opacity-60">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#57007b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#57007b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Microsoft Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#57007b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>5-Star Rated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#F76680]/20 to-[#57007b]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-[#7476ED]/20 to-[#E56F8C]/20 rounded-full blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={aiConsultingImage} 
                alt="AI Consulting Services" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 
              className="text-gray-900 mb-3"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
            >
              Strategic Roadmapping
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
            >
              We create tailored AI roadmaps that align with your business goals, ensuring practical implementation and measurable ROI.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 
              className="text-gray-900 mb-3"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
            >
              Governance & Compliance
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
            >
              Implement AI governance frameworks that ensure ethical use, data privacy, and regulatory compliance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 
              className="text-gray-900 mb-3"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
            >
              Proof of Impact
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
            >
              Measure and demonstrate the real-world impact of AI initiatives with data-driven insights and performance metrics.
            </p>
          </div>
        </div>
      </div>
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}