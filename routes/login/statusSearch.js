const express = require("express");
const User = require("../../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  //중복 아이디 조회를 위한 API
  try {
    const userInfo = await User.findAll({
      where: { usersId: req.body.signUpId },
    });

    const result = () => {
      res.json({
        result: "사용할수 없는 ID 입니다.",
        resultFlag: "unUsable",
      });
    };
    const result2 = () => {
      res.json({
        result: "사용할수 있는 ID 입니다.",
        resultFlag: "usable",
      });
    };
    if (userInfo.length > 0) {
      result();
    } else {
      result2();
    }
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
