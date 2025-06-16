import Argon2 from "argon2";
import User from "../Models/User.js";
import createUserToken from "../../helpers/create-token.js";
import { sendMessage } from "../../helpers/send-sms.js";

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
        const { email, password } = req.body;
        try {
            if (!email) return res.status(422).json({ message: "Email é requerido" });

            if (!password) return res.status(422).json({ message: "Senha é requerido" });

            // VERIFICANDO SE O USUÁRIO EXISTE
            const user = await User.findOne({ email: email });

            if (!user) return res.status(422).json({ message: "Credenciais inválidas!" });

            const comparePassword = await Argon2.verify(user.password, password);

            if (!comparePassword) return res.status(422).json({ message: "Credenciais inválidas!" });

            // gerando tokene
            await createUserToken(user, req, res);


            //return res.status(200).json({ message: "Usuário logado com sucesso!" });
        } catch (error) {
            console.log("Erro ao logar usuário", error);
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }

    static async notification(req, res){
        const { message } = req.body;
        console.log(message);
        if(!message) return res.status(422).json({message: "A mensagem é Obrigatória!"});

        try {
            //await sendMessage("+5514998283036");

            res.status(200).json({message: "Mensagem enviada com sucesso!"});
            
        } catch (error) {
            console.log("Erro ao enviar sms", error);
            return res.status(500).json({message: "Internal Server Error!"});
        }
    }
}