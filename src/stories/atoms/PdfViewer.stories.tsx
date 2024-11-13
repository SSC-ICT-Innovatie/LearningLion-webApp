// src/components/PdfViewer/PdfViewer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PdfViewer } from '../../components/atoms/pdfViewer/PdfViewer';

const meta: Meta<typeof PdfViewer> = {
  title: 'Components/PdfViewer',
  component: PdfViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PdfViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};