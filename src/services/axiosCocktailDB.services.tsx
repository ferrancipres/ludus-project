import axios from "axios";

export async function getCocktailsDB(endpoint: string) {
  const res = await axios.get(endpoint);
  return res.data;
}
