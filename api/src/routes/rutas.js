const axios = require('axios');
const {Pokemon, Tipo} = require('../../src/db');

const pokeName = async (name)=>{
    const namePokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const detalleNameApi= {
        id: namePokeApi.data.id,
        name: namePokeApi.data.name,
        tipo: namePokeApi.data.types.map(e=> e.type.name),
        //imagen:namePokeApi.data,
    }
    return detalleNameApi
}

const pokeNameBd = async (name)=>{
    const namePokeBd = await Pokemon.findOne({
        where:{
            name: name,
        }
    })
    if(namePokeBd){
        const pokeNameBD ={
            id: namePokeBd.id,
            name: namePokeBd.name,

        }
        return pokeNameBD;
    }
}

const allPokeName = async(name)=>{
    const namePokeA = await pokeName(name);
    const namePokeB = await pokeNameBd(name);
    const allNames = [...namePokeA, ...namePokeB];
    return allNames
}

router.get("/pokemons/:name", async(req, res)=>{
    const {name} = req.params;
    const pokeOneName = await allPokeName(name);
    console.log("hola", pokeOneName)
    res.status(200).json(pokeOneName);

})

const pokeId = async(id)=>{
    try {
        const detallePokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const detalleId = {
            id: detallePokeId.data.id,
            name: detallePokeId.data.name,
            imagen: detallePokeId.data.sprites.front_default,
            vida:detallePokeId.data.stats[0].base_stat,
            types: detallePokeId.data.types.map(e=> e.type.name),
            fuerza: detallePokeId.data.stats[1].base_stat,
            defensa:detallePokeId.data.stats[2].base_stat,
            velocidad:detallePokeId.data.stats[5].base_stat,
            altura: detallePokeId.data.height,
            peso: detallePokeId.data.weight,
        }
        return detalleId;
        
    } catch (error) {}

    try {
        const bdDetallePokeId = await Pokemon.findByPk(id,{include:{model :Tipo}});
        const bdPoke = {
            id: bdDetallePokeId.data.id,
            name: bdDetallePokeId.data.name,
            imagen: bdDetallePokeId.data.sprites.front_default,
            vida:bdDetallePokeId.vida,
            types: bdDetallePokeId.data.types.map(e=> e.type.name),
            fuerza: bdDetallePokeId.data.stats[1].base_stat,
            defensa:bdDetallePokeId.data.stats[2].base_stat,
            velocidad:bdDetallePokeId.data.stats[5].base_stat,
            altura: bdDetallePokeId.data.height,
            peso: bdDetallePokeId.data.weight,
        }
    } catch (error) {
        
    }
    
}



module.exports = {
    getAllPokemons,
    bdPoke,
    allPoke,
    pokeId,
    getAllTypes,
}