import jwt from "jsonwebtoken";
import { promisify } from "util"; // transforma uma função de callback em uma promise

export const signToPromise = promisify(jwt.sign);

const createUserToken = async (user, req, res) => {
    try {
        const token = jwt.sign({
            name: user.name,
            id: user._id,
        },
            process.env.JWT_SECRET || "mysecret",
            { expiresIn: "1d" }
        );

        return res.status(200).json({ message: "Logado com sucesso!", token: token, userId: user._id });
    } catch (error) {
        console.log("Erro ao gerar token", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default createUserToken;