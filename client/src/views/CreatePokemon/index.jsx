import React, { useState } from "react";

// const [data, setData] = useState({
//   nombre: "",
//   imagen: "",
//   tipos: "",
//   id: "",
//   vida: "",
//   fuerza: "",
//   defensa: "",
//   velocidad: "",
//   altura: "",
//   peso: "",
// });

const CreatePokemon = () => {
  return (
    <div>
      <form>
        <h2>Crear nuevo Pokemon</h2>
        <label>
          Nombre:
          <input id="" type="text" name="nombre" />
        </label>
        <br></br>
        <label>
          Imagen:
          <input />
        </label>
        <br></br>
        <label>
          Tipos:
          <input />
        </label>
        <br></br>
        <label>
          Id:
          <input />
        </label>
        <br></br>

        <label>
          Vida:
          <input />
        </label>
        <br></br>
        <label>
          Fuerza:
          <input />
        </label>
        <br></br>
        <label>
          Defensa:
          <input />
        </label>
        <br></br>
        <label>
          Velocidad:
          <input />
        </label>
        <br></br>
        <label>
          Altura:
          <input />
        </label>
        <br></br>
        <label>
          Peso:
          <input />
        </label>
        <label>
          <input id="botonEnvio" type="submit" value="Crear"></input>
        </label>
      </form>
    </div>
  );
};

export default CreatePokemon;
