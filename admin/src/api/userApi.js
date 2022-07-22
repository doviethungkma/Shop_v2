import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => axiosClient.get("/user"),
  getRole: () => axiosClient.get("/user/role"),
  update: (id, params) => axiosClient.put(`user/${id}`, params),
};

export default userApi;
