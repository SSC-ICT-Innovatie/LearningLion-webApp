/* eslint-disable class-methods-use-this */
import { fetchedDocument } from './documentFactory.ts';

interface LLMFiles {
  uuid: string;
  question_number: string;
}

export default class LocalApiHandler {
  static apiUrl = '';

  static apiToken = '';

  setApiUrl(url: string) {
    LocalApiHandler.apiUrl = url;
  }

  setApiToken(token: string) {
    LocalApiHandler.apiToken = token;
  }

  // Query Documents
  async queryDocuments(query: string) {
    const body = {
      query,
    };
    const response = await fetch(`${LocalApiHandler.apiUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  // Inference LLM
  async infereLLM(query: string, documents: fetchedDocument[]) {
    const llmFiles: LLMFiles[] = [];
    documents.forEach((doc) => {
      llmFiles.push({
        uuid: doc.uuid,
        question_number: doc.questionNumber,
      });
    });
    const body = {
      prompt: query,
      files: documents,
    };
    try {
      const response = await fetch(`${LocalApiHandler.apiUrl}/llm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LocalApiHandler.apiToken}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      return false;
    }
  }

  // General Pipeline
  async generalPipeline(query: string) {
    const data = { query };
    const response = await fetch(`${LocalApiHandler.apiUrl}/pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.result;
  }
}
