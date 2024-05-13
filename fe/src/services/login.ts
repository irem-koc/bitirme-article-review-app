import { v4 as uuidv4 } from "uuid";
import api from "../types/api";
const login = async (user) => {
  try {
    const response = await api.post(
      "http://localhost:8080/api/v1/auth/authenticate",
      {
        accountcode: user.email,
        password: user.password,
        requestId: uuidv4(),
      }
    );
    console.log("Login response:", response.data);

    return response.data?.token;
  } catch (error) {
    console.error("Error loging in user:", error);
    throw error;
  }
};
export default login;
