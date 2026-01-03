import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Landing page with hero section and features overview
 */
const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>IncluVote - {t.hero.badge}</title>
        <meta 
          name="description" 
          content={t.hero.subtitle} 
        />
      </Helmet>

      {/* Skip to main content link for screen readers */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <FeaturesSection />

        {/* Footer */}
        <footer className="py-12 bg-card border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-sm">
              {t.footer.copyright}
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              {t.footer.demo}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
