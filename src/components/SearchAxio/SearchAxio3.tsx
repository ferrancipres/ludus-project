import { handleError } from "../../util/handleError";
import { sortDrinks } from "../../util/sortDrink";
import { axiosCocktails } from "../../services/axiosCocktails";
import { axiosCocktailsDetails } from "../../services/axiosCokctailsDetails";
import { DataTypeProps } from "../../types/dataTypeProps";
import React, { useEffect, useState, useMemo, useCallback } from "react";

// cambiar el nombre de la función
export const SearchAxio3 = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataTypeProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const endpoint = useMemo(
    () => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`,
    [search]
  );

  const axiosData = useCallback(async () => {
    if (search.trim() === "") return setData([]);
    try {
      setIsLoading(true);
      const drinks = await axiosCocktails(endpoint);
      const drinkDetails = await Promise.all(drinks.map(axiosCocktailsDetails));
      const updatedData = sortDrinks(drinkDetails.filter(Boolean));
      setData(updatedData);
      setIsLoading(false);
    } catch (err) {
      handleError(err);
    }
  }, [endpoint]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  //   3 - Función de búsqueda
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  //   4 - Filtrar los datos
  console.log(data);

  return (
    <>
      <h5>SearchAxio3</h5>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
      />
      {isLoading ? <p>Loading...</p> : <h5>Resultados: </h5>}
      {/* Para mostrar resultados de la búsqueda es necesario utilizar "data" */}
      {/* {data &&
        data.map((drink) => <h5 key={drink.idDrink}>{drink.strDrink}</h5>)} */}
    </>
  );
};

// Es posible conseguir una descripción ???
// Es posible que el buscador haga sugerencias ???
// que es mejor buscar letra a letra o buscar la palabra completa con enter
// 9. Separar el código en funciones más pequeñas
// 11. Este código se renderiza mucho...optimiziar ??
// 10. Cambiar nombres de variables

// componente filter -> filtrar los datos
// componente swiper que muestre las bebidas
// componente container que agrupe los componentes de la página
// componente card que muestre la información de cada bebida

// categoria de bebidas en el caso de que no quieras buscar por ingrediente
