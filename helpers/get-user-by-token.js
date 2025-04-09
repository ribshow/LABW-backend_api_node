import jwt from "jsonwebtoken";
import User from "../src/Models/User.js";

const getUserByToken = async (token, res) => {
    if (!token) {
        return res.status(401).json({ message: "Acesso negado, usuário não autorizado!" });
    }

    const decode = jwt.verify(token, "mysecret");

    const userId = decode.id;
    console.log("helper get-user", userId);

    const user = await User.findOne({ _id: userId });

    return user;
}

export default getUserByToken;