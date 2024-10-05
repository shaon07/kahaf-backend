import { upload } from "./../middlewares/multer.middleware";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  logout,
  refreshToken,
  updateUser,
} from "../controllers/user.controller";
import { validateData } from "../middlewares/validationData";
import { loginUserSchema } from "../schema/userSchema";
import verifyJWT from "../middlewares/verify-jwt";

const router = Router();

router.route("/").get(verifyJWT,getAllUsers);
router.route("/detail").get(verifyJWT, getUser);
router.route("/register").post(upload.single("image"), createUser);
router.route('/refresh-token').post(refreshToken)
router
  .route("/login")
  .post(upload.none(), validateData(loginUserSchema), loginUser);
router.route("/logout").get(verifyJWT, logout);
router
  .route("/:id")
  .patch(upload.single("image"), updateUser)
  .delete(deleteUser);

export default router;
