import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const RiskAnalysis = ({ riskMetrics, historicalVolatility }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <p className="text-sm text-slate-500 mb-4">Risk Metrics</p>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={riskMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar 
                  name="Risk Score" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-slate-500">Volatility Analysis</p>
            {historicalVolatility.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between">
                  <span>{item.name}</span>
                  <span className={`font-semibold ${
                    item.status === 'low' ? 'text-green-600' :
                    item.status === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {item.value}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.status === 'low' ? 'bg-green-600' :
                      item.status === 'medium' ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


RiskAnalysis.propTypes = {
  riskMetrics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  historicalVolatility: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      status: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
    })
  ).isRequired,
};

export default RiskAnalysis;