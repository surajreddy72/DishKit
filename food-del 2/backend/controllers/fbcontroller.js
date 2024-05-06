import fbmodel from "../models/fbmodel.js";
import axios from 'axios';

// Function to analyze sentiment by making a request to the Flask server
const analyzeSentiment = async (text) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/analyze', {
            message: text
        });
        return response.data.sentiment;

    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return null;  // Consider how to handle errors appropriately
    }
};

// Add feedback to the database from frontend
const addFeedback = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    
    try {
        // Analyze sentiment of the message before saving
        const sentiment = await analyzeSentiment(message);
        const newFeedback = new fbmodel({ name, email, message, sentiment });

        await newFeedback.save();
        res.status(201).json({ success: true, message: "Feedback added successfully." });
    } catch (error) {
        console.error('Error analyzing sentiment:', error.response ? error.response.data : error.message);
        return null;
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
