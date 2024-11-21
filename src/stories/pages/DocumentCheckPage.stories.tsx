// src/components/pages/document_check_page/DocumentCheckPage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import DocumentCheckPage from '../../components/pages/document_check_page/document_check_page';
import { fetchedDocument } from '../../util/documentFactory';

const mockDocuments: fetchedDocument[] = [
  {
    uuid: '1',
    subject: 'Subject 1',
    url: 'https://example.com/1',
    source: 'Source 1',
    page: 1,
    id: 1,
    text: 'Sample text 1',
    questionNumber: '1',
  },
  {
    uuid: '2',
    subject: 'Subject 2',
    url: 'https://example.com/2',
    source: 'Source 2',
    page: 2,
    id: 2,
    text: 'Sample text 2',
    questionNumber: '2',
  },
  {
    uuid: '3',
    subject: 'Subject 3',
    url: 'https://example.com/3',
    source: 'Source 3',
    page: 3,
    id: 3,
    text: 'Sample text 3',
    questionNumber: '3',
  },
];
const meta: Meta<typeof DocumentCheckPage> = {
  title: 'Pages/DocumentCheckPage',
  component: DocumentCheckPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    documents: mockDocuments,
  },
} satisfies Meta<typeof DocumentCheckPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    documents: mockDocuments,
  },
};

export const WithOneDocument: Story = {
  args: {
    documents: [
      {
        uuid: '1',
        subject: 'Single Document',
        url: 'https://example.com/1',
        source: 'Single Source',
        page: 1,
        id: 1,
        text: 'Sample text',
        questionNumber: '1',
      },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    documents: [],
  },
};
