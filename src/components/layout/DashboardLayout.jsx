import { useState } from 'react';
import Sidebar from '../navigation/Sidebar';
import Header from '../navigation/Header';
import WelcomeCard from '../dashboard/WelcomeCard';
import DashboardStats from '../dashboard/DashboardStats';
import LearningSection from '../learning/LearningSection';
import FundsSection from '../funds/FundsSection';
import HistorySection from '../history/HistorySection';
import AccountSettings from '../settings/AccountSettings';
import PortfolioSection from '../portfolio/PortfolioSection';
import AIAssistant from '../AI_features/assistant';
import CouponCarousel from '../AI_features/coupons';
import FinDocSummarySection from '../AI_features/FinDocSummary';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Dashboard');

  const renderContent = () => {
    if (activeSection === 'Coupons') {
      return <CouponCarousel />;
    } 
    switch(activeSection) {
      case 'User':
        return (
          <div className="space-y-6">
            <WelcomeCard />
            <DashboardStats setActiveSection={setActiveSection} />
          </div>
        );
      case 'Learn':
        return <LearningSection />;
      case 'Funds':
        return <FundsSection />;
      case 'History':
        return <HistorySection />;
      case 'Portfolio':
        return (<div className="space-y-6">
                  <WelcomeCard />
                  <DashboardStats setActiveSection={setActiveSection} />
                  <PortfolioSection />
                </div>);
      case 'AI Assistant':
        return <AIAssistant />;
      case 'FinDoc Summary':
        return <FinDocSummarySection />;
      case 'User Account':
        return <div className="space-y-6">
          <DashboardStats setActiveSection={setActiveSection} />
          <AccountSettings/>
          </div>;
      default:
        return (
          <div className="space-y-6">
            <WelcomeCard />
            <DashboardStats setActiveSection={setActiveSection} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex h-full">
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
          <Header 
            activeSection={activeSection}
            isSidebarOpen={isSidebarOpen}
          />
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;