import fbmodel from "../models/fbmodel.js";
import userModel from "../models/userModel.js";

// Add feedback to the database from frontend
const addFeedback = async (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    
    try {
        const newFeedback = new fbmodel({ name, email, message });
        await newFeedback.save();
        res.status(201).json({ success: true, message: "Feedback added successfully." });
    } catch (error) {
        console.error(`Error adding feedback: ${error}`);
        res.status(500).json({ success: false, message: "Error saving feedback to the database." });
    }
};

// Display feedback from the database to the admin
const listFeedback = async (req, res) => {
    try {
        const feedbacks = await fbmodel.find({});
        res.json({ success: true, data: feedbacks });
    } catch (error) {
        console.error(`Error retrieving feedbacks: ${error}`);
        res.status(500).json({ success: false, message: "Failed to retrieve feedbacks." });
    }
};

export { addFeedback, listFeedback };

