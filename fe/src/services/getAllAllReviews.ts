import api from "../types/api";

const getAllAllReviews = async () => {
  try {
    const token = localStorage.getItem("jwt");

    const config = {
      method: "GET",
      url: "http://localhost:8080/api/v1/task/tasks",

      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api(config);

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Review verileri alınamadı");
    }
  } catch (error) {
    console.error("Review verilerini alma hatası:", error);
    throw error;
  }
};

export default getAllAllReviews;
