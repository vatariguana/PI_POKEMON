import axios from "axios";

export const getAllPokemons = () => async (dispatch) => {
  dispatch({
    type:"GET_ALL_LOADING"
  })
  try {
    const response = await axios.get("http://localhost:3001/pokemons");
    dispatch({
      type: "GET_ALL_POKEMONS",
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
};

export const getPokemonsName = (name)=> async(dispatch)=>{
  dispatch({
    type:"GET_ALL_LOADING"
  })
  try {
    const response = await axios.get(`http://localhost:3001/pokemons/${name}`);
    dispatch({
      type: "GET_ALL_POKEMONS",
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

export const getAllPokemonId = (id) => async (dispatch) => {
  dispatch({
    type:"GET_ALL_LOADING"
  })
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    dispatch({
      type: "GET_ALL_POKEMONSID",
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
};


