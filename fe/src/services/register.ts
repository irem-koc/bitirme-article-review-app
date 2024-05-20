import api from "../types/api";

const register = async ({user, role}) => {
  try {
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    const response = await api.post(
      "http://localhost:8080/api/v1/auth/register",
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        rol: user.rol,
        role: role,
      }
    );
    return response.data?.token;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export default register;
