// useRandomCocktail.ts
import { useState } from "react";
import { axiosCocktailsRandom } from "../services/axiosCocktailsRandom";
import { axiosCocktailsDetails } from "../services/axiosCokctailsDetails";
import { handleError } from "../util/handleError";
import { TheCocktailDBDetailsProps } from "../model/TheCocktailDBDetailsProps";

export const useRandomCocktail = () => {
  const [dataRandom, setDataRandom] = useState<TheCocktailDBDetailsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRandom = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setDataRandom([]);
      const cocktailRandom = await axiosCocktailsRandom();
      const cocktailRandomDetails = await Promise.all(
        cocktailRandom.map(axiosCocktailsDetails)
      );
      setDataRandom(cocktailRandomDetails);
      setIsLoading(false);
    } catch (err) {
      handleError(err);
    }
  };

  return { dataRandom, setDataRandom, isLoading, handleRandom };
};
