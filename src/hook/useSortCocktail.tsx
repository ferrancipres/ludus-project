import { DataTypeProps } from "../types/dataTypeProps";

export const useSortCocktail = (cocktails: DataTypeProps[]) => {
  return cocktails.sort((a, b) => {
    if (a.alcoholContent !== "Alcoholic" && b.alcoholContent === "Alcoholic")
      return -1;

    if (
      a.alcoholContent === "Non_Alcoholic" &&
      b.alcoholContent !== "Non_Alcoholic"
    )
      return 1;
    return 0;
  });
};
