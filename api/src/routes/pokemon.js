const express = require("express");
const router = express.Router();
const axios = require("axios");
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
      types: typePokemon,
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
  const allBd = await bdPoke(); // traer los datos de mi base de datos
  console.log("bdd", allBd)
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
  } catch (error) {

  }
};

const getOneBd = async (search) => {
  const isBdID = search.split("-")[1];
  console.log("=====>", search)
  if (isBdID) {
    const bdDetallePokeId = await Pokemon.findByPk(search);
    
    if (bdDetallePokeId) {
      const tiposPokemones = await Pokemon.findAll({   
        where: {
          id: search,
        },
        include: {    
          model: Tipo,
          atributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      });
      const bdPoke = {
        id: tiposPokemones[0].dataValues.id,
        name: tiposPokemones[0].dataValues.name,
        //imagen: tiposPokemones[0].dataValues.sprites.front_default,
        vida: tiposPokemones[0].dataValues.vida,
        //tipos: tiposPokemones[0].dataValues.types.map(e=> e.type.name),
        types: tiposPokemones[0].dataValues.tipos,
        // le quite el comentado a tipos
        fuerza: tiposPokemones[0].dataValues.fuerza,
        defensa: tiposPokemones[0].dataValues.defensa,
        //ojo defenza por defensa
        velocidad: tiposPokemones[0].dataValues.velocidad,
        altura: tiposPokemones[0].dataValues.altura,
        peso: tiposPokemones[0].dataValues.peso,
        
      };

      // console.log("0------>", bdDetallePokeId)
      // const bdPoke = {
      //   id: bdDetallePokeId.dataValues.id,
      //   name: bdDetallePokeId.dataValues.name,
      //   //imagen: bdDetallePokeId.dataValues.sprites.front_default,
      //   vida: bdDetallePokeId.dataValues.vida,
      //   //tipos: bdDetallePokeId.dataValues.types.map(e=> e.type.name),
      //   types: bdDetallePokeId.dataValues.tipos,
      //   // le quite el comentado a tipos
      //   fuerza: bdDetallePokeId.dataValues.fuerza,
      //   defensa: bdDetallePokeId.dataValues.defensa,
      //   //ojo defenza por defensa
      //   velocidad: bdDetallePokeId.dataValues.velocidad,
      //   altura: bdDetallePokeId.dataValues.altura,
      //   peso: bdDetallePokeId.dataValues.peso,
        
      // };
      
      return bdPoke;
    }
  } else {
    if (!parseInt(search)) {
      const bdDetallePokeName = await Pokemon.findAll({
        where: {
          name: search,
        },
      });
      if (bdDetallePokeName.length > 0) {
        const response = bdDetallePokeName[0];
        const objResponse = Object.values(response);
        const finalResponse = objResponse[0];
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
      }else{
        return null
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
  console.log("ONE POKEMN", onePokemon)
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
    res.status(404).json({message: "pokemon ingresado no existe"});
  }
});

// create new pokemon
router.post("/pokemons", async (req, res) => {
  const { id, name, vida, fuerza, defensa, velocidad, altura, peso, tipo } = req.body;

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

    // hacer loop que recorra tipo y para cada item de tipo haga
    for(let i=0; i < tipo.length; i++){
      const dataTipo = await Tipo.findAll({
        where: {
          name: tipo[i].name,
        },
      });
      
  
      await newPoke.addTipo(dataTipo, {
        through: "tipo_pokemon",
      });
    }
    res.status(200).json(newPoke);
  } catch (error) {
    res.send(" error no se pudoooo crear ");
  }
});

module.exports = router;
