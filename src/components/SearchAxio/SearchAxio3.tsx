import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios, { AxiosError } from "axios";
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
  const [isLoading, setIsLoading] = useState(false);
  const endpoint = useMemo(
    () => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`,
    [search]
  );

  //   2 - Funcion para traer los datos
  const axiosData = useCallback(async () => {
    if (search.trim() === "") return setData([]);
    try {
      setIsLoading(true);
      const res = await axios.get(endpoint);

      if (res.data && res.data.drinks) {
        const limitedData = res.data.drinks.slice(0, 6);

        const filter = limitedData.map(async (drink: drinkProps) => {
          try {
            const res = await axios.get(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
            );

            if (res.data.drinks[0].strIngredient7 === null) {
              const ingredients = [
                res.data.drinks[0].strIngredient1,
                res.data.drinks[0].strIngredient2,
                res.data.drinks[0].strIngredient3,
                res.data.drinks[0].strIngredient4,
                res.data.drinks[0].strIngredient5,
                res.data.drinks[0].strIngredient6,
              ];

              const mesures = [
                res.data.drinks[0].strMeasure1,
                res.data.drinks[0].strMeasure2,
                res.data.drinks[0].strMeasure3,
                res.data.drinks[0].strMeasure4,
                res.data.drinks[0].strMeasure5,
                res.data.drinks[0].strMeasure6,
              ];

              const filteredIngredients = ingredients.filter(
                (ingredient) => ingredient !== null
              );

              const filteredMesures = mesures.filter(
                (mesure) => mesure !== null
              );

              return {
                ...drink,
                category: res.data.drinks[0].strCategory,
                glas: res.data.drinks[0].strGlass,
                alcoholContent: res.data.drinks[0].strAlcoholic,
                instructions: res.data.drinks[0].strInstructions,
                ingredients: filteredIngredients,
                mesures: filteredMesures,
              };
            }
          } catch (err) {
            if (axios.isAxiosError(err)) {
              const axiosError = err as AxiosError;
              console.error(
                "Error data (second API call): ",
                axiosError.response?.data
              );
              console.error(
                "Error status (second API call): ",
                axiosError.response?.status
              );
              console.error(
                "Error headers (second API call): ",
                axiosError.response?.headers
              );
            } else if ((err as AxiosError).request) {
              console.error(
                "Error request (second API call): ",
                (err as AxiosError).request
              );
            } else {
              console.error("Error in second API call: ", err);
            }
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
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        console.error(
          "Error data (first API call): ",
          axiosError.response?.data
        );
        console.error(
          "Error status (first API call): ",
          axiosError.response?.status
        );
        console.error(
          "Error headers (first API call): ",
          axiosError.response?.headers
        );
      } else if ((err as AxiosError).request) {
        console.error(
          "Error request (first API call): ",
          (err as AxiosError).request
        );
      } else {
        console.error("Error in first API call", err);
      }
    } finally {
      setIsLoading(false);
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
    </>
  );
};

// 8. Revisar optimización de código // renderizado
// 9. Mejorar tipescript
// 10. Cambiar nombres de variables
