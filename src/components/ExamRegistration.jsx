// components/ExamRegistration.jsx
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ExamRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    exam: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const exams = [
    { value: '', label: '-- Select Exam --' },
    { value: 'entrance-exam-2024', label: 'Entrance Exam 2024' },
    { value: 'midterm-assessment', label: 'Midterm Assessment' },
    { value: 'final-exams', label: 'Final Exams' },
    { value: 'scholarship-test', label: 'Scholarship Test' },
    { value: 'certification-exam', label: 'Certification Exam' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.exam) {
      newErrors.exam = 'Please select an exam';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        exam: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsSubmitting(false);
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Exam Registration
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-sm sm:text-base leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Register for upcoming exams and receive your digital admit card instantly
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.fullName ? 'border-red-300 focus:ring-red-500' : ''
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.fullName && (
                <motion.p 
                  className="mt-1 text-sm text-red-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {errors.fullName}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.email ? 'border-red-300 focus:ring-red-500' : ''
                }`}
                placeholder="Enter your email address"
                required
              />
              {errors.email && (
                <motion.p 
                  className="mt-1 text-sm text-red-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.phone ? 'border-red-300 focus:ring-red-500' : ''
                }`}
                placeholder="Enter your phone number (e.g., +1234567890)"
                required
              />
              {errors.phone && (
                <motion.p 
                  className="mt-1 text-sm text-red-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Exam Selection */}
            <div>
              <label htmlFor="exam" className="block text-sm font-medium text-gray-700 mb-2">
                Select Exam
              </label>
              <select
                id="exam"
                name="exam"
                value={formData.exam}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.exam ? 'border-red-300 focus:ring-red-500' : ''
                }`}
                required
              >
                {exams.map((exam) => (
                  <option key={exam.value} value={exam.value}>
                    {exam.label}
                  </option>
                ))}
              </select>
              {errors.exam && (
                <motion.p 
                  className="mt-1 text-sm text-red-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {errors.exam}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                isSubmitting || submitSuccess
                  ? 'bg-green-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
              whileHover={{ scale: isSubmitting || submitSuccess ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? 'Registering...' : submitSuccess ? '✅ Registered Successfully!' : 'Register for Exam'}
            </motion.button>

            {/* Submit Error */}
            {errors.submit && (
              <motion.p 
                className="text-center text-sm text-red-600 py-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.submit}
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Success Message Overlay */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-6">
                Your digital admit card has been sent to your email address. 
                Check your inbox (including spam folder).
              </p>
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setIsSubmitting(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExamRegistration;