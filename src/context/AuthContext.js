import React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Authaction } from "../constants";
import { authReducer } from "../reduer";
import { loginApi, signUpUserApi } from "../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, dispatchAuth] = useReducer(authReducer, {
    token: "",
    loading: false,
    user: {},
  });
  useEffect(() => {
    const streamUser = JSON.parse(localStorage.getItem("streamUser"));
    streamUser?.token &&
      dispatchAuth({
        type: Authaction.SET_TOKEN,
        payload: streamUser?.token,
      });
    streamUser?.user &&
      dispatchAuth({
        type: Authaction.SET_USER,
        payload: streamUser.user,
      });
  }, []);

  const loginUser = async (user) => {
    const toastId = toast.loading("login...");
    try {
      const {
        data: { encodedToken, foundUser },
        status,
      } = await loginApi(user);
      console.log("slogin status", status);
      if (status === 200) {
        dispatchAuth({
          type: Authaction.SET_TOKEN,
          payload: encodedToken,
        });
        dispatchAuth({
          type: Authaction.SET_USER,
          payload: foundUser,
        });
        localStorage.setItem(
          "streamUser",
          JSON.stringify({
            token: encodedToken,
            user: foundUser,
          })
        );

        navigate("/");
        toast.success(`Hey Welcome Back ${foundUser.firstName}`, {
          id: toastId,
        });
      }
    } catch (error) {
      console.log("error while signin", error);
      toast.error("try again", {
        id: toastId,
      });
    }
  };

  const signupUser = async (newUser) => {
    const toastId = toast.loading("signing...");
    try {
      const {
        data: { createdUser, encodedToken },
        status,
      } = await signUpUserApi(newUser);

      if (status === 201) {
        dispatchAuth({
          type: Authaction.SET_TOKEN,
          payload: encodedToken,
        });
        dispatchAuth({
          type: Authaction.SET_USER,
          payload: createdUser,
        });
        localStorage.setItem(
          "streamUser",
          JSON.stringify({
            token: encodedToken,
            user: createdUser,
          })
        );
        navigate("/");
      }
      toast.success(`Hey Welcome ${createdUser.name}`, {
        id: toastId,
      });
    } catch (error) {
      console.log("error in sign", error);
      toast.error("try again");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
