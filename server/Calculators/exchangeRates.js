const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

//Where the exchange rates will be cached into
let cachedRates = {};

const ratesFilePath = path.join(__dirname, 'cachedRates.json');

const fetchExchangeRates = async () => {
    const apiKey = process.env.EXCHANGERATE_API_KEY;
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    try {
        const response = await axios.get(url);
        cachedRates = response.data.rates;
        console.log('Exchange rates updated');
        fs.writeFileSync(ratesFilePath, JSON.stringify(cachedRates)); // Save rates to file
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        if (fs.existsSync(ratesFilePath)) {
            console.log('Using locally cached rates');
            cachedRates = JSON.parse(fs.readFileSync(ratesFilePath, 'utf8')); // Use cached rates if API call fails
        }
    }
};

// Fetch exchange rates immediately and schedule updates every hour
fetchExchangeRates();
cron.schedule('0 * * * *', fetchExchangeRates);

const getExchangeRate = (currency) => cachedRates[currency];

module.exports = {
    getExchangeRate,
};
