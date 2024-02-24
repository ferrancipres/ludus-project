import axios from "axios";
import { handleError } from "../util/handleError";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosCocktails = async (ingredient: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/filter.php?i=${ingredient}`);
    if (res.data && res.data.drinks) {
      return res.data.drinks.slice(0, 6);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};
