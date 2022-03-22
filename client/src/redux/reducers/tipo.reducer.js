const initialState = {
    isLoading: false,
    pokemonType: [],
    errors: null,
    
  };
  
  function tipoReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_ALL_LOADING_TYPE":
        return {
          ...state,
          isLoading: true,
          pokemons: null,
          errors: null,
        };
      
      case "TYPE_POKEMON":
        return {
          ...state,
          pokemonType: action.payload
        };
      
      case "GET_ALL_ERRORS_TYPE":
        return {
          ...state,
          isLoading: false,
          errors: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default tipoReducer;
  