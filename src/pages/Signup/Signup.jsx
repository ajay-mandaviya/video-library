import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

import "./signup.css";
const Signup = () => {
  const {
    auth: { token },
    signupUser,
  } = useAuth();

  const navigagte = useNavigate();
  const location = useLocation();
  console.log("location is", location);
  const [user, setUser] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  if (token) {
    setTimeout(() => {
      navigagte(location?.state?.from || "/", { replace: true });
    }, 1000);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleUserSignup = (e) => {
    e.preventDefault();
    signupUser(user);
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header white-text">
          <h2>Sign Up</h2>
        </div>
        <div className="login-input-container">
          <form onSubmit={handleUserSignup}>
            <div className="form-group">
              <label className="white-text" htmlFor="nameInput">
                Name
              </label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                className="white-text"
                placeholder="Enter your Name"
                id="nameInput"
              />
            </div>
            <div className="form-group">
              <label className="white-text" htmlFor="emailInput">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                id="emailInput"
                name="email"
                className="white-text"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="white-text" htmlFor="passwordInput">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                id="passwordInput"
                name="password"
                className="white-text"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="user-option">
              <div>
                <input type="checkbox" id="save-chechkbox" />
                <label
                  htmlFor="save-chechkbox"
                  className="checkbox-lable white-text"
                >
                  Accept Terms & Condition
                </label>
              </div>
            </div>
            <div className="btn-contaiers">
              <button type="submit" className="login-btn">
                Sign up
              </button>
            </div>
            <Link to="/login" className="check-account flex">
              <p>Already have an account</p>
              <i className="fas fa-angle-right"></i>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
