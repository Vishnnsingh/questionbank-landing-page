import { Download, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-teal-600 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl lg:text-6xl tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Bihar Board Smart Prep
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl text-teal-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                10 Years Question Bank + AI Exam Prediction
              </motion.p>
            </div>
            
            <motion.p 
              className="text-lg text-white/90 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Prepare smarter for Bihar Board exams with smart question analysis, 
              repeated question insights, mock tests, and personalized learning tools.
            </motion.p>
            
            {/* Marketing Taglines */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                "Track Yourself in Single App",
                "Do Better & Excel",
                "Update Yourself Daily",
                "Crack Your Goals"
              ].map((text, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <CheckCircle2 className="size-5 text-teal-200 flex-shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button className="inline-flex items-center gap-3 bg-white text-blue-600 px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <svg className="size-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626c.55.318.55 1.119 0 1.437l-2.807 1.626-2.302-2.302 2.302-2.387zm-3.199-3.198l2.302 2.302-8.635 8.635 10.937-6.333-2.302-2.302z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-blue-500">GET IT ON</div>
                  <div className="text-lg -mt-0.5">Google Play</div>
                </div>
              </button>
              <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all">
                <Play className="size-5" />
                <span>View Demo</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Phone Mockup */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Phone Frame */}
              <motion.div 
                className="relative w-[300px] lg:w-[350px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl ring-8 ring-white/10"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="px-6 py-2 text-xs text-white/60">
                    9:41
                  </div>
                  
                  {/* App Content */}
                  <div className="px-6 py-12 space-y-6">
                    {/* App Icon */}
                    <div className="flex justify-center">
                      <div className="bg-white rounded-3xl p-6 shadow-lg">
                        <svg className="w-16 h-16 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* App Title */}
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl text-white">
                        Bihar Board<br />Smart Prep
                      </h3>
                      <p className="text-teal-100 text-sm">
                        10 Years Question Bank + AI Prediction
                      </p>
                    </div>
                    
                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 pt-8">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl">
                <div className="text-xs text-slate-600">Live Students</div>
                <div className="text-2xl text-blue-600">2,450+</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl">
                <div className="text-xs text-slate-600">Questions</div>
                <div className="text-2xl text-teal-600">10,000+</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}