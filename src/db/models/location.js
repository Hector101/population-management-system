'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    malePopulation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    femalePopulation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalPopulation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parentId: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {});
  location.associate = function(models) {
    // associations can be defined here
  };
  return location;
};