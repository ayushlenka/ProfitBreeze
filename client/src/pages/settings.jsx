import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Taskbar from '../components/taskbar';
import Chatbot from '../components/chatbot';

const Settings = () => {
    const [settings, setSettings] = useState({
        sellingLocation: '',
        stockXSellerRating: '',
        goatSellerLevel: ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);
    const [loading, setLoading] = useState(true) 

    // Fetch user settings when the component loads
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/settings/get', {
                    withCredentials: true,
                });
                console.log('Fetched settings:', response.data);
                setSettings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching settings:', error);
                setMessage('Error fetching settings');
                setIsSuccess(false);
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const updateSettings = async () => {
        try {
            const response = await axios.put('http://localhost:5000/api/settings/update', settings, {
                withCredentials: true,
            });
            console.log('Updated settings:', response.data);
            setMessage('Settings updated successfully.');
            setIsSuccess(true);
        } catch (error) {
            setMessage('Error updating settings. Please try again later.');
            setIsSuccess(false); 
        }
    };

    // Location options
    const location = [
        { value: 'Select your location', label: 'Select your location' },
        { value: "United States", label: "United States" },
        { value: "Austria", label: "Austria" },
        { value: "Belgium", label: "Belgium" },
        { value: "Bulgaria", label: "Bulgaria" },
        { value: "Canada", label: "Canada" },
        { value: "China", label: "Mainland China" },
        { value: "Mainland China (drop-off)", label: "Mainland China (drop-off)" },
        { value: "Mainland China (prepaid shipping)", label: "Mainland China (prepaid shipping)" },
        { value: "Croatia", label: "Croatia" },
        { value: "Cyprus", label: "Cyprus" },
        { value: "Czech Republic", label: "Czech Republic" },
        { value: "Czechia", label: "Czechia" },
        { value: "Denmark", label: "Denmark" },
        { value: "Estonia", label: "Estonia" },
        { value: "Finland", label: "Finland" },
        { value: "France", label: "France" },
        { value: "Germany", label: "Germany" },
        { value: "Greece", label: "Greece" },
        { value: "Guam", label: "Guam" },
        { value: "Hong Kong", label: "Hong Kong" },
        { value: "Hong Kong(drop-off)", label: "Hong Kong (drop-off)" },
        { value: "Hungary", label: "Hungary" },
        { value: "Iceland", label: "Iceland" },
        { value: "Indonesia", label: "Indonesia" },
        { value: "Ireland", label: "Ireland" },
        { value: "Italy", label: "Italy" },
        { value: "Japan", label: "Japan" },
        { value: "Japan(drop-off)", label: "Japan (drop-off)" },
        { value: "Latvia", label: "Latvia" },
        { value: "Liechtenstein", label: "Liechtenstein" },
        { value: "Lithuania", label: "Lithuania" },
        { value: "Luxembourg", label: "Luxembourg" },
        { value: "Macao", label: "Macao" },
        { value: "Malaysia", label: "Malaysia" },
        { value: "Malta", label: "Malta" },
        { value: "Mexico", label: "Mexico" },
        { value: "Netherlands", label: "Netherlands" },
        { value: "New Zealand", label: "New Zealand" },
        { value: "Norway", label: "Norway" },
        { value: "Philippines", label: "Philippines" },
        { value: "Poland", label: "Poland" },
        { value: "Portugal", label: "Portugal" },
        { value: "Puerto Rico", label: "Puerto Rico" },
        { value: "Republic of Cyprus", label: "Republic of Cyprus" },
        { value: "Romania", label: "Romania" },
        { value: "Singapore", label: "Singapore" },
        { value: "Slovakia", label: "Slovakia" },
        { value: "Slovenia", label: "Slovenia" },
        { value: "South Korea", label: "South Korea" },
        { value: "Spain", label: "Spain" },
        { value: "Sweden", label: "Sweden" },
        { value: "Switzerland", label: "Switzerland" },
        { value: "Taiwan", label: "Taiwan" },
        { value: "Thailand", label: "Thailand" },
        { value: "United Arab Emirates", label: "United Arab Emirates" },
        { value: "United Kingdom", label: "United Kingdom" },
        { value: "Vietnam", label: "Vietnam" },
        { value: "All Other Markets", label: "All Other Markets" },
        { value: "Australia", label: "Australia" },
        { value: "Other", label: "Other" }
    ];

    // StockX Seller Rating options
    const stockXSellerRatings = [
        { value: 'Select your level', label: 'Select your level' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ];

    // GOAT Seller Level options
    const goatSellerLevels = [
        { value: 'Select your rating', label: 'Select your rating' },
        { value: '90 or above', label: '90 or above' },
        { value: 'Between 70-89', label: 'Between 70-89' },
        { value: 'Between 50-69', label: 'Between 50-69' },
        { value: 'Below 50', label: 'Below 50' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-offwhite min-h-screen">
            <div className="bg-white shadow-md">
                <Taskbar />
            </div> 
            <div className="pt-24 px-4 pb-12 bg-gray-100 min-h-screen">
                <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto bg-white p-8 shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4 text-center text-cornflowerblue">Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="sellingLocation" className="block text-darkcharcoal font-semibold">Selling Location</label>
                            <select id="sellingLocation" name="sellingLocation" value={settings.sellingLocation} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue">
                                {location.map((country) => (
                                    <option key={country.value} value={country.value}>
                                        {country.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="stockXSellerRating" className="block text-darkcharcoal font-semibold">StockX Seller Rating</label>
                            <select id="stockXSellerRating" name="stockXSellerRating" value={settings.stockXSellerRating} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue">
                                {stockXSellerRatings.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="goatSellerLevel" className="block text-darkcharcoal font-semibold">GOAT Seller Level</label>
                            <select id="goatSellerLevel" name="goatSellerLevel" value={settings.goatSellerLevel} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue">
                                {goatSellerLevels.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={updateSettings} className="w-full py-2 bg-cornflowerblue text-white font-semibold rounded-md hover:bg-blue-600">Update Settings</button>
                    </div>
                    {message && (
                        <div className={`mt-4 p-4 rounded-md text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
            <Chatbot></Chatbot>
        </div>
    );
};

export default Settings;
