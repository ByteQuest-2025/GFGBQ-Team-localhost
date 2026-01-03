import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AccessibilitySettings {
  fontSize: number; // 1 = normal, 1.25 = large, 1.5 = extra large
  highContrast: boolean;
  reduceMotion: boolean;
  voiceMode: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
  toggleReduceMotion: () => void;
  toggleVoiceMode: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 1,
  highContrast: false,
  reduceMotion: false,
  voiceMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('a11y-settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('a11y-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font scale
    root.style.setProperty('--font-scale', String(settings.fontSize));
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduce motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [settings]);

  // Check for system preferences on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      setSettings(prev => ({ ...prev, reduceMotion: true }));
    }
  }, []);

  const increaseFontSize = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 0.25, 2),
    }));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 0.25, 0.75),
    }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setSettings(prev => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  }, []);

  const toggleVoiceMode = useCallback(() => {
    setSettings(prev => {
      const newVoiceMode = !prev.voiceMode;
      if (!newVoiceMode) {
        // Stop any ongoing speech when turning off
        window.speechSynthesis?.cancel();
      }
      return { ...prev, voiceMode: newVoiceMode };
    });
  }, []);

  const speak = useCallback((text: string) => {
    if (settings.voiceMode && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }, [settings.voiceMode]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        increaseFontSize,
        decreaseFontSize,
        toggleHighContrast,
        toggleReduceMotion,
        toggleVoiceMode,
        speak,
        stopSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
