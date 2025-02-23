import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

const AssetAllocation = ({ allocation }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const data = Object.entries(allocation).map(([name, value]) => ({
    name: name.replace(/([A-Z])/g, ' $1').trim(),
    value
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <PieChart width={400} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ background: 'white', border: '1px solid #ccc' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>

        <div className="space-y-4 mt-4">
          {data.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{item.name}</span>
                </span>
                <span className="font-semibold">{item.value}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${item.value}%`,
                    backgroundColor: COLORS[index % COLORS.length]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
AssetAllocation.propTypes = {
  allocation: PropTypes.object.isRequired,
};

export default AssetAllocation;