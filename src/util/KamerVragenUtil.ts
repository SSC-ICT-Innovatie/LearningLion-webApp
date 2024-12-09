import { createFetchDocument, fetchedDocument } from "./documentFactory.ts";
import LocalApiHandler from "./localApiHandler.ts";

export const getName = () => 'Learning Lion - Kamervragen'

export const fetchedDocuments = async (prompt: string, subject: string, APIHandler: React.MutableRefObject<LocalApiHandler>
): Promise<fetchedDocument[]> => APIHandler.current.queryDocuments(prompt, subject)
    .then((response) => {
      console.log("fetched documents");
      const { documents } = response;
      const docs = documents.map(
        (
          document: {
            metadata: {
              subject: string;
              UUID: string;
              source: string;
              page_number: number;
              question_number: string;
            };
            text: string;
            answer: string;
          },
          index: number
        ) => createFetchDocument(
          document.metadata.subject,
          '',
          document.metadata.UUID,
          document.metadata.source,
          document.metadata.page_number,
          document.text,
          index,
          document.metadata.question_number,
          document.answer
        )
      );
      const seen = new Set<string>();
      const duplicates = new Set<string>();
      
      docs.forEach((doc: { UUID: string }) => {
        if (seen.has(doc.UUID)) {
          duplicates.add(doc.UUID);
        } else {
          seen.add(doc.UUID);
        }
      });
      
      if (duplicates.size > 0) {
        console.log('Duplicates:', duplicates.size);
        console.log('Duplicates:', duplicates);
      }
      return docs;
    });