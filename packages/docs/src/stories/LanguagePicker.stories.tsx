import type { Meta, StoryObj } from '@storybook/react-vite';

import { LanguagePicker } from '@id-sk/react';

const LANGUAGES = [
  { value: 'sk', label: 'Slovenčina' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'cs', label: 'Čeština' },
  { value: 'hu', label: 'Magyar' },
];

const meta = {
  title: 'Molecules/LanguagePicker',
  component: LanguagePicker,
  parameters: {
    docs: {
      description: {
        component:
          'LanguagePicker umožňuje používateľom prepínať medzi jazykmi. Zobrazuje aktuálny jazyk ako tlačidlo a po kliknutí otvorí rozbaľovací zoznam dostupných jazykov.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Počiatočná hodnota (nekontrolovaný stav)',
    },
    languages: {
      control: 'object',
      description: 'Zoznam dostupných jazykov',
    },
    onDark: {
      control: 'boolean',
      description: 'Biele tlačidlo pre tmavé pozadie (napr. TopBar hlavička)',
    },
  },
} satisfies Meta<typeof LanguagePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Základný',
  args: {
    defaultValue: 'sk',
    languages: LANGUAGES,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Základný stav — tlačidlo zobrazuje aktívny jazyk, kliknutím sa otvorí rozbaľovací zoznam dostupných jazykov.',
      },
    },
  },
};

export const OnDarkBackground: Story = {
  name: 'Na tmavom pozadí (TopBar)',
  decorators: [
    (Story) => (
      <div className="flex items-center justify-end bg-primary-600 p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    defaultValue: 'sk',
    languages: LANGUAGES,
    onDark: true,
  },
};

export const ControlledOpen: Story = {
  name: 'Vždy otvorený (open=true)',
  args: {
    defaultValue: 'sk',
    languages: LANGUAGES,
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Prop `open=true` vynúti trvalo otvorený stav zoznamu — užitočné pri debugovaní alebo testovaní rozbaľovacieho panela.',
      },
    },
  },
};

export const SingleLanguage: Story = {
  name: 'Jeden jazyk',
  args: {
    defaultValue: 'sk',
    languages: [{ value: 'sk', label: 'Slovenčina' }],
  },
};
