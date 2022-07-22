import axiosClient from "./axiosClient";

const couponApi = {
  getAll: () => axiosClient.get("/coupon"),
  create: (params) => axiosClient.post("/coupon", params),
  update: (id, params) => axiosClient.put(`coupon/${id}`, params),
  delete: (id) => axiosClient.delete(`/coupon/${id}`),
};

export default couponApi;
