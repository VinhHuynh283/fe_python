import axios from "../utils/axios";

export const getAllCategory = () => axios.get("/danhsachdanhmuc");

export const getCategoryDetails = (id) => axios.get("/danhmuc/" + id);

export const createCategory = (data) => axios.post("/danhsachdanhmuc", data);

export const updateCategory = (id, data) => axios.put("/danhmuc/" + id, data);

export const deleteCategory = (id) => axios.delete("/danhmuc/" + id);
