import React from "react";

const PaginadoPokemon = ({ pokemonsPerPage, paginado, onChange }) => {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(paginado / pokemonsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {}
        {pageNumber?.map((number) => {
          return (
            <li key={number}>
              <button onClick={() => onChange(number)} key={number}>
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PaginadoPokemon;
