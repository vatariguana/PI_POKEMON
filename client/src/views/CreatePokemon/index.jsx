import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTypes } from "../../redux/actions/tipo.actions";
import { Link } from "react-router-dom";
import { CreatePoke } from "../../redux/actions/pokemon.actions";
import "./style.css";

const CreatePokemon = () => {
  const [data, setData] = useState({
    name: "",
    // imagen: "",
    tipos: [],
    // id: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
  });

  const dispatch = useDispatch();
  const { pokemonType } = useSelector(({ tipoReducer }) => tipoReducer);

  useEffect(() => {
    dispatch(getAllTypes());
  }, []);

  const onChangeTypesPokemon = (event) => {
    const value = event.target.value;
    const objType = pokemonType.filter((item) => {
      return item.id === parseInt(value);
    });

    const auxiliarType = [];
    const validatePokemon = data.tipos.find((item) => {
      return objType[0].id === item.id;
    });

    if (validatePokemon) {
      alert("tipo de pokemon ya ingresado");
    } else {
      auxiliarType.push(objType[0], ...data.tipos);
      setData({
        ...data,
        tipos: auxiliarType,
      });
    }
  };
  const onChangeInputText = (event) => {
    const value = event.target.value;
    const esUnString = parseInt(value);
    if (value) {
      if (isNaN(esUnString)) {
        setData({
          ...data,
          name: value,
        });
      } else {
        alert("el nombre no es un string");
      }
    } else {
      alert("Ingrese un nombre");
    }
  };

  const onChangeInputNumber = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setData({
      ...data,
      [inputName]: value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const ver = data.tipos;
    data.tipo = data.tipos;
    //console.log("data.tipo", data.tipo);
    if (ver.length === 0) {
      alert("ingrese tipo de pokemon");
    } else {
      // console.log("exito");
      dispatch(CreatePoke(data));
      alert("pokemon creado");
    }
  };

  return (
    <div className="divPrincipal">
      <form onSubmit={onSubmitForm} className="form">
        <div className="divHome">
          <Link to="/home">
            <button className="homeButt">Home</button>
          </Link>
        </div>

        <h3>Crear nuevo Pokemon</h3>
        <label>
          Nombre:
          <input
            onChange={onChangeInputText}
            id="name"
            type="text"
            name="name"
            placeholder="Nombre..."
            required
          />
        </label>

        {/* <label>Imagen:</label>
        <input type="file" id="myfile" name="myfile" /> */}
        <br></br>
        <label>Tipo</label>
        <select onChange={onChangeTypesPokemon} required>
          {/* <option value="">Buscar por:</option> */}
          <option value="tiposPokemon">Seleccione tipo de pokemon</option>
          {pokemonType.map((item) => {
            return (
              <option value={item.id} className="tipos">
                {item.name}
              </option>
            );
          })}
        </select>
        {data.tipos?.map((item) => {
          return <h3 className="tiposCuadro">{item?.name}</h3>;
        })}

        <br></br>
        <label>
          Vida:
          <input
            onChange={onChangeInputNumber}
            id="vida"
            type="number"
            name="vida"
            min="0"
            max="100"
            placeholder="Vida..."
            required
          />
        </label>
        <br></br>
        <label>
          Fuerza:
          <input
            onChange={onChangeInputNumber}
            id="fuerza"
            type="number"
            name="fuerza"
            placeholder="Fuerza..."
            required
          />
        </label>
        <br></br>
        <label>
          Defensa:
          <input
            onChange={onChangeInputNumber}
            id="defensa"
            type="number"
            name="defensa"
            placeholder="Defensa..."
            // min="0"
            // max="100"
            required
          />
        </label>
        <br></br>
        <label>
          Velocidad:
          <input
            onChange={onChangeInputNumber}
            id="velocidad"
            type="number"
            name="velocidad"
            placeholder="Velocidad..."
            // min="1"
            // max="100"
            required
          />
        </label>
        <br></br>
        <label>
          Altura:
          <input
            onChange={onChangeInputNumber}
            id="altura"
            type="number"
            name="altura"
            placeholder="Altura..."
            // min="1"
            // max="100"
            required
          />
        </label>
        <br></br>
        <label>
          Peso:
          <input
            onChange={onChangeInputNumber}
            id="peso"
            type="number"
            name="peso"
            placeholder="Peso..."
            // min="1"
            // max="100"
            required
          />
        </label>
        <label className="enviar">
          <input id="botonEnvio" type="submit" value="Crear"></input>
        </label>
      </form>
    </div>
  );
};

export default CreatePokemon;
