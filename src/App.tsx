import { useState } from "react";
import { DataTypeProps } from "./types/dataTypeProps";
import { axiosCocktails } from "./services/axiosCocktails";
import { axiosCocktailsDetails } from "./services/axiosCokctailsDetails";
import { handleError } from "./util/handleError";
import { useSortCocktail } from "./hook/useSortCocktail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useRandomCocktail } from "./hook/useCocktackRandom";
import CocktailListGrid from "./components/CocktailGrid/CocktailListGrid";
import CocktailRandomGrid from "./components/CocktailRandomGrid/CocktailRandomGrid";

const App = () => {
  const [data, setData] = useState<DataTypeProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dataRandom, setDataRandom, handleRandom } = useRandomCocktail();

  const handleSearch = async (ingredient: string): Promise<void> => {
    try {
      setIsLoading(true);
      setDataRandom([]);

      if (!ingredient) {
        setData([]);
        setIsLoading(false);
        return;
      }

      const cocktail = await axiosCocktails(ingredient);
      const cocktailDetails = await Promise.all(
        cocktail.map(axiosCocktailsDetails)
      );
      const cocktailFilter = useSortCocktail(cocktailDetails.filter(Boolean));
      setData(cocktailFilter);
      setIsLoading(false);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} />

      {/* EL PUTO ARRON GENERA UN CONTENEDOR  */}
      <section className="flex justify-center">
        <button
          className="w-60 mt-5 pl-3 pr-3 py-1.5 border-gray-300 rounded-md bg-white text-gray-500 placeholder-gray-400 sm:text-xm md:text-lg lg:text-lg"
          type="button"
          onClick={handleRandom}
        >
          Random Cocktail
        </button>
      </section>

      {isLoading ? (
        <div>Loading...</div>
      ) : dataRandom && dataRandom.length > 0 ? (
        CocktailRandomGrid({ dataRandom })
      ) : (
        CocktailListGrid({ data })
      )}

      <Footer />
    </>
  );
};

export default App;
