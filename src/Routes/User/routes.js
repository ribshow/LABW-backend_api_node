import { application, Router } from "express";
import UserController from "../../Controllers/UserController.js";

const routes = Router();


routes.post("/register", UserController.register);
routes.get("/login", UserController.login);

export default routes;