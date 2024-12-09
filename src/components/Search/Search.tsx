import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import "./Search.css";

interface SearchProps {
  onSearch: (id: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.trim()) {
      navigate(`?id=${input}`);
      onSearch(input.trim());
    }
  };

  return (
    <div className="search">
      <div className="search-header">
        <img src={require("../../assets/location.png")} alt="Bosta Logo" height={'120px'}/>
        <h1>تتبع شحنتك</h1>
        <p>.جميع تحديثات الشحنة ستكون متاحة من خلال هذا الرابط</p>
      </div>
      <div className="search-container">
        <button className="search-icon" onClick={handleSearch}>
          <CiSearch className="lens-icon" />
        </button>
        {/* <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter ID"
      /> */}
        <TextField
          onChange={(e) => setInput(e.target.value)}
          value={input}
          id="outlined-basic"
          placeholder="رقم التتبع"
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default Search;
