import React from 'react';
import { Check } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Step {
  id: number;
  label: string;
}

interface VotingProgressProps {
  currentStep: number;
}

/**
 * Visual progress indicator for the voting flow
 */
const VotingProgress: React.FC<VotingProgressProps> = ({ currentStep }) => {
  const { speak, settings } = useAccessibility();
  const { t } = useLanguage();

  const steps: Step[] = [
    { id: 1, label: t.voting.stepSelect },
    { id: 2, label: t.voting.stepReview },
    { id: 3, label: t.voting.stepConfirm },
  ];

  React.useEffect(() => {
    if (settings.voiceMode) {
      const step = steps.find(s => s.id === currentStep);
      if (step) {
        speak(`Step ${currentStep} of ${steps.length}: ${step.label}`);
      }
    }
  }, [currentStep, settings.voiceMode]);

  return (
    <nav 
      className="w-full mb-12"
      aria-label="Voting progress"
    >
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isPending = step.id > currentStep;

          return (
            <li 
              key={step.id}
              className="flex items-center"
            >
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    step-indicator
                    ${isCompleted ? 'completed' : ''}
                    ${isActive ? 'active' : ''}
                    ${isPending ? 'pending' : ''}
                  `}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <span 
                  className={`
                    mt-2 text-xs sm:text-sm font-medium text-center
                    ${isActive ? 'text-primary' : 'text-muted-foreground'}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={`
                    w-8 sm:w-16 h-1 mx-2 rounded-full
                    ${isCompleted ? 'bg-[hsl(var(--success))]' : 'bg-muted'}
                  `}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default VotingProgress;
