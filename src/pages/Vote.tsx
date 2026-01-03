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

  // Voice Control Integration
  React.useEffect(() => {
    const handleVoiceVote = (e: CustomEvent) => {
      if (!settings.voiceMode) return;

      const spokenName = e.detail.name.toLowerCase();
      console.log("Voice Vote Attempt:", spokenName);

      // Helper to convert words to numbers
      const wordToNum: { [key: string]: number } = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6,
        'first': 1, 'second': 2, 'third': 3, 'fourth': 4, 'fifth': 5, 'sixth': 6
      };

      let index = -1;

      // 1. Try to match exact number digit ("1")
      if (spokenName.match(/^\d+$/)) {
        index = parseInt(spokenName) - 1;
      }
      // 2. Try to match number word ("one")
      else if (wordToNum[spokenName]) {
        index = wordToNum[spokenName] - 1;
      }
      // 3. Try to match "option/candidate X" pattern
      else {
        const numberMatch = spokenName.match(/(?:candidate|number|option)\s+(\d+|one|two|three|four|five|six)/);
        if (numberMatch) {
          const numStr = numberMatch[1];
          index = (parseInt(numStr) || wordToNum[numStr]) - 1;
        }
      }

      if (index >= 0 && candidates[index]) {
        handleSelectCandidate(candidates[index].id);
        speak(`Selected ${candidates[index].name}`);
        return;
      }

      // 4. Try to match by name (Fuzzy)
      const match = candidates.find(c => {
        const cName = c.name.toLowerCase();
        const cParts = cName.split(' ');
        if (cName.includes(spokenName) || spokenName.includes(cName)) return true;
        if (cParts.some(part => spokenName.length > 2 && spokenName.includes(part))) return true; // Only match parts if query is long enough
        if (c.party.toLowerCase().includes(spokenName)) return true;
        return false;
      });

      if (match) {
        handleSelectCandidate(match.id);
        speak(`Selected ${match.name}`);
      } else {
        console.warn("No match found for:", spokenName);
        speak(`I heard ${spokenName}, but couldn't find a matching candidate.`);
      }
    };

    const handleVoiceAction = (e: CustomEvent) => {
      if (!settings.voiceMode) return;

      const action = e.detail.action;
      if (action === 'next') handleNext();
      else if (action === 'back') handleBack();
      else if (action === 'submit' && currentStep === 3) handleNext(); // Submit is same as next on last step
    };

    window.addEventListener('voice-vote' as any, handleVoiceVote as EventListener);
    window.addEventListener('voice-action' as any, handleVoiceAction as EventListener);

    return () => {
      window.removeEventListener('voice-vote' as any, handleVoiceVote as EventListener);
      window.removeEventListener('voice-action' as any, handleVoiceAction as EventListener);
    };
  }, [settings.voiceMode, currentStep, selectedCandidate]); // Re-bind when dependencies change to ensure closure has fresh state

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
                {candidates.map((candidate, index) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    isSelected={selectedCandidate === candidate.id}
                    onSelect={handleSelectCandidate}
                    index={index}
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
