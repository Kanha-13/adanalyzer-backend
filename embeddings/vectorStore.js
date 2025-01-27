const { Document } = require('@langchain/core/documents');
const { FaissStore } = require('@langchain/community/vectorstores/faiss');
const dotenv = require('dotenv');
const CohereEmbeddings = require('./cohereEmbedding');
dotenv.config();


async function createAdVectorStore(adData) {
  const documents = adData.map(item => {
    const pageContent = `Keyword: ${item.keyword}.
    Performance Metrics: CTR ${item.ctr}%,
    ROAS ${item.roas.toFixed(2)}, ACOS ${item.acos.toFixed(2)}`;

    const metadata = {
      keyword: item.keyword,
      ctr: item.ctr,
      roas: item.roas,
      acos: item.acos === Infinity ? null : item.acos
    };

    return new Document({ pageContent, metadata });
  });

  const embeddings = new CohereEmbeddings();
  const vectorStore = await FaissStore.fromDocuments(documents, embeddings);
  return vectorStore;
}

async function initializeVectorStore(adData) {
  try {
    const vectorStore = await createAdVectorStore(adData);
    const res = await vectorStore.save('./vector-store')
    console.log('Vector store created and saved successfully!');

  } catch (error) {
    console.error('Error initializing vector store:', error);
  }
}

module.exports = { initializeVectorStore, useFaissVectorStore };