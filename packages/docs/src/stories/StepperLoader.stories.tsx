import { StepperLoader, type StepperLoaderProps } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Molecules/StepperLoader',
  component: StepperLoader,
  argTypes: {
    value: {
      control: { type: 'number', min: 0 },
      description: 'Aktuálna hodnota (napr. číslo kroku)',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximálna hodnota (napr. celkový počet krokov)',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimálna hodnota. Predvolená: 1',
      table: { defaultValue: { summary: '1' } },
    },
    label: {
      control: 'text',
      description: 'Prístupný popis pre čítačky obrazovky',
    },
  },
  args: {
    value: 2,
    max: 5,
    label: 'Krok 2 z 5',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'StepperLoader zobrazuje progres barom postup v procese. Používa sa ako súčasť Stepper komponentu, ale môže byť použitý aj samostatne.',
      },
    },
  },
} satisfies Meta<StepperLoaderProps>;

export default meta;
type Story = StoryObj<StepperLoaderProps>;

export const Default: Story = {
  name: 'Predvolený stav',
  parameters: {
    docs: { description: { story: 'Predvolený stav — krok 2 z 5.' } },
  },
};

export const Start: Story = {
  name: 'Začiatočný stav',
  args: { value: 1, max: 5, label: 'Krok 1 z 5' },
  parameters: {
    docs: { description: { story: 'Začiatok procesu — prvý krok.' } },
  },
};

export const Complete: Story = {
  name: 'Dokončený stav',
  args: { value: 5, max: 5, label: 'Krok 5 z 5' },
  parameters: {
    docs: { description: { story: 'Koniec procesu — progres bar je plný.' } },
  },
};

export const ManySteps: Story = {
  name: 'Veľa krokov',
  args: { value: 8, max: 16, label: 'Krok 8 z 16' },
  parameters: {
    docs: { description: { story: 'Väčší počet krokov — 50 % postup.' } },
  },
};
