import api from "../types/api";

const verifySession = async (token) => {
  try {
    // Kullanıcı oturumunu doğrulamak için isteği gönder
    const response = await api.post(
      "http://localhost:8080/api/v1/auth/verifySession",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Bearer token'ı headers'a ekleyin
        },
      }
    );

    // Gelen cevabı kontrol et
    if (response.data.status === "SUCCESS") {
      return response.data.token;
    } else {
      throw new Error("Session verification failed");
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    throw error;
  }
};

export default verifySession;
