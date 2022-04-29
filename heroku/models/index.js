"use strict";

const fs = require("fs");
const DailyRecord = require("./dailyRecord");
const Schedule = require("./schedule");
const User = require("./user");

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

db.User = User;
db.DailyRecord = DailyRecord;
db.Schedule = Schedule;

User.init(sequelize);
DailyRecord.init(sequelize);
Schedule.init(sequelize);

User.associate(db);
DailyRecord.associate(db);
Schedule.associate(db);

module.exports = db;
