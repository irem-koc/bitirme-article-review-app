import { v4 as uuidv4 } from "uuid";
import api from "../types/api";

const getUserData = async () => {
  try {
    const token = localStorage.getItem("jwt");

    const config = {
      method: "GET",
      url: "http://localhost:8080/api/v1/user",
      params: {
        requestId: uuidv4(),
      },
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api(config);

    if (response.data) {
      return response.data;
    } else {
      localStorage.setItem("jwt", "");
      localStorage.setItem("userdata", "");
      throw new Error("Kullanıcı verileri alınamadı");
    }
  } catch (error) {
    console.error("Kullanıcı verilerini alma hatası:", error);
    throw error;
  }
};

export default getUserData;
