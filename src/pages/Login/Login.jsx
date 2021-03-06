import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import "./login.css";

const Login = () => {
  const {
    auth: { token },
    loginUser,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  if (token) {
    setTimeout(() => {
      navigate(location?.state?.from || "/", { replace: true });
    }, 1000);
  }
  // email: "adarshbalika@gmail.com",
  //   password: "adarshBalika123",
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    loginUser(userLogin);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header white-text">
          <h2>Welcome Back</h2>
        </div>
        <div className="login-input-container">
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label className="white-text" htmlFor="emailInput">
                Email
              </label>
              <input
                required
                type="text"
                placeholder="Enter your Email"
                id="emailInput"
                name="email"
                className="white-text"
                value={userLogin.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="white-text" htmlFor="passwordInput">
                Password
              </label>
              <input
                required
                type="password"
                placeholder="Enter your Password"
                id="passwordInput"
                className="white-text"
                value={userLogin.password}
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="user-option">
              <div>
                <input required type="checkbox" id="save-chechkbox" />
                <label
                  className="checkbox-lable white-text"
                  htmlFor="save-chechkbox"
                >
                  Remember Me
                </label>
              </div>
              <div>
                <p className="forgot-psd white-text">Forgot Password?</p>
              </div>
            </div>
            <div className="btn-contaiers">
              <button type="submit" className="login-btn">
                Login
              </button>
              <button
                className="guest login-btn"
                onClick={() => {
                  console.log("gest kigubg");
                  loginUser({
                    email: "adarshbalika@gmail.com",
                    password: "adarshBalika123",
                  });
                }}
              >
                Guest Login
              </button>
            </div>

            <Link to={"/signup"} className="check-account flex">
              <p>Create New Account</p>
              <i className="fas fa-angle-right"></i>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
