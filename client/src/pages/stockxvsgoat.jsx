import React, { useState } from 'react';
import axios from 'axios';
import Taskbar from '../components/taskbar';
import Chatbot from '../components/chatbot';

const StockXVsGOAT = () => {
    const [profitData, setProfitData] = useState(null); 
    const [errorMessage, setErrorMessage] = useState(''); 

    const countries = ["United States", "Austria", "Belgium", "Bulgaria", "Canada", "China", "Croatia", "Czechia", "Denmark", 
        "Estonia", "Finland", "France", "Germany", "Greece", "Hong Kong", "Hungary", "Iceland", "Indonesia", "Ireland", 
        "Italy", "Japan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Malaysia", "Malta", "Mexico", 
        "Netherlands", "New Zealand", "Norway", "Philippines", "Poland", "Portugal", "Puerto Rico", "Republic of Cyprus", 
        "Romania", "Singapore", "Slovakia", "Slovenia", "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan", 
        "Thailand", "United Arab Emirates", "United Kingdom", "Vietnam", "All Other Markets"];

    const calculateProfit = () => {
        const itemPrice = document.getElementById('itemPrice').value;
        const itemCost = document.getElementById('itemCost').value;
        const sellerLevel = document.getElementById('sellerLevel').value;
        const sellerRating = document.getElementById('sellerRating').value;
        const location = document.getElementById('location').value;

        // Request Data
        const data = {
            itemPrice: itemPrice,
            itemCost: itemCost,
            sellerLevel: sellerLevel,
            sellerRating: sellerRating,
            location: location
        };

        // StovkXVsGOAT Calculate POST API
        axios.post('http://localhost:5000/api/calculators/calculate/StockXVSGOAT', data)
            .then(response => {
                setProfitData(response.data);
                setErrorMessage(''); 
            })
            .catch(error => {
                console.error('Error:', error);
                setProfitData(null);
                // Error handling with rate limiting
                if (error.response && error.response.status === 429) {
                    setErrorMessage('You have made too many requests. Please wait and try again in 5 minutes.');
                } else {
                    setErrorMessage(error.response?.data || 'Something went wrong. Please try again.');
                }
            });
    };

    return (
        <div className="bg-offwhite min-h-screen">
            <div className="bg-white shadow-md">
                <Taskbar />
            </div>
            <div className="container mx-auto pt-24 px-4 py-8 lg:flex lg:space-x-8">
                <div className="w-full lg:w-1/2 bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-2xl font-bold text-cornflowerblue mb-6">StockX vs GOAT Profit Calculator</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="itemPrice" className="block font-semibold">Item Price ($)</label>
                            <input type="number" id="itemPrice" placeholder="Enter price" className="w-full px-3 py-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue" />
                        </div>
                        <div>
                            <label htmlFor="itemCost" className="block font-semibold">Item Cost ($)</label>
                            <input type="number" id="itemCost" placeholder="Enter cost" className="w-full px-3 py-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue" />
                        </div>
                        <div>
                            <label htmlFor="sellerLevel" className="block font-semibold">StockX Seller Level</label>
                            <select id="sellerLevel" className="w-full px-3 py-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue">
                                {[1, 2, 3, 4, 5].map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sellerRating" className="block font-semibold">GOAT Seller Rating</label>
                            <select id="sellerRating" className="w-full px-3 py-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue">
                                {["90 or above", "Between 70-89","Between 50-69", "Below 50"].map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location" className="block font-semibold">Location</label>
                            <select id="location" className="w-full px-3 py-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue">
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={calculateProfit} className="w-full py-2 px-4 bg-cornflowerblue text-white font-semibold rounded-md hover:bg-blue-600">Calculate</button>
                        {profitData && (
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                                <p>{profitData.messageProfit}</p>
                                {profitData.messageLoss && <p>{profitData.messageLoss}</p>}
                                <p>StockX Profit: ${profitData.StockXProfit}</p>
                                <p>GOAT Profit: ${profitData.GOATProfit}</p>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                                <p>{errorMessage}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 bg-white p-6 shadow-md rounded-md mt-8 lg:mt-0">
                    <h2 className="text-2xl font-bold text-cornflowerblue mb-6">StockX vs GOAT Calculator Explained</h2>
                    <div className="space-y-4 text-gray-700 text-xl">
                        <p>This calculator will calculate where it is most profitable for you to sell your item based on your location and seller information.</p>
                        <p>Our calculator follows StockX's and GOAT's guidelines for shipping fees, minimum seller fees, and seller level fees.</p>
                        <p>Input the following:</p>
                        <ul className="list-disc list-inside">
                            <li>Item Price: How much do you want to sell your item for?</li>
                            <li>Item Cost: How much did your item cost?</li>
                            <li>StockX Seller Level: What is your StockX Seller Level?</li>
                            <li>GOAT Seller Rating: What is your GOAT Seller Rating?</li>
                            <li>Location: Where are you selling your item from?</li>
                        </ul>
                        <p>More information can be found on StockX's website about seller fees for&nbsp;
                            <a href="https://stockx.com/help/articles/How-much-does-shipping-cost-for-sellers" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                shipping
                            </a>&nbsp;and&nbsp;
                            <a href="https://stockx.com/help/articles/What-are-StockXs-fees-for-sellers" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                seller level
                            </a>.&nbsp;
                            <a href="https://www.goat.com/fees" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                GOAT
                            </a>&nbsp;fees can be found on their website.
                        </p>
                    </div>
                </div>
            </div>
            <Chatbot></Chatbot>
        </div>
    );
};

export default StockXVsGOAT;
