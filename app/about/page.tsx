'use client';

import { motion } from 'framer-motion';
import { Music, Award, Users, Calendar, MapPin, Headphones } from 'lucide-react';
import Image from 'next/image';
// Remove config import since the file is not a module

export default function AboutPage() {
  const stats = [
    { icon: Music, label: 'Tracks Released', value: '150+' },
    { icon: Users, label: 'Monthly Listeners', value: '2.5M' },
    { icon: Calendar, label: 'Years Active', value: '8+' },
    { icon: Award, label: 'Awards Won', value: '12' },
  ];

  const timeline = [
    {
      year: '2016',
      title: 'The Beginning',
      description: 'Started DJing at local clubs and underground venues, developing a unique sound that blends electronic genres.',
    },
    {
      year: '2018',
      title: 'First Major Release',
      description: 'Released debut EP "Digital Dreams" which gained international attention and radio play across Europe.',
    },
    {
      year: '2020',
      title: 'Festival Circuit',
      description: 'Performed at major festivals including Tomorrowland, Ultra Music Festival, and Electric Daisy Carnival.',
    },
    {
      year: '2022',
      title: 'Chart Success',
      description: 'Multiple tracks reached top 10 on Beatport charts, establishing a strong presence in the electronic music scene.',
    },
    {
      year: '2024',
      title: 'Global Recognition',
      description: 'Nominated for Best Electronic Artist at the International Music Awards and launched world tour.',
    },
  ];

  const skills = [
    { name: 'Electronic Production', level: 95 },
    { name: 'Live Performance', level: 92 },
    { name: 'Sound Design', level: 88 },
    { name: 'Mixing & Mastering', level: 90 },
    { name: 'Crowd Reading', level: 96 },
    { name: 'Music Theory', level: 85 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ABOUT
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">DJ JOEL</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Electronic music producer and DJ pushing the boundaries of sound. 
                Creating immersive experiences that connect souls through rhythm and melody.
              </p>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Based in Los Angeles, CA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Headphones className="w-5 h-5" />
                  <span>Electronic / Progressive House</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-gradient-to-r from-purple-500 to-cyan-500 p-1">
                <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-xl flex items-center justify-center">
                  <Image
                    src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20DJ%20portrait%2C%20cyberpunk%20aesthetic%2C%20neon%20lighting%2C%20electronic%20music%20producer%2C%20modern%20studio%20setup%2C%20dramatic%20lighting%2C%20high%20contrast%2C%20futuristic%20vibe&image_size=square_hd"
                    alt="DJ JOEL"
                    className="w-full h-full object-cover rounded-xl"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Music className="w-10 h-10 text-black" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
          >
            <h3 className="text-3xl font-bold text-white mb-6">The Journey</h3>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Born from a passion for electronic music and a vision to create something unique, 
                DJ JOEL has evolved from bedroom producer to international sensation. The journey 
                began in the underground clubs of Los Angeles, where raw talent met relentless 
                dedication.
              </p>
              <p>
                What started as late-night sessions crafting beats in a small studio has transformed 
                into a global movement. Each track tells a story, each performance creates a memory, 
                and each beat connects hearts across continents.
              </p>
              <p>
                The sound is unmistakable – a fusion of progressive house, techno, and ambient 
                textures that creates an emotional journey for listeners. It&apos;s not just music; 
                it&apos;s an experience that transcends the ordinary and touches the soul.
              </p>
              <p>
                Today, DJ JOEL continues to push boundaries, collaborate with artists worldwide, 
                and create music that defines the future of electronic dance music. The mission 
                remains the same: to unite people through the universal language of music.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Career Timeline
          </motion.h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-500" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex items-start space-x-8"
                >
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                    {item.year}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Skills & Expertise
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-cyan-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className="h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Let&apos;s Create Together</h3>
            <p className="text-gray-300 mb-8">
              Interested in collaborations, bookings, or just want to connect? 
              Let&apos;s make something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-semibold rounded-lg hover:from-purple-400 hover:to-cyan-400 transition-all duration-200"
              >
                Get In Touch
              </a>
              <a
                href="/epk"
                className="px-8 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all duration-200"
              >
                Download EPK
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}