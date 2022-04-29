const Sequelize = require("sequelize");

module.exports = class Schedule extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        list_description: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        filter_year: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        filter_month: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        filter_date: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Schedule",
        tableName: "schedules",
        paranoid: "false",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Schedule.belongsTo(db.User, {
      foreignKey: "manager_user",
      targetKey: "id",
    });
  }
};
