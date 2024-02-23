import axios from "axios";

export const axiosCocktails = async (search: string) => {
  const res = await axios.get(search);
  if (res.data && res.data.drinks) {
    return res.data.drinks.slice(0, 6);
  }
  return [];
};
