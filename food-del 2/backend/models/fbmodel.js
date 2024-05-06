import mongoose from "mongoose";

const fbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        index: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    message: {
        type: String,
        required: true
    },
    sentiment: {
        type: String,
        required: false
    },
    analyzed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const fbModel = mongoose.models.feedback || mongoose.model("feedback", fbSchema);
export default fbModel;
