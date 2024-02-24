import { TheCocktailDBDetailsProps } from "../../model/TheCocktailDBDetailsProps";
import CocktailCard from "../CocktailCard/CocktailCard";

type CocktailGridListProps = {
  data: any;
};

const CocktailListGrid: React.FC<CocktailGridListProps> = ({ data }) => {
  return (
    <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 p-10 items-center ">
      {data &&
        data.length > 0 &&
        data.map((cocktail: TheCocktailDBDetailsProps) => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        ))}
    </div>
  );
};

export default CocktailListGrid;
