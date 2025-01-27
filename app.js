const express = require('express');
const { uploadCSV, upload } = require('./controllers/uploadController');
const { analyzeCSV } = require('./controllers/analysisController');
const cors = require('cors');
const app = express();
app.use(express.json());

// Routes
app.use(cors());  
app.post('/upload', upload.single('file'), uploadCSV);
app.post('/analyze', analyzeCSV);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
