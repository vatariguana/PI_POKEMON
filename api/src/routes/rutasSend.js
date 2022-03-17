const { Router } = require("express");
const { Pokemon, Tipo } = require("../db.js");
const { getAllPokemons,
    bdPoke,
    allPoke,
    pokeId,
    getAllTypes } = require("../routes/rutas");

const router = Router();

router.get('/', async(req, res)=>{
    let {name} = req.query;
    try {
        const allPoke = await allPoke();
    if(name){
        const namePoke = await allPoke.filter(e => e.name.toLowerCase() === name.toLowerCase());
        if(namePoke.length){
            res.status(200).json(namePoke);
        } else {
            res.status(404).send('No se encontro');
        }
    }else{
        res.status(200).json(allPoke);
    }
        
    } catch (error) {
        return (error)
    }
})
