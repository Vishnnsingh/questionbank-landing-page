import { 
  Facebook, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Twitter, 
  Youtube,
  Copyright,
  ShieldCheck,
  FileText,
  Headset,
  ChevronRight
} from 'lucide-react';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '../seo';

export function Footer() {
  return (
    <footer className="relative bg-[#020b18] text-slate-300 overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0f8f84]/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#0f8f84]/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-4 pt-12 pb-8 text-center sm:px-6 lg:pt-16 lg:px-8">
        
        {/* Logo */}
        <a href="/" className="inline-flex items-center justify-center mb-6 lg:mb-6">
          <div className="bg-white rounded-[24px] px-6 py-2.5 lg:rounded-full lg:px-8 lg:py-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <img
              src="/Logo.png"
              alt="Prepmagic"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </div>
        </a>

        {/* Subtitle */}
        <p className="max-w-[800px] px-1 text-center text-[16px] font-medium leading-relaxed text-slate-200 sm:text-[18px]">
          <span className="text-[#00d0b5] font-semibold">CBSE</span> and{' '}
          <span className="text-[#00d0b5] font-semibold">Bihar Board</span> Class 10 and Class 12
          <br className="lg:hidden" /> question bank app with smart exam
          <br className="hidden lg:block" /> preparation insights.
        </p>

        {/* Short divider */}
        <div className="w-12 h-[2px] bg-[#00d0b5] mx-auto mt-6 shadow-[0_0_10px_#00d0b5]"></div>

        {/* Pills container */}
        <div className="mt-10 lg:mt-12 flex w-full flex-col items-center justify-between gap-6 lg:flex-row lg:items-stretch lg:gap-8">
          
          {/* Social Icons */}
          <div className="flex w-full items-center justify-center gap-5 lg:w-auto lg:gap-4 lg:rounded-full lg:border lg:border-blue-900/40 lg:bg-[#06142a]/80 lg:px-6 lg:h-16 lg:shadow-[inset_0_0_20px_rgba(0,100,255,0.05),0_0_15px_rgba(0,100,255,0.1)] lg:backdrop-blur-sm">
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Instagram, label: 'Instagram' },
              { icon: Youtube, label: 'Youtube' },
            ].map(({ icon: Icon, label }) => (
              <a 
                key={label}
                href="/" 
                aria-label={label} 
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-blue-600/50 bg-[#06142a]/80 text-slate-300 transition-colors hover:text-[#00d0b5] hover:shadow-[0_0_10px_#00d0b5] lg:h-10 lg:w-10 lg:border-none lg:bg-[#020b18]"
              >
                <Icon className="size-[20px] lg:size-[18px]" />
              </a>
            ))}
          </div>

          {/* Contact Info Desktop */}
          <div className="hidden lg:flex min-h-[64px] items-center rounded-[32px] border border-blue-900/40 bg-[#06142a]/80 px-8 py-0 shadow-[inset_0_0_20px_rgba(0,100,255,0.05),0_0_15px_rgba(0,100,255,0.1)] backdrop-blur-sm divide-x divide-slate-700/50">
            <span className="flex items-center gap-3 text-[15px] pr-6">
              <MapPin className="size-[18px] text-[#00d0b5]" />
              Patna, Bihar, India
            </span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-3 text-[15px] px-6 transition-colors hover:text-[#00d0b5]">
              <Mail className="size-[18px] text-[#00d0b5]" />
              {SUPPORT_EMAIL}
            </a>
            <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-[15px] pl-6 transition-colors hover:text-[#00d0b5]">
              <Phone className="size-[18px] text-[#00d0b5]" />
              {SUPPORT_PHONE}
            </a>
          </div>

          {/* Contact Info Mobile */}
          <div className="flex w-full flex-col gap-4 lg:hidden max-w-[440px]">
            <div className="flex h-[56px] items-center justify-between rounded-[16px] border border-blue-900/60 bg-[#06142a]/80 px-4 shadow-[0_0_15px_rgba(0,100,255,0.05)]">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#020b18] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                  <MapPin className="size-[18px] text-[#00d0b5]" />
                </div>
                <span className="text-[15px] font-medium text-slate-200">Patna, Bihar, India</span>
              </div>
              <ChevronRight className="size-[20px] text-[#00d0b5]" />
            </div>

            <a href={`mailto:${SUPPORT_EMAIL}`} className="flex h-[56px] items-center justify-between rounded-[16px] border border-blue-900/60 bg-[#06142a]/80 px-4 shadow-[0_0_15px_rgba(0,100,255,0.05)]">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#020b18] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                  <Mail className="size-[18px] text-[#00d0b5]" />
                </div>
                <span className="text-[15px] font-medium text-slate-200">{SUPPORT_EMAIL}</span>
              </div>
              <ChevronRight className="size-[20px] text-[#00d0b5]" />
            </a>

            <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} className="flex h-[56px] items-center justify-between rounded-[16px] border border-blue-900/60 bg-[#06142a]/80 px-4 shadow-[0_0_15px_rgba(0,100,255,0.05)]">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#020b18] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                  <Phone className="size-[18px] text-[#00d0b5]" />
                </div>
                <span className="text-[15px] font-medium text-slate-200">{SUPPORT_PHONE}</span>
              </div>
              <ChevronRight className="size-[20px] text-[#00d0b5]" />
            </a>
          </div>
        </div>

        {/* Full width glowing divider */}
        <div className="relative mt-12 w-full h-[1px] bg-slate-800 lg:mt-16">
          <div className="absolute left-1/2 top-0 h-[1px] w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00d0b5] to-transparent shadow-[0_0_10px_#00d0b5]"></div>
        </div>

        {/* Bottom Links Desktop Inline */}
        <div className="mt-8 hidden lg:flex w-full flex-row items-center justify-start gap-x-6">
          <div className="flex items-center gap-2 text-[14px] text-slate-300">
            <Copyright className="size-4 text-[#00d0b5]" />
            Copyright 2026 Kavioninnovation
          </div>
          
          <span className="h-4 w-px bg-slate-700"></span>
          
          <a href="/privacy-policy" className="flex items-center gap-2 text-[14px] transition-colors hover:text-[#00d0b5]">
            <ShieldCheck className="size-4 text-[#00d0b5]" />
            Privacy Policy
          </a>
          
          <span className="h-4 w-px bg-slate-700"></span>
          
          <a href="/terms-and-conditions" className="flex items-center gap-2 text-[14px] transition-colors hover:text-[#00d0b5]">
            <FileText className="size-4 text-[#00d0b5]" />
            Terms &amp; Conditions
          </a>
          
          <span className="h-4 w-px bg-slate-700"></span>
          
          <a href="/contact-us" className="flex items-center gap-2 text-[14px] transition-colors hover:text-[#00d0b5]">
            <Headset className="size-4 text-[#00d0b5]" />
            Contact Us
          </a>
        </div>

        {/* Bottom Links Mobile Box */}
        <div className="mt-8 flex w-full flex-col lg:hidden max-w-[440px]">
          <div className="grid grid-cols-2 rounded-[24px] border border-blue-900/50 bg-[#06142a]/80 overflow-hidden divide-x divide-slate-800/80">
            
            {/* Top row */}
            <a href="/privacy-policy" className="flex items-center gap-3 p-4 pl-5 border-b border-slate-800/80">
              <ShieldCheck className="size-[20px] text-[#00d0b5] shrink-0" />
              <span className="text-[14px] font-medium text-slate-200">Privacy Policy</span>
            </a>
            <a href="/terms-and-conditions" className="flex items-center gap-3 p-4 pl-5 border-b border-slate-800/80">
              <FileText className="size-[20px] text-[#00d0b5] shrink-0" />
              <span className="text-[14px] font-medium text-slate-200">Terms &amp; Conditions</span>
            </a>
            
            {/* Bottom row */}
            <div className="flex items-center gap-3 p-4 pl-5">
              <Copyright className="size-[20px] text-[#00d0b5] shrink-0" />
              <span className="text-[13px] font-medium leading-[1.3] text-slate-200 text-left">
                Copyright 2026<br/>Kavioninnovation
              </span>
            </div>
            <a href="/contact-us" className="flex items-center gap-3 p-4 pl-5">
              <Headset className="size-[20px] text-[#00d0b5] shrink-0" />
              <span className="text-[14px] font-medium text-slate-200">Contact Us</span>
            </a>
            
          </div>
        </div>

      </div>
    </footer>
  );
}
