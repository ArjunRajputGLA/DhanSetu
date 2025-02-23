import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMessage("Please enter a valid email address.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!isForgotPassword && password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (isForgotPassword) {
      handleForgotPassword();
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      if (response.data.message === "Success") {
        setMessage("Login successful! Welcome back!");
        setIsError(false);
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }

    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("http://localhost:3001/forgot-password", { email });
      console.log(response.data);
      setMessage("Password reset instructions have been sent to your email.");
      setIsError(false);
      
      // Reset form after 3 seconds and show login
      setTimeout(() => {
        setIsForgotPassword(false);
        setMessage("");
      }, 3000);
      
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage("Email not found. Please check your email address.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        setMessage("Email not found. Please register first.");
      } else if (error.response.status === 401) {
        setMessage("Incorrect password. Please try again.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    } else {
      setMessage("Network error. Please check your connection.");
    }
    setIsError(true);
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setMessage("");
    setPassword("");
  };

  return (
    <div>
      <style>
        {`
          h1 {
            font-size: 33px; 
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .login-container {
            background: linear-gradient(-45deg,rgb(118, 90, 201),rgb(161, 196, 109));
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }
          
          .login-card {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.85);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            transform: translateY(0);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.8s ease-out;
          }
          
          .login-card:hover {
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
            border-color: #2193b0;
            box-shadow: 0 0 0 0.2rem rgba(33, 147, 176, 0.25);
          }
          
          .input-label {
            position: absolute;
            left: 10px;
            top: ${focusedInput ? '-12px' : '50%'};
            transform: translateY(-50%);
            background: white;
            padding: 0 5px;
            font-size: ${focusedInput ? '12px' : '16px'};
            color: ${focusedInput ? '#2193b0' : '#666'};
            transition: all 0.3s ease;
            z-index: 1;
          }
          
          .btn-login {
            background: linear-gradient(45deg, #2193b0,rgb(140, 226, 246));
            border: none;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          
          .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(33, 147, 176, 0.4);
          }
          
          .btn-login:before {
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
          
          .btn-login:hover:before {
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
            color: #2193b0;
          }

          .password-input-group {
            position: relative;
            display: flex;
            align-items: center;
          }

          .forgot-password-link {
            color: #2193b0;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
            cursor: pointer;
          }
          
          .forgot-password-link:hover {
            color: #135e70;
            text-decoration: underline;
          }
        `}
      </style>

      <div className="d-flex justify-content-center align-items-center vh-100 login-container">
        <div className="login-card p-4 w-100" style={{ maxWidth: "400px" }}>
          <h1 className="text-center mb-5 fw-bold">
            {isForgotPassword ? "Reset Password" : "Welcome Back"}
          </h1>
          
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
            
            {!isForgotPassword && (
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
            )}
            
            <button
              type="submit"
              className="btn btn-login text-white w-100 py-2 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                isForgotPassword ? "Send Reset Link" : "Login"
              )}
            </button>
          </form>
          
          <div className="text-center mb-3">
            <span
              className="forgot-password-link"
              onClick={toggleForgotPassword}
            >
              {isForgotPassword ? "Back to Login" : "Forgot Password?"}
            </span>
          </div>
          
          {!isForgotPassword && (
            <>
              <p className="text-center mt-3 mb-2">Not having an account?</p>
              <Link
                to="/register"
                className="btn btn-outline-secondary w-100"
                style={{ borderRadius: "8px" }}
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;