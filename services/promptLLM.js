const { ChatCohere } = require('@langchain/cohere');
const dotenv = require('dotenv');
dotenv.config();


const promptLLM = async (adData = []) => {
  const prompt = `
  Analyze the ad performance for the following data:
  ${JSON.stringify(adData)}

  Please consider the following metrics for analysis:
  - Keyword performance:
    - High ROAS (over 5) and low ACOS (under 10) are good indicators of performance.
    - CTR greater than 5% is also considered high.
  - Summarize which keywords are performing well (i.e., high ROAS, low ACOS, high CTR) and which keywords are underperforming (i.e., low ROAS, high ACOS, low CTR).
  - For each underperforming keyword, suggest whether it should be removed or updated.
  - Provide general suggestions for improving ad performance based on this analysis.

  Please return the result in the following JSON format:
  {
    "performance_summary": "Your summary here...",
    "high_performing_keywords": ["keyword1", "keyword2"],
    "underperforming_keywords": ["keyword1", "keyword2"],
    "general_suggestions": ["suggestion1", "suggestion2"]
  }
  `;

  const llm = new ChatCohere({
    model: 'command-r-plus-08-2024',
    temperature: 0.5,
  });
  const response = await llm.invoke(prompt);
  console.log(JSON.parse(`${response.content}`))
  const result = JSON.parse(`${response.content}`);
  return (
    {
      analysis: {
        performanceSummary: result.performance_summary,
        highPerformingKeywords: result.high_performing_keywords,
        underPerformingKeywords: result.underperforming_keywords,
        generalSuggestions: result.general_suggestions,
      },
      updatedAdData: [],
      updatedAdData: updateAdData(adData, result),
    }
  )
}


const updateAdData = (adData, result) => {
  return adData.filter((keywordData) => {
    const underperforming = result.underperforming_keywords.find(
      (k) => k === keywordData.keyword
    );
    if (!underperforming) return true;
    return false;
  });
}

module.exports = { promptLLM };