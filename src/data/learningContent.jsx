import { PlayCircle, Gamepad2, Brain } from 'lucide-react';

export const learningContent = {
  videos: [
    {
      title: "बैंक खाता कैसे खोलें",
      type: "video",
      duration: "5 mins",
      language: "Hindi",
      icon: <PlayCircle className="w-6 h-6" />
    },
    {
      title: "डिजिटल भुगतान की समझ",
      type: "video",
      duration: "8 mins",
      language: "Hindi",
      icon: <PlayCircle className="w-6 h-6" />
    }
  ],
  games: [
    {
      title: "Budget Master",
      type: "game",
      duration: "10 mins",
      description: "Learn budgeting by running a virtual shop",
      icon: <Gamepad2 className="w-6 h-6" />
    },
    {
      title: "Save & Grow",
      type: "game",
      duration: "15 mins",
      description: "Farming game teaching savings concepts",
      icon: <Gamepad2 className="w-6 h-6" />
    }
  ],
  quizzes: [
    {
      title: "Banking Basics",
      type: "quiz",
      questions: 5,
      difficulty: "Easy",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Savings Quiz",
      type: "quiz",
      questions: 5,
      difficulty: "Easy",
      icon: <Brain className="w-6 h-6" />
    }
  ]
};