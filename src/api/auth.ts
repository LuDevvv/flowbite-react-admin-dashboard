import api from "../lib/api";

export const signup = async (userData: {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al registrar el usuario.");
  }
};

export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const checkStatus = async () => {
  try {
    const response = await api.get("/auth/check-status");
    return response.data;
  } catch (error) {
    console.error("Error checking status:", error);
    throw error;
  }
};

export const getPrivateData = async () => {
  try {
    const response = await api.get("/auth/private");
    return response.data;
  } catch (error) {
    console.error("Error fetching private data:", error);
    throw error;
  }
};
