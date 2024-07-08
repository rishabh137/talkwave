import mongoose from "mongoose";

const shayariSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
        unique: true
    }
})

const Shayari = mongoose.model("Shayari", shayariSchema)

export default Shayari