import dataStrategyImage from 'figma:asset/05ae374c6f5ce35fe40bfb33da8cf9ab1ca06d6e.png';
import { useState } from 'react';
import ConsultationModal from './ConsultationModal';

interface DataStrategyConsultingProps {
  onNavigateHome?: () => void;
  onNavigateToContact?: () => void;
}

export default function DataStrategyConsulting({ onNavigateHome, onNavigateToContact }: DataStrategyConsultingProps) {
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
    <section id="data-strategy" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
                Data Strategy Consulting
              </h1>
              
              <p 
                className="text-gray-600 text-lg mb-8"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
              >
                Our data strategy consultants help you align data with business goals, uncover insights quickly, 
                and build a clear roadmap for growth.
              </p>

              <button 
                className="bg-gradient-to-r from-[#F76680] to-[#57007b] text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                onClick={openModal}
              >
                Book Your Free Data Consultation
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
                src={dataStrategyImage} 
                alt="Data Strategy Consulting" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Build a scalable data strategy Section */}
        <div className="mt-20">
          <h2 
            className="text-center bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-12"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '36px' }}
          >
            Build a scalable data strategy
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 
                className="text-gray-900 mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
              >
                Data Assessment & Audit
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                Evaluate your current data infrastructure, identify gaps, and uncover opportunities to maximize data value across your organization.
              </p>
            </div>

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
                Strategic Roadmap Development
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                Create a comprehensive data strategy roadmap that aligns with business objectives and drives measurable outcomes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 
                className="text-gray-900 mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px' }}
              >
                Data-Driven Insights
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                Transform raw data into actionable insights that empower decision-making and accelerate business growth.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Our Data Strategy Services */}
        <div className="mt-20 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
          <h2 
            className="text-center bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-8"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '32px' }}
          >
            Why Choose Our Data Strategy Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px' }}
                >
                  Business-First Approach
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
                >
                  We start with your business goals and work backwards to build a data strategy that delivers real value.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px' }}
                >
                  Proven Methodologies
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
                >
                  Leverage industry-leading frameworks and best practices refined through years of successful implementations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px' }}
                >
                  End-to-End Support
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
                >
                  From initial assessment to implementation and beyond, we're with you every step of the journey.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F76680] to-[#57007b] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px' }}
                >
                  Measurable ROI
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
                >
                  Track progress with clear metrics and KPIs that demonstrate the tangible impact of your data initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 
            className="bg-clip-text bg-gradient-to-r from-[#161490] via-[#7476ED] to-[#E56F8C] text-transparent mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '32px' }}
          >
            Ready to Transform Your Data Strategy?
          </h2>
          <p 
            className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
          >
            Let's discuss how our data strategy consultants can help you unlock the full potential of your data.
          </p>
          <button 
            className="bg-gradient-to-r from-[#F76680] to-[#57007b] text-white px-10 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px' }}
            onClick={openModal}
          >
            Schedule Your Free Consultation
          </button>
        </div>
      </div>
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}