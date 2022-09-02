module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define("articles", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  articles.associate = (models) => {
    articles.belongsTo(models.favs, {
      onDelete: "cascade",
    });
  };

  return articles;
};
