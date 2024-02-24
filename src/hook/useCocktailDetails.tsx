import React from "react";

// interesante React.useState para no tener que importarlo

const useCocktailDetails = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return { isModalOpen, toggleModal };
};

export default useCocktailDetails;
