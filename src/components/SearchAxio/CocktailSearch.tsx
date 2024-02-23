import { handleError } from "../../util/handleError";
import { sortDrinks } from "../../util/sortDrink";
import { axiosCocktails } from "../../services/axiosCocktails";
import { axiosCocktailsDetails } from "../../services/axiosCokctailsDetails";
import { DataTypeProps } from "../../types/dataTypeProps";
import React, { useEffect, useState, useCallback } from "react";

export const CocktailSearch = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataTypeProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const axiosData = useCallback(async () => {
    if (search.trim() === "") return setData([]);
    try {
      setIsLoading(true);
      const drinks = await axiosCocktails(
        `${API_BASE_URL}/filter.php?i=${search}`
      );
      const drinkDetails = await Promise.all(drinks.map(axiosCocktailsDetails));
      const updatedData = sortDrinks(drinkDetails.filter(Boolean));
      setData(updatedData);
      setIsLoading(false);
    } catch (err) {
      handleError(err);
    }
  }, [search]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  const performSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    performSearch(e.target.value);
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      performSearch(event.currentTarget.value);
    }
  };

  console.log(data);

  return (
    <>
      <h5>SearchAxio3</h5>
      <input
        type="text"
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        placeholder="Search..."
      />
      {/* Include button para trigger search */}
      <button aria-label="Search" onClick={() => performSearch(search)}>
        Search
      </button>
      {isLoading ? <p>Loading...</p> : <h5>Resultados: </h5>}
      {data &&
        data.map((drink) => <h5 key={drink.idDrink}>{drink.strDrink}</h5>)}
      {/* Para mostrar resultados de la búsqueda es necesario utilizar "data" */}
      {/* {data &&
        data.map((drink) => <h5 key={drink.idDrink}>{drink.strDrink}</h5>)} */}
    </>
  );
};

// Es posible conseguir una descripción ???
// Es posible que el buscador haga sugerencias ???

// componente filter -> filtrar los datos
// componente swiper que muestre las bebidas
// componente container que agrupe los componentes de la página
// componente card que muestre la información de cada bebida

// categoria de bebidas en el caso de que no quieras buscar por ingrediente
