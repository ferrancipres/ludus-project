import React from "react";
import CocktailRandomCard from "../CocktailRandomCard/CocktailRandomCard";
import { TheCocktailDBDetailsProps } from "../../model/TheCocktailDBDetailsProps";

type CocktailRandomGridProps = {
  dataRandom: TheCocktailDBDetailsProps[];
};

const CocktailRandomGrid: React.FC<CocktailRandomGridProps> = ({
  dataRandom,
}) => {
  return (
    <div className="grid justify-items-center grid-cols-1 gap-2 p-10 items-center ">
      {dataRandom &&
        dataRandom.length > 0 &&
        dataRandom.map((data: TheCocktailDBDetailsProps) => (
          <CocktailRandomCard key={data.idDrink} data={data} />
        ))}
    </div>
  );
};

export default CocktailRandomGrid;
