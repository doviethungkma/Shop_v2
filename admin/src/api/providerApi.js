import axiosClient from "./axiosClient";

const providerApi = {
  getAll: () => axiosClient.get("/provider"),
  create: (params) => axiosClient.post("/provider", params),
  update: (id, params) => axiosClient.put(`provider/${id}`, params),
  delete: (id) => axiosClient.delete(`/provider/${id}`),
};

export default providerApi;
