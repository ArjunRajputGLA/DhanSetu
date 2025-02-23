import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // Using lucide-react icons

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/reset-password/${token}`, {
        password
      });

      setMessage(response.data.message);
      setIsError(false);
      setIsSuccess(true);

    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseWindow = () => {
    window.close();
  };

  return (
    <div>
      <style>
        {`
          .reset-container {
            background: linear-gradient(-45deg, rgb(118, 90, 201), rgb(161, 196, 109));
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .reset-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border: 1px solid rgba(255, 255, 255, 0.18);
            width: 100%;
            max-width: 400px;
            transition: transform 0.3s ease;
          }

          .success-message {
            text-align: center;
            padding: 2rem;
          }

          .success-icon {
            font-size: 48px;
            color: #4CAF50;
            margin-bottom: 1rem;
          }

          .input-group {
            position: relative;
            margin-bottom: 1.5rem;
          }

          .form-control {
            border-radius: 8px;
            padding: 0.75rem 1rem;
            padding-right: 2.5rem;
            border: 1px solid #ced4da;
            transition: all 0.3s ease;
            width: 100%;
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
          }

          .password-toggle:hover {
            color: #2193b0;
          }

          .close-button {
            background:rgb(85, 121, 30);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 20px;
            margin-top: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .close-button:hover {
            background:rgb(59, 107, 17);
          }
        `}
      </style>

      <div className="reset-container">
        <div className="reset-card">
          {isSuccess ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>Password Reset Successful!</h2>
              <p>Your password has been successfully reset.</p>
              <p>You can now close this window and log in with your new password.</p>
              <button 
                className="close-button"
                onClick={handleCloseWindow}
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-center mb-4">Reset Your Password</h2>
              
              {message && (
                <div className={`alert ${isError ? "alert-danger" : "alert-success"} mb-4`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput("")}
                    disabled={isLoading}
                  />
                  <label className="input-label">New Password</label>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedInput("confirmPassword")}
                    onBlur={() => setFocusedInput("")}
                    disabled={isLoading}
                  />
                  <label className="input-label">Confirm Password</label>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                  style={{
                    background: "linear-gradient(45deg, #2193b0, rgb(140, 226, 246))",
                    border: "none",
                    padding: "10px"
                  }}
                >
                  {isLoading ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;