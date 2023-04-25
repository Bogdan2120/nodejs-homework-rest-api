const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/auth-controllers");

const { authentivate, upload } = require("../../midlewares");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authentivate, ctrl.getCurrent);
router.post("/logout", authentivate, ctrl.logout);
router.patch(
  "/avatars",
  authentivate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
