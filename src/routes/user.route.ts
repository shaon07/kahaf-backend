import { upload } from "./../middlewares/multer.middleware";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.route("/").get(getAllUsers).post(upload.single("image"), createUser);
router
  .route("/:id")
  .get(getUser)
  .patch(upload.single("image"), updateUser)
  .delete(deleteUser);

export default router;
