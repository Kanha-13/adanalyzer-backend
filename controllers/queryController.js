const { conversationalAgent } = require('../services/conversationalAgent');

const handleQuery = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await conversationalAgent(query);
    res.json({ data: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error processing query' });
  }
};

module.exports = { handleQuery };
