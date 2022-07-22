import authApi from "../api/authApi";
import { USER_STATUS_INACTIVE } from "./constant";

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res = await authApi.verifyToken();
      //if user inactive redirect to login, remove token
      if (res.user.status === USER_STATUS_INACTIVE) {
        // localStorage.removeItem("token");
        // localStorage.removeItem("username");
        return false;
      }
      return res.user;
    } catch (error) {
      return false;
    }
  },
};

export default authUtils;
