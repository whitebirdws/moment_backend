const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
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

app.set("port", process.env.PORT || 5002);
app.set("view engine", "ejs");
app.set("build", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/userSignUp", signUpRouter);
app.use("/userlogin", loginRouter);
app.use("/addDailyRecords", addDailyRecordsRouter);
app.use("/dailyRecords", dailyRecordRouter);
app.use("/statusSearch", statusSearchRouter);
app.use("/addSchdeuleList", addSchdeuleListRouter);
app.use("/researchScheduleList", researchScheduleRouter);
app.use("/updateScheduleList", updateScheduleRouter);
app.use(express.static("build"));

app.use((req, res, next) => {
  const error = new Error(`${req.method}${req.url}라우터가 없습니다`);
  error.status = 404;
  // next(error);
});
// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV != "production" ? err : {};
//   res.render("error");
// });
app.listen(app.get("port"), () => {
  console.log(app.get("port") + "번에서 대기중입니다.");
});
