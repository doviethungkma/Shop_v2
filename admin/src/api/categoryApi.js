import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => axiosClient.get("/category"),
  create: (params) => axiosClient.post("/category", params),
  update: (id, params) => axiosClient.put(`category/${id}`, params),
  delete: (id) => axiosClient.delete(`/category/${id}`),
};

export default categoryApi;
