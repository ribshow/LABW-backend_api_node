import multer from "multer";
import path from "path";

// destino para armazenar as imagens
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";
        if (req.baseUrl.includes("pets")) {
            folder = "pets";
        }

        cb(null, `src/public/images/${folder}`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error("Por favor envie apenas jpg ou png."));
        }
        cb(undefined, true);
    }
})

export default imageUpload;