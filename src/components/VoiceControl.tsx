import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { toast } from 'sonner';

const VoiceControl: React.FC = () => {
    const { settings, toggleVoiceMode, speak } = useAccessibility();
    const navigate = useNavigate();
    const recognitionRef = useRef<any>(null);
    const [isListening, setIsListening] = useState(false);
    const restartTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Check browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported in this browser.");
            toast.error("Voice control is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            toast.success("Voice active. Listening...");
        };

        recognition.onend = () => {
            setIsListening(false);
            // Main restart logic is handled by the keep-alive interval in the other useEffect
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            if (event.error === 'not-allowed') {
                toast.error("Microphone denied. Check permissions.");
                if (settings.voiceMode) toggleVoiceMode();
            } else if (event.error === 'no-speech') {
                // Just silent, will restart
            } else if (event.error === 'aborted') {
                // connection aborted
            } else {
                // toast.error(`Voice error: ${event.error}`);
            }
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            console.log("Voice Command:", transcript);

            // Feedback to user
            toast.info(`Heard: "${transcript}"`, { duration: 2000 });

            handleCommand(transcript);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (restartTimerRef.current) {
                if (typeof restartTimerRef.current === 'number' || typeof restartTimerRef.current === 'object') {
                    clearTimeout(restartTimerRef.current as any);
                }
            }
        };
    }, []); // Only init once on mount

    // Watch for settings changes and manage start/stop/keep-alive
    useEffect(() => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        const startListening = () => {
            try {
                recognition.start();
            } catch (e) { /* ignore if already started */ }
        };

        if (settings.voiceMode) {
            startListening();

            // Keep-alive check every 2 seconds
            const interval = setInterval(() => {
                if (settings.voiceMode && !isListening) {
                    // If supposed to be on but is off, restart
                    startListening();
                }
            }, 2000);

            return () => clearInterval(interval);

        } else {
            if (isListening) recognition.stop();
        }
    }, [settings.voiceMode, isListening]);

    const handleCommand = (command: string) => {
        // Clean command
        const cleanCmd = command.replace(/[.,!?]/g, '');

        // Navigation
        if (cleanCmd.includes('home')) {
            speak("Navigating home");
            navigate('/');
        } else if (cleanCmd.includes('vote') || cleanCmd.includes('voting')) {
            speak("Navigating to vote");
            navigate('/vote');
        } else if (cleanCmd.includes('confirmation')) {
            speak("Navigating to confirmation");
            navigate('/confirmation');
        }

        // Scrolling
        else if (cleanCmd.includes('scroll down') || cleanCmd.includes('go down')) {
            window.scrollBy({ top: 500, behavior: 'smooth' });
        } else if (cleanCmd.includes('scroll up') || cleanCmd.includes('go up')) {
            window.scrollBy({ top: -500, behavior: 'smooth' });
        } else if (cleanCmd.includes('top')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (cleanCmd.includes('bottom')) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }

        // Control
        else if (cleanCmd.includes('stop voice') || cleanCmd.includes('turn off')) {
            speak("Turning off voice mode");
            toggleVoiceMode();
        }
        else if (cleanCmd.includes('reload')) {
            window.location.reload();
        }

        // Help
        else if (cleanCmd.includes('help')) {
            speak("Commands: Home, Vote, Scroll Down, Scroll Up, Stop Voice.");
        }
    };

    return null;
};

export default VoiceControl;
