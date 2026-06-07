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
import { SeoLandingPage } from './components/SeoLandingPage';
import { ChoosePlanPage } from './components/ChoosePlanPage';
import { PaymentLoginPage } from './components/PaymentLoginPage';
import { PaymentReturnPage } from './components/PaymentReturnPage';
import { SignUpPage } from './components/SignUpPage';
import { SideNav } from './components/SideNav';

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/signup' || path === '/register') {
    return <SignUpPage />;
  }

  if (path === '/login') {
    return <PaymentLoginPage />;
  }

  if (path === '/choose-plan') {
    return <ChoosePlanPage />;
  }

  if (path === '/payment/return') {
    return <PaymentReturnPage />;
  }

  if (path === '/about' || path === '/about-honhaar' || path === '/what-is-honhaar') {
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

  if (path === '/cbse-question-bank') {
    return <SeoLandingPage page="cbseQuestionBank" />;
  }

  if (path === '/bihar-board-question-bank') {
    return <SeoLandingPage page="biharBoardQuestionBank" />;
  }

  if (path === '/class-10-question-bank' || path === '/cbse-class-10-question-bank' || path === '/bihar-board-class-10-question-bank') {
    return <SeoLandingPage page="class10QuestionBank" />;
  }

  if (path === '/class-12-question-bank' || path === '/cbse-class-12-question-bank' || path === '/bihar-board-class-12-question-bank') {
    return <SeoLandingPage page="class12QuestionBank" />;
  }

  if (path === '/blog/bihar-board-class-12-previous-year-questions') {
    return <SeoLandingPage page="blogBiharClass12Questions" />;
  }

  if (path === '/blog/cbse-class-10-most-repeated-questions') {
    return <SeoLandingPage page="blogCbseClass10RepeatedQuestions" />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <SEO page="home" />
      <SideNav />
      <div className="pt-20">
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
