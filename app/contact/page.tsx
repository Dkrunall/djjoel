'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Music, Users, Star, Instagram, Twitter, Youtube } from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import NeonBorder from '@/components/NeonBorder';
import MatrixRain from '@/components/MatrixRain';
import GlitchBackground from '@/components/GlitchBackground';
import ContactForm from '@/components/ContactForm';
import { config } from '@/lib/config';

export default function ContactPage() {

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: config.contactEmail,
      href: `mailto:${config.contactEmail}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: `tel:+15551234567`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Los Angeles, CA',
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: config.socialLinks.instagram,
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: config.socialLinks.twitter,
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: config.socialLinks.youtube,
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Music,
      label: 'SoundCloud',
      href: config.socialLinks.soundcloud,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const bookingInfo = [
    {
      icon: Clock,
      title: 'Response Time',
      description: 'We typically respond within 24-48 hours'
    },
    {
      icon: Users,
      title: 'Booking Requirements',
      description: 'Minimum 30 days advance notice for events'
    },
    {
      icon: Mail,
      title: 'Press Inquiries',
      description: 'Media kit and high-res photos available upon request'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />
      <GlitchBackground />
      
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlitchText
              text="CONTACT"
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
              intensity="high"
              trigger="auto"
            />
            <GlitchText
              text="Ready to bring the energy to your event? Let's connect and create something unforgettable."
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              intensity="low"
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NeonBorder color="purple" intensity="medium" animated>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                <GlitchText
                  text="Send a Message"
                  className="text-3xl font-bold text-white mb-8"
                  intensity="medium"
                  trigger="auto"
                />
                <ContactForm />
              </div>
            </NeonBorder>
          </motion.div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <NeonBorder color="cyan" intensity="medium" animated>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                  <GlitchText
                    text="Get In Touch"
                    className="text-2xl font-bold text-white mb-6"
                    intensity="medium"
                    trigger="auto"
                  />
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={info.label} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">{info.label}</div>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-white hover:text-cyan-400 transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-white">{info.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NeonBorder>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <NeonBorder color="purple" intensity="medium" animated>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                  <GlitchText
                    text="Follow the Journey"
                    className="text-2xl font-bold text-white mb-6"
                    intensity="medium"
                    trigger="auto"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center space-x-3"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <social.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white group-hover:text-cyan-400 transition-colors">
                          {social.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </NeonBorder>
            </motion.div>

            {/* Booking Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <NeonBorder color="cyan" intensity="medium" animated>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                  <GlitchText
                    text="Booking Information"
                    className="text-2xl font-bold text-white mb-6"
                    intensity="medium"
                    trigger="auto"
                  />
                  <div className="space-y-6">
                    {bookingInfo.map((info, index) => (
                      <div key={info.title} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                          <p className="text-gray-300 text-sm">{info.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NeonBorder>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}