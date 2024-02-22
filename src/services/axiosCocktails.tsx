import axios from "axios";

export const axiosCocktails = async (endpoint: string) => {
  const res = await axios.get(endpoint);
  if (res.data && res.data.drinks) {
    return res.data.drinks.slice(0, 6);
  }
  return [];
};
