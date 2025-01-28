const { CohereClientV2 } = require("cohere-ai");
const { PromptTemplate } = require('@langchain/core/prompts');
const { RetrievalQAChain, loadQAStuffChain } = require('langchain/chains');
const { BufferMemory } = require("langchain/memory");
const { useFaissVectorStore } = require('../embeddings/vectorStore');
const dotenv = require('dotenv');
dotenv.config();

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

class CohereClientV2Wrapper {
  constructor(apiKey) {
    this.client = new CohereClientV2({
      token: apiKey,
    });
  }

  async invoke(input) {
    try {
      const response = await cohere.chat({
        model: 'command-r-plus-08-2024',
        messages: [
          {
            role: 'user',
            content: `${input}`,
          },
        ],
      });
      return response.message?.content[0].text;
    } catch (error) {
      console.error("Error invoking Cohere model:", error);
      throw error;
    }

  }

  pipe(outputParser) {
    this.outputParser = outputParser;
    this.client.invoke = this.invoke;
    return this.client
  }

}

const memory = new BufferMemory({
  memoryKey: "chat_history", 
  returnMessages: true,      
  outputKey: "text"
});

const conversationalAgent = async (query) => {
  try {
    const model = new CohereClientV2Wrapper(process.env.COHERE_API_KEY);
    const vectorStore = await useFaissVectorStore();
    const template = `The given context is Ad performance data. Use the following pieces of context to answer the question. 
    When answering the question, please follow these guidelines:  
    If you don't know the answer, just say that you don't know, don't try to make up an answer. 
    Use three sentences maximum and keep the answer as concise as possible. 
    Always say "thanks for asking!" at the end of the answer. 
    {context} 
    Question: {question}
    Answer only here (MUST be in all lowercase letters.
    If the answer contains a list of things (for example: what are high performing keywords? 
    If the answer contains multiple keywords then you MUST return an array with COMMA separated KEYWORDS. Do use comma between two keywords (eg. ['keyword1', 'keyword2', 'keyword3']).
    what are low performing keywords?) You MUST answer in List Format. You MUST NOT answer out of context.
    If asked out of given context questions just say I don't know.): `;

    const QA_CHAIN_PROMPT = new PromptTemplate({
      inputVariables: ["context", "question"],
      template,
    });

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAStuffChain(model, {
        prompt: QA_CHAIN_PROMPT,
      }),
      memory,
      retriever: vectorStore.asRetriever(),
      returnSourceDocuments: true,
    });

    const res = await chain.call({
      query: query,
    });
    return res;
  } catch (error) {
    console.error("Error in conversationalAgent:", error);
    throw error;
  }
};

module.exports = { conversationalAgent };
