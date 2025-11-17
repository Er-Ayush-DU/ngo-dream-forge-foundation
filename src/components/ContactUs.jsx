// components/ContactUs.jsx
'use client';
import React, { useState } from 'react';
import { MapPin, Phone, Send, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 6000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Contact Us</h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Please feel free to contact us and we will get back to you as soon as we can.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 focus:border-white outline-none transition text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 focus:border-white outline-none transition text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message" rows={4} value={formData.message} onChange={handleChange} required
                className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 focus:border-white outline-none transition text-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-12 py-4 bg-gray-700 hover:bg-gray-600 disabled:opacity-60 text-white font-medium flex items-center gap-3 transition"
            >
              {loading ? 'Sending...' : 'Send'} {!loading && <Send size={20} />}
            </button>

            {status === 'success' && <p className="text-green-400 font-medium">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-400 font-medium">Failed to send. Try again!</p>}
          </form>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-3"><MapPin size={24} /> Visit us</h3>
              <p className="text-gray-400">265 Homebush Road<br />Strathfield South 2136</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-3"><Phone size={24} /> Talk to us</h3>
              <p className="text-gray-400">
                +61 421 307 998<br />
                <a href="mailto:helen@helenarvan.com" className="hover:text-white">helen@helenarvan.com</a>
              </p>
            </div>
            <div className="flex gap-6 pt-8">
              <a href="#" className="text-gray-400 hover:text-white"><Twitter size={28} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Linkedin size={28} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={28} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Globe size={28} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}