import { useState, useEffect, useCallback } from 'react';
import { 
  MenuIcon, X, Home, BookOpen, Users, 
  MessageSquare, PieChart, Settings, Sun, 
  Moon, Bell, Search, User, Activity, DollarSign,
  RefreshCcw, Clock, AlertCircle,
  Trophy, Brain, ChevronLeft
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import './index.css';

const questionBank = {
  basicBanking: [
    {
      id: 1,
      question: "What is a savings account primarily used for?",
      options: ["Storing money and earning interest", "Taking loans", "Trading stocks", "Sending money abroad"],
      correct: 0,
      domain: "basicBanking",
      difficulty: "easy",
      timeLimit: 20
    },
    {
      id: 2,
      question: "What is KYC in banking?",
      options: ["Know Your Customer", "Keep Your Cash", "Key Yearly Credit", "Knowledge Yield Curve"],
      correct: 0,
      domain: "basicBanking",
      difficulty: "medium",
      timeLimit: 20
    },
    {
      id: 3,
      question: "Which document is NOT typically required for KYC?",
      options: ["Aadhar Card", "PAN Card", "College ID", "Passport"],
      correct: 2,
      domain: "basicBanking",
      difficulty: "medium",
      timeLimit: 20
    }
  ],
  investment: [
    {
      id: 4,
      question: "What is the primary purpose of a Demat account?",
      options: ["Store physical shares", "Hold electronic shares", "Save money", "Get loans"],
      correct: 1,
      domain: "investment",
      difficulty: "medium",
      timeLimit: 20
    },
    {
      id: 5,
      question: "Which investment typically has the highest risk?",
      options: ["Government Bonds", "Corporate Bonds", "Blue-chip Stocks", "Penny Stocks"],
      correct: 3,
      domain: "investment",
      difficulty: "hard",
      timeLimit: 20
    }
  ],
  digitalBanking: [
    {
      id: 6,
      question: "What is UPI?",
      options: ["Unified Payment Interface", "Universal Payment Index", "Unified Price Index", "Universal Payment Interface"],
      correct: 0,
      domain: "digitalBanking",
      difficulty: "easy",
      timeLimit: 20
    },
    {
      id: 7,
      question: "Which is a secure practice for mobile banking?",
      options: ["Sharing OTP", "Using public WiFi", "Regular password updates", "Writing PIN on phone"],
      correct: 2,
      domain: "digitalBanking",
      difficulty: "medium",
      timeLimit: 20
    }
  ]
};

const createDefaultAnalytics = () => ({
  totalTime: 0,
  averageTimePerQuestion: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  timeoutsCount: 0,
  performanceByDifficulty: {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  }
});

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedTheme = localStorage.getItem('theme');
      return storedTheme ? storedTheme === 'dark' : systemPrefersDark;
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [notifications] = useState(3);
  const [isQuizActive, setQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timeoutAlert, setTimeoutAlert] = useState(false);
  const [analytics, setAnalytics] = useState(createDefaultAnalytics());
  const [timer, setTimer] = useState(null);
  const [questionState, setQuestionState] = useState('waiting');

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, title: 'Dashboard', badge: null },
    { icon: <BookOpen className="w-5 h-5" />, title: 'Smart Learning', badge: 'New' },
    { icon: <MessageSquare className="w-5 h-5" />, title: 'AI Advisor', badge: null },
    { icon: <Users className="w-5 h-5" />, title: 'Community', badge: '5' },
    { icon: <PieChart className="w-5 h-5" />, title: 'Growth Kit', badge: null },
    { icon: <Settings className="w-5 h-5" />, title: 'Settings', badge: null },
  ];

  const statsCards = [
    { 
      title: 'Total Users',
      value: '12,847',
      increase: '+14%',
      icon: <User className="w-6 h-6" />,
      color: 'bg-blue-600',
      iconBg: 'bg-blue-500/20'
    },
    {
      title: 'Active Sessions',
      value: '2,345',
      increase: '+23%',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-green-600',
      iconBg: 'bg-green-500/20'
    },
    {
      title: 'Total Transactions',
      value: '₹4.2M',
      increase: '+18%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-purple-600',
      iconBg: 'bg-purple-500/20'
    }
  ];

  const allQuestions = Object.values(questionBank)
    .flat()
    .sort(() => Math.random() - 0.5);

  const clearQuizTimer = useCallback(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [timer]);

  const moveToNextQuestion = useCallback(() => {
    clearQuizTimer();
    setTimeoutAlert(false);
    
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(20);
      setQuestionState('waiting');
    } else {
      setShowResults(true);
    }
  }, [currentQuestionIndex, allQuestions.length, clearQuizTimer]);

  const startQuestionTimer = useCallback(() => {
    if (questionState !== 'waiting' || timer) return;

    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearQuizTimer();
          setQuestionState('timeout');
          setTimeoutAlert(true);
          setAnalytics(prev => ({
            ...prev,
            timeoutsCount: prev.timeoutsCount + 1
          }));
          
          setTimeout(moveToNextQuestion, 2000);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimer(newTimer);
  }, [questionState, timer, clearQuizTimer, moveToNextQuestion]);

  const handleAnswer = useCallback((selectedIndex) => {
    if (questionState !== 'waiting') return;
    
    const currentQuestion = allQuestions[currentQuestionIndex];
    clearQuizTimer();
    setQuestionState('answering');
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedIndex
    }));

    setAnalytics(prev => ({
      ...prev,
      correctAnswers: selectedIndex === currentQuestion.correct ? prev.correctAnswers + 1 : prev.correctAnswers,
      incorrectAnswers: selectedIndex !== currentQuestion.correct ? prev.incorrectAnswers + 1 : prev.incorrectAnswers,
      performanceByDifficulty: {
        ...prev.performanceByDifficulty,
        [currentQuestion.difficulty]: {
          correct: selectedIndex === currentQuestion.correct ? 
            prev.performanceByDifficulty[currentQuestion.difficulty].correct + 1 : 
            prev.performanceByDifficulty[currentQuestion.difficulty].correct,
          total: prev.performanceByDifficulty[currentQuestion.difficulty].total + 1
        }
      }
    }));

    setTimeout(moveToNextQuestion, 1000);
  }, [currentQuestionIndex, allQuestions, clearQuizTimer, moveToNextQuestion, questionState]);

  useEffect(() => {
    if (isQuizActive && timeLeft === null) {
      setTimeLeft(20);
      setQuestionState('waiting');
    }
  }, [isQuizActive, timeLeft]);

  useEffect(() => {
    if (isQuizActive && !showResults && timeLeft === 20 && questionState === 'waiting') {
      startQuestionTimer();
    }
  }, [isQuizActive, showResults, timeLeft, questionState, startQuestionTimer]);

  useEffect(() => {
    return () => clearQuizTimer();
  }, [clearQuizTimer]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const renderSmartLearningContent = () => {
    if (activeSection !== 'Smart Learning') return null;

    if (!isQuizActive) {
      const learningModules = [
        {
          title: "Financial Quiz Challenge",
          description: "Test your financial knowledge across various topics including banking, investment, and digital payments",
          icon: <Trophy className="w-8 h-8 text-yellow-500" />,
          action: () => setQuizActive(true)
        },
        {
          title: "Interactive Lessons",
          description: "Learn through guided financial education modules with real-world examples and case studies",
          icon: <BookOpen className="w-8 h-8 text-blue-500" />,
          action: () => alert("Coming soon!")
        },
        {
          title: "AI-Powered Practice",
          description: "Practice with personalized AI-generated questions based on your learning progress",
          icon: <Brain className="w-8 h-8 text-purple-500" />,
          action: () => alert("Coming soon!")
        }
      ];

      return (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Smart Learning Hub
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Enhance your financial literacy through interactive learning experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningModules.map((module, index) => (
              <Card 
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={module.action}
              >
                <CardHeader>
                  <div className="mb-2">{module.icon}</div>
                  <CardTitle>{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (showResults) {
      return (
        <div className="p-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Quiz Performance Analysis
              </h2>
              <button
                onClick={() => {
                  setQuizActive(false);
                  setShowResults(false);
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="text-blue-600 dark:text-blue-300 text-sm">Correct</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">
                  {analytics.correctAnswers}
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                <div className="text-red-600 dark:text-red-300 text-sm">Incorrect</div>
                <div className="text-2xl font-bold text-red-700 dark:text-red-200">
                  {analytics.incorrectAnswers}
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                <div className="text-yellow-600 dark:text-yellow-300 text-sm">Timeouts</div>
                <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-200">
                  {analytics.timeoutsCount}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <div className="text-green-600 dark:text-green-300 text-sm">Avg. Time</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-200">
                  {analytics.averageTimePerQuestion.toFixed(1)}s
                </div>
              </div>
            </div>

            <div className="flex gap-4">
            <button
                onClick={() => {
                  setQuizActive(false);
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                  setAnalytics(createDefaultAnalytics());
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Return to Dashboard
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                  setAnalytics(createDefaultAnalytics());
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Quiz question view
    const currentQuestion = allQuestions[currentQuestionIndex];
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setQuizActive(false)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <span className={`font-mono ${
                timeLeft && timeLeft < 10 ? 'text-red-500 dark:text-red-400' : 'text-slate-600 dark:text-slate-300'
              }`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {timeoutAlert && (
            <Alert className="mb-4 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
              <AlertDescription className="text-yellow-600 dark:text-yellow-300">
                Time up! Moving to next question...
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">
              {currentQuestion.question}
            </h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all
                    ${answers[currentQuestionIndex] === index 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                      ${answers[currentQuestionIndex] === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-slate-700 dark:text-slate-200">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} 
          fixed h-full bg-slate-100 dark:bg-slate-800/50
          border-r border-slate-200 dark:border-slate-700/50 
          transition-all duration-300 z-20`}>
          
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700/50">
            {isSidebarOpen && (
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                DhanSetu
              </span>
            )}
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700/50
                text-slate-600 dark:text-slate-300 transition-colors
                ${!isSidebarOpen ? 'w-full flex justify-center' : ''}`}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
  
          {/* Sidebar Navigation */}
          <nav className="p-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveSection(item.title)}
                className={`relative flex items-center mb-3 p-3 rounded-lg cursor-pointer 
                  transition-all duration-200 
                  ${!isSidebarOpen ? 'justify-center' : ''}
                  ${activeSection === item.title ? 
                    'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 
                    'text-slate-650 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700/50'}`}
                title={!isSidebarOpen ? item.title : ''}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                {isSidebarOpen && (
                  <div className="ml-3 flex-1 flex justify-between items-center">
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full
                        ${item.badge === 'New' ? 
                          'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 
                          'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
                {!isSidebarOpen && item.badge && (
                  <span className={`absolute top-0 right-0 -mr-1 -mt-1 px-2 py-1 text-xs 
                    font-medium rounded-full bg-blue-100 dark:bg-blue-500/20 
                    text-blue-600 dark:text-blue-400`}>
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
          {/* Header */}
          <header className="sticky top-0 z-10 bg-slate-100/80 dark:bg-slate-800/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700/50">
            <div className="flex justify-between items-center px-6 py-4">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {activeSection}
              </h1>
              <div className="flex items-center space-x-5">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="   Search..."
                    className="w-64 px-4 py-2 pl-10 rounded-lg
                      bg-white/80 dark:bg-slate-700/50 
                      text-slate-900 dark:text-slate-100 
                      border border-slate-200 dark:border-slate-600/50
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                      placeholder-slate-500 dark:placeholder-slate-400"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>
  
                {/* Notification Bell */}
                <button className="relative p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700/50
                  text-slate-600 dark:text-slate-300 transition-colors">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                      w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                      {notifications}
                    </span>
                  )}
                </button>
  
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700/50
                    text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </header>
  
          {/* Main Content Area */}
          {activeSection === 'Dashboard' ? (
            <div className="p-6">
              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsCards.map((stat, index) => (
                  <div key={index} 
                    className={`${stat.color} p-6 rounded-lg`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white/80 text-sm font-medium mb-1">{stat.title}</p>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <span className="text-white/80 text-sm font-medium">{stat.increase}</span>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                        <div className="text-white">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : renderSmartLearningContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;              