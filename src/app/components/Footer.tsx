import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '../seo';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="text-xl text-white">Honhaar</span>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              CBSE and Bihar Board Class 10 and Class 12 question bank app with smart exam preparation insights.
            </p>
            <div className="flex gap-3">
              <a href="/" aria-label="Facebook" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="size-5" />
              </a>
              <a href="/" aria-label="Twitter" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="size-5" />
              </a>
              <a href="/" aria-label="Instagram" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="size-5" />
              </a>
              <a href="/" aria-label="Youtube" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/#pricing" className="hover:text-teal-400 transition-colors">Products & Pricing</a></li>
              <li><a href="/about" className="hover:text-teal-400 transition-colors">About</a></li>
              <li><a href="/cbse-question-bank" className="hover:text-teal-400 transition-colors">CBSE Question Bank</a></li>
              <li><a href="/bihar-board-question-bank" className="hover:text-teal-400 transition-colors">Bihar Board</a></li>
              <li><a href="/#features" className="hover:text-teal-400 transition-colors">Features</a></li>
              <li><a href="/contact-us" className="hover:text-teal-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/#pricing" className="hover:text-teal-400 transition-colors">Question Bank Plans</a></li>
              <li><a href="/class-10-question-bank" className="hover:text-teal-400 transition-colors">Class 10</a></li>
              <li><a href="/class-12-question-bank" className="hover:text-teal-400 transition-colors">Class 12</a></li>
              <li><a href="/#features" className="hover:text-teal-400 transition-colors">Mock Tests</a></li>
              <li><a href="/support" className="hover:text-teal-400 transition-colors">Support</a></li>
              <li><a href="/refunds-and-cancellations" className="hover:text-teal-400 transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="size-5 text-teal-400 flex-shrink-0" />
                <span>Patna, Bihar, India</span>
              </li>
              <li className="flex gap-3">
                <Mail className="size-5 text-teal-400 flex-shrink-0" />
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-teal-400 transition-colors">
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="size-5 text-teal-400 flex-shrink-0" />
                <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} className="hover:text-teal-400 transition-colors">
                  {SUPPORT_PHONE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>Copyright 2026 Honhaar. All rights reserved.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
            <a href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-teal-400 transition-colors">Terms & Conditions</a>
            <a href="/refunds-and-cancellations" className="hover:text-teal-400 transition-colors">Refunds & Cancellations</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
