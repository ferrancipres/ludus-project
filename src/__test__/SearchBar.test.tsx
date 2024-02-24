import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar/SearchBar";

const mockSetSearch = jest.fn();

describe("SearchBar", () => {
  it("renders correctly", () => {
    const container = render(<SearchBar onSearch={mockSetSearch} />);

    expect(container).toBeTruthy();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("calls onSearch when input changes", () => {
    render(<SearchBar onSearch={mockSetSearch} />);

    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "whiskey" } });

    expect(input.value).toBe("whiskey");
  });
});
