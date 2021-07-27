
module.exports = (sequelize, DataTypes) => {
  const Term = sequelize.define('term', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    shortdef: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    longdef: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    coiner: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Term;
};
