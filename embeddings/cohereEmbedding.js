const { CohereClientV2 } = require('cohere-ai');
const dotenv = require('dotenv');
dotenv.config();


const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});


class CohereEmbeddings {
  constructor(model = 'embed-english-v2.0') {
    this.model = model;
  }

  async embedDocuments(documents) {
    const embeddingsResponse = await cohere.embed({
      model: this.model,
      texts: documents,
      embeddingTypes: ['float'],
      inputType: 'classification',
    });

    return embeddingsResponse.embeddings.float;
  }

  async embedQuery(query) {
    const embeddingsResponse = await cohere.embed({
      model: this.model,
      texts: [query],
      embeddingTypes: ['float'],
      inputType: 'classification',
    });
    return embeddingsResponse.embeddings.float[0]; 
  }
}

module.exports = CohereEmbeddings;
