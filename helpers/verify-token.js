import jwt from "jsonwebtoken";
import getToken from "./get-token.js";

const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Acesso negado, verifique suas credenciais!" });
    }

    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "Acesso negado ou token expirado!" });
    }

    try {
        const verified = jwt.verify(token, "mysecret");

        req.user = verified;
        next();

    } catch (error) {
        console.log("Erro ao verificar token", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default checkToken;