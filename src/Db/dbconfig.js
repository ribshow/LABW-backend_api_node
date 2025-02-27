import mongoose from "mongoose";
import "dotenv";

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/project1");
    console.log("Connected with success");
}

main().catch((error) => console.log(`Error: ${error}`));

export default mongoose;