import { useState } from 'react';
import PortfolioOverview from './PortfolioOverview';
import AssetAllocation from './AssetAllocation';
import PerformanceChart from './PerformanceChart';
import PortfolioMetrics from './PortfolioMetrics';
import InvestmentDistribution from './InvestmentDistribution';
import RiskAnalysis from './RiskAnalysis';
import PortfolioGoals from './PortfolioGoals';

const PortfolioSection = () => {
  const [portfolioData] = useState({
    total: 250000,
    change: 12.5,
    riskLevel: 'Moderate',
    allocation: {
      stocks: 60,
      mutualFunds: 25,
      bonds: 10,
      cash: 5
    },
    performance: [
      { month: 'Jan', value: 230000 },
      { month: 'Feb', value: 235000 },
      { month: 'Mar', value: 242000 },
      { month: 'Apr', value: 250000 }
    ],
    metrics: [
      { name: 'Annual Return', value: '15.4%', icon: 'up', status: 'good', description: 'Above market average' },
      { name: 'Sharpe Ratio', value: '1.8', icon: 'target', status: 'good', description: 'Strong risk-adjusted return' },
      { name: 'Beta', value: '0.85', icon: 'down', status: 'good', description: 'Lower market volatility' },
      { name: 'Alpha', value: '2.3%', icon: 'up', status: 'good', description: 'Outperforming benchmark' }
    ],
    sectors: [
      { name: 'Technology', value: 35 },
      { name: 'Healthcare', value: 25 },
      { name: 'Finance', value: 20 },
      { name: 'Consumer', value: 15 },
      { name: 'Others', value: 5 }
    ],
    regions: [
      { name: 'North America', value: 45 },
      { name: 'Europe', value: 25 },
      { name: 'Asia Pacific', value: 20 },
      { name: 'Emerging Markets', value: 10 }
    ],
    riskMetrics: [
      { name: 'Market Risk', value: 65 },
      { name: 'Credit Risk', value: 45 },
      { name: 'Liquidity Risk', value: 30 },
      { name: 'Operation Risk', value: 25 },
      { name: 'Geographic Risk', value: 40 }
    ],
    historicalVolatility: [
      { name: '1 Month', value: 12, status: 'low' },
      { name: '3 Months', value: 15, status: 'low' },
      { name: '6 Months', value: 18, status: 'medium' },
      { name: '1 Year', value: 22, status: 'medium' }
    ],
    goals: [
      { name: 'Retirement', target: 1000000, progress: 65, targetDate: '2040' },
      { name: 'House Down Payment', target: 300000, progress: 80, targetDate: '2025' },
      { name: 'Education Fund', target: 500000, progress: 45, targetDate: '2030' }
    ],
    projections: [
      { year: '2024', projected: 250000, target: 260000 },
      { year: '2025', projected: 287500, target: 299000 },
      { year: '2026', projected: 330625, target: 343850 },
      { year: '2027', projected: 380219, target: 395428 },
      { year: '2028', projected: 437252, target: 454742 },
      { year: '2029', projected: 502840, target: 522953 }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Top Section - Overview and Key Metrics */}
      <div className="space-y-6">
        <PortfolioOverview 
          totalValue={portfolioData.total}
          change={portfolioData.change}
          riskLevel={portfolioData.riskLevel}
        />
        <PortfolioMetrics metrics={portfolioData.metrics} />
      </div>

      {/* Middle Section - Asset Allocation and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetAllocation allocation={portfolioData.allocation} />
        <PerformanceChart performance={portfolioData.performance} />
      </div>

      {/* Investment Distribution */}
      <InvestmentDistribution 
        sectors={portfolioData.sectors}
        regions={portfolioData.regions}
      />

      {/* Risk Analysis */}
      <RiskAnalysis 
        riskMetrics={portfolioData.riskMetrics}
        historicalVolatility={portfolioData.historicalVolatility}
      />

      {/* Portfolio Goals and Projections */}
      <PortfolioGoals 
        goals={portfolioData.goals}
        projections={portfolioData.projections}
      />
    </div>
  );
};

export default PortfolioSection;