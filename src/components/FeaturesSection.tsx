import React from 'react';
import { 
  Accessibility, 
  Eye, 
  Volume2, 
  Keyboard, 
  Smartphone, 
  Shield,
  MousePointer2,
  Type
} from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
  const { speak, settings } = useAccessibility();

  const handleFocus = () => {
    if (settings.voiceMode) {
      speak(`${title}. ${description}`);
    }
  };

  return (
    <div
      className="card-elevated p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
      onFocus={handleFocus}
      tabIndex={0}
      role="article"
      aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
      </div>
      <h3 
        id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="font-heading font-semibold text-lg text-foreground mb-2"
      >
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Accessibility,
      title: t.features.universalAccessibility,
      description: t.features.universalAccessibilityDesc,
    },
    {
      icon: Eye,
      title: t.features.highContrastMode,
      description: t.features.highContrastModeDesc,
    },
    {
      icon: Volume2,
      title: t.features.voiceAssistance,
      description: t.features.voiceAssistanceDesc,
    },
    {
      icon: Keyboard,
      title: t.features.keyboardNavigation,
      description: t.features.keyboardNavigationDesc,
    },
    {
      icon: Type,
      title: t.features.adjustableTextSize,
      description: t.features.adjustableTextSizeDesc,
    },
    {
      icon: MousePointer2,
      title: t.features.largeTouchTargets,
      description: t.features.largeTouchTargetsDesc,
    },
    {
      icon: Smartphone,
      title: t.features.responsiveDesign,
      description: t.features.responsiveDesignDesc,
    },
    {
      icon: Shield,
      title: t.features.privacyFirst,
      description: t.features.privacyFirstDesc,
    },
  ];

  return (
    <section 
      className="py-24 bg-background"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 
            id="features-heading"
            className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4"
          >
            {t.features.title}{' '}
            <span className="gradient-text">{t.features.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={100 + index * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
