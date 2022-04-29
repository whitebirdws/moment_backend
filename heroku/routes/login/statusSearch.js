const express = require("express");
const User = require("../../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  //중복 아이디 조회를 위한 API
  try {
    const userInfo = await User.findAll({});
    let temp = [];
    let temp2 = [];
    userInfo.filter((value) => {
      if (value.dataValues.usersId === req.body.signUpId) {
        temp2.push(value.dataValues.usersId);
      }
    });
    console.log(temp2);
    // temp2.map((val) => {
    //   if (val === req.body.signUpId) {
    //     res.json({
    //       result: "사용할수 없는 ID 입니다.",
    //       resultFlag: "unusable",
    //     });
    //   } else {
    //     res.json({
    //       result: "사용할수 있는 ID 입니다.",
    //       resultFlag: "usable",
    //     });
    //   }
    // });
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
