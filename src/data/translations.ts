/**
 * Multi-language translations for the inclusive voting system
 * Supports: English, Hindi, Spanish, French
 */

export type Language = 'en' | 'hi' | 'es' | 'fr';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export interface Translations {
  // Navigation
  nav: {
    home: string;
    vote: string;
    confirmation: string;
  };
  // Accessibility Panel
  accessibility: {
    title: string;
    fontSize: string;
    highContrast: string;
    reduceMotion: string;
    voiceMode: string;
    language: string;
    settingsSaved: string;
    on: string;
    off: string;
  };
  // Hero Section
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    startVoting: string;
    learnMore: string;
    inclusiveDesign: string;
    fullySecure: string;
    easyToUse: string;
  };
  // Features Section
  features: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    universalAccessibility: string;
    universalAccessibilityDesc: string;
    highContrastMode: string;
    highContrastModeDesc: string;
    voiceAssistance: string;
    voiceAssistanceDesc: string;
    keyboardNavigation: string;
    keyboardNavigationDesc: string;
    adjustableTextSize: string;
    adjustableTextSizeDesc: string;
    largeTouchTargets: string;
    largeTouchTargetsDesc: string;
    responsiveDesign: string;
    responsiveDesignDesc: string;
    privacyFirst: string;
    privacyFirstDesc: string;
  };
  // Voting Flow
  voting: {
    stepSelect: string;
    stepReview: string;
    stepConfirm: string;
    selectTitle: string;
    selectFor: string;
    selectError: string;
    reviewTitle: string;
    reviewSubtitle: string;
    reviewVoteFor: string;
    reviewPrivacy: string;
    confirmTitle: string;
    confirmSubtitle: string;
    confirmVotingFor: string;
    confirmWarning: string;
    confirmFinal: string;
    buttonHome: string;
    buttonBack: string;
    buttonContinue: string;
    buttonSubmit: string;
    pressEnterToSelect: string;
  };
  // Confirmation Page
  confirm: {
    title: string;
    subtitle: string;
    voteFor: string;
    reference: string;
    privateTitle: string;
    privateDesc: string;
    secureTitle: string;
    secureDesc: string;
    returnHome: string;
  };
  // Footer
  footer: {
    copyright: string;
    demo: string;
  };
  // Position
  position: {
    stateRepresentative: string;
    stateRepresentativeDesc: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      vote: 'Vote',
      confirmation: 'Confirmation',
    },
    accessibility: {
      title: 'Accessibility',
      fontSize: 'Font Size',
      highContrast: 'High Contrast',
      reduceMotion: 'Reduce Motion',
      voiceMode: 'Voice Mode',
      language: 'Language',
      settingsSaved: 'Settings are saved automatically',
      on: 'ON',
      off: 'OFF',
    },
    hero: {
      badge: 'Secure & Accessible Voting',
      title: 'Every Voice',
      titleHighlight: 'Matters',
      subtitle: 'An inclusive voting system designed for everyone. We believe in equal electoral participation, regardless of ability.',
      startVoting: 'Start Voting',
      learnMore: 'Learn More',
      inclusiveDesign: 'Inclusive Design',
      fullySecure: 'Fully Secure',
      easyToUse: 'Easy to Use',
    },
    features: {
      title: 'Designed for',
      titleHighlight: 'Everyone',
      subtitle: 'Our platform is built with accessibility at its core, ensuring that every citizen can exercise their right to vote.',
      universalAccessibility: 'Universal Accessibility',
      universalAccessibilityDesc: 'Built from the ground up to be accessible to users with all types of abilities.',
      highContrastMode: 'High Contrast Mode',
      highContrastModeDesc: 'Enhanced visibility with high contrast colors for users with visual impairments.',
      voiceAssistance: 'Voice Assistance',
      voiceAssistanceDesc: 'Full voice guidance support to navigate and complete the voting process.',
      keyboardNavigation: 'Keyboard Navigation',
      keyboardNavigationDesc: 'Complete keyboard-only navigation for users who cannot use a mouse.',
      adjustableTextSize: 'Adjustable Text Size',
      adjustableTextSizeDesc: 'Scalable typography to accommodate different visual needs.',
      largeTouchTargets: 'Large Touch Targets',
      largeTouchTargetsDesc: 'Oversized buttons and controls for easier interaction.',
      responsiveDesign: 'Responsive Design',
      responsiveDesignDesc: 'Works seamlessly on all devices from mobile phones to desktop computers.',
      privacyFirst: 'Privacy First',
      privacyFirstDesc: 'Your vote remains completely private and secure throughout the process.',
    },
    voting: {
      stepSelect: 'Select',
      stepReview: 'Review',
      stepConfirm: 'Confirm',
      selectTitle: 'Select Your Candidate',
      selectFor: 'For:',
      selectError: 'Please select a candidate to continue',
      reviewTitle: 'Review Your Selection',
      reviewSubtitle: 'Please confirm your vote is correct before submitting',
      reviewVoteFor: 'Your vote for',
      reviewPrivacy: 'Your vote is private and secure. Only you can see this selection.',
      confirmTitle: 'Confirm Your Vote',
      confirmSubtitle: 'This is your final confirmation. Press submit to cast your vote.',
      confirmVotingFor: 'You are voting for',
      confirmWarning: 'By pressing submit, you confirm that this is your final choice.',
      confirmFinal: 'This action cannot be undone.',
      buttonHome: 'Home',
      buttonBack: 'Back',
      buttonContinue: 'Continue',
      buttonSubmit: 'Submit Vote',
      pressEnterToSelect: 'Press enter to select.',
    },
    confirm: {
      title: 'Vote Successfully Recorded!',
      subtitle: 'Thank you for participating in the democratic process.',
      voteFor: 'Your vote for',
      reference: 'Confirmation Reference',
      privateTitle: 'Completely Private',
      privateDesc: 'Your vote choice is not linked to your identity',
      secureTitle: 'Securely Stored',
      secureDesc: 'End-to-end encryption protects your vote',
      returnHome: 'Return Home',
    },
    footer: {
      copyright: '© 2024 IncluVote. Committed to accessible democracy for all.',
      demo: 'This is a demonstration of an accessible voting interface.',
    },
    position: {
      stateRepresentative: 'State Representative',
      stateRepresentativeDesc: 'Represents your district in the State Legislature.',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      vote: 'वोट',
      confirmation: 'पुष्टि',
    },
    accessibility: {
      title: 'सुलभता',
      fontSize: 'फ़ॉन्ट आकार',
      highContrast: 'उच्च कंट्रास्ट',
      reduceMotion: 'गति कम करें',
      voiceMode: 'वॉइस मोड',
      language: 'भाषा',
      settingsSaved: 'सेटिंग्स स्वचालित रूप से सहेजी जाती हैं',
      on: 'चालू',
      off: 'बंद',
    },
    hero: {
      badge: 'सुरक्षित और सुलभ मतदान',
      title: 'हर आवाज़',
      titleHighlight: 'मायने रखती है',
      subtitle: 'सभी के लिए डिज़ाइन किया गया एक समावेशी मतदान प्रणाली। हम क्षमता की परवाह किए बिना समान चुनावी भागीदारी में विश्वास करते हैं।',
      startVoting: 'मतदान शुरू करें',
      learnMore: 'और जानें',
      inclusiveDesign: 'समावेशी डिज़ाइन',
      fullySecure: 'पूर्ण सुरक्षित',
      easyToUse: 'उपयोग में आसान',
    },
    features: {
      title: 'के लिए डिज़ाइन किया गया',
      titleHighlight: 'सभी',
      subtitle: 'हमारा प्लेटफॉर्म सुलभता को ध्यान में रखकर बनाया गया है, यह सुनिश्चित करते हुए कि हर नागरिक अपने मतदान के अधिकार का प्रयोग कर सके।',
      universalAccessibility: 'सार्वभौमिक सुलभता',
      universalAccessibilityDesc: 'सभी प्रकार की क्षमताओं वाले उपयोगकर्ताओं के लिए शुरू से बनाया गया।',
      highContrastMode: 'उच्च कंट्रास्ट मोड',
      highContrastModeDesc: 'दृष्टि दोष वाले उपयोगकर्ताओं के लिए उच्च कंट्रास्ट रंगों के साथ बेहतर दृश्यता।',
      voiceAssistance: 'वॉइस सहायता',
      voiceAssistanceDesc: 'मतदान प्रक्रिया को नेविगेट और पूरा करने के लिए पूर्ण वॉइस मार्गदर्शन।',
      keyboardNavigation: 'कीबोर्ड नेविगेशन',
      keyboardNavigationDesc: 'उन उपयोगकर्ताओं के लिए पूर्ण कीबोर्ड-ओनली नेविगेशन जो माउस का उपयोग नहीं कर सकते।',
      adjustableTextSize: 'समायोज्य टेक्स्ट आकार',
      adjustableTextSizeDesc: 'विभिन्न दृश्य आवश्यकताओं को समायोजित करने के लिए स्केलेबल टाइपोग्राफी।',
      largeTouchTargets: 'बड़े टच टारगेट',
      largeTouchTargetsDesc: 'आसान इंटरैक्शन के लिए बड़े बटन और नियंत्रण।',
      responsiveDesign: 'रेस्पॉन्सिव डिज़ाइन',
      responsiveDesignDesc: 'मोबाइल फोन से लेकर डेस्कटॉप कंप्यूटर तक सभी उपकरणों पर सहजता से काम करता है।',
      privacyFirst: 'गोपनीयता पहले',
      privacyFirstDesc: 'आपका वोट पूरी प्रक्रिया के दौरान पूरी तरह से निजी और सुरक्षित रहता है।',
    },
    voting: {
      stepSelect: 'चुनें',
      stepReview: 'समीक्षा',
      stepConfirm: 'पुष्टि',
      selectTitle: 'अपना उम्मीदवार चुनें',
      selectFor: 'के लिए:',
      selectError: 'जारी रखने के लिए कृपया एक उम्मीदवार चुनें',
      reviewTitle: 'अपने चयन की समीक्षा करें',
      reviewSubtitle: 'जमा करने से पहले कृपया पुष्टि करें कि आपका वोट सही है',
      reviewVoteFor: 'के लिए आपका वोट',
      reviewPrivacy: 'आपका वोट निजी और सुरक्षित है। केवल आप इस चयन को देख सकते हैं।',
      confirmTitle: 'अपने वोट की पुष्टि करें',
      confirmSubtitle: 'यह आपकी अंतिम पुष्टि है। अपना वोट डालने के लिए सबमिट दबाएं।',
      confirmVotingFor: 'आप वोट कर रहे हैं',
      confirmWarning: 'सबमिट दबाकर, आप पुष्टि करते हैं कि यह आपकी अंतिम पसंद है।',
      confirmFinal: 'यह कार्रवाई पूर्ववत नहीं की जा सकती।',
      buttonHome: 'होम',
      buttonBack: 'वापस',
      buttonContinue: 'जारी रखें',
      buttonSubmit: 'वोट सबमिट करें',
      pressEnterToSelect: 'चुनने के लिए एंटर दबाएं।',
    },
    confirm: {
      title: 'वोट सफलतापूर्वक दर्ज!',
      subtitle: 'लोकतांत्रिक प्रक्रिया में भाग लेने के लिए धन्यवाद।',
      voteFor: 'के लिए आपका वोट',
      reference: 'पुष्टि संदर्भ',
      privateTitle: 'पूरी तरह निजी',
      privateDesc: 'आपकी वोट पसंद आपकी पहचान से जुड़ी नहीं है',
      secureTitle: 'सुरक्षित रूप से संग्रहीत',
      secureDesc: 'एंड-टू-एंड एन्क्रिप्शन आपके वोट की रक्षा करता है',
      returnHome: 'होम पर लौटें',
    },
    footer: {
      copyright: '© 2024 इन्क्लूवोट। सभी के लिए सुलभ लोकतंत्र के लिए प्रतिबद्ध।',
      demo: 'यह एक सुलभ मतदान इंटरफेस का प्रदर्शन है।',
    },
    position: {
      stateRepresentative: 'राज्य प्रतिनिधि',
      stateRepresentativeDesc: 'राज्य विधानमंडल में आपके जिले का प्रतिनिधित्व करता है।',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      vote: 'Votar',
      confirmation: 'Confirmación',
    },
    accessibility: {
      title: 'Accesibilidad',
      fontSize: 'Tamaño de Fuente',
      highContrast: 'Alto Contraste',
      reduceMotion: 'Reducir Movimiento',
      voiceMode: 'Modo Voz',
      language: 'Idioma',
      settingsSaved: 'Los ajustes se guardan automáticamente',
      on: 'SÍ',
      off: 'NO',
    },
    hero: {
      badge: 'Votación Segura y Accesible',
      title: 'Cada Voz',
      titleHighlight: 'Importa',
      subtitle: 'Un sistema de votación inclusivo diseñado para todos. Creemos en la participación electoral igualitaria, sin importar la capacidad.',
      startVoting: 'Comenzar a Votar',
      learnMore: 'Más Información',
      inclusiveDesign: 'Diseño Inclusivo',
      fullySecure: 'Totalmente Seguro',
      easyToUse: 'Fácil de Usar',
    },
    features: {
      title: 'Diseñado para',
      titleHighlight: 'Todos',
      subtitle: 'Nuestra plataforma está construida con la accesibilidad como núcleo, asegurando que cada ciudadano pueda ejercer su derecho al voto.',
      universalAccessibility: 'Accesibilidad Universal',
      universalAccessibilityDesc: 'Construido desde cero para ser accesible a usuarios con todo tipo de capacidades.',
      highContrastMode: 'Modo Alto Contraste',
      highContrastModeDesc: 'Visibilidad mejorada con colores de alto contraste para usuarios con discapacidad visual.',
      voiceAssistance: 'Asistencia de Voz',
      voiceAssistanceDesc: 'Soporte completo de guía por voz para navegar y completar el proceso de votación.',
      keyboardNavigation: 'Navegación por Teclado',
      keyboardNavigationDesc: 'Navegación completa solo con teclado para usuarios que no pueden usar un ratón.',
      adjustableTextSize: 'Tamaño de Texto Ajustable',
      adjustableTextSizeDesc: 'Tipografía escalable para acomodar diferentes necesidades visuales.',
      largeTouchTargets: 'Áreas Táctiles Grandes',
      largeTouchTargetsDesc: 'Botones y controles de gran tamaño para una interacción más fácil.',
      responsiveDesign: 'Diseño Responsivo',
      responsiveDesignDesc: 'Funciona perfectamente en todos los dispositivos, desde teléfonos móviles hasta computadoras de escritorio.',
      privacyFirst: 'Privacidad Primero',
      privacyFirstDesc: 'Tu voto permanece completamente privado y seguro durante todo el proceso.',
    },
    voting: {
      stepSelect: 'Seleccionar',
      stepReview: 'Revisar',
      stepConfirm: 'Confirmar',
      selectTitle: 'Selecciona Tu Candidato',
      selectFor: 'Para:',
      selectError: 'Por favor selecciona un candidato para continuar',
      reviewTitle: 'Revisa Tu Selección',
      reviewSubtitle: 'Por favor confirma que tu voto es correcto antes de enviar',
      reviewVoteFor: 'Tu voto para',
      reviewPrivacy: 'Tu voto es privado y seguro. Solo tú puedes ver esta selección.',
      confirmTitle: 'Confirma Tu Voto',
      confirmSubtitle: 'Esta es tu confirmación final. Presiona enviar para emitir tu voto.',
      confirmVotingFor: 'Estás votando por',
      confirmWarning: 'Al presionar enviar, confirmas que esta es tu elección final.',
      confirmFinal: 'Esta acción no se puede deshacer.',
      buttonHome: 'Inicio',
      buttonBack: 'Atrás',
      buttonContinue: 'Continuar',
      buttonSubmit: 'Enviar Voto',
      pressEnterToSelect: 'Presiona enter para seleccionar.',
    },
    confirm: {
      title: '¡Voto Registrado Exitosamente!',
      subtitle: 'Gracias por participar en el proceso democrático.',
      voteFor: 'Tu voto para',
      reference: 'Referencia de Confirmación',
      privateTitle: 'Completamente Privado',
      privateDesc: 'Tu elección de voto no está vinculada a tu identidad',
      secureTitle: 'Almacenado de Forma Segura',
      secureDesc: 'El cifrado de extremo a extremo protege tu voto',
      returnHome: 'Volver al Inicio',
    },
    footer: {
      copyright: '© 2024 IncluVote. Comprometidos con la democracia accesible para todos.',
      demo: 'Esta es una demostración de una interfaz de votación accesible.',
    },
    position: {
      stateRepresentative: 'Representante Estatal',
      stateRepresentativeDesc: 'Representa a tu distrito en la Legislatura Estatal.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      vote: 'Voter',
      confirmation: 'Confirmation',
    },
    accessibility: {
      title: 'Accessibilité',
      fontSize: 'Taille Police',
      highContrast: 'Contraste Élevé',
      reduceMotion: 'Réduire Animation',
      voiceMode: 'Mode Vocal',
      language: 'Langue',
      settingsSaved: 'Les paramètres sont enregistrés automatiquement',
      on: 'OUI',
      off: 'NON',
    },
    hero: {
      badge: 'Vote Sécurisé et Accessible',
      title: 'Chaque Voix',
      titleHighlight: 'Compte',
      subtitle: 'Un système de vote inclusif conçu pour tous. Nous croyons en une participation électorale égale, quelle que soit la capacité.',
      startVoting: 'Commencer à Voter',
      learnMore: 'En Savoir Plus',
      inclusiveDesign: 'Design Inclusif',
      fullySecure: 'Entièrement Sécurisé',
      easyToUse: 'Facile à Utiliser',
    },
    features: {
      title: 'Conçu pour',
      titleHighlight: 'Tous',
      subtitle: 'Notre plateforme est construite avec l\'accessibilité au cœur, garantissant que chaque citoyen peut exercer son droit de vote.',
      universalAccessibility: 'Accessibilité Universelle',
      universalAccessibilityDesc: 'Construit dès le départ pour être accessible aux utilisateurs de toutes capacités.',
      highContrastMode: 'Mode Contraste Élevé',
      highContrastModeDesc: 'Visibilité améliorée avec des couleurs à contraste élevé pour les utilisateurs malvoyants.',
      voiceAssistance: 'Assistance Vocale',
      voiceAssistanceDesc: 'Support complet de guidage vocal pour naviguer et compléter le processus de vote.',
      keyboardNavigation: 'Navigation Clavier',
      keyboardNavigationDesc: 'Navigation complète au clavier pour les utilisateurs ne pouvant pas utiliser de souris.',
      adjustableTextSize: 'Taille Texte Ajustable',
      adjustableTextSizeDesc: 'Typographie évolutive pour s\'adapter aux différents besoins visuels.',
      largeTouchTargets: 'Grandes Zones Tactiles',
      largeTouchTargetsDesc: 'Boutons et contrôles surdimensionnés pour une interaction plus facile.',
      responsiveDesign: 'Design Responsive',
      responsiveDesignDesc: 'Fonctionne parfaitement sur tous les appareils, des téléphones mobiles aux ordinateurs de bureau.',
      privacyFirst: 'Confidentialité d\'Abord',
      privacyFirstDesc: 'Votre vote reste entièrement privé et sécurisé tout au long du processus.',
    },
    voting: {
      stepSelect: 'Sélectionner',
      stepReview: 'Réviser',
      stepConfirm: 'Confirmer',
      selectTitle: 'Sélectionnez Votre Candidat',
      selectFor: 'Pour:',
      selectError: 'Veuillez sélectionner un candidat pour continuer',
      reviewTitle: 'Révisez Votre Sélection',
      reviewSubtitle: 'Veuillez confirmer que votre vote est correct avant de soumettre',
      reviewVoteFor: 'Votre vote pour',
      reviewPrivacy: 'Votre vote est privé et sécurisé. Seul vous pouvez voir cette sélection.',
      confirmTitle: 'Confirmez Votre Vote',
      confirmSubtitle: 'Ceci est votre confirmation finale. Appuyez sur soumettre pour voter.',
      confirmVotingFor: 'Vous votez pour',
      confirmWarning: 'En appuyant sur soumettre, vous confirmez que c\'est votre choix final.',
      confirmFinal: 'Cette action ne peut pas être annulée.',
      buttonHome: 'Accueil',
      buttonBack: 'Retour',
      buttonContinue: 'Continuer',
      buttonSubmit: 'Soumettre le Vote',
      pressEnterToSelect: 'Appuyez sur entrée pour sélectionner.',
    },
    confirm: {
      title: 'Vote Enregistré avec Succès!',
      subtitle: 'Merci de participer au processus démocratique.',
      voteFor: 'Votre vote pour',
      reference: 'Référence de Confirmation',
      privateTitle: 'Entièrement Privé',
      privateDesc: 'Votre choix de vote n\'est pas lié à votre identité',
      secureTitle: 'Stocké en Sécurité',
      secureDesc: 'Le chiffrement de bout en bout protège votre vote',
      returnHome: 'Retour à l\'Accueil',
    },
    footer: {
      copyright: '© 2024 IncluVote. Engagés pour une démocratie accessible pour tous.',
      demo: 'Ceci est une démonstration d\'une interface de vote accessible.',
    },
    position: {
      stateRepresentative: 'Représentant de l\'État',
      stateRepresentativeDesc: 'Représente votre district à la Législature de l\'État.',
    },
  },
};
