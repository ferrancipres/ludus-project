import React from "react";
import { TheCocktailDBDetailsProps } from "../../model/TheCocktailDBDetailsProps";

type CocktailRandomCard = {
  data: TheCocktailDBDetailsProps;
};

const CocktailRandomCard: React.FC<CocktailRandomCard> = ({ data }) => {
  return (
    <React.Fragment key={data.idDrink}>
      <h5 key={`drink-${data.idDrink}`}>{data.strDrink}</h5>
      <img
        key={`image-${data.idDrink}`}
        src={data.strDrinkThumb}
        width={150}
      ></img>
      <h5 key={`ingredient-${data.idDrink}`}>
        Ingredients: {data.ingredients.join(", ")}
      </h5>
      <h5 key={`mesures-${data.idDrink}`}>
        Mesures: {data.mesures.join(", ")}
      </h5>
    </React.Fragment>
  );
};

export default CocktailRandomCard;
