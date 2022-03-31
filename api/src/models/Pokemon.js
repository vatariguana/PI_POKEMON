const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
     id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida:{
      type: DataTypes.INTEGER,
    },
    fuerza:{
      type: DataTypes.INTEGER,
    },
    defensa:{
      type: DataTypes.INTEGER,
    },
    velocidad:{
      type: DataTypes.INTEGER,
    },
    altura:{
      type: DataTypes.FLOAT,
    },
    peso:{
      type: DataTypes.FLOAT,
    },

    createBdId: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });
};
