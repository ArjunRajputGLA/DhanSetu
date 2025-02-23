import { 
  LayoutDashboard,
  UserCircle, 
  GraduationCap, 
  PiggyBank,
  History,
  Settings,
  PieChart,
  Brain, 
  Bot,
  Ticket,
  FileText
} from 'lucide-react';

export const menuItems = [
  {
    title: <span className="font-bold text-xl">Dashboard</span>,
    key: 'Dashboard',  
    icon: <LayoutDashboard className="w-5 h-5" />,
    subItems: [
      {
        title: <span className="text-lg">Portfolio</span>,
        key: 'Portfolio',  
        icon: <PieChart className="w-5 h-5" />,
        component: 'PortfolioSection'
      },
      {
        title: <span className="text-lg">History</span>,
        key: 'History',  
        icon: <History className="w-5 h-5" />,
        component: 'HistorySection'
      }
    ]
  },
  {
    title: <span className="font-bold text-xl">AI Features</span>,
    key: 'AI Features',
    icon: <Brain className="w-5 h-5" />,
    subItems: [
      {
        title: <span className="text-lg">AI Assistant</span>,
        key: 'AI Assistant',
        icon: <Bot className="w-5 h-5" />,
        component: 'AIAssistantSection'
      },
      {
        title: <span className="text-lg">FinDoc Summary</span>,
        key: 'FinDoc Summary',
        icon: <FileText className="w-5 h-5" />,
        component: 'FinDocSummarySection'
      },
      {
        title: <span className="text-lg">Coupons</span>,
        key: 'Coupons',
        icon: <Ticket className="w-5 h-5" />,
        component: 'CouponCarousel'
      }
    ]
  },
  {
    title: <span className="font-bold text-xl">Settings</span>,
    key: 'Settings',  
    icon: <Settings className="w-5 h-5" />,
    subItems: [
      {
        title: <span className="text-lg">User Account</span>,
        key: 'User Account',  
        icon: <UserCircle className="w-5 h-5" />,
        component: 'DashboardStats'
      }
    ]
  },
  {
    title: <span className="font-bold text-xl">Learn</span>,
    key: 'Learn',  
    icon: <GraduationCap className="w-5 h-5" />,
    component: 'LearningSection'
  },
  {
    title: <span className="font-bold text-xl">Funds</span>,
    key: 'Funds',  
    icon: <PiggyBank className="w-5 h-5" />,
    component: 'FundsSection'
  }
];