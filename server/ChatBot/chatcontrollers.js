const axios = require('axios');

const chatbotReply = async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt)
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is missing' });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini', // Model
        messages: [{ role: 'system', 
          // GPT Behavior
          content: `
              You are an AI assistant for ProfitBreeze, a website that helps users calculate profits for re-selling items on StockX and GOAT.
              ProfitBreeze provides users with calculators where they input details like item price, item cost, location, and seller level to see how much profit someone can make.
              ProfitBreeze leverages the Open Exchange Rates API to calculate profit based on location and StockX/GOAT guidelines.
              Here’s how the website works:
              - Users input the item price, item cost, location, and seller level(StockX)/seller rating(GOAT) into the calculators.
              - The calculator options are StockX, GOAT, and StockXVSGOAT.
              - The calculators calculate profit for selling on StockX and GOAT, factoring in seller fees, shipping costs, and transaction fees.
              - StockXVSGOAT calculator calculates for both StockX and GOAT and compares the profit telling you which platform to sell on and how much you'll make compared to the other.
              - The website also has a settings page where users can save their default location and seller levels/ratings for StockX and GOAT.
              - If users need assistance, they can ask you, the chatbot, for help with navigating the site, explaining seller fees, and answering questions about the calculators.
              
              Your job is to help users understand how to use the calculators, explain how fees work (refer to StockX and GOAT guidelines), and provide general guidance on maximizing their profits on StockX and GOAT.
            ` }, 
        { role: 'user', content: prompt }],
        max_tokens: 2000, // Max tokens
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`, 
          'Content-Type': 'application/json',
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to get response from chatbot.' });
  }
};

module.exports = { chatbotReply };
