const express = require("express");
const { User } = require("../../models");
const Schedule = require("../../models/schedule");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const scheduleInfo = await Schedule.findAll({});
    const userInfo = await User.findAll({});

    let temp = [];
    scheduleInfo.filter((v) => {
      if (v.dataValues.manager_user === Number(req.body.user)) {
        temp.push(v.dataValues);
      }
    });

    res.json({ result: temp });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
