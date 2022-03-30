import React, { useState } from "react";
import { getPokemonsName } from "../../redux/actions/pokemon.actions";
import { useDispatch } from "react-redux";
import "./styles.css";
const SearchName = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("NAME:", name);
    dispatch(getPokemonsName(name));
  };

  return (
    <div className="searchS">
      <form className="formS" onSubmit={onSubmit}>
        <div className="divSearch">
          <input
            className="inputS"
            type="search"
            id="search"
            onChange={handleInputChange}
            value={name}
            placeholder="Encuentra tu pokemon..."
          />
          <button className="buttonS" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchName;
