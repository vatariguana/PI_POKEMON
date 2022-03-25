import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search";
import Filtro from "../../components/Filtro";
import Table from "../../components/Table";
import { getAllPokemons } from "../../redux/actions/pokemon.actions";
import { getAllTypes } from "../../redux/actions/tipo.actions";
import { Link } from "react-router-dom";
import PaginadoPokemon from "../../components/Paginado";
const Home = () => {
  const dispatch = useDispatch();
  const { pokemons, isLoading } = useSelector(
    ({ pokemonReducer }) => pokemonReducer
  );
  const { pokemonType } = useSelector(({ tipoReducer }) => tipoReducer);

  const [pokemonTable, setPokemonTable] = useState([]);
  const [paginado, setPaginado] = useState(1);
  // paginado
  const [paginaActual, setPaginaActual] = useState(1); //estados locales
  // const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const pokemonsPerPage = 2;
  const indexOfLastPokemon = paginaActual * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const pokemonsPaginaActual = pokemons?.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const onChangePaginado = (pageNumber) => {
    console.log(pageNumber, "pagenumber");
    setPaginaActual(pageNumber);
  };
  useEffect(() => {
    setPokemonTable(pokemonsPaginaActual);
  }, [paginaActual]);

  // const [type, setType] = useState("");
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, []);

  useEffect(() => {
    if (pokemonsPaginaActual && !isLoading) {
      setPokemonTable(pokemonsPaginaActual);
      // cambien en el set pokemons por pokemonsPaginaActual
    }
  }, [isLoading]);

  useEffect(() => {
    if (pokemons) {
      console.log("paginado", pokemons?.length);
      setPaginado(pokemons?.length);
    }
  }, [pokemons]);

  const onChangeType = (event) => {
    const value = event.target.value;
    let temporalPokemonTable = [];
    temporalPokemonTable = pokemons.filter((item) => {
      const findTipes = item.tipos.find((type) => {
        return type.name === value;
      });
      if (findTipes) {
        return item;
      }
    });
    const filtroType = temporalPokemonTable?.slice(
      indexOfFirstPokemon,
      indexOfLastPokemon
    );

    if (value) {
      setPokemonTable(filtroType);
    } else {
      setPokemonTable(pokemons);
    }
    setPaginaActual(1);
    setPaginado(temporalPokemonTable?.length);
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
      <Link to="/home/new">
        <button>Create</button>
      </Link>
      <Search />
      <Filtro
        onChangeType={onChangeType}
        pokemonType={pokemonType}
        onChangeApiCreated={onChangeApiCreated}
        onChangeAscDesc={onChangeAscDesc}
        onChangeFuerza={onChangeFuerza}
      />
      <Table headers={headers} data={pokemonTable} />
      <PaginadoPokemon
        pokemonsPerPage={pokemonsPerPage}
        paginado={paginado}
        onChange={onChangePaginado}
      />
      ;
    </div>
  );
};

export default Home;
