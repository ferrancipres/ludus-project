import { useForm } from "react-hook-form";
// useForm es un objeto que contiene los métodos y estados necesarios para manejar formularios en React, que pertenece a la libería de

const SearchBar = () => {
  console.log(useForm());
  // desglosar el objeto para obtener los métodos y estados necesarios para manejar formularios en React
  // Uno de los métodos es el register que permite tracker los inputs del formulario, para que se puedan enviar los datos al servidor

  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel:</label>
        <input type="text" id="channel" {...register("channel")} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchBar;
