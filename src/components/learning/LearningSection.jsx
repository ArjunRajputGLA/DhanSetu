import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlayCircle, Gamepad2, Brain } from 'lucide-react';
import { learningContent } from '../../data/learningContent.jsx';

const LearningSection = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Videos Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-6 h-6" />
            Quick Video Lessons
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningContent.videos.map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">
                Duration: {item.duration} • {item.language}
              </p>
              <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Watch Now
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Games Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6" />
            Learning Games
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningContent.games.map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {item.description}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {item.duration}
              </p>
              <button className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                Play Now
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quizzes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Knowledge Check
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningContent.quizzes.map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.questions} questions • {item.difficulty}
              </p>
              <button className="mt-2 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                Start Quiz
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningSection;