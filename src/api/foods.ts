import api from "../lib/api";

export const createFood = async (foodData: any, token: string) => {
  try {
    const response = await api.post("/foods", foodData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating food:", error);
    throw new Error("Error al crear el food");
  }
};

export const getFoods = async () => {
  try {
    const response = await api.get("/foods");
    return response.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw new Error("Error al obtener los foods");
  }
};

export const getFoodByTerm = async (term: string) => {
  try {
    const response = await api.get(`/foods/${term}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food by term:", error);
    throw new Error("Error al obtener el food por término");
  }
};

export const updateFood = async (id: string, foodData: any, token: string) => {
  try {
    const response = await api.patch(`/foods/${id}`, foodData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating food:", error);
    throw new Error("Error al actualizar el food");
  }
};

export const deleteFood = async (id: string) => {
  try {
    const response = await api.delete(`/foods/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting food:", error);
    throw new Error("Error al eliminar el food");
  }
};
