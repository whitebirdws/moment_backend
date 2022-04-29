const express = require("express");
const DailyRecord = require("../../models/dailyRecord");
const User = require("../../models/user");
const router = express.Router();

router.route("/").post(async (req, res, next) => {
  try {
    const test = await DailyRecord.findAll({});

    let temp = [];
    test.filter((v) => {
      v.dataValues.write_user === req.body.userId && temp.push(v.dataValues);
    });

    res.json(temp);
  } catch (err) {
    console.error(err);
  }
});

router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await DailyRecord.update(
        {
          title: req.body.title,
          text: req.body.text,
          date: req.body.date,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await DailyRecord.destroy({
        where: { id: req.params.id },
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
