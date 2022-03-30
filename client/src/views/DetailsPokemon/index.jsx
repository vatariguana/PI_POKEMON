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
  console.log("ID", id);
  useEffect(() => {
    dispatch(getAllPokemonId(id));
  }, []);
  console.log("pokemonid", pokemonId);
  const auxTipos = pokemonId?.types?.map((element) => {
    return (
      <div className="parrafo">
        <label className="labelP" key={element.name}>
          {element.name}
        </label>
      </div>
    );
  });

  return (
    <div className="detailsPokemon">
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
        <div className="searchDiv">
          <Link to="/home">
            <button className="homeD">Home</button>
          </Link>
        </div>

        <label className="info">{`Name: ${pokemonId?.name}`}</label>
        <label className="info">Tipos:</label>
        {auxTipos}
        <label className="info">{`Id: ${pokemonId?.id}`}</label>
        <label className="info">{`Vida: ${pokemonId?.vida}`}</label>
        <label className="info">{`Fuerza: ${pokemonId?.fuerza}`}</label>
        <label className="info">{`Defensa: ${pokemonId?.defensa}`}</label>
        <label className="info">{`Velocidad: ${pokemonId?.velocidad}`}</label>
        <label className="info">{`Altura: ${pokemonId?.altura}`}</label>
        <label className="info">{`Peso: ${pokemonId?.peso}`}</label>
      </div>
    </div>
  );
};

export default DetailsPokemon;
