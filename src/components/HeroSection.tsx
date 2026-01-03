import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Vote, Users, Shield } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Hero section with animated abstract shapes symbolizing inclusion
 */
const HeroSection: React.FC = () => {
  const { speak, settings } = useAccessibility();
  const { t } = useLanguage();

  const handleCTAFocus = () => {
    if (settings.voiceMode) {
      speak(t.hero.startVoting + ' button. Press enter to begin the voting process.');
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: 'var(--gradient-hero)' }}
      aria-labelledby="hero-heading"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Large floating circles representing unity */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/5 animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-primary/5 animate-float-slow" />
        
        {/* Connecting lines symbolizing inclusion */}
        <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          <circle cx="20%" cy="30%" r="100" fill="none" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse-ring" />
          <circle cx="80%" cy="40%" r="80" fill="none" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse-ring" style={{ animationDelay: '1s' }} />
          <circle cx="50%" cy="70%" r="120" fill="none" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse-ring" style={{ animationDelay: '2s' }} />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface mb-8 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {t.hero.badge}
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 text-balance animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            {t.hero.title}{' '}
            <span className="gradient-text">{t.hero.titleHighlight}</span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <Link to="/vote" onFocus={handleCTAFocus}>
              <Button 
                variant="hero" 
                size="xl"
                className="group touch-target"
              >
                <Vote className="w-5 h-5" />
                {t.hero.startVoting}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="xl"
              className="touch-target"
              onClick={() => speak(t.hero.learnMore)}
            >
              {t.hero.learnMore}
            </Button>
          </div>

          {/* Feature Pills */}
          <div 
            className="flex flex-wrap justify-center gap-3 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            {[
              { icon: Users, label: t.hero.inclusiveDesign },
              { icon: Shield, label: t.hero.fullySecure },
              { icon: Vote, label: t.hero.easyToUse },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground text-sm"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                {feature.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;
