
module.exports = (sequelize, DataTypes) => {
  const Catagory = sequelize.define('catagory', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  return Catagory;
};
