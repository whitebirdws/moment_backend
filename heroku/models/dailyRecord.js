const Sequelize = require("sequelize");

module.exports = class DailyRecord extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "DailyRecord",
        tableName: "dailyrecords",
        paranoid: "false",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.DailyRecord.belongsTo(db.User, {
      foreignKey: "write_user",
      targetKey: "id",
    });
  }
};
