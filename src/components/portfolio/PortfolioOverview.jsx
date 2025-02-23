import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, BarChart } from 'lucide-react';
import PropTypes from 'prop-types';

const PortfolioOverview = ({ totalValue, change, riskLevel }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Total Value</p>
            <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
            <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Asset Allocation</p>
            <div className="flex items-center gap-2">
              <PieChart className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold">Balanced</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-slate-500">Risk Level</p>
            <div className="flex items-center gap-2">
              <BarChart className="w-6 h-6 text-yellow-600" />
              <span className="text-lg font-semibold">{riskLevel}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
PortfolioOverview.propTypes = {
  totalValue: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  riskLevel: PropTypes.string.isRequired,
};

export default PortfolioOverview;