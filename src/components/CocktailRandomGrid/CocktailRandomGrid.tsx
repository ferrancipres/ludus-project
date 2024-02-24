import React from "react";
import CocktailRandomCard from "../CocktailRandomCard/CocktailRandomCard";
import { TheCocktailDBDetailsProps } from "../../model/TheCocktailDBDetailsProps";

type CocktailRandomGridProps = {
  dataRandom: TheCocktailDBDetailsProps[];
};

const CocktailRandomGrid: React.FC<CocktailRandomGridProps> = ({
  dataRandom,
}) => {
  return dataRandom.map((data: TheCocktailDBDetailsProps) => (
    <CocktailRandomCard key={data.idDrink} data={data} />
  ));
};

export default CocktailRandomGrid;
