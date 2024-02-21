import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Drink } from "../../types/typesFerran";

export const SearchAxio2 = () => {
  //   1 - Setear los hooks
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;

  //   2 - Funcion para traer los datos
  const axiosData = async () => {
    try {
      const res = await axios.get(endpoint);
      // Asegúrate de que la respuesta tenga la estructura que esperas
      if (res.data && res.data.drinks) {
        // Limita la respuesta a los primeros 6 elementos
        const limitedData = res.data.drinks.slice(0, 20);

        // Hacer una segunda llamada a la API para cada elemento
        const promises = limitedData.map(async (drink: Drink) => {
          const res = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
          );
          return { ...drink, alcoholContent: res.data.drinks[0].strAlcoholic };
        });

        const updatedData: any = await Promise.all(promises);
        setData(updatedData);
        console.log(data);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axiosData();
  }, [search]);

  //   3 - Función de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  //   4 - Filtrar los datos

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </>
  );
};
