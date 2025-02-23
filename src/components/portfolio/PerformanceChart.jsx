import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const PerformanceChart = ({ performance }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Performance History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performance}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `₹${(value / 1000)}K`}
              />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Value']}
                contentStyle={{ background: 'white', border: '1px solid #ccc' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0088FE" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {performance.map((month, index) => {
            const previousValue = index > 0 ? performance[index - 1].value : month.value;
            const percentageChange = ((month.value - previousValue) / previousValue) * 100;
            
            return (
              <div key={month.month} className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500">{month.month}</p>
                <p className="font-semibold">₹{month.value.toLocaleString()}</p>
                {index > 0 && (
                  <p className={`text-sm ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange).toFixed(1)}%
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};


PerformanceChart.propTypes = {
  performance: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PerformanceChart;