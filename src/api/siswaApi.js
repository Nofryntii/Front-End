import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/siswa",
});

export const fetchSiswas = async () => {
  const res = await api.get("/");
  return res.data.data;
};

export const createSiswa = async (payload) => {
  const res = await api.post("/", payload);
  return res.data.data;
};

export const updateSiswa = async (id, payload) => {
  const res = await api.put(`/${id}`, payload);
  return res.data.data;
};

export const deleteSiswa = async (id) => {
  await api.delete(`/${id}`);
};
