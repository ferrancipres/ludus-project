export interface TheCocktailDBDetailsProps {
  map(
    arg0: (data: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  glas: string;
  alcoholContent: string;
  ingredients: string[];
  mesures: string[];
  instructions: string;
  idDrink: string;
  strDrink: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsDE: string;
  strInstructionsFR?: string;
  strInstructionsIT: string;
  "strInstructionsZH-HANS"?: string;
  "strInstructionsZH-HANT"?: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strImageSource: string;
  strImageAttribution: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}
