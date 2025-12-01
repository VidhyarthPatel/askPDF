import { extractTextFromPDF } from "./extractTextFromPDF";
import { pineconeIndex } from "./pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function uploadPDFToPinecone(buffer: Buffer, userId: string) {
  // 1. Extract text from PDF
  console.log("Extracting text from PDF...");
  const text = await extractTextFromPDF(buffer);
  console.log(`Extracted text length: ${text.length}`);

  // 2. Split text into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
  });

  const chunks = await splitter.splitText(text);
  console.log(`Generated ${chunks.length} chunks.`);
  if (chunks.length > 0) {
    console.log(`First chunk preview: ${chunks[0].substring(0, 100)}...`);
  }

  // 3. Generate embeddings
  console.log("Generating embeddings...");
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Missing GOOGLE_API_KEY");
  }

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "models/text-embedding-004",
  });

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const vectors: number[][] = [];
  for (const chunk of chunks) {
    const embedding = await embeddings.embedQuery(chunk);
    vectors.push(embedding);
    console.log(`Generated embedding for chunk. Waiting 2s...`);
    await delay(2000);
  }
  console.log(`Generated ${vectors.length} vectors.`);
  if (vectors.length > 0) {
    console.log(`First vector dimension: ${vectors[0].length}`);
  }

  // 4. Prepare vectors for Pinecone
  const pineconeVectors = vectors.map((values, i) => ({
    id: `${userId}-${Date.now()}-${i}`,
    values,
    metadata: {
      text: chunks[i],
      userId,
    },
  }));

  // 5. Upsert to Pinecone in batches of 100
  const batchSize = 100;
  for (let i = 0; i < pineconeVectors.length; i += batchSize) {
    const batch = pineconeVectors.slice(i, i + batchSize);
    await pineconeIndex.upsert(batch);
  }

  return { chunks: chunks.length };
}
