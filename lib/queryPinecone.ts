import { pineconeIndex } from "./pinecone";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

export async function queryPinecone(userId: string, question: string) {
  // 1️⃣ Embed the question - must be 768-dim to match your Pinecone index
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY!,
    model: "models/text-embedding-004", // ✔ correct, 768 dims
  });

  const queryEmbedding = await embeddings.embedQuery(question);

  // 2️⃣ Query Pinecone
  const queryResponse = await pineconeIndex.query({
    vector: queryEmbedding,
    topK: 5,
    filter: { userId },
    includeMetadata: true,
  });

  if (!queryResponse.matches?.length) {
    return "No relevant information found in your uploaded PDF.";
  }

  // 3️⃣ Build context
  const context = queryResponse.matches
    .map((match) => match.metadata?.text)
    .join("\n\n");

  // 4️⃣ Use Gemini Flash (correct model name for LangChain)
  const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY!,
    model: "gemini-2.5-flash", // ✔ correct for LangChain
    temperature: 0.3,
  });

  const template = `You are a helpful AI assistant. Use the following context to answer the question.
If the answer is not in the context, respond: "I don't know based on the provided document."

Context:
{context}

Question:
{question}

Answer:`;

  const prompt = PromptTemplate.fromTemplate(template);
  const outputParser = new StringOutputParser();

  const chain = RunnableSequence.from([prompt, llm, outputParser]);

  const answer = await chain.invoke({
    context,
    question,
  });

  return answer;
}
