import api from "../types/api";

const verifySession = async () => {
  try {
    const response = await api.post(
      "http://localhost:8080/api/v1/auth/verifySession",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    if (response.data.status === "SUCCESS") {
      return response.data;
    } else {
      localStorage.removeItem("jwt");
      localStorage.removeItem("userdata");
      throw new Error("Session verification failed");
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    throw error;
  }
};

export default verifySession;
