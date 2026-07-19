import { BookOpen, CheckCircle2, Download, Star, Users, Zap, TrendingUp } from 'lucide-react';
import demoImage from '../../images/im4.jpg';
import { ParallaxLayer } from './scroll-fx';

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
    <section className="relative py-14 sm:py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <ParallaxLayer speed={0.22} className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-teal-400/20 to-pink-400/20 blur-3xl" />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-full text-sm mb-6 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Inside the App</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight">
            See the App in
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Action
            </span>
          </h2>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
            Explore how Prepmagic helps you practice questions and prepare for board exams
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Phone mockup — app preview */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-[min(76vw,280px)] bg-slate-900 rounded-2xl p-2 shadow-2xl ring-4 ring-white/10 sm:p-3 sm:ring-8 lg:w-[320px]">
              <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl overflow-hidden aspect-[9/16]">
                <img
                  src={demoImage}
                  alt="Student preparing with Prepmagic question bank app"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 space-y-3 p-4 sm:p-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    <BookOpen className="size-3.5" />
                    Question Bank
                  </div>
                  <div>
                    <p className="text-white text-base font-semibold sm:text-lg">Practice. Track. Improve.</p>
                    <p className="mt-1 text-teal-100 text-xs sm:text-sm">
                      CBSE &amp; Bihar Board · Class 10 &amp; 12
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-2 bg-white rounded-xl px-3 py-2 shadow-xl sm:-top-4 sm:-right-4 sm:rounded-2xl sm:px-4 sm:py-3 lg:right-auto lg:left-[calc(280px+1rem)]">
              <div className="text-xs text-slate-600">Active Students</div>
              <div className="text-xl text-teal-600 font-bold sm:text-2xl">12K+</div>
            </div>

            <div className="absolute -bottom-3 -left-2 bg-white rounded-xl px-3 py-2 shadow-xl sm:-bottom-4 sm:-left-4 sm:rounded-2xl sm:px-4 sm:py-3">
              <div className="text-xs text-slate-600">Questions</div>
              <div className="text-xl text-blue-600 font-bold sm:text-2xl">20K+</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900">
                Experience the Power of
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  {' '}Smart Learning
                </span>
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Our app is designed specifically for Bihar Board students to help them excel in their exams with cutting-edge technology and proven study methods.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:shadow-lg hover:border-teal-200 transition-all duration-300 hover:-translate-y-1 sm:gap-4 sm:p-5"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <feature.icon className="size-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="/signup"
                className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-base font-semibold sm:w-auto sm:px-8 sm:text-lg"
              >
                <Download className="size-6" />
                Download &amp; Start Learning
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
