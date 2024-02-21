import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const SearchAxio = () => {
  //   1 - Setear los hooks
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;

  //   2 - Funcion para traer los datos
  const axiosData = async () => {
    try {
      const res = await axios.get(endpoint);
      setData(res.data);
      setLoading(false);

      // Esto es correcto
      //   if (res.data && res.data.drinks) {
      //     const limitedCocktails = res.data.drinks.slice(0, 6);
      //     setData(limitedCocktails);
      //   }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  useEffect(() => {
    axiosData();
  }, [search]);
  console.log(data);

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

export default SearchAxio;
