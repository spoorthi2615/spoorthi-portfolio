import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaInstagram } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(
        'service_xwyzza7',
        'template_u4ge8ci',
        formRef.current,
        'XSDmyIcn8Jvg-q5Xt'
      );
      setStatus('sent');
      formRef.current.reset();
      
      // Reset button state after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-12 relative overflow-hidden bg-gray-950">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
      {/* Background glow blobs */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-display font-black tracking-normal text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Connect!</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
            Whether it's a project proposal, an architecture discussion, or just a friendly hello — my inbox is always open.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: Info Panel */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-gray-900/40 border border-white/8 backdrop-blur-md rounded-[2rem] p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/8 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <h3 className="text-2xl font-black text-white mb-2">
                Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Extraordinary.</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                I am actively seeking opportunities to collaborate on complex systems, build resilient security architectures, and solve challenging engineering problems. Connect with me across the web.
              </p>

              {/* Social links */}
              <div className="flex flex-col gap-4">
                <a
                  href="https://github.com/spoorthi2615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-gray-950/60 border border-white/5 rounded-xl px-5 py-4 hover:border-purple-500/30 transition-all group/link"
                >
                  <FaGithub className="text-white text-xl" />
                  <span className="text-gray-300 font-medium group-hover/link:text-white transition-colors">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/spoorthiyadav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-gray-950/60 border border-white/5 rounded-xl px-5 py-4 hover:border-purple-500/30 transition-all group/link"
                >
                  <FaLinkedin className="text-blue-400 text-xl" />
                  <span className="text-gray-300 font-medium group-hover/link:text-white transition-colors">LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/_.spoorthiiii._?igsh=MTZsMnU5ZjJvcGlxOQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-gray-950/60 border border-white/5 rounded-xl px-5 py-4 hover:border-purple-500/30 transition-all group/link"
                >
                  <FaInstagram className="text-pink-500 text-xl" />
                  <span className="text-gray-300 font-medium group-hover/link:text-white transition-colors">Instagram</span>
                </a>
              </div>

              {/* Direct email */}
              <div className="mt-6 flex items-center gap-4 bg-purple-500/8 border border-purple-500/20 rounded-xl px-5 py-4">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                  <FaEnvelope className="text-purple-400 text-sm" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block">DIRECT EMAIL</span>
                  <a href="mailto:spoorthipyadav@gmail.com" className="text-white font-semibold text-sm hover:text-purple-300 transition-colors">
                    spoorthipyadav@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              variants={itemVariants}
              className="bg-gray-900/40 border border-white/8 backdrop-blur-md rounded-[2rem] p-8 flex flex-col gap-5"
            >
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FaPaperPlane className="text-purple-400 text-sm" />
                Send a Transmission
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Your Designation / Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your Designation / Name"
                  className="bg-gray-950/70 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Return Comm Link (Email)</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Return Comm Link (Email)"
                  className="bg-gray-950/70 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Encrypted Message</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  placeholder="Encrypted Message..."
                  className="bg-gray-950/70 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 transition-all shadow-lg shadow-purple-500/20"
              >
                {status === 'idle' && 'Initiate Sequence'}
                {status === 'sending' && 'Transmitting...'}
                {status === 'sent' && '✓ Transmission Received'}
                {status === 'error' && 'Retry Transmission'}
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
