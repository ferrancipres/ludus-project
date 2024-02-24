import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

jest.mock("../services/axiosCocktails", () => ({
  axiosCocktails: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: {} })),
}));

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: "Search" });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
