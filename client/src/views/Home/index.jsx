import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search";
import Filtro from "../../components/Filtro";
import Table from "../../components/Table";
import {
  getAllPokemons,
  getAllPokemonId,
} from "../../redux/actions/pokemon.actions";
import { getAllTypes } from "../../redux/actions/tipo.actions";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons, isLoading, pokemonId } = useSelector(
    ({ pokemonReducer }) => pokemonReducer
  );
  const { pokemonType } = useSelector(({ tipoReducer }) => tipoReducer);

  // const [type, setType] = useState("");
  const [pokemonTable, setPokemonTable] = useState([]);
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, []);

  useEffect(() => {
    if (pokemons) {
      setPokemonTable(pokemons);
    }
  }, [isLoading]);

  const onChangeType = (event) => {
    const value = event.target.value;
    let temporalPokemonTable = [];
    temporalPokemonTable = pokemons.filter((item) => {
      if (item.tipos.includes(value)) {
        return item;
      }
    });
    if (value) {
      setPokemonTable(temporalPokemonTable);
    } else {
      setPokemonTable(pokemons);
    }
  };

  const onChangeApiCreated = (event) => {
    const value = event.target.value;
    let temporalExist = [];
    let temporalCreated = [];
    pokemons.map((item) => {
      if (item.createBdId) {
        temporalCreated.push(item);
      } else {
        temporalExist.push(item);
      }
    });
    if (value === "created") {
      setPokemonTable(temporalCreated);
    } else if (value === "exist") {
      setPokemonTable(temporalExist);
    } else {
      setPokemonTable(pokemons);
    }
  };
  const onChangeAscDesc = (event) => {
    const value = event.target.value;
    const pokemonTableAux = [...pokemonTable];
    const order = pokemonTableAux.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });

    if (value === "asc") {
      setPokemonTable(order);
    } else if (value === "des") {
      setPokemonTable(order.reverse());
    } else {
      setPokemonTable(pokemons);
    }
  };

  const onChangeFuerza = (event) => {
    const value = event.target.value;
    const pokemonTableAux = [...pokemonTable];
    const order = pokemonTableAux.sort((a, b) => {
      return a.fuerza - b.fuerza;
    });
    if (value === "menor_mayor") {
      setPokemonTable(order);
    } else if (value === "mayor_menor") {
      setPokemonTable(order.reverse());
    } else {
      setPokemonTable(pokemons);
    }
  };

  const headers = [
    {
      label: "Imagen",
      key: "imagen",
      isArray: false,
    },
    {
      label: "Nombre",
      key: "name",
      isArray: false,
    },
    {
      label: "Tipo",
      key: "tipos",
      isArray: true,
    },
    {
      label: "Fuerza",
      key: "fuerza",
      isArray: false,
    },
  ];

  return (
    <div>
      <Search />
      <Filtro
        onChangeType={onChangeType}
        pokemonType={pokemonType}
        onChangeApiCreated={onChangeApiCreated}
        onChangeAscDesc={onChangeAscDesc}
        onChangeFuerza={onChangeFuerza}
      />
      <Table headers={headers} data={pokemonTable} />
    </div>
  );
};

export default Home;
