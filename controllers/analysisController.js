const csvProcessor = require('../utils/csvProcessor');
const { initializeVectorStore } = require('../embeddings/vectorStore');
const { promptLLM } = require('../services/promptLLM');

const analyzeCSV = async (req, res) => {
  const { filePath } = req.body;
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  try {
    const parsedData = await csvProcessor.parseCSV(filePath);
    const { analysis, updatedAdData } = await promptLLM(parsedData);
    await initializeVectorStore(parsedData); // Generate and save embeddings

    res.status(200).json({
      message: "Analysis complete",
      analysis,
      rawData: parsedData,
      updatedAdData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error analyzing the file' });
  }
};

module.exports = { analyzeCSV };
