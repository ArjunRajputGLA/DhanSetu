export const detectLanguage = (text) => {
    const patterns = {
      chinese: /[\u4E00-\u9FFF]/,
      japanese: /[\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF]/,
      korean: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/,
      thai: /[\u0E00-\u0E7F]/,
      arabic: /[\u0600-\u06FF]/,
      hindi: /[\u0900-\u097F]/,
      russian: /[\u0400-\u04FF]/,
      greek: /[\u0370-\u03FF]/
    };
  
    for (const [language, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) return language;
    }
  
    const latinCharacters = text.match(/[a-zA-Z]/g)?.length || 0;
    const totalCharacters = text.length;
    
    if (latinCharacters / totalCharacters > 0.3) {
      if (/[áéíóúñ¿¡]/i.test(text)) return 'spanish';
      if (/[éèêëàâçîïôûùüÿæœ]/i.test(text)) return 'french';
      if (/[äöüß]/i.test(text)) return 'german';
      return 'english';
    }
  
    return 'english';
};