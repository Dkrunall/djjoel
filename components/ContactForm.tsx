'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import NeonBorder from './NeonBorder';
import CyberpunkButton from './CyberpunkButton';
import GlitchText from './GlitchText';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const inputVariants = {
    focused: { scale: 1.02 },
    unfocused: { scale: 1 }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'name' ? 'focused' : 'unfocused'}
          transition={{ duration: 0.2 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            <GlitchText text="Name" intensity="low" trigger="none" />
          </label>
          <NeonBorder 
            color={errors.name ? 'red' : focusedField === 'name' ? 'cyan' : 'purple'} 
            intensity={focusedField === 'name' ? 'medium' : 'low'}
            animated={focusedField === 'name'}
            className="rounded-lg"
          >
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border-0 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                placeholder="Your name"
              />
            </div>
          </NeonBorder>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'email' ? 'focused' : 'unfocused'}
          transition={{ duration: 0.2 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            <GlitchText text="Email" intensity="low" trigger="none" />
          </label>
          <NeonBorder 
            color={errors.email ? 'red' : focusedField === 'email' ? 'cyan' : 'purple'} 
            intensity={focusedField === 'email' ? 'medium' : 'low'}
            animated={focusedField === 'email'}
            className="rounded-lg"
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border-0 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                placeholder="your.email@example.com"
              />
            </div>
          </NeonBorder>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.email}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Subject Field */}
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'subject' ? 'focused' : 'unfocused'}
          transition={{ duration: 0.2 }}
        >
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            <GlitchText text="Subject" intensity="low" trigger="none" />
          </label>
          <NeonBorder 
            color={errors.subject ? 'red' : focusedField === 'subject' ? 'cyan' : 'purple'} 
            intensity={focusedField === 'subject' ? 'medium' : 'low'}
            animated={focusedField === 'subject'}
            className="rounded-lg"
          >
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 bg-gray-900/50 border-0 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-0"
              placeholder="What&apos;s this about?"
            />
          </NeonBorder>
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.subject}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Message Field */}
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'message' ? 'focused' : 'unfocused'}
          transition={{ duration: 0.2 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            <GlitchText text="Message" intensity="low" trigger="none" />
          </label>
          <NeonBorder 
            color={errors.message ? 'red' : focusedField === 'message' ? 'cyan' : 'purple'} 
            intensity={focusedField === 'message' ? 'medium' : 'low'}
            animated={focusedField === 'message'}
            className="rounded-lg"
          >
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border-0 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-0 resize-none"
                placeholder="Tell me what&apos;s on your mind..."
              />
            </div>
          </NeonBorder>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.message}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-transparent border-0 p-0"
          >
            <CyberpunkButton
              disabled={isSubmitting}
              className="px-8 py-3 min-w-[200px]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </div>
              )}
            </CyberpunkButton>
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <NeonBorder color="green" intensity="medium" animated className="rounded-lg">
              <div className="bg-green-500/10 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Message sent successfully!</span>
                </div>
                <p className="text-green-300 text-sm mt-1">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            </NeonBorder>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <NeonBorder color="red" intensity="medium" animated className="rounded-lg">
              <div className="bg-red-500/10 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Failed to send message</span>
                </div>
                <p className="text-red-300 text-sm mt-1">
                  Something went wrong. Please try again later.
                </p>
              </div>
            </NeonBorder>
          </motion.div>
        )}
      </form>
    </div>
  );
}