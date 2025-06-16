import { application, Router } from "express";
import UsersController from "../../Controllers/UsersController.js";
import checkToken from "../../../helpers/verify-token.js";

const routes = Router();

// ROTAS DO USUÁRIO
routes.post("/register", UsersController.register);
routes.post("/login", UsersController.login);
routes.post("/send-sms", checkToken, UsersController.notification);

export default routes;
