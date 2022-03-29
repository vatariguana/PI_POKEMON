import React from "react";
import "./styles.css";

const PaginadoPokemon = ({ pokemonsPerPage, paginado, onChange }) => {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(paginado / pokemonsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav className="paginadoNav">
      <ul className="paginadoUl">
        {}
        {pageNumber?.map((number) => {
          return (
            <li className="paginadoLi" key={number}>
              <button
                className="paginadoBot"
                onClick={() => onChange(number)}
                key={number}
              >
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
