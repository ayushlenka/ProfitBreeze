const { minimumTransactionFee } = require('../Constants/stockXConstants');
const { getExchangeRate } = require('../exchangeRates');

// Calculate transaction fees based on guidelines and exchange rates
async function checkTransactionFee(transactionFee, location)  {
    if (minimumTransactionFee[location]) {
        const minLocationCurrencyConversion = minimumTransactionFee[location];
        const rateLocation = await getExchangeRate(minLocationCurrencyConversion.currency);
        const trueMinimumTransactionFee = minLocationCurrencyConversion.fee / rateLocation; 
        if (transactionFee < trueMinimumTransactionFee) {
            transactionFee = trueMinimumTransactionFee;
        }
    } 
    else if (transactionFee < 10.00) {
        transactionFee = 10.00;
    }
    return transactionFee;
}

module.exports =  { checkTransactionFee };