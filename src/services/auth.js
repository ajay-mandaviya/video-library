import axios from "axios";

export const loginApi = (user) => {
  return axios.post("api/auth/login", user);
};

export const signUpUserApi = (newUser) => {
  return axios.post("api/auth/signup", newUser);
};
