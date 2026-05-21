import { X, Send, CheckCircle2, Mail, Phone, Zap, Target, Rocket, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    message: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    companyName: '',
    email: '',
    phone: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          message: '',
          firstName: '',
          lastName: '',
          jobTitle: '',
          companyName: '',
          email: '',
          phone: ''
        });
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Auto-close after success
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300"
      onClick={onClose}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <div 
        className="relative w-full h-full sm:h-auto sm:max-w-6xl sm:max-h-[95vh] overflow-hidden sm:rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 sm:bg-white/10 backdrop-blur-md hover:bg-white sm:hover:bg-white/20 transition-all duration-200 hover:scale-110 group shadow-lg sm:shadow-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 sm:text-white group-hover:text-gray-900 sm:group-hover:text-white" />
        </button>

        <div className="grid lg:grid-cols-5 h-full sm:h-auto overflow-y-auto">
          {/* Left Side - Brand & Value Proposition - Hidden on mobile, shows on lg+ */}
          <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-[#57007b] via-[#8B2C7E] to-[#F76680] p-12 text-white overflow-y-auto relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Start Your Journey
                  </span>
                </div>

                <h2 
                  className="text-white mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '42px', lineHeight: '1.1' }}
                >
                  Let's Build Something{' '}
                  <span className="text-yellow-300">Extraordinary</span>
                </h2>
                
                <p 
                  className="text-white/90 mb-10"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', lineHeight: '1.7' }}
                >
                  Transform your vision into reality with CYNX's engineering expertise. We deliver enterprise-grade solutions that scale.
                </p>

                {/* Value Props */}
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <h4 className="mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px' }}>
                        Rapid Innovation
                      </h4>
                      <p className="text-white/80 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        From MVP to enterprise platform in record time
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Target className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <h4 className="mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px' }}>
                        Precision Execution
                      </h4>
                      <p className="text-white/80 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Clear processes, predictable delivery, zero surprises
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <h4 className="mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px' }}>
                        Scalable Solutions
                      </h4>
                      <p className="text-white/80 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Architecture built to grow with your success
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-yellow-300" />
                  <div>
                    <p className="text-sm text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                      UK: +44 20 1234 5678
                    </p>
                    <p className="text-sm text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                      US: +1 555 123 4567
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-yellow-300" />
                  <a 
                    href="mailto:hello@cynx.com" 
                    className="text-white/90 hover:text-yellow-300 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                  >
                    hello@cynx.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form - Full width on mobile, 3/5 width on desktop */}
          <div className="lg:col-span-3 bg-white overflow-y-auto h-full">
            {/* Mobile Header with Gradient - Only visible on mobile */}
            <div className="lg:hidden bg-gradient-to-br from-[#57007b] via-[#8B2C7E] to-[#F76680] px-6 pt-16 pb-6 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-3">
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Start Your Journey
                </span>
              </div>
              <h2 
                className="text-white mb-2"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '28px', lineHeight: '1.1' }}
              >
                Let's Build Something{' '}
                <span className="text-yellow-300">Extraordinary</span>
              </h2>
              <p 
                className="text-white/90 text-sm"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
              >
                Transform your vision into reality with CYNX's engineering expertise.
              </p>
            </div>

            <div className="p-6 sm:p-8 lg:p-12">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 
                      className="text-gray-900 mb-1.5"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px' }}
                    >
                      Get In Touch
                    </h3>
                    <p 
                      className="text-gray-600 mb-6"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                    >
                      Fill out the form below and we'll respond within 24 hours
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Message */}
                    <div className="relative">
                      <label 
                        htmlFor="message" 
                        className={`absolute left-3.5 transition-all duration-200 pointer-events-none ${
                          focusedField === 'message' || formData.message
                            ? '-top-2.5 text-xs bg-white px-2 text-[#57007b]'
                            : 'top-3.5 text-sm text-gray-500'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Tell us about your project *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-3.5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#F76680] focus:ring-0 outline-none transition-all bg-white resize-none text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <label 
                          htmlFor="firstName" 
                          className={`absolute left-3.5 transition-all duration-200 pointer-events-none ${
                            focusedField === 'firstName' || formData.firstName
                              ? '-top-2.5 text-xs bg-white px-2 text-[#57007b]'
                              : 'top-3.5 text-sm text-gray-500'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('firstName')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-3.5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#F76680] focus:ring-0 outline-none transition-all bg-white text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>

                      <div className="relative">
                        <label 
                          htmlFor="lastName" 
                          className={`absolute left-3.5 transition-all duration-200 pointer-events-none ${
                            focusedField === 'lastName' || formData.lastName
                              ? '-top-2.5 text-xs bg-white px-2 text-[#57007b]'
                              : 'top-3.5 text-sm text-gray-500'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('lastName')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-3.5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#F76680] focus:ring-0 outline-none transition-all bg-white text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>
                    </div>

                    {/* Job & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <label 
                          htmlFor="jobTitle" 
                          className={`absolute left-3.5 transition-all duration-200 pointer-events-none ${
                            focusedField === 'jobTitle' || formData.jobTitle
                              ? '-top-2.5 text-xs bg-white px-2 text-[#57007b]'
                              : 'top-3.5 text-sm text-gray-500'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          Job Title *
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          name="jobTitle"
                          required
                          value={formData.jobTitle}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('jobTitle')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-3.5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#F76680] focus:ring-0 outline-none transition-all bg-white text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>

                      <div className="relative">
                        <label 
                          htmlFor="companyName" 
                          className={`absolute left-3.5 transition-all duration-200 pointer-events-none ${
                            focusedField === 'companyName' || formData.companyName
                              ? '-top-2.5 text-xs bg-white px-2 text-[#57007b]'
                              : 'top-3.5 text-sm text-gray-500'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('companyName')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-3.5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#F76680] focus:ring-0 outline-none transition-all bg-white text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label 
                        htmlFor="email" 
                        className={`absolute left-3.5 transition-all duration-200 pointer-events-none ${
                          focusedField === 'email' || formData.email
                            ? '-top-2.5 text-xs bg-white px-2 text-[#57007b]'
                            : 'top-3.5 text-sm text-gray-500'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-3.5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#F76680] focus:ring-0 outline-none transition-all bg-white text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <label 
                        htmlFor="phone" 
                        className={`absolute left-3.5 transition-all duration-200 pointer-events-none ${
                          focusedField === 'phone' || formData.phone
                            ? '-top-2.5 text-xs bg-white px-2 text-[#57007b]'
                            : 'top-3.5 text-sm text-gray-500'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-3.5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#F76680] focus:ring-0 outline-none transition-all bg-white text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    {/* Privacy Notice */}
                    <div className="flex items-start gap-2.5 p-3.5 bg-gray-50 rounded-xl">
                      <input 
                        type="checkbox" 
                        required 
                        id="privacy" 
                        className="w-4 h-4 mt-0.5 rounded border-2 border-gray-300 text-[#F76680] focus:ring-[#F76680] flex-shrink-0" 
                      />
                      <label htmlFor="privacy" className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        I agree to CYNX's privacy policy and consent to be contacted about my inquiry. We respect your privacy and will never share your data.
                      </label>
                    </div>

                    {/* Mobile Contact Info - Only visible on mobile */}
                    <div className="lg:hidden pt-2 pb-1 space-y-2 border-t border-gray-200">
                      <div className="flex items-center gap-2.5 text-sm">
                        <Phone className="w-4 h-4 text-[#F76680] flex-shrink-0" />
                        <div className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <p>UK: +44 20 1234 5678 • US: +1 555 123 4567</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-[#F76680] flex-shrink-0" />
                        <a 
                          href="mailto:hello@cynx.com" 
                          className="text-xs text-[#F76680] hover:text-[#57007b] transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          hello@cynx.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group w-full bg-gradient-to-r from-[#F76680] to-[#57007b] text-white py-4 rounded-xl hover:shadow-2xl hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px' }}
                    >
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-center text-xs text-gray-500 mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                      We typically respond within 24 hours
                    </p>
                  </div>
                </form>
              ) : (
                // Success State
                <div className="flex items-center justify-center py-12">
                  <div className="text-center max-w-md px-4 animate-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
                      <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h3 
                      className="text-gray-900 mb-2 sm:mb-3"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '28px' }}
                    >
                      Message Sent! 🎉
                    </h3>
                    <p 
                      className="text-gray-600 mb-2 text-sm sm:text-base"
                      style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
                    >
                      Thanks for reaching out! Our team will review your message and get back to you within 24 hours.
                    </p>
                    <p 
                      className="text-gray-500 text-xs sm:text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Check your email for a confirmation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}