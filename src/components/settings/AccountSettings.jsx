import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Mail, Edit2, Check, X, Phone, Calendar, MapPin, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const AccountSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [tempUsername, setTempUsername] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Get user data from localStorage and parse it
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        // Parse the JSON string
        const user = JSON.parse(userString);
        // If user is a string (sometimes localStorage can store stringified JSON multiple times)
        const parsedUser = typeof user === 'string' ? JSON.parse(user) : user;
        setUserData(parsedUser);
        setTempUsername(parsedUser.name || '');
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
  }, []);

  const handleSave = () => {
    if (tempUsername.trim()) {
      const updatedUser = {
        ...userData,
        name: tempUsername
      };
      setUserData(updatedUser);
      
      try {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to update user data in localStorage:', error);
      }
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUsername(userData?.name || '');
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const formatGender = (gender) => {
    if (!gender) return 'Not specified';
    return gender
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <>
                      <h2 className="text-xl font-semibold">{userData.name || 'No name set'}</h2>
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setTimeout(() => inputRef.current?.focus(), 100);
                        }}
                        className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-slate-500" />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleSave}
                        className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {userData.email || 'No email available'}
                  </p>
                  <p className="text-slate-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {userData.phoneNumber || 'No phone number available'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-500">Date of Birth</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(userData.dateOfBirth)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500">Gender</p>
                <p className="font-medium">{formatGender(userData.gender)}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Address</h3>
            <div className="space-y-2">
              <p className="text-slate-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {userData.address ? (
                    `${userData.address.street || ''}, ${userData.address.city || ''}, ${userData.address.state || ''} ${userData.address.zipCode || ''}`
                  ) : (
                    'No address available'
                  )}
                </span>
              </p>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-500">Member Since</p>
                <p className="font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatDate(userData.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500">Account Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;