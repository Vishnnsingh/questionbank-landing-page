import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Screenshots } from './components/Screenshots';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { DownloadCTA } from './components/DownloadCTA';
import { Footer } from './components/Footer';
import { PolicyPage } from './components/PolicyPage';
import { SEO } from './components/SEO';
import { SideNav } from './components/SideNav';

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/about') {
    return <PolicyPage page="about" />;
  }

  if (path === '/contact-us') {
    return <PolicyPage page="contact" />;
  }

  if (path === '/support') {
    return <PolicyPage page="support" />;
  }

  if (path === '/terms-and-conditions') {
    return <PolicyPage page="terms" />;
  }

  if (path === '/refunds-and-cancellations') {
    return <PolicyPage page="refunds" />;
  }

  if (path === '/privacy-policy') {
    return <PolicyPage page="privacy" />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <SEO page="home" />
      <SideNav />
      <div className="pt-16 lg:pl-64 lg:pt-0">
        <Hero />
        <Features />
        <Screenshots />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <DownloadCTA />
        <Footer />
      </div>
    </div>
  );
}
