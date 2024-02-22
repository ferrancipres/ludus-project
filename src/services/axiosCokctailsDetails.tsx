import axios from "axios";
import { handleError } from "../util/handleError";
import { TheCocktailDBDetailsProps } from "../model/TheCocktailDBDetailsProps";

export const axiosCocktailsDetails = async (
  drink: TheCocktailDBDetailsProps
) => {
  try {
    const res = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
    );

    if (res.data.drinks[0].strIngredient7 === null) {
      const ingredients = [
        res.data.drinks[0].strIngredient1,
        res.data.drinks[0].strIngredient2,
        res.data.drinks[0].strIngredient3,
        res.data.drinks[0].strIngredient4,
        res.data.drinks[0].strIngredient5,
        res.data.drinks[0].strIngredient6,
      ];

      const mesures = [
        res.data.drinks[0].strMeasure1,
        res.data.drinks[0].strMeasure2,
        res.data.drinks[0].strMeasure3,
        res.data.drinks[0].strMeasure4,
        res.data.drinks[0].strMeasure5,
        res.data.drinks[0].strMeasure6,
      ];

      const filteredIngredients = ingredients.filter(
        (ingredient) => ingredient !== null
      );

      const filteredMesures = mesures.filter((mesure) => mesure !== null);

      return {
        ...drink,
        category: res.data.drinks[0].strCategory,
        glas: res.data.drinks[0].strGlass,
        alcoholContent: res.data.drinks[0].strAlcoholic,
        instructions: res.data.drinks[0].strInstructions,
        ingredients: filteredIngredients,
        mesures: filteredMesures,
      };
    }
  } catch (err) {
    handleError(err);
  }
};
