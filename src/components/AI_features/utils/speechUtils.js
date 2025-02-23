export const languageToVoiceMap = {
    english: 'en-US',
    spanish: 'es-ES',
    french: 'fr-FR',
    german: 'de-DE',
    chinese: 'zh-CN',
    japanese: 'ja-JP',
    korean: 'ko-KR',
    russian: 'ru-RU',
    arabic: 'ar-SA',
    hindi: 'hi-IN',
    thai: 'th-TH',
    greek: 'el-GR',
  };
  
  export const getBestVoiceForLanguage = (availableVoices, language) => {
    const bcp47Tag = languageToVoiceMap[language] || 'en-US';
    
    let voice = availableVoices.find(v => 
      v.lang.startsWith(bcp47Tag) && v.localService
    );
    
    if (!voice) {
      voice = availableVoices.find(v => 
        v.lang.startsWith(bcp47Tag)
      );
    }
    
    if (!voice) {
      voice = availableVoices.find(v => 
        v.lang.startsWith('en')
      );
    }
    
    return voice || null;
};