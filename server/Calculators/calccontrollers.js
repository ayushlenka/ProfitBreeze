const { locationSellerFees, GOATsellerCommissions } = require("./Constants/goatConstants");
const { sellerCommissions } = require("./Constants/stockXConstants")
const { calculateShippingCost } = require("./HelperFunctions/calculateShippingCosts");
const { checkTransactionFee } = require("./HelperFunctions/calculateTransactionFee");

const calculateStockXProfit = async (req, res) => {
    const {itemPrice, itemCost, sellerLevel, location} = req.body;
    //Error handling for in case user doesn't input anything for itemPrice or itemCost
    if (!itemPrice) {
        return res.status(400).send("Item Price must be provided.")
    }
    if (!itemCost) {
        return res.status(400).send("Item Cost must be provided.")
    }
    //Calculating shipping cost based on location
    let shippingCost = await calculateShippingCost(location);

    //Transaction fee(3% of sale price)
    let transactionFee = itemPrice * (0.03);
    //Checking transaction fee if it meets minimum transaction fee requirements as per location
    transactionFee = await checkTransactionFee(transactionFee, location);
 
    //Seller Level Amount
    const commissionPercentage = sellerCommissions[sellerLevel];
    const commissionAmount = itemPrice * (commissionPercentage / 100);

    //Calculating profit and rounds it to two decimal places
    let profit = itemPrice - itemCost - shippingCost - commissionAmount - transactionFee;
    profit = parseFloat(profit.toFixed(2));
    
    //Send profit amount and message back to user-side
    if (profit > 0) {
        res.json({ profit: profit, message: "Profit calculated successfully." });
    } else if (profit === 0) {
        res.json({ profit: profit, message: "Breaking even. No profit or loss." });
    } else {
        res.json({ profit: profit, message: "Not profitable. Loss incurred." });
    }
}

const calculateGOATProfit = async (req, res) => {
    const {itemPrice, itemCost, sellerRating, location} = req.body;
    //Error handling for in case user doesn't input anything for itemPrice or itemCost
    if (!itemPrice) {
        return res.status(400).send("Item Price must be provided.")
    }
    if (!itemCost) {
        return res.status(400).send("Item Cost must be provided.")
    }
    
    //Gets GOAT seller fee based on location
    const sellerFee = locationSellerFees[location];

    //Gets GOAT commission amount based on Commission Amount
    let commissionPercentage = GOATsellerCommissions[sellerRating];
    let commissionAmount = itemPrice * (commissionPercentage/ 100);

    //Calculating GOAT profit and rounds it to two decimal places
    let profit = itemPrice - itemCost - sellerFee - commissionAmount;
    profit = parseFloat(profit.toFixed(2));

    //Send profit amount and message back to user-side
    if (profit > 0) {
        res.json({ profit: profit, message: "Profit calculated successfully." });
    } else if (profit === 0) {
        res.json({ profit: profit, message: "Breaking even. No profit or loss." });
    } else {
        res.json({ profit: profit, message: "Not profitable. Loss incurred." });
    }

}

const calculateStockXVsGOATProfit = async (req, res) => {
    const { itemPrice, itemCost, sellerLevel, sellerRating, location } = req.body;

    // Error handling for missing inputs
    if (!itemPrice) {
        return res.status(400).send("Item Price must be provided.");
    }
    if (!itemCost) {
        return res.status(400).send("Item Cost must be provided.");
    }

    // Calculating StockX shipping cost based on location
    const StockXshippingCost = await calculateShippingCost(location);

    // Getting GOAT seller fee based on location
    const GOATsellerFee = locationSellerFees[location];

    // StockX Transaction fee (3% of sale price)
    let StockXtransactionFee = itemPrice * 0.03;
    // Checking StockX transaction fee if it meets minimum transaction fee requirements
    StockXtransactionFee = await checkTransactionFee(StockXtransactionFee, location);

    // StockX Seller Level Amount
    const StockXcommissionPercentage = sellerCommissions[sellerLevel];
    const StockXcommissionAmount = itemPrice * (StockXcommissionPercentage / 100);

    // GOAT commission amount based on seller rating
    const GOATcommissionPercentage = GOATsellerCommissions[sellerRating];
    const GOATcommissionAmount = itemPrice * (GOATcommissionPercentage / 100);

    // Calculating StockX profit
    let StockXprofit = itemPrice - itemCost - StockXshippingCost - StockXcommissionAmount - StockXtransactionFee;
    StockXprofit = parseFloat(StockXprofit.toFixed(2));

    // Calculating GOAT profit
    let GOATprofit = itemPrice - itemCost - GOATsellerFee - GOATcommissionAmount;
    GOATprofit = parseFloat(GOATprofit.toFixed(2));

    // Comparing profits and responding
    if (StockXprofit === GOATprofit) {
        return res.json({ StockXProfit: StockXprofit, GOATProfit: GOATprofit, message: `Both platforms yield the same profit of $${StockXprofit}.` });
    }
    if (StockXprofit > GOATprofit) {
        if (StockXprofit > 0 && GOATprofit < 0) {
            return res.json({status: "stockx", StockXProfit: StockXprofit, GOATProfit: GOATprofit, messageProfit: `StockX yields the higher profit of: $${StockXprofit}`,messageLoss: `You will lose money selling on GOAT: -$${Math.abs(GOATprofit)}`});
        } else if (StockXprofit < 0 && GOATprofit < 0) {
            return res.json({status: "stockx", StockXProfit: StockXprofit, GOATProfit: GOATprofit, messageProfit: `You will lose less money selling on StockX: -$${Math.abs(StockXprofit)}`, messageLoss: `You will lose more money selling on GOAT: -$${Math.abs(GOATprofit)}` });
        } else {
            return res.json({status: "stockx", StockXProfit: StockXprofit, GOATProfit: GOATprofit, messageProfit: `StockX yields the higher profit of: $${StockXprofit}`, messageLoss: `GOAT yields the lower profit of: $${GOATprofit}`});
        }
    }
    if (GOATprofit > StockXprofit) {
        if (GOATprofit > 0 && StockXprofit < 0) {
            return res.json({status: "goat", StockXProfit: StockXprofit, GOATProfit: GOATprofit, messageProfit: `GOAT yields the higher profit of: $${GOATprofit}`, messageLoss: `You will lose money selling on StockX: -$${Math.abs(StockXprofit)}`});
        } else if (StockXprofit < 0 && GOATprofit < 0) {
            return res.json({status: "goat", StockXProfit: StockXprofit, GOATProfit: GOATprofit, messageProfit: `You will lose less money selling on GOAT: -$${Math.abs(GOATprofit)}`, messageLoss: `You will lose more money selling on StockX: -$${Math.abs(StockXprofit)}`});
        } else {
            return res.json({status: "goat", StockXProfit: StockXprofit, GOATProfit: GOATprofit, messageProfit: `GOAT yields the higher profit of: $${GOATprofit}`, messageLoss: `GOAT yields the lower profit of: $${StockXprofit}`});
        }
    }
};

module.exports = {
    calculateStockXProfit,
    calculateStockXVsGOATProfit,
    calculateGOATProfit
}