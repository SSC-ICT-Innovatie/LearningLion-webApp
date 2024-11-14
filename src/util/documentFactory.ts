export interface fetchedDocument {
  id: number,
  subject: string,
  url: string,
  uuid: string,
  source: string,
  page: number
  text: string
  question_number: string
}

export const createFetchDocument = (subject: string, url: string, uuid: string, source: string, page: number, text: string, id: number, question_number: string): fetchedDocument => {
  return {
    id: id,
    subject: subject,
    url: url,
    uuid: uuid,
    source: source,
    page: page,
    text: text,
    question_number: question_number
  }
}