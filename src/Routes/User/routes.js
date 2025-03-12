import { application, Router } from "express";
import UsersController from "../../Controllers/UsersController.js";

const routes = Router();


routes.post("/register", UsersController.register);
routes.post("/login", UsersController.login);

export default routes;