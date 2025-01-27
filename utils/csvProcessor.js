const fs = require('fs');
const csvParser = require('csv-parser');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        const keywordPerformance = {
          keyword: data['﻿"Matched product "'] || "",
          ctr: parseFloat(data["CTR"]) || 0,
          roas: parseFloat(data["ROAS"]) || 0,
          acos: parseFloat(data["ACOS"]) || Infinity,
        };
        results.push(keywordPerformance);
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};


module.exports = { parseCSV };
