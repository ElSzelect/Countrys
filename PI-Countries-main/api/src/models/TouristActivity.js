const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "TouristActivity",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        
      },
      difficulty: {
        type: DataTypes.INTEGER,
        
        validate: {
          min: 1,
          max: 5,
        },
        defaultValue: 1,
      },
      duration: {
        type: DataTypes.INTEGER,
        validate:{
          min: 0
        }
      },
      season: {
        type: DataTypes.ENUM('summer','fall','winter','spring'),
        
        //(Verano, Otoño, Invierno o Primavera)
      },
    },
    
  );
};
