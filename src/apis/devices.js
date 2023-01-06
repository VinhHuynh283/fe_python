import axios from "../utils/axios";

export const getAllDevices = () => axios.get("/danhsachthietbi");

export const getDeviceDetails = (id) => axios.get("/thietbi/" + id);

export const createDevice = (data) => axios.post("/danhsachthietbi", data);

export const updateDevice = (id, data) => axios.put("/thietbi/" + id, data);

export const deleteDevice = (id) => axios.delete("/thietbi/" + id);
