import React from "react";
import { TheCocktailDBDetailsProps } from "../../model/TheCocktailDBDetailsProps";
import { BiSolidDrink } from "react-icons/bi";
import useCocktailDetails from "../../hook/useCocktailDetails";
import ModalDetails from "../ModalDetails/ModalDetails";
import { FaBowlFood } from "react-icons/fa6";
import { FaRulerCombined } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";

type CocktailRandomCard = {
  data: TheCocktailDBDetailsProps;
};

const CocktailRandomCard: React.FC<CocktailRandomCard> = ({ data }) => {
  const { isModalOpen, toggleModal } = useCocktailDetails();
  return (
    <div className="max-w-xs shadow-lg bg-white border border-gray-200 rounded-lg dark:bg-teal-950 dark:border-gray-700">
      <React.Fragment key={data.idDrink}>
        <img
          key={`image-${data.idDrink}`}
          className="rounded-t-lg"
          src={data.strDrinkThumb}
          width={320}
          alt={data.strDrink}
        />
        <article className="p-5">
          <h5
            className="flex items-center mb-2 text-xl font-semibold  dark:text-white"
            key={`drink-${data.idDrink}`}
          >
            <BiSolidDrink />
            {data.strDrink}
          </h5>

          <p className="flex items-center mb-3 font-normal text-gray-700 dark:text-gray-400">
            <BiSolidDrink />
            {data.glas}
          </p>

          <p
            className={`inline-flex mb-3 items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg  ${
              data.alcoholContent === "Alcoholic"
                ? "bg-orange-700"
                : "bg-green-700"
            }`}
          >
            <BiSolidDrink />
            {data.alcoholContent}
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
      </React.Fragment>
      <ModalDetails isOpen={isModalOpen} onClose={toggleModal}>
        <h5 className="flex items-center mb-2 text-2xl font-semibold  dark:text-white">
          <BiSolidDrink />
          {data.strDrink}
        </h5>

        <h6 className="flex items-center mb-2 mt-2 text-md font-semibold dark:text-white">
          <FaBowlFood /> Ingredients:
        </h6>
        <ul className="list-disc text-sm font-normal mb-4 ml-4">
          {data.ingredients.map((ingredient: string) => (
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
          {data.mesures.map((mesure: string) => (
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
          {data.instructions.split(".").map((item: string, index: number) => {
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

export default CocktailRandomCard;
