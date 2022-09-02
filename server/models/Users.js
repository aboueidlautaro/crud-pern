module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "regular",
      },
      favs: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["username"],
        },
      ],
    }
  );
  users.associate = (models) => {
    users.hasMany(models.articles, {
      onDelete: "cascade",
    });
  };

  return users;
};
