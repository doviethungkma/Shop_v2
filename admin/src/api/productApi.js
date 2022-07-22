import axiosClient from "./axiosClient";

const product = {
  getAll: () => axiosClient.get("/product"),
  create: (params) => axiosClient.post("/product", params),
  update: (id, params) => axiosClient.put(`product/${id}`, params),
  delete: (id) => axiosClient.delete(`/product/${id}`),
};

export default product;
