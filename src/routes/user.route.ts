import { upload } from "./../middlewares/multer.middleware";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/user.controller";
import { validateData } from "../middlewares/validationData";
import { loginUserSchema } from "../schema/userSchema";

const router = Router();

router.route("/").get(getAllUsers);
router.route("/register").post(upload.single("image"), createUser);
router.route("/login").post(upload.none(),validateData(loginUserSchema), loginUser);
router
  .route("/:id")
  .get(getUser)
  .patch(upload.single("image"), updateUser)
  .delete(deleteUser);

export default router;
