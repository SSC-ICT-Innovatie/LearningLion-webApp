// src/components/atoms/text-element/TextElement.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TextElement from '../../components/atoms/TextElement/TextElement';

const meta: Meta<typeof TextElement> = {
  title: 'Atoms/TextElement',
  component: TextElement,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'p',
    children: 'This is a text element',
    onClick: fn(),
    link: '',
  },
} satisfies Meta<typeof TextElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'p',
    children: 'This is a paragraph element',
  },
};

export const Span: Story = {
  args: {
    type: 'span',
    children: 'This is a span element',
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    children: 'Click here',
    link: 'https://example.com',
  },
};

export const Clickable: Story = {
  args: {
    type: 'p',
    children: 'This is a clickable text',
    onClick: () => alert('Text clicked!'),
  },
};
