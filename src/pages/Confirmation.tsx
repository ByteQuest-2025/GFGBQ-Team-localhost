import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Home, ShieldCheck, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Candidate } from '@/data/candidates';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocationState {
  candidate: Candidate;
}

/**
 * Vote confirmation page with success message and privacy reassurance
 */
const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { speak, settings } = useAccessibility();
  const { t } = useLanguage();
  
  const state = location.state as LocationState | null;

  // Redirect if no state (direct access without voting)
  useEffect(() => {
    if (!state?.candidate) {
      navigate('/vote');
    }
  }, [state, navigate]);

  // Announce success on mount
  useEffect(() => {
    if (state?.candidate && settings.voiceMode) {
      speak(`${t.confirm.title} ${state.candidate.name}. ${t.confirm.privateTitle}.`);
    }
  }, [state, settings.voiceMode, speak, t]);

  if (!state?.candidate) {
    return null;
  }

  const { candidate } = state;

  return (
    <>
      <Helmet>
        <title>{t.confirm.title} - IncluVote</title>
        <meta name="description" content={t.confirm.subtitle} />
      </Helmet>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="min-h-screen pt-24 pb-16 bg-background flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div 
              className="w-24 h-24 mx-auto rounded-full bg-[hsl(var(--success))]/20 flex items-center justify-center mb-8 animate-fade-in-scale"
              aria-hidden="true"
            >
              <CheckCircle className="w-14 h-14 text-[hsl(var(--success))]" />
            </div>

            {/* Success Message */}
            <h1 
              className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4 animate-fade-in-up"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              {t.confirm.title}
            </h1>
            <p 
              className="text-lg text-muted-foreground mb-8 animate-fade-in-up opacity-0"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              {t.confirm.subtitle}
            </p>

            {/* Vote Summary Card */}
            <div 
              className="card-elevated p-8 mb-8 animate-fade-in-up opacity-0"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <p className="text-sm text-muted-foreground mb-4">{t.confirm.voteFor} {t.position.stateRepresentative}</p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  style={{ 
                    backgroundColor: `hsl(${candidate.color} / 0.15)`,
                    border: `2px solid hsl(${candidate.color} / 0.3)`,
                  }}
                  aria-hidden="true"
                >
                  {candidate.symbol}
                </div>
                <div className="text-left">
                  <h2 className="font-heading font-bold text-xl text-foreground">
                    {candidate.name}
                  </h2>
                  <p 
                    className="font-medium text-sm"
                    style={{ color: `hsl(${candidate.color})` }}
                  >
                    {candidate.party}
                  </p>
                </div>
              </div>

              {/* Confirmation ID (mock) */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">{t.confirm.reference}</p>
                <p className="font-mono text-sm text-foreground font-medium">
                  {`VOTE-${Date.now().toString(36).toUpperCase()}`}
                </p>
              </div>
            </div>

            {/* Privacy Reassurance */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 animate-fade-in-up opacity-0"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm text-foreground">{t.confirm.privateTitle}</p>
                  <p className="text-xs text-muted-foreground">{t.confirm.privateDesc}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm text-foreground">{t.confirm.secureTitle}</p>
                  <p className="text-xs text-muted-foreground">{t.confirm.secureDesc}</p>
                </div>
              </div>
            </div>

            {/* Return Home Button */}
            <div 
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
            >
              <Link to="/">
                <Button variant="hero" size="xl" className="touch-target">
                  <Home className="w-5 h-5" />
                  {t.confirm.returnHome}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Confirmation;
