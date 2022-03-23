import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllPokemonId } from "../../redux/actions/pokemon.actions";
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
  console.log("pokemonId", pokemonId);
  let auxTipos = "";
  pokemonId?.types?.forEach((element) => {
    auxTipos = auxTipos + element;
  });
  //   console.log(auxTipos, "auxTipos");
  return (
    <div>
      <h3>{`name: ${pokemonId?.name}`}</h3>
      <img src={`${pokemonId?.imagen}`} alt="imagenDetalle" />
      <h3>{`tipos: ${auxTipos}`}</h3>
      <h3>{`id: ${pokemonId?.id}`}</h3>
      <h3>{`vida: ${pokemonId?.vida}`}</h3>
      <h3>{`fuerza: ${pokemonId?.fuerza}`}</h3>
      <h3>{`defensa: ${pokemonId?.defensa}`}</h3>
      <h3>{`velocidad: ${pokemonId?.velocidad}`}</h3>
      <h3>{`altura: ${pokemonId?.altura}`}</h3>
      <h3>{`peso: ${pokemonId?.peso}`}</h3>
    </div>
  );
};

export default DetailsPokemon;
