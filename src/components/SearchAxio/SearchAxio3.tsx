import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Drink } from "../../types/typesFerran";

export const SearchAxio3 = () => {
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
        const limitedData = res.data.drinks.slice(0, 10);

        // Hacer una segunda llamada a la API para cada elemento
        const filter = limitedData.map(async (drink: Drink) => {
          const res = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
          );
          // Si el ingrediente numero 7 no es null, no lo incluyas en la Array
          return {
            ...drink,
            alcoholContent: res.data.drinks[0].strAlcoholic,
          };
        });

        const updatedData: any = await Promise.all(filter).then((val) => {
          return val.sort((a, b) => {
            if (
              a.alcoholContent !== "Alcoholic" &&
              b.alcoholContent === "Alcoholic"
            )
              return -1;

            if (
              a.alcoholContent === "Non_Alcoholic" &&
              b.alcoholContent !== "Non_Alcoholic"
            )
              return 1;
            return 0;
          });
        });
        setData(updatedData);
        console.log("updateData", updatedData);
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
      <h5>SearchAxio3</h5>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <h5>Resultados: </h5>
    </>
  );
};

// 1. Ingrediente principal
// 2. Filtrar con llamada "map" numero de ingredientes
// 3. Filtrar el resultado "map" añadir alcoholico + ordenar array
// 4. Método slide para 6 unidades
