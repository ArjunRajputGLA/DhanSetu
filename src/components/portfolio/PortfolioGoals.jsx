import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

const PortfolioGoals = ({ goals, projections }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Portfolio Goals & Projections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <div key={goal.name} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">{goal.name}</span>
                </div>
                <p className="text-2xl font-bold">₹{goal.target.toLocaleString()}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Target Date: {goal.targetDate}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-64">
            <p className="text-sm text-slate-500 mb-4">Portfolio Value Projection</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Projected Value']}
                  contentStyle={{ background: 'white', border: '1px solid #ccc' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                <span className="text-sm">Projected Value</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm">Target Value</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


PortfolioGoals.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      target: PropTypes.number.isRequired,
      progress: PropTypes.number.isRequired,
      targetDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  projections: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      projected: PropTypes.number.isRequired,
      target: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PortfolioGoals;