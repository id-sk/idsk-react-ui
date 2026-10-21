import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from '@id-sk/react';

const meta = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component:
          'Omrvinková navigácia pomáha používateľom pochopiť, kde sa nachádzajú v rámci štruktúry webu, a pohybovať sa medzi úrovňami hierarchie.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Predvolená',
  args: {
    items: [{ label: 'Domov', href: '/' }, { label: 'Aktuálna stránka' }],
  },
  parameters: {
    docs: {
      description: {
        story: 'Základná omrvinková navigácia s odkazom na nadradenú stránku a aktuálnou stránkou.',
      },
    },
  },
};

export const ThreeLevels: Story = {
  name: 'Tri úrovne',
  args: {
    items: [
      { label: 'Domov', href: '/' },
      { label: 'Sekcia', href: '/sekcia' },
      { label: 'Aktuálna stránka' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Omrvinková navigácia s tromi úrovňami. Aktuálna stránka je označená pomocou aria-current="page" a nie je prezentovaná ako odkaz.',
      },
    },
  },
};

export const FiveLevels: Story = {
  name: 'Päť úrovní',
  args: {
    items: [
      { label: 'Domov', href: '/' },
      { label: 'Sekcia', href: '/sekcia' },
      { label: 'Odbor', href: '/sekcia/odbor' },
      { label: 'Oddelenie', href: '/sekcia/odbor/oddelenie' },
      { label: 'Aktuálna stránka' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Omrvinková navigácia s piatimi úrovňami hierarchie.',
      },
    },
  },
};

export const CollapseOnMobile: Story = {
  name: 'Zbalené na mobiloch',
  args: {
    collapseMobile: true,
    items: [
      { label: 'Domov', href: '/' },
      { label: 'Sekcia', href: '/sekcia' },
      { label: 'Odbor', href: '/sekcia/odbor' },
      { label: 'Oddelenie', href: '/sekcia/odbor/oddelenie' },
      { label: 'Aktuálna stránka' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Na mobilnom zobrazení sa stredné položky skryjú a zobrazí sa tlačidlo „…" na rozbalenie celej cesty. Tlačidlo je ovládateľné klávesnicou a stav otvorenia je správne oznámený cez aria-expanded.',
      },
    },
  },
};

export const Mobile: Story = {
  name: 'Mobilné zobrazenie',
  args: {
    items: [
      { label: 'Domov', href: '/' },
      { label: 'Sekcia', href: '/sekcia' },
      { label: 'Odbor', href: '/sekcia/odbor' },
      { label: 'Aktuálna stránka' },
    ],
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
        story:
          'Mobilné zobrazenie omrvinkovej navigácie s menšou veľkosťou písma zodpovedajúcou dizajnovému štandardu IDSK.',
      },
    },
  },
};
