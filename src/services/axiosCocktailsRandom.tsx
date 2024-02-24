import axios from "axios";
import { handleError } from "../util/handleError";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosCocktailsRandom = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/random.php`);
    if (res.data && res.data.drinks) {
      return res.data.drinks.slice(0, 6);
    }
  } catch (error) {
    handleError(error);
    return null;
  }
};

// PENDIENTE DE TIPAR LLAMADA API^^
// PODRIA HACER UN BONTON QUE SEA VOY A TENER SUERTE!!! Y QUE ME TRAIGA 6 BEBIDAS ALEATORIAS
