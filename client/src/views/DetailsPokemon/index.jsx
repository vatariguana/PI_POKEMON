import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { getAllPokemonId } from "../../redux/actions/pokemon.actions";
import "./styles.css";
const DetailsPokemon = () => {
  const dispatch = useDispatch();
  const { isLoading, pokemonId } = useSelector(
    ({ pokemonReducer }) => pokemonReducer
  );
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getAllPokemonId(id));
  }, []);
  console.log("pokemonid", pokemonId);
  const auxTipos = pokemonId?.tipos?.map((element) => {
    return <p key={element.name}>{element.name}</p>;
  });

  return (
    <div className="detailsPokemon">
      <Link to="/home">
        <button>Home</button>
      </Link>
      {pokemonId?.imagen && (
        <div className="imageInfo">
          <img
            className="imagen"
            src={`${pokemonId?.imagen}`}
            alt="imagenDetalle"
          />
        </div>
      )}

      <div className="contenedorInfo">
        <h3 className="info">{`Name: ${pokemonId?.name}`}</h3>
        <h3 className="info">Tipos:</h3>
        {auxTipos}
        <h3 className="info">{`Id: ${pokemonId?.id}`}</h3>
        <h3 className="info">{`Vida: ${pokemonId?.vida}`}</h3>
        <h3 className="info">{`Fuerza: ${pokemonId?.fuerza}`}</h3>
        <h3 className="info">{`Defensa: ${pokemonId?.defensa}`}</h3>
        <h3 className="info">{`Velocidad: ${pokemonId?.velocidad}`}</h3>
        <h3 className="info">{`Altura: ${pokemonId?.altura}`}</h3>
        <h3 className="info">{`Peso: ${pokemonId?.peso}`}</h3>
      </div>
    </div>
  );
};

export default DetailsPokemon;
