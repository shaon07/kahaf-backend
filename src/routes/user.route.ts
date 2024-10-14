import { upload } from "./../middlewares/multer.middleware";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  logout,
  refreshToken,
  updateUser,
} from "../controllers/user.controller";
import { validateData } from "../middlewares/validationData";
import verifyJWT from "../middlewares/verify-jwt";
import { loginSchema } from "../schema/user.schema";

const router = Router();

router.route("/detail").get(verifyJWT, getUser);
router.route("/register").post(upload.single("picture"), createUser);
router.route('/refresh-token').post(refreshToken)
router
  .route("/login")
  .post(upload.none(), validateData(loginSchema), loginUser);
router.route("/logout").get(verifyJWT, logout);
router
  .route("/:id")
  .patch(upload.single("picture"), updateUser)
  .delete(deleteUser);

export default router;
