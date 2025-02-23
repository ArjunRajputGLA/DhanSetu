import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    }
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    },
    suggestions: []
  });
  
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const suggestions = [];
    if (!requirements.length) suggestions.push("Use at least 8 characters");
    if (!requirements.uppercase) suggestions.push("Add uppercase letters");
    if (!requirements.lowercase) suggestions.push("Add lowercase letters");
    if (!requirements.number) suggestions.push("Add numbers");
    if (!requirements.special) suggestions.push("Add special characters");

    // Calculate score (0-4)
    const score = Object.values(requirements).filter(Boolean).length - 1;

    return {
      score: Math.max(0, score),
      requirements,
      suggestions
    };
  };

  const getPasswordStrengthColor = (score) => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    return colors[score] || colors[0];
  };

  const getPasswordStrengthText = (score) => {
    const texts = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
    return texts[score] || texts[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const missingFields = [];
  
    if (!formData.name.trim()) missingFields.push('Name');
    if (!formData.email.trim()) missingFields.push('Email');
    if (!formData.password.trim()) missingFields.push('Password');
    if (!formData.phoneNumber.trim()) missingFields.push('Phone Number');
    if (!formData.dateOfBirth) missingFields.push('Date of Birth');
    if (!formData.gender) missingFields.push('Gender');
    if (!formData.address.street.trim()) missingFields.push('Street Address');
    if (!formData.address.city.trim()) missingFields.push('City');
    if (!formData.address.state.trim()) missingFields.push('State');
    if (!formData.address.zipCode.trim()) missingFields.push('ZIP Code');

    if (missingFields.length > 0) {
      setMessage(`Please fill in the following fields: ${missingFields.join(', ')}`);
      setIsError(true);
      setIsLoading(false);
      return;
    }

    // Password strength validation
    if (passwordStrength.score < 2) {
      setMessage("Please create a stronger password. " + passwordStrength.suggestions.join(". "));
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const allowedDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 
      'outlook.com', 'aol.com', 'icloud.com', 'gla.ac.in'
    ];
    
    const validateEmail = (email) => {
      if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        setMessage("Please enter a valid email format.");
        setIsError(true);
        return false;
      }
      const domain = email.split('@')[1].toLowerCase();
      if (!allowedDomains.includes(domain)) {
        setMessage("Please use a valid email provider (Gmail, Yahoo, Hotmail, Outlook, AOL, or iCloud).");
        setIsError(true);
        return false;
      }
      return true;
    };

    if (!validateEmail(formData.email)) {
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!formData.dateOfBirth) {
      setMessage("Date of birth is required.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!formData.address.street || !formData.address.city || 
        !formData.address.state || !formData.address.zipCode) {
      setMessage("All address fields are required.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/register", formData);

      if (response.data.status === "success") {
        setMessage("Registration successful! Redirecting to login...");
        setIsError(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          dateOfBirth: "",
          gender: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: ""
          }
        });
        
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      if (error.response?.data.status === "email_exists") {
        setMessage("This email is already registered. Please login instead.");
      } else {
        setMessage(`Registration failed: ${error.response?.data?.message || error.message}`);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-teal-200 p-8">
      <div className="max-w-7xl mx-auto bg-white/85 backdrop-blur-md rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] motion-safe:animate-fadeIn">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text motion-safe:animate-pulse">
          Create Account
        </h1>
        
        {message && (
          <div 
            className={`p-4 mb-6 rounded-lg transform transition-all duration-300 ${
              isError 
                ? "bg-red-100 text-red-700 animate-bounce" 
                : "bg-green-100 text-green-700 motion-safe:animate-fadeIn"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6 motion-safe:animate-fadeInLeft">
            <h2 className="text-xl font-semibold mb-4 relative after:content-[''] after:block after:w-1/4 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-transparent after:mt-1">
              Personal Information
            </h2>
            
            {/* Personal Information Fields */}
            <div className="space-y-6">
              {["name", "email", "phoneNumber", "dateOfBirth", "gender"].map((field) => (
                <div key={field} className="relative group">
                  {field === "gender" ? (
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/50 backdrop-blur group-hover:border-pink-300 transform hover:translate-x-1"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  ) : (
                    <input
                      type={field === "dateOfBirth" ? "date" : field === "phoneNumber" ? "tel" : field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/50 backdrop-blur group-hover:border-pink-300 transform hover:translate-x-1"
                      placeholder=" "
                    />
                  )}
                  <label className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-300 group-hover:text-pink-500 group-hover:font-medium">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 motion-safe:animate-fadeInRight">
            <h2 className="text-xl font-semibold mb-4 relative after:content-[''] after:block after:w-1/4 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-transparent after:mt-1">
              Address & Security
            </h2>
            
            {/* Address Fields */}
            <div className="space-y-6">
              {["street", "city", "state", "zipCode"].map((field) => (
                <div key={field} className="relative group">
                  <input
                    type="text"
                    name={`address.${field}`}
                    value={formData.address[field]}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/50 backdrop-blur group-hover:border-pink-300 transform hover:translate-x-1"
                    placeholder=" "
                  />
                  <label className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-300 group-hover:text-pink-500 group-hover:font-medium">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                </div>
              ))}

              {/* Password Field with Strength Indicator */}
              <div className="space-y-2">
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full p-3 border rounded-lg pr-12 transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/50 backdrop-blur group-hover:border-pink-300 transform hover:translate-x-1"
                    placeholder=" "
                  />
                  <label className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-300 group-hover:text-pink-500 group-hover:font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    {/* Password Strength Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Password Strength:</span>
                        <span className={`font-medium ${getPasswordStrengthColor(passwordStrength.score).replace('bg-', 'text-')}`}>
                          {getPasswordStrengthText(passwordStrength.score)}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getPasswordStrengthColor(passwordStrength.score)} transition-all duration-300`}
                          style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Requirements Checklist */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(passwordStrength.requirements).map(([key, met]) => (
                        <div key={key} className="flex items-center gap-2">
                          {met ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <X size={16} className="text-red-500" />
                          )}
                          <span className={met ? "text-green-700" : "text-gray-600"}>
                            {key === 'length' ? '8+ Characters' :
                             key === 'uppercase' ? 'Uppercase' :
                             key === 'lowercase' ? 'Lowercase' :
                             key === 'number' ? 'Number' :
                             'Special Char'}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Password Suggestions */}
                    {passwordStrength.suggestions.length > 0 && (
                      <div className="text-sm text-gray-600 mt-2">
                        <p className="font-medium">Suggestions:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {passwordStrength.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-gray-500">{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4 motion-safe:animate-fadeInUp">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <p className="text-gray-600 mb-2">Already have an account?</p>
              <Link
                to="/login"
                className="inline-block text-pink-500 hover:text-pink-700 transition-colors duration-300 hover:underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;