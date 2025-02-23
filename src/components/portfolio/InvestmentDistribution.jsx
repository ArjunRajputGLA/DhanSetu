import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      color: PropTypes.string,
    })
  ),
  label: PropTypes.string,
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
};

const InvestmentDistribution = ({ sectors, regions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Investment Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="h-64">
            <p className="text-sm text-slate-500 mb-4">Sector Distribution</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-64">
            <p className="text-sm text-slate-500 mb-4">Geographic Distribution</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regions} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

InvestmentDistribution.propTypes = {
  sectors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default InvestmentDistribution;