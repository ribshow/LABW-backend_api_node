import mongoose from "../Db/dbconfig.js";

const { Schema } = mongoose;

const petSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    age: {
        type: String,
        required: false
    },
    race: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: true
    },
    eyesColor: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    reward: {
        type: Number,
        required: false
    },
    user: {
        type: Object,
        required: true
    },
    situation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Pet = mongoose.model("Pet", petSchema);
export default Pet;