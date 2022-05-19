import axios from "axios";

export const loginApi = (user) => {
  return axios.post("api/auth/login", user);
};

export const signUpUserApi = (newUser) => {
  console.log("new user in sign", newUser);
  return axios.post("api/auth/signup", newUser);
};
