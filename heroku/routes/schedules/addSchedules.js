const express = require("express");
const Schedule = require("../../models/schedule");
const User = require("../../models/user");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const userInfo = await User.findAll({});

    const newRecord = (id) => {
      let data = Schedule.create({
        manager_user: id,
        list_description: req.body.scheduleList
          .map((value) => value.message)
          .join(","),
        filter_year: req.body.scheduleList[0].filterYear,

        filter_month: req.body.scheduleList[0].filterMonth,

        filter_date: req.body.scheduleList[0].filterDate,
      });
      res.json({ isLogged: "success" });
      return data;
    };
    userInfo.filter((value) => {
      if (value.dataValues.id === Number(req.body.user)) {
        newRecord(value.dataValues.id);
      }
    });
  } catch (err) {
    res.json("fail");
    console.error(err);
    next();
  }
});

module.exports = router;
