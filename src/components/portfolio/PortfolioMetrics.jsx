import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const PortfolioMetrics = ({ metrics }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {metric.icon === 'up' && <TrendingUp className="w-4 h-4" />}
                {metric.icon === 'down' && <TrendingDown className="w-4 h-4" />}
                {metric.icon === 'target' && <Target className="w-4 h-4" />}
                {metric.icon === 'alert' && <AlertCircle className="w-4 h-4" />}
                <span className="text-sm text-slate-500">{metric.name}</span>
              </div>
              <p className={`text-xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </p>
              <p className="text-sm text-slate-500 mt-1">{metric.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


PortfolioMetrics.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.oneOf(['up', 'down', 'target', 'alert']).isRequired,
      status: PropTypes.oneOf(['good', 'warning', 'danger']).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default PortfolioMetrics;