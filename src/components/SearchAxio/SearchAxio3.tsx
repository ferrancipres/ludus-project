import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { drinkProps } from "../../types/typesFerran";

type DataType = {
  alcoholContent: string;
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export const SearchAxio3 = () => {
  //   1 - Setear los hooks
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataType[]>([]);
  const endpoint = useMemo(
    () => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`,
    [search]
  );

  //   2 - Funcion para traer los datos
  const axiosData = useCallback(async () => {
    try {
      const res = await axios.get(endpoint);
      // Asegúrate de que la respuesta tenga la estructura que esperas
      if (res.data && res.data.drinks) {
        // Limita la respuesta a los primeros 6 elementos
        const limitedData = res.data.drinks.slice(0, 6);

        // Hacer una segunda llamada a la API para cada elemento
        const filter = limitedData.map(async (drink: drinkProps) => {
          const res = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
          );

          if (res.data.drinks[0].strIngredient7 === null) {
            return {
              ...drink,
              alcoholContent: res.data.drinks[0].strAlcoholic,
            };
          }
        });

        const updatedData = await Promise.all(filter).then((result) => {
          const finalResult = result.filter(Boolean);
          return finalResult.sort((a, b) => {
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
  }, [endpoint]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  //   3 - Función de búsqueda
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);
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

// 6. Manejo de errores: Podrías mejorar el manejo de errores en las llamadas a la API. Actualmente, solo estás registrando el error en la consola. Podrías considerar mostrar un mensaje de error al usuario.

// 7. Evitar llamadas a la API innecesarias: Podrías agregar una condición para evitar hacer la llamada a la API si la búsqueda está vacía.

// 7. Meter isLoading - estado
