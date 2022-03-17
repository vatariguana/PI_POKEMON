
const getAllPokemons = async () => {
    const info = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    const pokemonesAPI = info.data.results;
    console.log("linea 8", pokemonesAPI)
    const pokemones = [];
    for(let i=0; i< pokemonesAPI.length; i++){
        const nombrePokemon = pokemonesAPI[i].name;
        const detallePokemon = await axios.get(pokemonesAPI[i].url);
        const imagenPokemon = detallePokemon.sprites.front_default;
        const idPokemon = detallePokemon.id;
        const pokemon = {
            id: idPokemon,
            name: nombrePokemon,
            image: imagenPokemon,
        };
        pokemones.push(pokemon)
    }  
    return pokemones;  
}

const bdPoke = async()=>{
    const infoBd = await Pokemon.findAll();
    if(infoBd.length != 0)return infoBd;
    const infoPoke = await getAllPokemons();
    for(let i = 0; i < infoPoke.length; i++){
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
    }
}

const allPoke = async ()=>{
    const allApi = await getAllPokemons();
    const allBd =  await bdPoke();
    const resultadoPoke =  allApi.concat(allBd);
    return resultadoPoke;
}
module.exports = {
 allPoke,
} 