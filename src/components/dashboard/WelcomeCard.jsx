import { IndianRupee, Edit2, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';

const WelcomeCard = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [greeting, setGreeting] = useState('');
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Get user data from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserData(user);
        // Get first name by splitting the full name
        const firstName = user.name.split(' ')[0];
        setTempUsername(firstName);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    updateGreeting();
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateGreeting = () => {
    const hour = new Date().getHours();
    let newGreeting;
    if (hour >= 1 && hour < 12) {
      newGreeting = 'Good morning';
    } else if (hour >= 12 && hour < 16) {
      newGreeting = 'Good afternoon';
    } else if (hour >= 16 && hour < 24) {
      newGreeting = 'Good evening';
    } else {
      newGreeting = 'Good night';
    }
    setGreeting(newGreeting);
  };

  const getWelcomeMessage = () => {
    const messages = [
      "Ready to take control of your finances?",
      "Let's make your money work for you",
      "Your financial journey continues here",
      "Track, save, and grow your wealth",
      "Build your financial future today",
      "Smart money moves start here",
      "Take the first step toward financial freedom",
      "Master your money, master your life",
      "Transform your spending into saving",
      "Invest in yourself and your future",
      "Your wealth-building journey begins now",
      "Make every ruppee count",
      "Achieve your financial goals faster",
      "Smart saving, brighter future",
      "Take charge of your financial destiny",
      "Turn your financial dreams into reality",
      "Budget smarter, live better",
      "Your path to financial success starts here",
      "Secure your financial tomorrow",
      "Empower your financial decisions"
  ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleSave = async () => {
    if (tempUsername.trim()) {
      try {
        // Here you would typically make an API call to update the user's name
        // For now, we'll just update the local state
        const updatedUser = { ...userData, name: tempUsername };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating username:', error);
      }
    }
  };

  const handleCancel = () => {
    setTempUsername(userData?.name?.split(' ')[0] || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const displayName = userData?.name?.split(' ')[0] || 'Guest';

  return (
    <Card className="bg-white border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="space-y-3">
              {/* Greeting Section */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">
                  {greeting}, {displayName}! 👋
                </h1>
                <p className="text-lg text-slate-600 font-medium">
                  {getWelcomeMessage()}
                </p>
              </div>
              
              {/* Username Edit Section */}
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <div 
                    className="group relative cursor-pointer flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-md transition-colors duration-200"
                    onClick={() => {
                      setIsEditing(true);
                      setTimeout(() => inputRef.current?.focus(), 100);
                    }}
                  >
                    <span className="text-sm text-slate-500">
                      Click to change username
                    </span>
                    <Edit2 className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your name"
                      className="px-3 py-2 text-lg border border-slate-300 rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 
                               focus:border-transparent transition-all duration-200
                               placeholder:text-slate-400"
                      aria-label="Username"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleSave}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        aria-label="Save username"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Cancel editing"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <IndianRupee className="w-12 h-12 text-blue-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;