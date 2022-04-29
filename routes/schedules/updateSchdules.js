const express = require("express");

const Schedule = require("../../models/schedule");
const router = express.Router();

router.patch("/:id", async (req, res) => {
  try {
    let temp = "";
    temp = req.body.scheduleList.map((v) => v.message).join(",");
    const result = await Schedule.update(
      {
        list_description: temp,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.json({ result: "success" });
  } catch (err) {
    console.error(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const result = await Schedule.destroy({
      where: { id: req.params.id },
    });

    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
