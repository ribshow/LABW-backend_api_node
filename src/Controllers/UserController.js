import Argon2 from "argon2";
import User from "../Models/User.js";

export default class UserController {
    static async register(req, res) {
        const { name, email, password, confirmPassword, phone } = req.body;

        // validando os dados
        if (!name) {
            res.status(422).json({ error: true, message: "O campo nome é obrigatório!" });
            return;
        } else if (!email) {
            res.status(422).json({ error: true, message: "O campo email é obrigatório!" });
            return;
        } else if (!password) {
            res.status(422).json({ error: true, message: "O campo senha é obrigatório!" });
            return;
        } else if (!confirmPassword) {
            res.status(422).json({ error: true, message: "O campo confirmar senha é obrigatório!" });
            return;
        } else if (!phone) {
            res.status(422).json({ error: true, message: "O campo telefone é obrigatório!" });
            return;
        }

        if (password != confirmPassword) {
            res.status(422).json({ error: true, message: "Senhas não conferem, tente novamente!" });
            return;
        }

        try {
            // VERIFICANDO SE O USUÁRIO EXISTE
            const user = await User.findOne({ email: email });

            if (user) {
                res.status(400).json({ error: true, message: "Email indisponível" });
                return;
            }

            // CRIPTOGRAFANDO A SENHA
            const passwordHashing = await Argon2.hash(password, 10);

            const newUser = await User.insertOne({ name, email, password: passwordHashing, phone, created_at: new Date() });

            res.status(201).json({ message: "Usuário criado com sucesso!", newUser });
        } catch (error) {
            console.log("Erro ao registrar usuário", error);
            res.status(500).json({ error: true, message: "Internal Server Error" });
            return;

        }
    }

    static async login(req, res) {
        res.status(200).json({ message: "OK" });
    }
}