import axios from "axios";

export const getAllPokemons = () => async (dispatch) => {
  dispatch({
    type:"GET_ALL_LOADING"
  })
  try {
    const response = await axios.get("http://localhost:3001/pokemons");
    const actualizado = response.data.map((item) =>{
      if(item?.tipos){
        const types = item.tipos;
        delete item["tipos"];
        return {
          ...item,
          types,
        }
      }else {
        return item
      }
      
    })
    console.log("actualizao es", actualizado)
    dispatch({
      type: "GET_ALL_POKEMONS",
      payload: actualizado,
    })
  } catch (error) {
    dispatch({
      type: "GET_ALL_ERRORS",
      payload: {
        title: "ERROR",
        message: "ALGO FALLO",
      },
    })
  }
};

export const getPokemonsName = (name)=> async(dispatch)=>{
  dispatch({
    type:"GET_ALL_LOADING"
  })
  try {
    const response = await axios.get(`http://localhost:3001/pokemons/${name}`);
    console.log("RESPONSE",response)
    dispatch({
      type: "GET_ALL_POKEMONS",
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: "GET_ALL_ERRORS",
      payload: {
        title: "ERROR",
        message: "Pokemon no Encontrado por nombre",
      },
    })
  }
}

export const getAllPokemonId = (id) => async (dispatch) => {
  console.log("ID enviado", id)
  dispatch({
    type:"GET_ALL_LOADING"
  })
  try {
    const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
    console.log("respsonse one pokemon", response.data)
    dispatch({
      type: "GET_ONE_POKEMONSID",
      payload: response.data[0],
    })
  } catch (error) {
    dispatch({
      type: "GET_ALL_ERRORS",
      payload: {
        title: "ERROR",
        message: "ALGO FALLO",
      },
    })
  }
};

export const CreatePoke = (data)=> async(dispatch)=>{

  dispatch({
    type:"GET_ALL_LOADING"
  })
  try {
    const response = await axios.post(`http://localhost:3001/pokemons`, data);
    dispatch({
      type: "POST_CREATE_POKE",
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: "GET_ALL_ERRORS",
      payload: {
        title: "ERROR",
        message: "ALGO FALLO",
      },
    })
  }


}

