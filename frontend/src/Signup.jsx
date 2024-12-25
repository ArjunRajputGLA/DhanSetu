import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name.trim()) {
      setMessage("Name is required.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const allowedDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com'
    ];

    const validateEmail = (email) => {
      // Basic email format check
      if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        setMessage("Please enter a valid email format.");
        setIsError(true);
        setIsLoading(false);
        return false;
      }
    
      // Get the domain part of the email
      const domain = email.split('@')[1].toLowerCase();
      
      // Check if domain is in allowed list
      if (!allowedDomains.includes(domain)) {
        setMessage("Please use a valid email provider (Gmail, Yahoo, Hotmail, Outlook, AOL, or iCloud).");
        setIsError(true);
        setIsLoading(false);
        return false;
      }
    
      return true;
    };

    if (!validateEmail(email)) {
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
      });

      if (response.data.status === "success") {
        setMessage("Registration successful! Redirecting to login...");
        setIsError(false);
        setName("");
        setEmail("");
        setPassword("");
        
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      if (error.response?.data.status === "email_exists") {
        setMessage("This email is already registered. Please login instead.");
      } else {
        setMessage("Registration failed. Please try again later.");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <style>
        {`
          h1 {
            font-size: 28px;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .signup-container {
            background: linear-gradient(-45deg,rgb(74, 228, 187),rgb(168, 101, 181));
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }
          
          .signup-card {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.85);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            transform: translateY(0);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.8s ease-out;
          }
          
          .signup-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
          }
          
          .input-group {
            position: relative;
            margin-bottom: 1.5rem;
          }
          
          .form-control {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px !important;
            padding-right: ${focusedInput === "password" ? "40px" : "12px"};
          }
          
          .form-control:focus {
            border-color: #FF416C;
            box-shadow: 0 0 0 0.2rem rgba(255, 65, 108, 0.25);
          }
          
          .input-label {
            position: absolute;
            left: 10px;
            top: ${focusedInput ? '-12px' : '50%'};
            transform: translateY(-50%);
            background: white;
            padding: 0 5px;
            font-size: ${focusedInput ? '12px' : '16px'};
            color: ${focusedInput ? '#FF416C' : '#666'};
            transition: all 0.3s ease;
            z-index: 1;
          }
          
          .btn-signup {
            background: linear-gradient(45deg, #FF416C, #FF4B2B);
            border: none;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          
          .btn-signup:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 65, 108, 0.4);
          }
          
          .btn-signup:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              120deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
            transition: 0.5s;
          }
          
          .btn-signup:hover:before {
            left: 100%;
          }
          
          .message {
            animation: ${isError ? 'shake' : 'fadeIn'} 0.5s ease-out;
          }

          .password-toggle {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s ease;
            z-index: 2;
          }

          .password-toggle:hover {
            color: #FF416C;
          }

          .password-input-group {
            position: relative;
            display: flex;
            align-items: center;
          }
        `}
      </style>

      <div className="d-flex justify-content-center align-items-center vh-100 signup-container">
        <div className="signup-card p-4 w-100" style={{ maxWidth: "400px" }}>
          <h1 className="text-center mb-4 fw-bold">Create Account</h1>
          
          {message && (
            <div
              className={`alert ${
                isError ? "alert-danger" : "alert-success"
              } message`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control py-2"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput("")}
                disabled={isLoading}
              />
              <label className="input-label">Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                className="form-control py-2"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput("")}
                disabled={isLoading}
              />
              <label className="input-label">Email</label>
            </div>

            <div className="input-group">
              <div className="password-input-group w-100">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control py-2"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput("")}
                  disabled={isLoading}
                />
                <label className="input-label">Password</label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-signup text-white w-100 py-2 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-3 mb-2">Already have an account?</p>
          <Link
            to="/login"
            className="btn btn-outline-secondary w-100"
            style={{ borderRadius: "8px" }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;