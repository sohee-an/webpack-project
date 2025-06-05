// src/components/Input/Input.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { Search, Mail, Lock, User } from 'lucide-react';

// 아이콘을 컴포넌트로 래핑
const SearchIcon = () => <Search className="w-4 h-4 text-gray-500" />;

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    icon: {
      control: false,
      description: 'React component for the input icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요',
  },
};

export const WithSearchIcon: Story = {
  args: {
    icon: <SearchIcon />,
  },
};
