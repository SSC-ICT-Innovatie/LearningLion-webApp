import { fetchedDocument } from "./documentFactory";

interface LLMFiles {
  uuid: string;
  question_number: string;
}

export class LocalApiHandler {
  static apiUrl = "";
  static apiToken = "";

  constructor() {

  }
  setApiUrl(url: string) {
    LocalApiHandler.apiUrl = url;
  }
  setApiToken(token: string) {
    LocalApiHandler.apiToken = token;
  }

  // Query Documents
  async queryDocuments(query: string) {
    const body = {
      query: query,
    };
    const response = await fetch(`${LocalApiHandler.apiUrl}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(`Queried documents:`, data);
    return data;
  }

  // Inference LLM
  async infereLLM(query: string, documents: fetchedDocument[]) {
    console.log(`Infering LLM for query: ${query}`);
    console.log(`url: ${LocalApiHandler.apiUrl}`);
    const llmFiles: LLMFiles[] = [];
    documents.forEach((doc) => {
      llmFiles.push({
        uuid: doc.uuid,
        question_number: doc.question_number,
      });
    });
    const body = {
      prompt: query,
      files: documents,
    };
    try{
    const response = await fetch(`${LocalApiHandler.apiUrl}/llm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
      },
      body: JSON.stringify(body),
    }
  );

    const data = await response.json();
    console.log(`Inferred LLM:`, data);
    return data;
  }
  catch (error) {
    console.log(error)
    return false
  }
  }

  // General Pipeline
  async generalPipeline(
    query: string,
  ) {
    const data = { query };
    const response = await fetch(`${LocalApiHandler.apiUrl}/pipeline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.result;
  }
}