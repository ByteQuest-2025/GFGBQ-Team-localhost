import React from 'react';
import { Check } from 'lucide-react';
import { Candidate } from '@/data/candidates';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (candidateId: string) => void;
  index?: number;
}

/**
 * Accessible candidate selection card with symbol, name, and party
 */
const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected,
  onSelect,
  index
}) => {
  const { speak, settings } = useAccessibility();
  const { t } = useLanguage();

  const handleClick = () => {
    onSelect(candidate.id);
    if (settings.voiceMode) {
      speak(`Selected ${candidate.name} from ${candidate.party}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleFocus = () => {
    if (settings.voiceMode) {
      speak(`${candidate.name}, ${candidate.party}. ${candidate.description}. ${t.voting.pressEnterToSelect}`);
    }
  };

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      className={`
        candidate-card relative group
        ${isSelected ? 'selected' : ''}
      `}
      style={{
        '--candidate-color': candidate.color,
      } as React.CSSProperties}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-scale-in"
          aria-hidden="true"
        >
          <Check className="w-5 h-5 text-primary-foreground" />
        </div>
      )}

      {/* Voice Mode Badge */}
      {settings.voiceMode && typeof index === 'number' && (
        <div
          className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold animate-fade-in border border-white/20 shadow-lg z-10"
        >
          Say "Option {index + 1}"
        </div>
      )}

      {/* Symbol */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 transition-transform group-hover:scale-110"
        style={{
          backgroundColor: `hsl(${candidate.color} / 0.15)`,
          border: `2px solid hsl(${candidate.color} / 0.3)`,
        }}
        aria-hidden="true"
      >
        {candidate.symbol}
      </div>

      {/* Candidate Info */}
      <div className="text-center">
        <h3 className="font-heading font-bold text-xl text-foreground mb-1">
          {candidate.name}
        </h3>
        <p
          className="font-medium text-sm mb-3"
          style={{ color: `hsl(${candidate.color})` }}
        >
          {candidate.party}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {candidate.description}
        </p>
      </div>

      {/* Slogan */}
      <div
        className="mt-4 pt-4 border-t border-border text-center"
        aria-label={`Slogan: ${candidate.slogan}`}
      >
        <span className="text-xs text-muted-foreground italic">
          "{candidate.slogan}"
        </span>
      </div>

      {/* Hover/Focus indicator */}
      <div
        className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors pointer-events-none group-focus-visible:border-primary"
        aria-hidden="true"
      />
    </div>
  );
};

export default CandidateCard;
