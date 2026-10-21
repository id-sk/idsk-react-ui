import type { Meta, StoryObj } from '@storybook/react-vite';

import { TopBar } from '@id-sk/react';

const LANGUAGES = [
  { value: 'sk', label: 'Slovenčina' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'cs', label: 'Čeština' },
  { value: 'hu', label: 'Magyar' },
];

const meta = {
  title: 'Organisms/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'TopBar je horný informačný pruh, ktorý sa zobrazuje na vrchu každej stránky verejnej správy. Obsahuje tlačidlo na rozbalenie informácií o oficiálnosti stránky a výber jazyka.',
      },
    },
  },
  argTypes: {
    defaultExpanded: {
      control: 'boolean',
      description: 'Počiatočný stav rozbalenia (nekontrolovaný)',
    },
    govDisclaimer: {
      control: 'text',
      description: 'Text upozornenia o oficiálnej stránke (ľavý stĺpec)',
    },
    showLanguagePicker: {
      control: 'boolean',
      description: 'Zobrazenie výberu jazyka',
    },
    showWebsiteListLink: {
      control: 'boolean',
      description: 'Zobrazenie odkazu na zoznam webových sídiel',
    },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  name: 'Zbalený (Expanded=off)',
  args: {
    defaultExpanded: false,
    showLanguagePicker: true,
    languages: LANGUAGES,
    showWebsiteListLink: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Predvolený zbalený stav — zobrazuje iba tlačidlo „Oficiálna stránka" a výber jazyka. Kliknutím sa rozbalí informačný panel.',
      },
    },
  },
};

export const Expanded: Story = {
  name: 'Rozbalený (Expanded=on)',
  args: {
    defaultExpanded: true,
    showLanguagePicker: true,
    languages: LANGUAGES,
    showWebsiteListLink: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Rozbalený stav — zobrazuje celý informačný panel s vysvetlením, ako rozpoznať officiálnu stránku štátu.',
      },
    },
  },
};

export const WithoutLanguagePicker: Story = {
  name: 'Bez výberu jazyka',
  args: {
    defaultExpanded: true,
    showLanguagePicker: false,
    showWebsiteListLink: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'TopBar bez výberu jazyka (`showLanguagePicker=false`) — vhodné pre stránky dostupné iba v jednom jazyku.',
      },
    },
  },
};

export const CustomDisclaimer: Story = {
  name: 'Vlastný text upozornenia',
  args: {
    defaultExpanded: true,
    govDisclaimer:
      'Toto je oficiálna webová stránka orgánu verejnej moci SR. Webové stránky, ktoré využívajú doménu .gov.sk, sú oficiálne webové stránky orgánov verejnej moci alebo elektronických služieb štátu.',
    showLanguagePicker: true,
    showWebsiteListLink: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Vlastný text upozornenia cez prop `govDisclaimer` — umožňuje prispôsobiť správu pre konkrétny rezort alebo organizáciu.',
      },
    },
  },
};
