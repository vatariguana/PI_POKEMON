const express = require("express");
const router = express.Router();
const axios = require("axios");
//const {allPoke} = require("./functions");
const { Pokemon, Tipo } = require("../db");

const getAllPokemons = async () => {
  const info = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
  const pokemonesAPI = info.data.results;
  const pokemones = [];
  for (let i = 0; i < pokemonesAPI.length; i++) {
    const nombrePokemon = pokemonesAPI[i].name;
    const detallePokemon = await axios.get(pokemonesAPI[i].url);
    const imagenPokemon = detallePokemon.data.sprites.front_default;
    const types = detallePokemon.data.types; // tipos de pokemon (array)
    const typePokemon = types.map((item)=> item.type)
    const fuerzaPokemonApi = detallePokemon.data.stats[1].base_stat
    //console.log(detallePokemon.data.stats[1].base_stat, "fuerza")
    //console.log(typePokemon, "hola linea 17 tipo pokemon")
    const idPokemon = detallePokemon.data.id;
    const pokemon = {
      id: idPokemon,
      name: nombrePokemon,
      imagen: imagenPokemon,
      tipos: typePokemon,
      createBdId: false,
      fuerza: fuerzaPokemonApi,
    };
    pokemones.push(pokemon);
  }
  return pokemones;
};

const bdPoke = async () => {
  return await Pokemon.findAll({
    include: {
      model: Tipo,
      atributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });

  // sino buscar en la base de datos y comparar con allPokemonsApi
  /*for(let i = 0; i < allPokemonsApi.length; i++){
        const agregar = await Pokemon.findOrCreate({
            where:{
                id: infoPoke[i].idPokemon,
                name:infoPoke[i].nombrePokemon,
                vida:infoPoke[i].stats[0].base_stat,
                fuerza:infoPoke[i].fuerza,
                defensa:infoPoke[i].defensa,
                velocidad:infoPoke[i].velocidad,
                peso:infoPoke[i].peso,
            }
        })
    }*/
};

const allPoke = async () => {
  const allPokemonsApi = await getAllPokemons(); // traer los datos del API
  const allBd = await bdPoke(allPokemonsApi); // traer los datos de mi base de datos
  const resultadoPoke = [...allPokemonsApi, ...allBd];
  return resultadoPoke;
};

const getOnePokemon = async (id) => {
  try {
    const detallePokeId = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const detalleId = {
      id: detallePokeId.data.id,
      name: detallePokeId.data.name,
      imagen: detallePokeId.data.sprites.front_default,
      vida: detallePokeId.data.stats[0].base_stat,
      types: detallePokeId.data.types.map((e) => e.type),
      fuerza: detallePokeId.data.stats[1].base_stat,
      defensa: detallePokeId.data.stats[2].base_stat,
      velocidad: detallePokeId.data.stats[5].base_stat,
      altura: detallePokeId.data.height,
      peso: detallePokeId.data.weight,
    };
    return detalleId;
  } catch (error) {}
};

const getOneBd = async (search) => {
  const isBdID = search.split("-")[1];

  if (isBdID) {
    const bdDetallePokeId = await Pokemon.findByPk(search);
    console.log(bdDetallePokeId, "detallle poke idddssss")
    if (bdDetallePokeId) {
      const bdPoke = {
        id: bdDetallePokeId.dataValues.id,
        name: bdDetallePokeId.dataValues.name,
        //imagen: bdDetallePokeId.dataValues.sprites.front_default,
        vida: bdDetallePokeId.vida,
        //tipos: bdDetallePokeId.dataValues.types.map(e=> e.type.name),
        //tipos: bdDetallePokeId.dataValues.tipos,
        // le quite el comentado a tipos
        fuerza: bdDetallePokeId.dataValues.fuerza,
        defensa: bdDetallePokeId.dataValues.defensa,
        //ojo defenza por defensa
        velocidad: bdDetallePokeId.dataValues.velocidad,
        altura: bdDetallePokeId.dataValues.altura,
        peso: bdDetallePokeId.dataValues.peso,
      };
      return bdPoke;
    }
  } else {
    if (!parseInt(search)) {
      const bdDetallePokeName = await Pokemon.findAll({
        where: {
          name: search,
        },
      });
      if (bdDetallePokeName) {
        const response = bdDetallePokeName[0];
        const objResponse = Object.values(response);
        const finalResponse = objResponse[0];
        //console.log(finalResponse,"finalresponseeeee")
        //se cAe cuadno se envia otro nombre
        const bdPoke = {
          id: finalResponse.id,
          name: finalResponse.name,
          //imagen: finalResponse.sprites.front_default,
          vida: finalResponse.vida,
          //tipos: finalResponse.types.map(e=> e.type.name),
          //tipos: finalResponse.tipos,
          //le quite el comentado a tipos
          fuerza: finalResponse.fuerza,
          defensa: finalResponse.defensa,
          //ojo defenza por defensa
          velocidad: finalResponse.velocidad,
          altura: finalResponse.altura,
          peso: finalResponse.peso,
        };
        return bdPoke;
      }
    }
  }

  return null;
};
const onePoke = async (id) => {
  const onePokemonBd = await getOneBd(id); // traer los datos de mi base de datos
  const onePokemonApi = await getOnePokemon(id); // traer los datos del API
  const onePokemon = [];
  if (onePokemonBd && onePokemonApi) {
    onePokemon.push(onePokemonBd, onePokemonApi);
  } else if (onePokemonBd || onePokemonApi) {
    onePokemon.push(onePokemonBd || onePokemonApi);
  }

  return onePokemon;
};

// get all pokemons
router.get("/pokemons", async (req, res) => {
  try {
    const allPokemon = await allPoke();
    res.status(200).json(allPokemon);
  } catch (error) {
    return error;
  }
});

// get one pokemon by id or by name
router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const pokeOne = await onePoke(id);
  if (pokeOne.length > 0) {
    res.status(200).json(pokeOne);
  } else {
    res.status(404).json("no encontro");
  }
});

// create new pokemon
router.post("/pokemons", async (req, res) => {
  const { id, name, vida, fuerza, defensa, velocidad, altura, peso, tipo } =
  //ojo defenza por defensa
    req.body;

  const pokeExiste = await Pokemon.findOne({
    where: {
      name: name,
    },
  });

  if (pokeExiste) return res.json({ msg: "Pokemon existente" });

  try {
    const newPoke = await Pokemon.create({
      name,
      vida,
      fuerza,
      defensa,
      //defenza por defensa
      velocidad,
      altura,
      peso,
      id,

    });

    const dataTipo = await Tipo.findAll({
      where: {
        name: tipo,
      },
    });

    await newPoke.addTipo(dataTipo, {
      through: "tipo_pokemon",
    });
    res.status(200).json(newPoke);
  } catch (error) {
    res.send(" error no se pudoooo crear ");
  }
});

module.exports = router;
