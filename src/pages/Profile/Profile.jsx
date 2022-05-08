import React from "react";
import "./profile.css";
import { useAuth, useData } from "../../context";
import { DataAction } from "../../constants";

const Profile = () => {
  const {
    auth: { user },
    signOutUser,
  } = useAuth();
  const { dispatch } = useData();
  const handleLogout = () => {
    signOutUser();
    dispatch({
      type: DataAction.SET_USER_LOGOUT,
    });
  };
  return (
    <div className="page-component profile">
      <div className="profile-container">
        <div className="profile-heading">
          <h3>Profile</h3>
        </div>
        <div className="profile-body">
          <div className="profile-info">
            <h3>Profile Details</h3>
          </div>
          <div className="user-info">
            <div className="info">
              <p>Name : </p>
              <p>{user?.firstName}</p>
            </div>
            <div className="info">
              <p>Email : </p>
              <p>{user?.email}</p>
            </div>
            <div className="profile-btns">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
