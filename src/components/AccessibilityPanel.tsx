import React, { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  Accessibility, 
  Plus, 
  Minus, 
  Contrast, 
  Pause, 
  Volume2, 
  VolumeX,
  ChevronUp,
  ChevronDown,
  Settings,
  Globe,
  Check
} from 'lucide-react';

/**
 * Floating accessibility control panel
 * Provides controls for font size, contrast, motion, voice, and language
 */
const AccessibilityPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const {
    settings,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleReduceMotion,
    toggleVoiceMode,
    speak,
  } = useAccessibility();

  const { language, setLanguage, t, languages } = useLanguage();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    setShowLanguageMenu(false);
    if (!isExpanded) {
      speak(t.accessibility.title + ' panel opened');
    }
  };

  const handleFontIncrease = () => {
    increaseFontSize();
    speak(t.accessibility.fontSize + ' increased');
  };

  const handleFontDecrease = () => {
    decreaseFontSize();
    speak(t.accessibility.fontSize + ' decreased');
  };

  const handleContrastToggle = () => {
    toggleHighContrast();
    speak(settings.highContrast ? t.accessibility.highContrast + ' disabled' : t.accessibility.highContrast + ' enabled');
  };

  const handleMotionToggle = () => {
    toggleReduceMotion();
    speak(settings.reduceMotion ? 'Animations enabled' : t.accessibility.reduceMotion + ' enabled');
  };

  const handleVoiceToggle = () => {
    toggleVoiceMode();
    if (!settings.voiceMode) {
      setTimeout(() => speak(t.accessibility.voiceMode + ' enabled'), 100);
    }
  };

  const handleLanguageSelect = (langCode: typeof language) => {
    setLanguage(langCode);
    setShowLanguageMenu(false);
    const selectedLang = languages.find(l => l.code === langCode);
    if (selectedLang) {
      speak(`Language changed to ${selectedLang.name}`);
    }
  };

  const currentLang = languages.find(l => l.code === language);

  return (
    <div 
      className="a11y-panel"
      role="region"
      aria-label={t.accessibility.title}
    >
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 w-full touch-target p-2 rounded-xl hover:bg-muted/50 transition-colors"
        aria-expanded={isExpanded}
        aria-controls="a11y-controls"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
          <Accessibility className="w-5 h-5" />
        </div>
        <span className="font-heading font-semibold text-foreground">
          {t.accessibility.title}
        </span>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-muted-foreground ml-auto" />
        ) : (
          <ChevronUp className="w-5 h-5 text-muted-foreground ml-auto" />
        )}
      </button>

      {/* Expanded controls */}
      {isExpanded && (
        <div 
          id="a11y-controls"
          className="mt-4 space-y-4 animate-fade-in"
        >
          {/* Language Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {t.accessibility.language}
            </label>
            <div className="relative">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="w-full touch-target justify-between"
                aria-expanded={showLanguageMenu}
                aria-haspopup="listbox"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{currentLang?.flag}</span>
                  <span>{currentLang?.nativeName}</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
              </Button>

              {/* Language dropdown */}
              {showLanguageMenu && (
                <div 
                  role="listbox"
                  aria-label={t.accessibility.language}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-10 animate-fade-in"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={language === lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                        hover:bg-muted/50 touch-target
                        ${language === lang.code ? 'bg-primary/10 text-primary' : 'text-foreground'}
                      `}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <div className="flex-1">
                        <p className="font-medium">{lang.nativeName}</p>
                        <p className="text-xs text-muted-foreground">{lang.name}</p>
                      </div>
                      {language === lang.code && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Font Size Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t.accessibility.fontSize} ({Math.round(settings.fontSize * 100)}%)
            </label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={handleFontDecrease}
                disabled={settings.fontSize <= 0.75}
                className="flex-1 touch-target"
                aria-label="Decrease font size"
              >
                <Minus className="w-5 h-5" />
                <span className="sr-only">Smaller</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleFontIncrease}
                disabled={settings.fontSize >= 2}
                className="flex-1 touch-target"
                aria-label="Increase font size"
              >
                <Plus className="w-5 h-5" />
                <span className="sr-only">Larger</span>
              </Button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <Button
            variant={settings.highContrast ? "default" : "outline"}
            size="lg"
            onClick={handleContrastToggle}
            className="w-full touch-target justify-start gap-3"
            aria-pressed={settings.highContrast}
          >
            <Contrast className="w-5 h-5" />
            <span>{t.accessibility.highContrast}</span>
            {settings.highContrast && (
              <span className="ml-auto text-xs bg-primary-foreground/20 px-2 py-1 rounded">
                {t.accessibility.on}
              </span>
            )}
          </Button>

          {/* Reduce Motion Toggle */}
          <Button
            variant={settings.reduceMotion ? "default" : "outline"}
            size="lg"
            onClick={handleMotionToggle}
            className="w-full touch-target justify-start gap-3"
            aria-pressed={settings.reduceMotion}
          >
            <Pause className="w-5 h-5" />
            <span>{t.accessibility.reduceMotion}</span>
            {settings.reduceMotion && (
              <span className="ml-auto text-xs bg-primary-foreground/20 px-2 py-1 rounded">
                {t.accessibility.on}
              </span>
            )}
          </Button>

          {/* Voice Mode Toggle */}
          <Button
            variant={settings.voiceMode ? "default" : "outline"}
            size="lg"
            onClick={handleVoiceToggle}
            className="w-full touch-target justify-start gap-3"
            aria-pressed={settings.voiceMode}
          >
            {settings.voiceMode ? (
              <Volume2 className="w-5 h-5 voice-indicator" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
            <span>{t.accessibility.voiceMode}</span>
            {settings.voiceMode && (
              <span className="ml-auto text-xs bg-primary-foreground/20 px-2 py-1 rounded">
                {t.accessibility.on}
              </span>
            )}
          </Button>

          {/* Info text */}
          <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
            {t.accessibility.settingsSaved}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccessibilityPanel;
