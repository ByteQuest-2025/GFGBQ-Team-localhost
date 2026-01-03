import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VotingProgress from '@/components/VotingProgress';
import CandidateCard from '@/components/CandidateCard';
import { Button } from '@/components/ui/button';
import { candidates } from '@/data/candidates';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Multi-step voting flow page
 */
const Vote: React.FC = () => {
  const navigate = useNavigate();
  const { speak, settings } = useAccessibility();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setHasError(false);
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedCandidate) {
      setHasError(true);
      speak(t.voting.selectError);
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 1 && settings.voiceMode) {
        speak(t.voting.reviewSubtitle);
      }
    } else {
      // Submit vote and navigate to confirmation
      navigate('/confirmation', { 
        state: { 
          candidate: selectedCandidateData,
        } 
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.voting.selectTitle} - IncluVote</title>
        <meta name="description" content={t.voting.selectTitle} />
      </Helmet>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Progress Indicator */}
          <VotingProgress currentStep={currentStep} />

          {/* Step 1: Candidate Selection */}
          {currentStep === 1 && (
            <section aria-labelledby="select-heading" className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 
                  id="select-heading"
                  className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3"
                >
                  {t.voting.selectTitle}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {t.voting.selectFor} <span className="text-primary font-medium">{t.position.stateRepresentative}</span>
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  {t.position.stateRepresentativeDesc}
                </p>
              </div>

              {/* Error message */}
              {hasError && (
                <div 
                  role="alert"
                  className="flex items-center gap-3 p-4 mb-8 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive max-w-md mx-auto"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{t.voting.selectError}</span>
                </div>
              )}

              {/* Candidates Grid */}
              <div 
                role="radiogroup"
                aria-label="Candidate selection"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              >
                {candidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    isSelected={selectedCandidate === candidate.id}
                    onSelect={handleSelectCandidate}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Step 2: Review Selection */}
          {currentStep === 2 && selectedCandidateData && (
            <section aria-labelledby="review-heading" className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 
                  id="review-heading"
                  className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3"
                >
                  {t.voting.reviewTitle}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {t.voting.reviewSubtitle}
                </p>
              </div>

              {/* Review Card */}
              <div className="max-w-lg mx-auto">
                <div className="card-elevated p-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.voting.reviewVoteFor} <span className="text-primary font-medium">{t.position.stateRepresentative}</span>
                  </p>

                  {/* Candidate symbol */}
                  <div 
                    className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-6"
                    style={{ 
                      backgroundColor: `hsl(${selectedCandidateData.color} / 0.15)`,
                      border: `2px solid hsl(${selectedCandidateData.color} / 0.3)`,
                    }}
                    aria-hidden="true"
                  >
                    {selectedCandidateData.symbol}
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                    {selectedCandidateData.name}
                  </h2>
                  <p 
                    className="font-medium mb-4"
                    style={{ color: `hsl(${selectedCandidateData.color})` }}
                  >
                    {selectedCandidateData.party}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {selectedCandidateData.description}
                  </p>
                </div>

                {/* Privacy notice */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                  {t.voting.reviewPrivacy}
                </p>
              </div>
            </section>
          )}

          {/* Step 3: Final Confirmation */}
          {currentStep === 3 && selectedCandidateData && (
            <section aria-labelledby="confirm-heading" className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 
                  id="confirm-heading"
                  className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3"
                >
                  {t.voting.confirmTitle}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {t.voting.confirmSubtitle}
                </p>
              </div>

              {/* Final confirmation card */}
              <div className="max-w-lg mx-auto">
                <div className="card-elevated p-8 text-center border-2 border-primary/30">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-6 bg-primary/10"
                    aria-hidden="true"
                  >
                    {selectedCandidateData.symbol}
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{t.voting.confirmVotingFor}</p>
                  <h2 className="font-heading font-bold text-xl text-foreground mb-1">
                    {selectedCandidateData.name}
                  </h2>
                  <p className="text-primary font-medium text-sm">
                    {selectedCandidateData.party}
                  </p>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      {t.voting.confirmWarning}
                      <br />
                      <strong>{t.voting.confirmFinal}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="xl"
              onClick={handleBack}
              className="touch-target"
            >
              <ArrowLeft className="w-5 h-5" />
              {currentStep === 1 ? t.voting.buttonHome : t.voting.buttonBack}
            </Button>

            <Button
              variant={currentStep === 3 ? 'accent' : 'hero'}
              size="xl"
              onClick={handleNext}
              className="touch-target"
            >
              {currentStep === 3 ? t.voting.buttonSubmit : t.voting.buttonContinue}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Vote;
