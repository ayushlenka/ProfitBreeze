const { getExchangeRate } = require('../exchangeRates');
const { LocationsUSD, LocationsEUR, LocationsCAD, LocationsHKD, LocationsJPY, LocationsMXN, LocationsKRW, LocationsGBP } = require('../Constants/stockXConstants'); 

// Calculate shipping costs based on location constants
async function calculateShippingCost(location) {
    let shippingCost = 0;

    if (LocationsUSD[location]) {
        shippingCost = LocationsUSD[location];
    } else if (LocationsEUR[location]) {
        const rateEUR = await getExchangeRate('EUR');
        shippingCost = LocationsEUR[location] / rateEUR;
    } else if (LocationsCAD[location]) {
        const rateCAD = await getExchangeRate('CAD');
        shippingCost = LocationsCAD[location] / rateCAD;
    } else if (LocationsHKD[location]) {
        const rateHKD = await getExchangeRate('HKD');
        shippingCost = LocationsHKD[location] / rateHKD;
    } else if (LocationsJPY[location]) {
        const rateJPY = await getExchangeRate('JPY');
        shippingCost = LocationsJPY[location] / rateJPY;
    } else if (LocationsMXN[location]) {
        const rateMXN = await getExchangeRate('MXN');
        shippingCost = LocationsMXN[location] / rateMXN;
    } else if (LocationsKRW[location]) {
        const rateKRW = await getExchangeRate('KRW');
        shippingCost = LocationsKRW[location] / rateKRW;
    } else if (LocationsGBP[location]) {
        const rateGBP = await getExchangeRate('GBP');
        shippingCost = LocationsGBP[location] / rateGBP;
    }

    return shippingCost;
}

module.exports =  { calculateShippingCost };
