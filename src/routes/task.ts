import { Router } from "express";
import auth from "root/middlewares/auth";
import { validateRequest } from "root/middlewares/validation";
import TaskController from "root/controllers/task-controller";
import CreateTaskRequest from "root/requests/create-task-request";
import UpdateTaskRequest from "root/requests/update-task-request";
import RestoreTaskRequest from "root/requests/restore-task-request";

const router = Router();

router.use(auth);

router.get("/", TaskController.index);
router.post("/", validateRequest(CreateTaskRequest), TaskController.store);
router.patch("/:id", validateRequest(UpdateTaskRequest), TaskController.update);
router.delete("/:id", TaskController.destroy);
router.patch("/restore", validateRequest(RestoreTaskRequest), TaskController.restore);

export default router;
