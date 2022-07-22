import axiosClient from "./axiosClient";

const authApi = {
  verifyToken: () => axiosClient.post("/auth/verify-token"),
  login: (params) => axiosClient.post("/auth/login", params),
  signup: (params) => axiosClient.post("/auth/signup", params),
};

export default authApi;
