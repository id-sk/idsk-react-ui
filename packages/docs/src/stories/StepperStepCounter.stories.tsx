import { StepperStepCounter, type StepperStepCounterProps } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Molecules/StepperStepCounter',
  component: StepperStepCounter,
  argTypes: {
    step: {
      control: { type: 'number', min: 1 },
      description: 'Aktuálny krok (1-based)',
    },
    total: {
      control: { type: 'number', min: 1 },
      description: 'Celkový počet krokov',
    },
  },
  args: {
    step: 2,
    total: 5,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'StepperStepCounter zobrazuje aktuálnu pozíciu v procese vo formáte "Krok N/N". Používa sa ako súčasť Stepper komponentu, ale môže byť použitý aj samostatne.',
      },
    },
  },
} satisfies Meta<StepperStepCounterProps>;

export default meta;
type Story = StoryObj<StepperStepCounterProps>;

export const Default: Story = {
  name: 'Predvolený stav',
  parameters: {
    docs: {
      description: { story: 'Predvolený stav — zobrazuje aktuálny krok a celkový počet krokov.' },
    },
  },
};

export const FirstStep: Story = {
  name: 'Prvý krok',
  args: { step: 1, total: 5 },
  parameters: {
    docs: { description: { story: 'Prvý krok z piatich.' } },
  },
};

export const LastStep: Story = {
  name: 'Posledný krok',
  args: { step: 5, total: 5 },
  parameters: {
    docs: { description: { story: 'Posledný krok — progres je na konci.' } },
  },
};

export const ManySteps: Story = {
  name: 'Veľa krokov',
  args: { step: 8, total: 16 },
  parameters: {
    docs: { description: { story: 'Väčší počet krokov.' } },
  },
};
