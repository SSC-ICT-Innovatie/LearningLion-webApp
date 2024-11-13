export interface fetchedDocument {
  subject: string,
  url: string,
  uuid: string,
  source: string,
  page: number
}

export const createFetchDocument = (subject: string, url: string, uuid: string, source: string, page: number): fetchedDocument => {
  return {
    subject: subject,
    url: url,
    uuid: uuid,
    source: source,
    page: page
  }
}