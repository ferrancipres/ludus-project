import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { SearchBarProps } from "../SearchBar/SearchBar";
import logo from "../../assets/img/logo.png";

const Header: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <header className="relative w-full h-full sm:h-1/4 md:h-1/3 xl:h-1/3 2xl:h-1/4 text-white overflow-hidden">
      <div className="container mx-auto py-6 px-6 sm:px-6 lg:px-8">
        <div className="z-10 flex items-center">
          <a href="/">
            <img className="h-5 w-auto mt-5" src={logo} alt="Logo" />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center w-full z-10">
        <h1 className="sm:text-2xl md:text-2xl lg:text-2xl font-semibold mb-4 mt-6">
          Find your favourite cocktail
        </h1>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
