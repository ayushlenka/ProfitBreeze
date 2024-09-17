const LocationsUSD = {
    'All Other Markets': 30.00,
    'China': 20.00,
    'Indonesia': 15.00,
    'Macao': 10.00,
    'Malaysia': 10.00,
    'New Zealand': 15.00,
    'Philippines': 15.00,
    'Puerto Rico': 5.00,
    'Singapore': 10.00,
    'Taiwan': 10.00,
    'Thailand': 15.00,
    'United Arab Emirates': 20.00,
    'United States': 4.00,
    'Vietnam': 20.00
}

const LocationsEUR = {
    'Austria': 5.00,
    'Belgium': 5.00,
    'Bulgaria': 10.00,
    'Croatia': 12.00,
    'Czechia': 9.00,
    'Denmark': 10.00,
    'Estonia': 11.00,
    'Finland': 15.00,
    'France': 7.00,
    'Germany': 5.00,
    'Greece': 17.00,
    'Hungary': 12.00,
    'Iceland': 10.00,
    'Ireland': 11.00,
    'Italy': 7.00,
    'Latvia': 12.00,
    'Liechtenstien': 15.00,
    'Lithuania': 12.00,
    'Luxembourg': 5.00,
    'Malta': 30.00,
    'Netherlands': 5.00,
    'Norway': 25.00,
    'Poland': 5.00,
    'Portugal': 10.00,
    'Republic of Cyprus': 35.00,
    'Romania': 10.00,
    'Slovakia': 11.00,
    'Slovenia': 11.00,
    'Spain': 8.00,
    'Sweden': 14.00,
    'Switzerland': 20.00,
}

const LocationsCAD = {
    'Canada': 6.00
}

const LocationsHKD = {
    'Hong Kong': 48.00
}

const LocationsJPY = {
    'Japan': 1200.00
}

const LocationsMXN = {
    'Mexico': 80
}

const LocationsKRW = {
    'South Korea': 4000
}

const LocationsGBP = {
    'United Kingdom': 4.00
}

//Minimum seller fee unique locations that aren't EU
const minimumTransactionFee = {
    'Australia': { fee: 14.00, currency: 'AUD' },
    'Canada': { fee: 7.00, currency: 'CAD' },
    'United Kingdom': { fee: 4.50, currency: 'GBP' },
    'Hong Kong': { fee: 45.00, currency: 'HKD' },
    'Japan': { fee: 800, currency: 'JPY' },
    'Mexico': { fee: 100.00, currency: 'MXN' },
    'New Zealand': { fee: 16.00, currency: 'NZD' },
    'Singapore': { fee: 14.00, currency: 'SGD' },
    'South Korea': { fee: 7500.00, currency: 'KRW' },
    'Switzerland': { fee: 9.00, currency: 'CHF' },
    'United States': { fee: 5.00, currency: 'USD' },
    'Austria': { fee: 5.00, currency: 'EUR' },
    'Belgium': { fee: 5.00, currency: 'EUR' },
    'Bulgaria': { fee: 5.00, currency: 'EUR' },
    'Croatia': { fee: 5.00, currency: 'EUR' },
    'Czechia': { fee: 5.00, currency: 'EUR' },
    'Denmark': { fee: 5.00, currency: 'EUR' },
    'Estonia': { fee: 5.00, currency: 'EUR' },
    'Finland': { fee: 5.00, currency: 'EUR' },
    'France': { fee: 5.00, currency: 'EUR' },
    'Germany': { fee: 5.00, currency: 'EUR' },
    'Greece': { fee: 5.00, currency: 'EUR' },
    'Hungary': { fee: 5.00, currency: 'EUR' },
    'Ireland': { fee: 5.00, currency: 'EUR' },
    'Italy': { fee: 5.00, currency: 'EUR' },
    'Latvia': { fee: 5.00, currency: 'EUR' },
    'Lithuania': { fee: 5.00, currency: 'EUR' },
    'Luxembourg': { fee: 5.00, currency: 'EUR' },
    'Malta': { fee: 5.00, currency: 'EUR' },
    'Netherlands': { fee: 5.00, currency: 'EUR' },
    'Poland': { fee: 5.00, currency: 'EUR' },
    'Portugal': { fee: 5.00, currency: 'EUR' },
    'Romania': { fee: 5.00, currency: 'EUR' },
    'Slovakia': { fee: 5.00, currency: 'EUR' },
    'Slovenia': { fee: 5.00, currency: 'EUR' },
    'Spain': { fee: 5.00, currency: 'EUR' },
    'Sweden': { fee: 5.00, currency: 'EUR' },
};


const sellerCommissions = {
    1: 9,
    2: 8.5,
    3: 8,
    4: 7.5,
    5: 7
};

module.exports = {
    LocationsUSD,
    LocationsEUR,
    LocationsCAD,
    LocationsHKD,
    LocationsJPY,
    LocationsMXN,
    LocationsKRW,
    LocationsGBP,
    minimumTransactionFee,
    sellerCommissions
}