const express = require("express");
const DailyRecord = require("../../models/dailyRecord");
const User = require("../../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userInfo = await User.findAll({});

    const newRecord = async (id) => {
      try {
        let data = await DailyRecord.create({
          write_user: id,
          title: req.body.title,
          text: req.body.text,
        });

        res.json({ isLogged: "success" });
        return data;
      } catch (error) {
        console.error(error);
      }
    };
    userInfo.filter((value) => {
      if (value.dataValues.usersId === req.body.user) {
        newRecord(value.dataValues.id);
      }
    });
  } catch (err) {
    res.json("fail");
    console.error(err);
  }
});

module.exports = router;
