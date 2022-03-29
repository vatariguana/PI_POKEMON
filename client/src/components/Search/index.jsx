import React, { useState } from "react";
import { getPokemonsName } from "../../redux/actions/pokemon.actions";
import { useDispatch } from "react-redux";

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
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          id="search"
          onChange={handleInputChange}
          value={name}
          placeholder="Encuentra tu pokemon..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchName;
