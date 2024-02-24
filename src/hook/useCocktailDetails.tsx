import React from "react";

const useCocktailDetails = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return { isModalOpen, toggleModal };
};

export default useCocktailDetails;
