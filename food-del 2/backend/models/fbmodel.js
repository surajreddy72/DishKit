import mongoose from "mongoose";

const fbSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: {
        type: String,
        required: false,
        index: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    message: { type: String, required: true }
});

const fbModel = mongoose.models.fb || mongoose.model("feedback", fbSchema);
export default fbModel;
