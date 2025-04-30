import { Router } from "express";
import UsersController from "../../Controllers/UsersController.js";
import checkToken from "../../../helpers/verify-token.js";


const routes = Router();

// ROTAS DO USUÁRIO
routes.post("/register", UsersController.register);
routes.post("/login", UsersController.login);
routes.post("/logout", (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({ message: "User disconnected with success!" });
});
routes.post("/me", checkToken, (req, res) => {
    return res.status(200).json({ message: "User connected!", authenticated: true, user: req.user });
});

export default routes;