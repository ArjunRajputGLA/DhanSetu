import { Trophy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PropTypes from 'prop-types';

const DashboardStats = ({ setActiveSection }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-900">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-slate-700">
                <span>Learning Progress</span>
                <span>3/6 Complete</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: '50%' }}
                />
              </div>
            </div>
            <button 
              onClick={() => setActiveSection('Learn')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Continue Learning
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-slate-900">Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="font-medium text-slate-900">
                  First Quiz Completed!
                </h3>
                <p className="text-sm text-slate-600">
                  Keep going to earn more
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
DashboardStats.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
};

export default DashboardStats;