import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from '@id-sk/react';
import { initIDSK } from '@id-sk/react/vanilla';

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'Akordeón umožňuje používateľom postupne odhaľovať obsah sekcií kliknutím na ich nadpisy. Podporuje predvolene otvorenú sekciu (`defaultOpen`).',
      },
    },
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        // Inicializácia vanilla skriptov po renderi v Storybooku
        initIDSK();
      }, []);
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  name: 'Predvolený',
  args: {
    items: [
      {
        title: 'Nadpis akordeónu',
        children: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Základný akordeón s jednou sekciou. Pre viacero sekcií naraz použite komponent AccordionList.',
      },
    },
  },
};

export const Mobile: Story = {
  name: 'Mobilné zobrazenie',
  args: {
    ...Default.args,
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
    docs: {
      description: {
        story: 'Mobilné zobrazenie akordeóna na úzkych obrazovkách.',
      },
    },
  },
};

export const WithDescription: Story = {
  name: 'S popisom',
  args: {
    items: [
      {
        title: 'Nadpis akordeónu',
        description:
          'Popis. Pokiaľ nie je nadpis dostatočne zrejmý a potrebuje vysvetlenie, alebo ak je nadpis príliš dlhý (viac, ako 5 slov), toto je miesto na viacslovný popis.',
        children: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Akordeón s voliteľným popisom (`description`) pod nadpisom — použite keď nadpis nie je sám osebe dostatočne zrejmý.',
      },
    },
  },
};

export const WithDefaultOpen: Story = {
  name: 'Predvolene rozbalený',
  args: {
    items: [
      {
        title: 'Nadpis akordeónu',
        children: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        ),
        defaultOpen: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Akordeón s predvolene rozbalenou sekciou — použite `defaultOpen: true` na položke. Sekciu možno kedykoľvek zatvoriť.',
      },
    },
  },
};

export const WithDisabled: Story = {
  name: 'S deaktivovanou sekciou',
  args: {
    items: [
      {
        title: 'Nadpis akordeónu',
        children: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        ),
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Akordeón s deaktivovanou sekciou. Tlačidlo deaktivovanej sekcie má atribút `disabled` — nie je klikateľné ani dosažiteľné cez Tab.',
      },
    },
  },
};
