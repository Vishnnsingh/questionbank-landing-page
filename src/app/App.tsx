import { Hero } from './components/Hero';
import { WinningEdgeSection } from './components/WinningEdgeSection';
import { CounterSection } from './components/CounterSection';
import { SeeItInAction } from './components/SeeItInAction';
import { MagicFormulaSection } from './components/MagicFormulaSection';
import { FindYourPerfectPlan } from './components/FindYourPerfectPlan';
import { SimpleScientificSection } from './components/SimpleScientificSection';
import { Footer } from './components/Footer';
import { PolicyPage } from './components/PolicyPage';
import { SEO } from './components/SEO';
import { SeoLandingPage } from './components/SeoLandingPage';
import { ChoosePlanPage } from './components/ChoosePlanPage';
import { ShareApplicationPage } from './components/ShareApplicationPage';
import { PaymentLoginPage } from './components/PaymentLoginPage';
import { PaymentReturnPage } from './components/PaymentReturnPage';
import { SignUpPage } from './components/SignUpPage';
import { OnboardingPage } from './components/OnboardingPage';
import { AboutPage } from './components/AboutPage';
import { DeleteAccountPage } from './components/DeleteAccountPage';
import { SideNav } from './components/SideNav';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollSection } from './components/scroll-fx';

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/signup' || path === '/register') {
    return <SignUpPage />;
  }

  if (path === '/onboarding') {
    return <OnboardingPage />;
  }

  if (path === '/login') {
    return <PaymentLoginPage />;
  }

  if (path === '/choose-plan') {
    return <ChoosePlanPage />;
  }

  if (path === '/share-application') {
    return <ShareApplicationPage />;
  }

  if (path === '/payment/return') {
    return <PaymentReturnPage />;
  }

  if (
    path === '/about' ||
    path === '/about-prepmagic' ||
    path === '/what-is-prepmagic'
  ) {
    return <AboutPage />;
  }

  if (path === '/contact-us') {
    return <PolicyPage page="contact" />;
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

  if (path === '/delete-account') {
    return <DeleteAccountPage />;
  }

  if (path === '/cbse-question-bank') {
    return <SeoLandingPage page="cbseQuestionBank" />;
  }

  if (path === '/bihar-board-question-bank') {
    return <SeoLandingPage page="biharBoardQuestionBank" />;
  }

  if (
    path === '/class-10-question-bank' ||
    path === '/cbse-class-10-question-bank' ||
    path === '/bihar-board-class-10-question-bank'
  ) {
    return <SeoLandingPage page="class10QuestionBank" />;
  }

  if (
    path === '/class-12-question-bank' ||
    path === '/cbse-class-12-question-bank' ||
    path === '/bihar-board-class-12-question-bank'
  ) {
    return <SeoLandingPage page="class12QuestionBank" />;
  }

  if (path === '/blog/bihar-board-class-12-previous-year-questions') {
    return <SeoLandingPage page="blogBiharClass12Questions" />;
  }

  if (path === '/blog/cbse-class-10-most-repeated-questions') {
    return <SeoLandingPage page="blogCbseClass10RepeatedQuestions" />;
  }

  return (
    <>
      <SEO page="home" />
      <SmoothScroll>
        <div className="min-h-screen bg-white">
          <SideNav />
          <Hero />
          <WinningEdgeSection />
          <CounterSection />
          <SeeItInAction />
          <MagicFormulaSection />
          <FindYourPerfectPlan />
          <SimpleScientificSection />
          <ScrollSection>
            <Footer />
          </ScrollSection>
        </div>
      </SmoothScroll>
    </>
  );
}
