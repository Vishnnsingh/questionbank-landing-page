import { BookOpen, TrendingUp, Award, Users, Brain, Globe, FileText, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const features = [
  {
    icon: BookOpen,
    title: '10 Years Question Bank',
    description: 'Access previous year questions with detailed solutions.',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-teal-500',
  },
  {
    icon: Brain,
    title: 'AI Exam Prediction',
    description: 'Smart algorithm predicts important questions.',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Most Repeated Questions',
    description: 'Find questions that appear frequently in exams.',
    color: 'bg-teal-500',
    gradient: 'from-teal-500 to-green-500',
  },
  {
    icon: Award,
    title: 'Mock Tests',
    description: 'Practice real exam pattern tests.',
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Globe,
    title: 'Chapter & Topic Insights',
    description: 'See which topics are most important.',
    color: 'bg-green-500',
    gradient: 'from-green-500 to-blue-500',
  },
  {
    icon: Users,
    title: 'Performance Tracking',
    description: 'Track weak and strong subjects.',
    color: 'bg-pink-500',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    icon: FileText,
    title: 'Complete Syllabus Coverage',
    description: 'Full Bihar Board syllabus with detailed explanations.',
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Briefcase,
    title: 'Career Assistant',
    description: 'Get guidance for college selection and career planning.',
    color: 'bg-cyan-500',
    gradient: 'from-cyan-500 to-teal-500',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-14 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-5 py-2.5 rounded-full text-sm mb-6 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>All-in-One Learning Platform</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight">
            Powerful Features for<br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
              Smart Preparation
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Everything you need to excel in your Bihar Board exams
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Center Rope/Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-teal-500 to-purple-500 transform -translate-x-1/2 hidden lg:block"></div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                {/* Number Badge on the center line */}
                <div className="hidden lg:block absolute left-1/2 top-6 transform -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                </div>

                {/* Connecting Line - Left to Badge */}
                {index % 2 === 0 && (
                  <div className="hidden lg:block absolute left-1/2 top-[50px] h-0.5 -ml-[calc(50%-3rem)] w-[calc(50%-3rem)]">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-40`}></div>
                    <div className={`absolute right-0 h-full bg-gradient-to-r ${feature.gradient} animate-pulse`} 
                         style={{ 
                           width: '30%',
                           animation: 'slideRight 2s ease-in-out infinite'
                         }}></div>
                  </div>
                )}

                {/* Connecting Line - Badge to Right */}
                {index % 2 === 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-[50px] w-[calc(50%-3rem)] h-0.5 ml-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-40`}></div>
                    <div className={`absolute left-0 h-full bg-gradient-to-r ${feature.gradient} animate-pulse`}
                         style={{ 
                           width: '30%',
                           animation: 'slideRight 2s ease-in-out infinite'
                         }}></div>
                  </div>
                )}

                <div className={`flex w-full items-center ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  {/* Card */}
                  <div className={`relative w-full lg:w-[45%] ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="group relative w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 rounded-2xl p-6 transition-all duration-500 hover:border-transparent hover:shadow-2xl sm:hover:scale-105">
                      {/* Icon with floating animation */}
                      <motion.div 
                        className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 shadow-lg`}
                        animate={{ 
                          y: [0, -8, 0],
                        }}
                        transition={{ 
                          duration: 2,
                          delay: index * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <feature.icon className="size-6 text-white" />
                      </motion.div>
                      
                      <h3 className="text-lg text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Bottom Accent */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl`}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-14 grid gap-8 sm:mt-20 sm:grid-cols-3 max-w-4xl mx-auto">
          <div className="text-center group cursor-pointer">
            <div className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
              10K+
            </div>
            <div className="text-base text-slate-600">Practice Questions</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
              2.5K+
            </div>
            <div className="text-base text-slate-600">Active Students</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
              95%
            </div>
            <div className="text-base text-slate-600">Success Rate</div>
          </div>
        </div>

        {/* Student Images Gallery */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl text-slate-900 mb-4">
              Join Thousands of{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Smart Learners
              </span>
            </h3>
            <p className="text-lg text-slate-600">
              Students studying smarter with mobile learning and traditional notes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Image 1 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1611131922192-9e1d9f483900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBtb2JpbGUlMjBwaG9uZSUyMG5vdGVzfGVufDF8fHx8MTc3MzI2MTU5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student studying with mobile phone and notes"
                className="w-full h-[260px] sm:h-[340px] lg:h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-xl font-semibold mb-1">Digital Learning</div>
                <div className="text-sm text-slate-200">Study anytime, anywhere</div>
              </div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1734099482272-10b1288971cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBsZWFybmluZyUyMHNtYXJ0cGhvbmUlMjBib29rc3xlbnwxfHx8fDE3NzMyNjE1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Young student learning with smartphone and books"
                className="w-full h-[260px] sm:h-[340px] lg:h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-xl font-semibold mb-1">Smart Preparation</div>
                <div className="text-sm text-slate-200">Books + Technology</div>
              </div>
            </motion.div>

            {/* Image 3 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1601128688653-7dc405e3ac4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMHBob25lJTIwbm90ZWJvb2slMjBzdHVkeWluZ3xlbnwxfHx8fDE3NzMyNjE1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="College student with phone and notebook studying"
                className="w-full h-[260px] sm:h-[340px] lg:h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-xl font-semibold mb-1">Track Progress</div>
                <div className="text-sm text-slate-200">Monitor your growth</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
