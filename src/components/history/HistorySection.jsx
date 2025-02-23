import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const HistorySection = () => {
  const [watchlist] = useState([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-medium mb-2">Learning Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Videos Watched</span>
                <span>1/2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Games Played</span>
                <span>1/2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quizzes Completed</span>
                <span>1/2</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-medium mb-2">Watchlist</h3>
            {watchlist.length > 0 ? watchlist.map((item, index) => (
              <div key={index} className="text-sm text-gray-600">
                • {item}
              </div>
            )) : (
              <p className="text-sm text-gray-500">No items in watchlist</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistorySection;