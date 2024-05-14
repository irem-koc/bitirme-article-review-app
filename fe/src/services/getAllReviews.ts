import { v4 as uuidv4 } from "uuid";
import api from "../types/api";

const getAllReviews = async () => {
  try {
    const token = localStorage.getItem("jwt");

    const config = {
      method: "GET",
      url: "http://localhost:8080/api/v1/task",
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
      return response.data.taskList;
    } else {
      throw new Error("Review verileri alınamadı");
    }
  } catch (error) {
    console.error("Review verilerini alma hatası:", error);
    throw error;
  }
};

export default getAllReviews;
