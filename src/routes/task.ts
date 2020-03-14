import { Router } from "express";
import auth from "root/middlewares/auth";
import validateRequest from "root/middlewares/validateRequest";
import CreateTaskRequest from "root/requests/create-task-request";
import TaskController from "root/controllers/task-controller";

const router = Router();

router.get("/", TaskController.index);
router.post("/", [ auth, validateRequest(CreateTaskRequest) ], TaskController.store);

export default router;
