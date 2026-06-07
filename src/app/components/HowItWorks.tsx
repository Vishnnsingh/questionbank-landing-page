import { Download, UserPlus, BookOpen, BarChart, Languages, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Download the App',
    description: 'Get the Bihar Board Smart Prep app from Google Play Store for free',
  },
  {
    number: '02',
    icon: UserPlus,
    title: 'Signup & Signin',
    description: 'Create your account with email or mobile number and start your journey',
  },
  {
    number: '03',
    icon: BookOpen,
    title: 'Start Solving Questions',
    description: 'Access 10 years of questions and start practicing with detailed solutions',
  },
  {
    number: '04',
    icon: Languages,
    title: 'Choose Your Language',
    description: 'Practice in your preferred language - Hindi, English, or Hinglish',
  },
  {
    number: '05',
    icon: BarChart,
    title: 'Analyze Performance',
    description: 'Track your progress with detailed analytics and identify weak areas',
  },
  {
    number: '06',
    icon: Trophy,
    title: 'See Overall Rank',
    description: 'Compare your performance with thousands of students across Bihar',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-14 sm:py-20 lg:py-32 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-5 py-2.5 rounded-full text-sm mb-6 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Simple & Easy Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight">
            How It
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Works
            </span>
          </h2>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
            Get started in 6 simple steps
          </p>
        </div>
        
        {/* Roadmap Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Top Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mb-8 relative">
            {/* Connection Line for Top Row */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 -translate-y-1/2 z-0"></div>
            
            {steps.slice(0, 3).map((step, index) => (
              <motion.div 
                key={index} 
                className="relative z-10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
              >
                {/* Step Number Badge */}
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="bg-gradient-to-br from-teal-500 to-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl font-bold text-xl"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {step.number}
                  </motion.div>
                </div>
                
                {/* Card */}
                <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2 sm:p-8 sm:rounded-2xl">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-teal-100 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center">
                      <step.icon className="size-10 text-teal-600" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow Down (only for first row on mobile) */}
                {index === 2 && (
                  <div className="hidden md:flex justify-center mt-6">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{ 
                        y: [0, 10, 0],
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Bottom Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 relative mt-12 sm:mt-16">
            {/* Connection Line for Bottom Row */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 -translate-y-1/2 z-0"></div>
            
            {[...steps.slice(3, 6)].reverse().map((step, index) => (
              <motion.div 
                key={index} 
                className="relative z-10"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
              >
                {/* Step Number Badge */}
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-600 to-teal-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl font-bold text-xl"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      delay: index * 0.3 + 0.6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {step.number}
                  </motion.div>
                </div>
                
                {/* Card */}
                <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2 sm:p-8 sm:rounded-2xl">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-20 h-20 rounded-2xl flex items-center justify-center">
                      <step.icon className="size-10 text-blue-600" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Vertical Connecting Line (Desktop) */}
          <div className="hidden md:block absolute right-[16.66%] top-[calc(50%-3rem)] h-32 w-0.5 bg-gradient-to-b from-blue-300 to-cyan-300 z-0"></div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-base font-semibold sm:w-auto sm:px-8 sm:text-lg">
            <Download className="size-6" />
            Download Now & Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
