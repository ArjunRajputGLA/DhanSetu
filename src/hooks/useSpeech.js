import { useRef, useEffect, useState } from 'react';
import { detectLanguage } from '../components/AI_features/utils/languageUtils';
import { getBestVoiceForLanguage } from '../components/AI_features/utils/speechUtils';

export const useSpeech = () => {
  const [availableVoices, setAvailableVoices] = useState([]);
  const currentUtteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const stopSpeaking = () => {
    if (currentUtteranceRef.current) {
      window.speechSynthesis.cancel();
      currentUtteranceRef.current = null;
    }
  };

  const speakMessage = (text) => {
    stopSpeaking();

    const detectedLanguage = detectLanguage(text);
    const voice = getBestVoiceForLanguage(availableVoices, detectedLanguage);

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    switch (detectedLanguage) {
      case 'chinese':
      case 'japanese':
      case 'korean':
        utterance.rate = 0.9;
        break;
      case 'arabic':
      case 'hindi':
        utterance.pitch = 1.1;
        break;
      default:
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
    }

    currentUtteranceRef.current = utterance;

    utterance.onend = () => {
      currentUtteranceRef.current = null;
    };

    window.speechSynthesis.speak(utterance);
  };

  return { speakMessage, stopSpeaking };
};