import {combineReducers} from "redux";
import pokemonReducer from "./pokemon.reducer";
import tipoReducer from "./tipo.reducer";
//import pokenameReducer from "./pokename.reducers"

const rootReducer = combineReducers({
    pokemonReducer,
    tipoReducer
   // pokenameReducer,

})

export default rootReducer;
