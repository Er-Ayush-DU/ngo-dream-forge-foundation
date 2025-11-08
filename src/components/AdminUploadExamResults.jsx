// components/AdminUploadExamResults.jsx
'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AdminUploadExamResults = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError('');
    setUploadStatus('');

    if (!file) {
      setSelectedFile(null);
      setPreviewData([]);
      return;
    }

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setError('Please select a valid CSV file');
      e.target.value = '';
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
    parseCSV(file);
  };

  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const rows = text.split('\n').map(row => row.split(',').map(cell => cell.trim()));
        
        // Expected format: regid,subject,score
        const headers = rows[0];
        const dataRows = rows.slice(1).filter(row => row.length >= 3 && row.some(cell => cell));

        if (headers.length < 3 || !headers.includes('regid') || !headers.includes('subject') || !headers.includes('score')) {
          throw new Error('CSV must have columns: regid, subject, score');
        }

        // Preview first 5 rows
        const preview = dataRows.slice(0, 5).map((row, index) => ({
          regid: row[0] || '',
          subject: row[1] || '',
          score: row[2] || ''
        }));

        setPreviewData(preview);
      } catch (err) {
        setError('Invalid CSV format. Expected: regid,subject,score');
        setSelectedFile(null);
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a CSV file first');
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadStatus('Processing CSV file...');

    try {
      const formData = new FormData();
      formData.append('csvFile', selectedFile);
      formData.append('fileName', selectedFile.name);

      const response = await fetch('/api/admin/upload-results', {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type header for FormData
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Add admin auth
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploadStatus(`Successfully uploaded ${result.processedRecords || 0} records`);
      setSelectedFile(null);
      setPreviewData([]);
      fileInputRef.current.value = ''; // Reset file input

      // Auto-clear success message after 5 seconds
      setTimeout(() => setUploadStatus(''), 5000);

    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      const syntheticEvent = { target: { files: [file] } };
      handleFileChange(syntheticEvent);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Admin - Upload Exam Results
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Upload CSV files containing exam results
            </motion.p>
          </div>

          {/* File Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-6 sm:p-8 mb-6 transition-all duration-200 ${
              selectedFile 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <motion.div
                className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </motion.div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />

              <motion.button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 transition-colors"
                whileHover={{ scale: 1.02 }}
                disabled={isUploading}
              >
                Choose File
              </motion.button>

              <p className="text-sm text-gray-500 mb-2">
                No file chosen {selectedFile && `(${selectedFile.name})`}
              </p>
              
              <p className={`text-xs ${selectedFile ? 'text-blue-600' : 'text-gray-400'}`}>
                CSV format: regid,subject,score (e.g., DF1234567,Math,85)
              </p>

              {selectedFile && (
                <motion.button
                  onClick={removeFile}
                  className="mt-3 text-red-600 text-sm hover:text-red-800"
                  whileHover={{ scale: 1.05 }}
                >
                  Remove file
                </motion.button>
              )}
            </div>
          </div>

          {/* Preview Data */}
          {previewData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Preview Data</h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      {['Registration ID', 'Subject', 'Score'].map((header) => (
                        <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 text-sm text-gray-900">{row.regid}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{row.subject}</td>
                        <td className="px-4 py-2 text-sm font-medium">{row.score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Showing first {previewData.length} rows. Total rows will be processed.
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Upload Status */}
          {uploadStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-green-800">{uploadStatus}</p>
              </div>
            </motion.div>
          )}

          {/* Upload Button */}
          <motion.button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
              !selectedFile || isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
            }`}
            whileHover={!selectedFile || isUploading ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Upload Results'
            )}
          </motion.button>

          {/* CSV Format Help */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">CSV Format Requirements:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• First row: Headers (regid,subject,score)</li>
              <li>• regid: Registration ID (e.g., DF1234567)</li>
              <li>• subject: Subject name (e.g., Math, Science)</li>
              <li>• score: Numeric score (0-100)</li>
              <li>• Use commas as separators</li>
              <li>• No quotes around values</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminUploadExamResults;