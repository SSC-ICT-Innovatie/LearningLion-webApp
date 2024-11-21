export interface fetchedDocument {
  id: number;
  subject: string;
  url: string;
  uuid: string;
  source: string;
  page: number;
  text: string;
  questionNumber: string;
}

export const createFetchDocument = (
  subject: string,
  url: string,
  uuid: string,
  source: string,
  page: number,
  text: string,
  id: number,
  questionNumber: string,
): fetchedDocument => ({
  id,
  subject,
  url,
  uuid,
  source,
  page,
  text,
  questionNumber,
});
