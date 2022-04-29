const express = require("express");
const app = express();

const dotenv = require("dotenv");
const morgan = require("morgan");
const mysql = require("mysql");
const path = require("path");
const { sequelize } = require("./models");

const loginRouter = require("./routes/login/login");
const signUpRouter = require("./routes/login/signUp");
const statusSearchRouter = require("./routes/login/statusSearch");

const dailyRecordRouter = require("./routes/dailyRecords/dailyRecords");
const addDailyRecordsRouter = require("./routes/dailyRecords/addDailyRecords");

const addSchdeuleListRouter = require("./routes/schedules/addSchedules");
const researchScheduleRouter = require("./routes/schedules/researchSchedules");
const updateScheduleRouter = require("./routes/schedules/updateSchdules");
dotenv.config();
app.set("port", process.env.PORT || 5002);
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.set("build", (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
  });
}

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결성공");
  })
  .catch((err) => {
    console.error(err);
  });
// app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user-signup", signUpRouter);
app.use("/user-login", loginRouter);
app.use("/add-dailyrecords", addDailyRecordsRouter);
app.use("/daily-records", dailyRecordRouter);
app.use("/status-search", statusSearchRouter);
app.use("/addschedulelist", addSchdeuleListRouter);
app.use("/research-schedulelist", researchScheduleRouter);
app.use("/update-schedulelist", updateScheduleRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method}${req.url}라우터가 없습니다`);
  error.status = 404;
});
// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV != "production" ? err : {};
//   res.render("error");
// });

app.listen(process.env.PORT || 5002);
