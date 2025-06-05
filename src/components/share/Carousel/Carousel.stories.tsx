
import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const sampleItems = Array.from({ length: 5 }, (_, i) => (
  <div
    key={i}
    className="w-full h-64 flex items-center justify-center bg-blue-500 text-white text-2xl"
  >
    Slide {i + 1}
  </div>
));

export const Default: Story = {
  render: () => <Carousel items={sampleItems} />,
};
