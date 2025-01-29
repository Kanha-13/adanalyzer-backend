# 🚀 AdAnalyzer Backend  

## 📌 Overview  
The **AdAnalyzer Backend** is built using **Node.js** and **Express.js**, with integrations to **Langchain** for orchestrating the process and **Cohere's LLM** for generating ad performance analysis. This backend service enables users to upload **CSV files** of ad data, perform keyword performance analysis, and query the system for further insights.

### 🔥 Features  
✅ **CSV File Upload** – Users can upload a CSV file containing their ad data through the `/upload` endpoint.  
✅ **Ad Performance Analysis** – The `/analyze` endpoint processes the uploaded CSV and provides an analysis of keyword performance with improvement suggestions.  
✅ **Underperforming Keyword Removal** – The backend generates an updated CSV that removes underperforming keywords.  
✅ **Query Endpoint** – Users can send queries to further analyze the ad performance via the `/query` endpoint, powered by the LLM model.  
✅ **Vector Store** – The CSV matrix is stored in a **Faiss vector store** using **Cohere embeddings** for efficient searching.  
✅ **Conversation History** – User queries and responses are stored in **BufferMemory** for ongoing conversations.  
✅ **Langchain Orchestration** – Langchain is used to manage the flow between the file analysis, query answering, and embedding processes.  

---

## 🛠 Prerequisites  
Ensure you have the following installed before setting up the project:  

- **[Node.js](https://nodejs.org/)** – For the server runtime  
- **[npm](https://www.npmjs.com/)** – Node Package Manager  
- **[Cohere API Key](https://cohere.ai/)** – For using the LLM model  
- **[Docker](https://www.docker.com/)** – For containerization (optional)  
- **[Docker Compose](https://docs.docker.com/compose/)** – For managing multiple containers (optional)  

---

## 🚀 Installation & Setup  

### 1️⃣ Clone the Backend Repository  
```sh
git clone https://github.com/Kanha-13/adanalyzer-backend
cd adanalyzer-backend
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Create Environment Variables  
In the root directory of the backend (`adanalyzer-backend/`), create a `.env` file and add your **Cohere API key**:  

```env
COHERE_API_KEY=YOUR_COHERE_API
```

> You can change the LLM provider if desired. To do so, follow the [Langchain documentation](https://js.langchain.com/docs/integrations/llms/) for integration with your chosen model.  

### 4️⃣ Start the Server  
```sh
npm start
```

The backend server will be running on **[http://localhost:5000](http://localhost:5000)**.

---

## 🐳 Running with Docker  

If you'd like to run the backend inside a **Docker container**, follow these steps:  

### 1️⃣ Create a Root Project Directory  
```sh
mkdir adanalyzer && cd adanalyzer
```

### 2️⃣ Set Up `docker-compose.yml`  
Create a file named `docker-compose.yml` inside `adanalyzer/` and add the following content:  

```yaml
version: '3.8'

services:
  frontend:
    build: ./adanalyzer-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./adanalyzer-frontend:/app
      - /app/node_modules
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:5000

  backend:
    build: ./adanalyzer-backend
    ports:
      - "5000:5000"
    volumes:
      - ./adanalyzer-backend:/app
      - /app/node_modules
    environment:
      - PORT=5000
      - COHERE_API_KEY=YOUR_COHERE_API
```

👉 **Note:** You should also set up the frontend repository as described in the [AdAnalyzer Frontend README](https://github.com/Kanha-13/adanalyzer-frontend).  

### 3️⃣ Clone the Frontend Repository  
```sh
git clone https://github.com/Kanha-13/adanalyzer-frontend
```

### 4️⃣ Build and Run the Containers  
#### 🏗 Build Docker Images  
```sh
docker-compose build
```  
#### 🚀 Start the Containers  
```sh
docker-compose up
```  

Once running, the backend will be available at **[http://localhost:5000](http://localhost:5000)**, and the frontend will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## 🔍 API Endpoints

### 1️⃣ `/upload`  
**Method**: `POST`  
**Description**: Upload a CSV file containing ad performance data.  
**Request**: Form-data containing the file.  
**Response**: Returns a **file path** that can be used in subsequent requests.  

#### Example Request:  
```bash
curl -X POST -F "file=@your_ad_data.csv" http://localhost:5000/upload
```

#### Example Response:  
```json
{
  "filePath": "/uploads/your_ad_data.csv"
}
```

### 2️⃣ `/analyze`  
**Method**: `POST`  
**Description**: Analyzes the uploaded CSV and returns ad performance insights. The file path from the `/upload` endpoint is required.  
**Request**:  
```json
{
  "filePath": "/uploads/your_ad_data.csv"
}
```
**Response**: Returns analysis data, suggestions for ad improvement, and a new CSV with underperforming keywords removed.  

#### Example Response:  
```json
{
  "analysis": {
    "wellPerformingKeywords": ["Keyword A", "Keyword B"],
    "underperformingKeywords": ["Keyword X", "Keyword Y"],
    "suggestions": "Focus on improving Keywords X and Y."
  },
  "updatedCsv": "/uploads/your_ad_data_updated.csv"
}
```

### 3️⃣ `/query`  
**Method**: `POST`  
**Description**: Query the LLM for further insights about ad performance.  
**Request**:  
```json
{
  "query": "Tell me more about Keyword A's performance."
}
```
**Response**: Returns a detailed response from the LLM.  

#### Example Response:  
```json
{
  "response": "Keyword A has shown significant performance with a 25% conversion rate. Consider expanding its reach."
}
```

---

## 🏆 Usage  

1️⃣ **Upload** your CSV file via the `/upload` endpoint.  
2️⃣ Send the file path to the `/analyze` endpoint to get a detailed analysis of your ad performance.  
3️⃣ Use the `/query` endpoint to ask specific questions about your ad performance.  
4️⃣ Download the updated CSV with underperforming keywords removed for future use.  

---

## 🤝 Contributing  

We welcome contributions! 🚀  

💡 **Ways to Contribute:**  
- Fork the repository  
- Submit issues  
- Create pull requests  

🔗 **Fork the repo & start contributing:**  
```sh
git clone https://github.com/Kanha-13/adanalyzer-backend.git
cd adanalyzer-backend
npm install
npm start
```

---

## 📜 License  

This project is licensed under the **MIT License**.  

---

🚀 _For frontend setup, check out the [AdAnalyzer Frontend README](https://github.com/Kanha-13/adanalyzer-frontend)._ 🚀  
