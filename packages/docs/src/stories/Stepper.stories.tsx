import { type StepItem, Stepper, type StepperProps } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
  title: 'Organisms/Stepper',
  component: Stepper,
  argTypes: {
    activeStep: {
      control: { type: 'number', min: 0 },
      description: 'Index aktuálneho kroku (0-based)',
      table: { defaultValue: { summary: '0' } },
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Či je zoznam krokov predvolene rozbalený',
      table: { defaultValue: { summary: 'false' } },
    },
    steps: {
      control: false,
      description: 'Pole krokov (label, isSummary?)',
    },
    onStepClick: {
      control: false,
      description: 'Callback pri kliknutí na dokončený krok',
    },
  },
  args: {
    activeStep: 2,
    defaultExpanded: false,
  },
  parameters: {
    layout: 'padded',
    actions: { argTypesRegex: '^$' },
    docs: {
      description: {
        component:
          'Stepper zobrazuje postup cez viacstupienkový proces. Obsahuje hlavičku s číslom kroku a progres barom, a rozbaľovací zoznam krokov s navigáciou.',
      },
    },
  },
} satisfies Meta<StepperProps>;

export default meta;
type Story = StoryObj<StepperProps>;

const fiveSteps: StepItem[] = [
  { label: 'Osobné údaje' },
  { label: 'Adresa trvalého bydliska' },
  { label: 'Kontaktné informácie' },
  { label: 'Doklady a prílohy' },
  { label: 'Potvrdenie a odoslanie' },
];

const fiveStepsWithSummary: StepItem[] = [
  { label: 'Osobné údaje' },
  { label: 'Adresa trvalého bydliska' },
  { label: 'Kontaktné informácie' },
  { label: 'Doklady a prílohy' },
  { label: 'Zhrnutie', isSummary: true },
];

const manySteps: StepItem[] = [
  { label: 'Osobné údaje' },
  { label: 'Adresa trvalého bydliska' },
  { label: 'Kontaktné informácie' },
  { label: 'Rodinné pomery' },
  { label: 'Zamestnanosť' },
  { label: 'Príjmy a majetok' },
  { label: 'Zdravotný stav' },
  { label: 'Vzdelanie a kvalifikácia' },
  { label: 'Doklady a prílohy' },
  { label: 'Doplňujúce informácie' },
  { label: 'Súhlas so spracovaním' },
  { label: 'Overenie totožnosti' },
  { label: 'Platba poplatku' },
  { label: 'Výber termínu' },
  { label: 'Potvrdenie a odoslanie' },
  { label: 'Zhrnutie', isSummary: true },
];

/* ─── Collapsed (default) ─── */

export const Collapsed: Story = {
  name: 'Zbalený stav',
  args: {
    steps: fiveSteps,
    activeStep: 2,
    defaultExpanded: false,
  },
  parameters: {
    docs: {
      description: { story: 'Predvolený stav — hlavička je viditeľná, zoznam krokov je zbalený.' },
    },
  },
};

/* ─── Expanded ─── */

export const Expanded: Story = {
  name: 'Rozbalený stav',
  args: {
    steps: fiveSteps,
    activeStep: 2,
    defaultExpanded: true,
  },
  parameters: {
    docs: {
      description: { story: 'Zoznam krokov je rozbalený — viditeľné všetky kroky s navigáciou.' },
    },
  },
};

/* ─── First step ─── */

export const FirstStep: Story = {
  name: 'Prvý krok',
  args: {
    steps: fiveSteps,
    activeStep: 0,
    defaultExpanded: true,
  },
  parameters: {
    docs: { description: { story: 'Prvý krok je aktívny. Progres bar ukazuje 1/5.' } },
  },
};

/* ─── Last step ─── */

export const LastStep: Story = {
  name: 'Posledný krok',
  args: {
    steps: fiveSteps,
    activeStep: 4,
    defaultExpanded: true,
  },
  parameters: {
    docs: { description: { story: 'Posledný krok je aktívny. Progres bar je plný.' } },
  },
};

/* ─── With summary step ─── */

export const WithSummary: Story = {
  name: 'So zhrnutím',
  args: {
    steps: fiveStepsWithSummary,
    activeStep: 2,
    defaultExpanded: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Posledný krok je označený ako zhrnutie (isSummary: true) — zobrazí sa ikona zaškrtnutia namiesto čísla.',
      },
    },
  },
};

/* ─── Many steps (2-column on desktop) ─── */

export const ManySteps: Story = {
  name: 'Veľa krokov',
  args: {
    steps: manySteps,
    activeStep: 5,
    defaultExpanded: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'S väčším počtom krokov sa na širokých obrazovkách zobrazí dvojstĺpcové rozloženie.',
      },
    },
  },
};

/* ─── Clickable steps ─── */

function ClickableDemo(args: StepperProps) {
  const [active, setActive] = useState(3);
  return (
    <Stepper
      {...args}
      steps={fiveStepsWithSummary}
      activeStep={active}
      defaultExpanded
      onStepClick={(index) => setActive(index)}
    />
  );
}

export const Clickable: Story = {
  name: 'Klikateľné kroky',
  render: (args) => <ClickableDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Dokončené kroky sú klikateľné — kliknutím sa naviguje na daný krok a zoznam sa automaticky zbalí.',
      },
    },
  },
};

/* ─── Mobile view ─── */

export const Mobile: Story = {
  name: 'Mobilné zobrazenie',
  args: {
    steps: fiveStepsWithSummary,
    activeStep: 2,
    defaultExpanded: true,
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '375px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: { description: { story: 'Mobilné zobrazenie — jednodstĺpcový zoznam krokov.' } },
  },
};
