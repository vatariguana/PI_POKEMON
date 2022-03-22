const initialState = {
  isLoading: false,
  pokemons: null,
  errors: null,
  pokemonId: []
};

function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_LOADING":
      return {
        ...state,
        isLoading: true,
        pokemons: null,
        errors: null,
      };
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        isLoading: false,
        pokemons: action.payload,
      };
    case "GET_ALL_POKEMONSID":
      return {
        ...state,
        pokemonType: action.payload
      };
     case "GET_POKEMONS_NAME":
      return{
        ...state,
        isLoading: false,
        pokemonId: action.payload
      } 
    case "GET_ALL_ERRORS":
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}

export default pokemonReducer;
