import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '../seo';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-12 text-center sm:px-6 sm:py-14 lg:px-8">
        <a href="/" className="inline-flex items-center justify-center">
          {/* Soft r10 curve — same as Hero “Register Now” */}
          <span className="flex h-12 w-auto max-w-[220px] items-center overflow-hidden sm:h-14 sm:max-w-[260px]" style={{ borderRadius: 10 }}>
            <img
              src="/Logo.png"
              alt="Prepmagic"
              className="h-full w-full object-contain"
              style={{ borderRadius: 10 }}
            />
          </span>
        </a>

        <p className="mt-5 max-w-[22rem] px-1 text-center text-[14px] font-medium leading-6 text-slate-400 sm:max-w-xl sm:text-[15px] sm:leading-6">
          CBSE and Bihar Board Class 10 and Class 12 question bank app with smart exam preparation insights.
        </p>

        <div className="mt-8 flex w-full max-w-4xl flex-col items-center justify-between gap-8 sm:flex-row sm:items-start sm:gap-10">
          <div className="flex shrink-0 justify-center gap-3 sm:justify-start">
            <a
              href="/"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-colors hover:bg-blue-600"
            >
              <Facebook className="size-5" />
            </a>
            <a
              href="/"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-colors hover:bg-blue-400"
            >
              <Twitter className="size-5" />
            </a>
            <a
              href="/"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-colors hover:bg-pink-600"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href="/"
              aria-label="Youtube"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-colors hover:bg-red-600"
            >
              <Youtube className="size-5" />
            </a>
          </div>

          <div className="flex w-full max-w-md flex-col items-center gap-3 text-left text-sm leading-6 sm:items-end">
            <p className="flex max-w-sm gap-2 text-slate-300 sm:text-right">
              <MapPin className="mt-0.5 size-4 shrink-0 text-teal-400" />
              <span>
                B-272, Alpha I, Block B, Aashirwad
                <br />
                Greater Noida, Uttar Pradesh 201310, India
              </span>
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-teal-400"
            >
              <Mail className="size-4 shrink-0 text-teal-400" />
              {SUPPORT_EMAIL}
            </a>
            <a
              href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-teal-400"
            >
              <Phone className="size-4 shrink-0 text-teal-400" />
              {SUPPORT_PHONE}
            </a>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-slate-800 pt-8 text-sm text-slate-400 sm:gap-x-6">
          <p>Copyright 2026 Kavioninnovation</p>
          <a href="/privacy-policy" className="transition-colors hover:text-teal-400">
            Privacy Policy
          </a>
          <a href="/terms-and-conditions" className="transition-colors hover:text-teal-400">
            Terms &amp; Conditions
          </a>
          <a href="/contact-us" className="transition-colors hover:text-teal-400">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
