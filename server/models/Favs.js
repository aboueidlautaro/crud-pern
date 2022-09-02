module.exports = (sequelize, DataTypes) => {
  const favs = sequelize.define("favs", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favs: {
      type: DataTypes.INTEGER,
    },
  });

  return favs;
};
