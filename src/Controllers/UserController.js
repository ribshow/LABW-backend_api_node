import user from "../Models/User.js";

export default class UserController {
    static async register(req, res) {
        res.status(200).json({ message: "OK" });
    }

    static async login(req, res) {
        res.status(200).json({ message: "OK" });
    }
}