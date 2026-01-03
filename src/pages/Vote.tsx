import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VotingProgress from '@/components/VotingProgress';
import CandidateCard from '@/components/CandidateCard';
import CameraCapture from '@/components/CameraCapture';
import { Button } from '@/components/ui/button';
import { candidates } from '@/data/candidates';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'secret-voting-key';

const Vote: React.FC = () => {
  const navigate = useNavigate();
  const { speak, settings } = useAccessibility();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Authentication Check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to vote");
        navigate('/login');
      } else {
        setUser(session.user);
      }
    };
    checkAuth();
  }, [navigate]);

  const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setHasError(false);
  };

  // Voice Control Logic
  useEffect(() => {
    const handleVoiceVote = (e: CustomEvent) => {
      if (!settings.voiceMode) return;

      const spokenName = e.detail.name.toLowerCase();
      console.log("Voice Vote Attempt:", spokenName);

      const wordToNum: { [key: string]: number } = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6,
        'first': 1, 'second': 2, 'third': 3, 'fourth': 4, 'fifth': 5, 'sixth': 6
      };

      let index = -1;
      if (spokenName.match(/^\d+$/)) {
        index = parseInt(spokenName) - 1;
      } else if (wordToNum[spokenName]) {
        index = wordToNum[spokenName] - 1;
      } else {
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

      const match = candidates.find(c => {
        const cName = c.name.toLowerCase();
        const cParts = cName.split(' ');
        if (cName.includes(spokenName) || spokenName.includes(cName)) return true;
        if (cParts.some(part => spokenName.length > 2 && spokenName.includes(part))) return true;
        if (c.party.toLowerCase().includes(spokenName)) return true;
        return false;
      });

      if (match) {
        handleSelectCandidate(match.id);
        speak(`Selected ${match.name}`);
      } else {
        speak(`I heard ${spokenName}, but couldn't find a matching candidate.`);
      }
    };

    const handleVoiceAction = (e: CustomEvent) => {
      if (!settings.voiceMode) return;
      const action = e.detail.action;
      if (action === 'next') handleNext();
      else if (action === 'back') handleBack();
      else if (action === 'submit') handleSubmit();
    };

    window.addEventListener('voice-vote' as any, handleVoiceVote as EventListener);
    window.addEventListener('voice-action' as any, handleVoiceAction as EventListener);

    return () => {
      window.removeEventListener('voice-vote' as any, handleVoiceVote as EventListener);
      window.removeEventListener('voice-action' as any, handleVoiceAction as EventListener);
    };
  }, [settings.voiceMode, currentStep, selectedCandidate, t]);

  const handleNext = () => {
    if (currentStep === 1 && !selectedCandidate) {
      setHasError(true);
      speak(t.voting.selectError);
      return;
    }
    if (currentStep === 4 && !photo) {
      toast.error("Please capture a photo verification");
      speak("Please capture your photo to verify identity");
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      if (settings.voiceMode) {
        if (currentStep === 1) speak(t.voting.reviewSubtitle);
        if (currentStep === 3) speak("Verification required. Please take a photo.");
      }
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleCapture = (imageSrc: string) => {
    setPhoto(imageSrc);
    if (settings.voiceMode) speak("Photo captured successfully.");
  };

  const handleSubmit = async () => {
    if (!selectedCandidate || !user || !photo) {
      toast.error("Cannot submit: Missing information.");
      return;
    }
    setIsSubmitting(true);

    try {
      const photoFileName = `${user.id}/${Date.now()}.jpg`;
      console.log("Uploading photo:", photoFileName);

      const res = await fetch(photo);
      const blob = await res.blob();
      console.log("Photo blob size:", blob.size);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('voter-photos')
        .upload(photoFileName, blob, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        if (uploadError.message.includes('bucket') || uploadError.message.includes('not found')) {
          toast.error("Storage bucket not found. Please run the SQL setup script in Supabase.");
        }
        throw uploadError;
      }
      console.log("Upload successful:", uploadData);

      const voteData = {
        candidate_id: selectedCandidate,
        candidate_name: selectedCandidateData?.name,
        timestamp: new Date().toISOString(),
      };
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(voteData), ENCRYPTION_KEY).toString();

      const { error: dbError } = await supabase
        .from('votes')
        .insert({
          user_id: user.id,
          candidate_id: selectedCandidate,
          encrypted_vote_data: encryptedData,
          photo_url: photoFileName
        });

      if (dbError) throw dbError;

      toast.success("Vote cast successfully!");
      speak("Vote submitted successfully. Thank you for voting.");
      navigate('/confirmation', { state: { candidate: selectedCandidateData } });

    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Failed to submit vote: " + error.message);
      speak("There was an error submitting your vote.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <>
      <Helmet>
        <title>{t.voting.selectTitle} - IncluVote</title>
      </Helmet>
      <Navbar />

      <main id="main-content" className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <VotingProgress currentStep={currentStep} totalSteps={4} />

          {/* Step 1: Selection */}
          {currentStep === 1 && (
            <section className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">{t.voting.selectTitle}</h1>
                <p className="text-muted-foreground text-lg">
                  {t.voting.selectFor} <span className="text-primary font-medium">{t.position.stateRepresentative}</span>
                </p>
              </div>

              {hasError && (
                <div role="alert" className="flex items-center gap-3 p-4 mb-8 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive max-w-md mx-auto">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{t.voting.selectError}</span>
                </div>
              )}

              <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

          {/* Step 2: Review */}
          {currentStep === 2 && selectedCandidateData && (
            <section className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">{t.voting.reviewTitle}</h1>
              </div>
              <div className="max-w-lg mx-auto">
                <div className="card-elevated p-8 text-center">
                  <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-6" style={{ backgroundColor: `hsl(${selectedCandidateData.color} / 0.15)` }}>
                    {selectedCandidateData.symbol}
                  </div>
                  <h2 className="font-heading font-bold text-2xl mb-2">{selectedCandidateData.name}</h2>
                  <p className="font-medium mb-4" style={{ color: `hsl(${selectedCandidateData.color})` }}>{selectedCandidateData.party}</p>
                </div>
              </div>
            </section>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && selectedCandidateData && (
            <section className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-heading font-bold mb-3">{t.voting.confirmTitle}</h1>
                <p className="text-muted-foreground">Please confirm your selection below.</p>
              </div>
              <div className="max-w-lg mx-auto text-center">
                <h2 className="text-2xl font-bold">{selectedCandidateData.name}</h2>
              </div>
            </section>
          )}

          {/* Step 4: Verification */}
          {currentStep === 4 && (
            <section className="animate-fade-in">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-heading font-bold mb-3">Identity Verification</h1>
                <p className="text-muted-foreground">Please take a photo to verify your identity.</p>
              </div>
              <CameraCapture onCapture={handleCapture} />
            </section>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <Button variant="outline" size="xl" onClick={handleBack} disabled={isSubmitting}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              {currentStep === 1 ? t.voting.buttonHome : t.voting.buttonBack}
            </Button>

            <Button
              variant={currentStep === 4 ? 'accent' : 'hero'}
              size="xl"
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : (
                <>
                  {currentStep === 4 ? t.voting.buttonSubmit : t.voting.buttonContinue}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Vote;
