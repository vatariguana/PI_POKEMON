const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Tipo } = require("../db");

const getAllTypesAPI = async () => {
    const allTypes = await axios.get("https://pokeapi.co/api/v2/type");
    const allTypesApi = allTypes.data.results;
    return allTypesApi
};


// obtener todos de la base de datos
const getAllTypesBD = async ()=>{
    return await Tipo.findAll();
}

const createTypeBD = async () => {
    const alltypesAPI = await getAllTypesAPI();
    alltypesAPI.forEach(elemento => {
        Tipo.create({
            name: elemento.name
        });
    });
    return true;
}

router.get("/type", async (req, res) => {
    try {
     const allTypesBD = await getAllTypesBD();
    if(allTypesBD.length === 0) {  
       const createType = await createTypeBD();
       if(createType){
            const allTypesBD = await getAllTypesBD();
            res.status(200).json(allTypesBD); 
       }
    }else{
        res.status(200).json(allTypesBD); 
       
    }
    } catch (error) {
        
        res.status(404).send("Not Found")
        
    }
});

module.exports = router;
