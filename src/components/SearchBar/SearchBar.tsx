import React, { useState } from "react";

export type SearchBarProps = {
  onSearch: (search: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(search);
    }
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      onSearch(search);
    }
  };

  return (
    <>
      <section className="flex justify-around items-center">
        <div>
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Search..."
            className="w-full pl-3 pr-3 py-1.5 border-gray-300 rounded-md bg-white text-gray-500 placeholder-gray-400 sm:text-xm md:text-lg lg:text-lg"
          />
        </div>
        <div>
          <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 pl-3 pr-3 py-1.5 ml-5 border border-gray-400 rounded-md shadow"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </section>
    </>
  );
};

export default SearchBar;
