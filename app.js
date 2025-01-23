const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

// Routes
app.use(cors());  

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
