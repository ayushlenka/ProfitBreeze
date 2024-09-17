const SellerSettings = require('../Database/schemas');

// Fetch user settings
const getUserSettings = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const userId = req.user.id;  // Extract user ID from JWT
        const userSettings = await SellerSettings.findOne({ _id: userId });

        if (userSettings) {
            console.log("User settings found:", userSettings);
            res.json(userSettings);
        } else {
            res.status(404).json({ error: 'Settings not found' });
        }
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
};

// Update user settings
const updateUserSettings = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from JWT
        const { sellingLocation, stockXSellerRating, goatSellerLevel } = req.body;
        
        // Find and update the settings
        const updatedSettings = await SellerSettings.findOneAndUpdate(
            { _id: userId },
            { $set: { sellingLocation, stockXSellerRating, goatSellerLevel } },
            { new: true, upsert: true }
        );

        if (updatedSettings) {
            console.log("Settings updated successfully:", updatedSettings);
            res.json(updatedSettings);
        } else {
            console.error("Settings not found for update");
            res.status(404).json({ error: 'Settings not found' });
        }
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
};



module.exports = {
    getUserSettings,
    updateUserSettings
}