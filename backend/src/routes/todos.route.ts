import { Router } from "express";
import { todosController } from "../controllers/todos.controller.js";

export const todosRouter = Router();

todosRouter.get("/", todosController.getAll);
todosRouter.post("/", todosController.createTodo);
todosRouter.delete("/:id", todosController.deleteTodo);
todosRouter.put("/:id", todosController.updateTodo);
