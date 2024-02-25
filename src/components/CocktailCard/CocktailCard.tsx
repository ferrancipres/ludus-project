import React from "react";
import { BiSolidDrink } from "react-icons/bi";
import useCocktailDetails from "../../hook/useCocktailDetails";
import ModalDetails from "../ModalDetails/ModalDetails";
import { FaBowlFood } from "react-icons/fa6";
import { FaRulerCombined } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TheCocktailDBDetailsProps } from "../../model/TheCocktailDBDetailsProps";

interface CocktailCardProps {
  cocktail: TheCocktailDBDetailsProps;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  const { isModalOpen, toggleModal } = useCocktailDetails();

  return (
    <div className="max-w-xs shadow-lg bg-white border border-gray-200 rounded-lg dark:bg-teal-950 dark:border-gray-700">
      <img
        className="rounded-t-lg"
        src={cocktail.strDrinkThumb}
        width={320}
        alt={cocktail.strDrink}
      />
      <article className="p-5">
        <h5 className="flex items-center mb-2 text-xl font-semibold  dark:text-white">
          <BiSolidDrink />
          {cocktail.strDrink}
        </h5>
        <p className="flex items-center mb-3 font-normal text-gray-700 dark:text-gray-400">
          <BiSolidDrink />
          {cocktail.glas}
        </p>

        <p
          className={`inline-flex mb-3 items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg  ${
            cocktail.alcoholContent === "Alcoholic"
              ? "bg-orange-700"
              : "bg-green-700"
          }`}
        >
          <BiSolidDrink />
          {cocktail.alcoholContent}
        </p>

        <button
          type="button"
          onClick={toggleModal}
          className="flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg "
        >
          More information
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </article>
      <ModalDetails isOpen={isModalOpen} onClose={toggleModal}>
        <h5 className="flex items-center mb-2 text-2xl font-semibold  dark:text-white">
          <BiSolidDrink />
          {cocktail.strDrink}
        </h5>

        <h6 className="flex items-center mb-2 mt-2 text-md font-semibold dark:text-white">
          <FaBowlFood /> Ingredients:
        </h6>
        <ul className="list-disc text-sm font-normal mb-4 ml-4">
          {cocktail.ingredients.map((ingredient: string) => (
            <li className="mb-2" key={ingredient}>
              {ingredient}
            </li>
          ))}
        </ul>

        <h6 className="flex items-center mb-2 text-md font-semibold dark:text-white">
          <FaRulerCombined />
          Mesures:
        </h6>
        <ul className="list-disc text-sm font-normal mb-4 ml-4">
          {cocktail.mesures.map((mesure: string) => (
            <li className="mb-2" key={mesure}>
              {mesure}
            </li>
          ))}
        </ul>

        <h6 className="flex items-center mb-2 text-md font-semibold dark:text-white">
          <IoDocumentTextOutline />
          Instructions:
        </h6>
        <ul className="list-decimal text-sm font-normal ml-4">
          {cocktail.instructions
            .split(".")
            .map((item: string, index: number) => {
              const trimmedItem = item.trim();
              return trimmedItem !== "" ? (
                <li className="mb-2" key={index}>
                  {trimmedItem}.
                </li>
              ) : null;
            })}
        </ul>
      </ModalDetails>
    </div>
  );
};

export default CocktailCard;
