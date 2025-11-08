// components/CheckExamResults.jsx
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CheckExamResults = () => {
  const [registrationId, setRegistrationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    setRegistrationId(e.target.value);
    setError(''); // Clear error on input
  };

  const validateRegistrationId = (id) => {
    // Basic validation - adjust regex as per your registration ID format
    const regex = /^[A-Z]{2}\d{6,8}$/; // e.g., DF1234567
    return regex.test(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registrationId.trim()) {
      setError('Please enter your registration ID');
      return;
    }

    if (!validateRegistrationId(registrationId)) {
      setError('Please enter a valid registration ID (e.g., DF1234567)');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);
    setShowResults(false);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Replace with your actual API call
      const response = await fetch('/api/check-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationId: registrationId.trim().toUpperCase() })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Registration ID not found');
        }
        if (response.status === 403) {
          throw new Error('Results not yet available');
        }
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setResults(data);
      setShowResults(true);

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Average';
    return 'Needs Improvement';
  };

  const getGradeColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    if (score >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Check Results Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-100"
        >
          <div className="text-center mb-8">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Check Your Exam Results
            </motion.h2>
            <motion.p
              className="text-gray-600 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Enter your registration ID to view your exam results
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="registrationId" className="block text-sm font-medium text-gray-700 mb-2">
                Registration ID
              </label>
              <input
                type="text"
                id="registrationId"
                name="registrationId"
                value={registrationId}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${error ? 'border-red-300 focus:ring-red-500' : ''
                  }`}
                placeholder="e.g., DF1234567"
                maxLength={10}
                disabled={loading}
                required
              />
              {error && (
                <motion.p
                  className="mt-1 text-sm text-red-600 flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading || !registrationId.trim()}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${loading || !registrationId.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              whileHover={loading || !registrationId.trim() ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </>
              ) : (
                'Check Results'
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Results Display */}
        {showResults && results && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 bg-green-100 text-green-800">
                ✅ Results Found
              </div>
              <h3 className="text-xl font-bold text-gray-900">Exam Results</h3>
              <p className="text-gray-600 mt-1">Registration ID: <strong>{results.registrationId}</strong></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {results.studentName}</p>
                  <p><span className="font-medium">Exam:</span> {results.examName}</p>
                  <p><span className="font-medium">Date:</span> {new Date(results.examDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Score Card */}
              <div className={`rounded-xl p-6 text-center border ${getGradeColor(results.score)}`}>
                <div className="text-4xl mb-2">📊</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{results.score}%</div>
                <div className="text-lg font-semibold text-gray-700">{formatScore(results.score)}</div>
                <div className="text-sm text-gray-500 mt-2">Overall Performance</div>
              </div>
            </div>

            {/* Additional Details */}
            {results.subjects && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Subject-wise Performance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.subjects.map((subject, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-900">{subject.name}</p>
                      <p className="text-2xl font-bold text-blue-600">{subject.score}%</p>
                      <p className="text-xs text-gray-500">{subject.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={() => window.print()}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                📄 Download PDF
              </motion.button>
              <motion.button
                onClick={() => {
                  setShowResults(false);
                  setRegistrationId('');
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                🔍 Check Another
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CheckExamResults;