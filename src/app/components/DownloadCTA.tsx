import { Download, Smartphone } from 'lucide-react';

export function DownloadCTA() {
  return (
    <section className="relative py-14 sm:py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-teal-500 to-teal-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8">
            <Smartphone className="size-10 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Start Your Smart Preparation Today
          </h2>
          
          <p className="text-base sm:text-xl text-teal-50 mb-8 sm:mb-10">
            Download the app now and join thousands of successful Bihar Board students
          </p>
          
          <div className="flex flex-col gap-3 justify-center sm:flex-row sm:flex-wrap sm:gap-4">
            <button className="inline-flex w-full items-center justify-center gap-3 bg-white text-blue-600 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all sm:w-auto sm:px-8">
              <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626c.55.318.55 1.119 0 1.437l-2.807 1.626-2.302-2.302 2.302-2.387zm-3.199-3.198l2.302 2.302-8.635 8.635 10.937-6.333-2.302-2.302z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs text-blue-500">GET IT ON</div>
                <div className="text-lg -mt-0.5">Google Play</div>
              </div>
            </button>
            
            <button className="inline-flex w-full items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl hover:bg-white/20 transition-all sm:w-auto sm:px-8">
              <Download className="size-6" />
              <div className="text-left">
                <div className="text-xs text-teal-100">DIRECT</div>
                <div className="text-lg -mt-0.5">Download APK</div>
              </div>
            </button>
          </div>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-teal-50 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free to Download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No Ads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Offline Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
