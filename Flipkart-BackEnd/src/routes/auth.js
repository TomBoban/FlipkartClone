const express = require("express");
// const { signout } = require("../controllers/auth");
const { signup, signin } = require("../controllers/auth");

const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignUpRequest, isRequestValidated, signup);

router.post("/signin", validateSignInRequest, isRequestValidated, signin);

// router.post("/signout", signout);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });

module.exports = router;
