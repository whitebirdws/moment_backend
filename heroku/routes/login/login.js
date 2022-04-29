const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (req.body.loginId === undefined) res.json({ result: "다시 입력하세요" });
    const createUser = await User.findAll();
    let tempArr = [];
    console.log("Tets");
    createUser.filter((value) => {
      value.dataValues.usersId === req.body.loginId &&
        tempArr.push({
          flagId: value.dataValues.id,
          id: value.dataValues.usersId,
          pwd: value.dataValues.password,
        });
    });

    tempArr.map(async (value) => {
      try {
        const match = await bcrypt.compare(req.body.loginPwd, value.pwd);
        if (match) {
          console.log("일치");
          res.json({
            result: "success",
            flagId: value.flagId,
            loginId: value.id,
          });
        }
        console.log("불일치");
        // res
        //   .sendStatus(200)
        //   .json({ result: "아이디 혹은 비밀번호가 일치하지 않습니다" });
      } catch (err) {
        console.log("에러");
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
