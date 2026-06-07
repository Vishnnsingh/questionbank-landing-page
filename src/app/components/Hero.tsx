import { Download, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import studyImage from '../../images/im4.jpg';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-teal-600 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div 
            className="space-y-7 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Honhaar
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-teal-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                CBSE & Bihar Board Question Bank App
              </motion.p>
            </div>
            
            <motion.p 
              className="mx-auto max-w-xl text-base sm:text-lg text-white/90 lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Practice 20,000+ previous year questions for Class 10 and Class 12 with
              smart question analysis, repeated question insights, mock tests, and analytics.
            </motion.p>
            
            {/* Marketing Taglines */}
            <motion.div 
              className="mx-auto grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mx-0"
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
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 text-left"
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
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 sm:justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button className="inline-flex w-full items-center justify-center gap-3 bg-white text-blue-600 px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 sm:w-auto">
                <svg className="size-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626c.55.318.55 1.119 0 1.437l-2.807 1.626-2.302-2.302 2.302-2.387zm-3.199-3.198l2.302 2.302-8.635 8.635 10.937-6.333-2.302-2.302z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-blue-500">GET IT ON</div>
                  <div className="text-lg -mt-0.5">Google Play</div>
                </div>
              </button>
              <button className="inline-flex w-full items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all sm:w-auto">
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
                className="relative w-[min(76vw,300px)] bg-slate-900 rounded-[2rem] p-2 shadow-2xl ring-4 ring-white/10 sm:rounded-[3rem] sm:p-3 sm:ring-8 lg:w-[350px]"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="relative rounded-[1.6rem] overflow-hidden sm:rounded-[2.5rem]">
                  <img src={studyImage} alt="Student preparing with Honhaar app" className="h-[560px] w-full object-cover" />
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <div className="absolute -top-3 -right-2 bg-white rounded-xl px-3 py-2 shadow-xl sm:-top-4 sm:-right-4 sm:rounded-2xl sm:px-4 sm:py-3">
                <div className="text-xs text-slate-600">Live Students</div>
                <div className="text-xl text-blue-600 sm:text-2xl">2,450+</div>
              </div>
              
              <div className="absolute -bottom-3 -left-2 bg-white rounded-xl px-3 py-2 shadow-xl sm:-bottom-4 sm:-left-4 sm:rounded-2xl sm:px-4 sm:py-3">
                <div className="text-xs text-slate-600">Questions</div>
                <div className="text-xl text-teal-600 sm:text-2xl">20,000+</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
