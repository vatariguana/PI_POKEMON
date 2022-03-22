import axios from "axios";

export const getAllTypes = () => async (dispatch) => {
    dispatch({
      type:"GET_ALL_LOADING_TYPE"
    })
    try {
      const response = await axios.get("http://localhost:3001/type");
      dispatch({
        type: "TYPE_POKEMON",
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: "GET_ALL_ERRORS_TYPE",
        payload: {
          title: "ERROR",
          message: "ALGO FALLO",
        },
      })
    }
  };