import axiosClient from "./axiosClient";

const orderApi = {
  getAll: () => axiosClient.get("/order"),
  create: (params) => axiosClient.post("/order", params),
  update: (id, params) => axiosClient.put(`order/${id}`, params),
  delete: (id) => axiosClient.delete(`/order/${id}`),
};

export default orderApi;
