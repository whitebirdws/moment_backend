const express = require("express");
const User = require("../../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.signUp_password, 12);

    if (req.body.signUp_id === undefined) {
      res.json({ result: "다시 입력하세요" });
    }

    const createUser = await User.create({
      usersId: req.body.signUp_id,
      password: hashPassword,
    });

    res.json({ result: "success" });
  } catch (err) {
    res.json({ result: "error" });
    console.error(err);
  }
});

module.exports = router;
