import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import { fundsData } from '../../data/fundsData.jsx';

const FundsSection = () => {
  const [setWatchlist] = useState([]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fundsData.map((fund, index) => (
        <Card key={index} className="relative">
          {fund.recommended && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
              Recommended
            </div>
          )}
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{fund.name}</span>
              <Bookmark 
                className="w-5 h-5 cursor-pointer hover:text-blue-500"
                onClick={() => setWatchlist(prev => [...prev, fund.name])}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Type:</strong> {fund.type}</p>
            <p className="mb-2">{fund.description}</p>
            <p className="mb-2"><strong>Minimum:</strong> ₹{fund.minInvestment}</p>
            <p><strong>Expected Returns:</strong> {fund.returns}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FundsSection;