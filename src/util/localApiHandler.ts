/* eslint-disable class-methods-use-this */
import { fetchedDocument } from './documentFactory.ts';

interface LLMFiles {
  uuid: string;
  question_number: string;
}

export default class LocalApiHandler {
  static apiUrl = '';

  static apiToken = '';

  static specialty = 'None';

  static model = 'BramVanroy/fietje-2-chat';

  setApiUrl(url: string) {
    LocalApiHandler.apiUrl = url;
  }

  setApiToken(token: string) {
    LocalApiHandler.apiToken = token;
  }

  setSpecialty(specialty: string) {
    LocalApiHandler.specialty = specialty;
  }

  setLLMModel(model: string) {
    LocalApiHandler.model = model;
  }

  async getAvailableModles() {
    const response = await fetch(`${LocalApiHandler.apiUrl}/llmmodels`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
        'ngrok-skip-browser-warning': 'Any value',
      },
    });
    const data = await response.json();
    return data;
  }

  // Query Documents
  async queryDocuments(query: string, subject: string) {
    const body = {
      query,
      subject,
      specialty: LocalApiHandler.specialty,
      type:"all"
    };
    const response = await fetch(`${LocalApiHandler.apiUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
        'ngrok-skip-browser-warning': 'Any value',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  // Inference LLM
  async infereLLM(query: string | object, documents: fetchedDocument[]) {
    const llmFiles: LLMFiles[] = [];
    documents.forEach((doc) => {
      llmFiles.push({
        uuid: doc.uuid,
        question_number: doc.questionNumber,
      });
    });
    let body = {
      // prompt: query,
      files: documents,
      specialty: LocalApiHandler.specialty,
      model: LocalApiHandler.model,
    };
    if (typeof query === 'string') {
      body = { ...body, ...{ prompt: query } };
    }
    if (typeof query === 'object') {
      body = { ...body, ...query };
    }
    try {
      const response = await fetch(`${LocalApiHandler.apiUrl}/llm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LocalApiHandler.apiToken}`,
          'ngrok-skip-browser-warning': 'Any value',
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
    const data = {
      query,
      specialty: LocalApiHandler.specialty,
    };
    const response = await fetch(`${LocalApiHandler.apiUrl}/pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
        'ngrok-skip-browser-warning': 'Any value',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.result;
  }

  async getSpecialties() {
    const response = await fetch(`${LocalApiHandler.apiUrl}/specialties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalApiHandler.apiToken}`,
        'ngrok-skip-browser-warning': 'Any value',
      },
    });
    const data = await response.json();
    return data;
  }
}
