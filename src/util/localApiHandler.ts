import { fetchedDocument } from "./documentFactory";

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
    const body = {
      prompt: query,
      files: documents,
    };
    const response = await fetch(`${LocalApiHandler.apiUrl}/llm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(`Inferred LLM:`, data);
    return data;
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