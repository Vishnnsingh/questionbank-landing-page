import { Play, CheckCircle2, Star, Users, Zap, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: 'Interactive Learning',
    description: 'Practice with instant feedback and detailed solutions',
  },
  {
    icon: Star,
    title: 'Smart AI Predictions',
    description: 'Get AI-powered exam predictions based on trends',
  },
  {
    icon: Users,
    title: 'Compare & Compete',
    description: 'Track your rank against 2,450+ students',
  },
  {
    icon: Zap,
    title: 'Fast & Efficient',
    description: 'Lightning fast app with smooth performance',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Visual analytics to monitor your improvement',
  },
];

export function Screenshots() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-full text-sm mb-6 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Live Demo</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight">
            See the App in
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Action
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Watch how Bihar Board Smart Prep transforms your exam preparation
          </p>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Side - Video */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Video Container */}
            <div className="relative bg-slate-900 rounded-3xl p-3 shadow-2xl ring-8 ring-white/10 w-[280px] lg:w-[320px]">
              <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl overflow-hidden aspect-[9/16]">
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-500/90 to-blue-600/90">
                  <div className="text-center space-y-4 px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl hover:scale-110 transition-transform cursor-pointer group">
                      <Play className="size-8 text-teal-600 ml-1 group-hover:text-blue-600 transition-colors" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-white text-base font-semibold">Watch Demo Video</p>
                      <p className="text-teal-100 text-xs">See features in action (2:30)</p>
                    </div>
                  </div>
                </div>
                
                {/* Video Timeline Preview (decorative) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 lg:right-auto lg:left-[calc(280px+1rem)] bg-white rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-xs text-slate-600">Video Views</div>
              <div className="text-2xl text-teal-600 font-bold">12K+</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-xs text-slate-600">Duration</div>
              <div className="text-2xl text-blue-600 font-bold">2:30</div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl text-slate-900">
                Experience the Power of
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  {' '}Smart Learning
                </span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our app is designed specifically for Bihar Board students to help them excel in their exams with cutting-edge technology and proven study methods.
              </p>
            </div>
            
            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 hover:shadow-lg hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <feature.icon className="size-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <div className="pt-4">
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg font-semibold">
                <Play className="size-6" />
                Download & Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}