import React, { useEffect, useState } from "react";
import { getAllTypes } from "../../redux/actions/tipo.actions";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
const Filtro = (props) => {
  const {
    onChangeType,
    pokemonType,
    onChangeApiCreated,
    onChangeAscDesc,
    onChangeFuerza,
  } = props;
  return (
    <div className="filtroP">
      <select className="filtroSelect" onChange={onChangeType}>
        <option value="">Buscar por tipo de pokemon</option>
        {pokemonType.map((index) => {
          return <option value={index.name}>{index.name}</option>;
        })}
      </select>

      <select className="filtroSelect" onChange={onChangeApiCreated}>
        <option value="">Buscar por:</option>
        <option value="exist">Pokemon Existente</option>
        <option value="created">Pokemon Creado</option>
      </select>
      <select className="filtroSelect" onChange={onChangeAscDesc}>
        <option value="">Buscar</option>
        <option value="asc">Ascendente</option>
        <option value="des">Descendente</option>
      </select>
      <select className="filtroSelect" onChange={onChangeFuerza}>
        <option value="">Selecione</option>
        <option value="menor_mayor">menor a mayor</option>
        <option value="mayor_menor">mayor a menor</option>
      </select>
    </div>
  );
};

export default Filtro;
