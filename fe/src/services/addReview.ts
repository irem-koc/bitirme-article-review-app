import { v4 as uuidv4 } from "uuid";
import api from "../types/api";

const addReview = async (reviewData: any) => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found in localStorage");
    }

    const response = await api.post(
      "http://localhost:8080/api/v1/task",
      {
        ...reviewData,
        requestId: uuidv4(),
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export default addReview;
