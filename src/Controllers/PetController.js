import Pet from "../Models/Pet.js";
import getToken from "../../helpers/get-token.js";
import getUserByToken from "../../helpers/get-user-by-token.js";

export default class PetController {
    static async create(req, res) {
        const { name, age, race, color, eyesColor
            , species, gender, size, local, landmark,
            date, reward, situation, comment } = req.body;

        const images = req.files;
        console.log(images);

        console.log(req.body);

        // validações
        if (!color) return res.status(422).json({ message: "O campo cor é obrigatório" });

        if (images.length === 0) return res.status(422).json({ message: "O campo imagem é obrigatório" });

        try {
            const token = getToken(req);
            const user = await getUserByToken(token, res);

            const pet = new Pet({
                name, age, race, color, eyesColor,
                species, gender, size, local, landmark,
                date, reward, user: {
                    _id: user._id,
                    name: user.name,
                    phone: user.phone
                }
                , situation, images: [], comment
            })

            images.map((image) => {
                pet.images.push(image.filename);
            })

            const petCreated = await Pet.insertOne(pet);
            res.status(201).json({ message: "Pet cadastrado com sucesso!", petCreated })
        } catch (error) {
            console.log("Erro ao cadastrar pet", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getAll(req, res) {
        try {
            const pets = await Pet.find({ situation: { $ne: "Finalizado" } }).sort("-createdAt");

            res.status(200).json(pets);
        } catch (error) {
            console.log("Erro ao buscar pets", error);
            return res.status(500).json({ message: "Internal Server Error" })
        }


    }
}