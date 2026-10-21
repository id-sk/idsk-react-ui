import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header, HeaderMainSection, TopBar, WebsiteNavigation } from '@id-sk/react';

const meta = {
  title: 'Organisms/WebsiteNavigation',
  component: WebsiteNavigation,
  parameters: {
    docs: {
      description: {
        component:
          'Horizontálna navigačná lišta umiestnená pod hlavnou sekciou hlavičky. Obsahuje navigačné položky, ktoré môžu byť prosté odkazy alebo spúšťače rozbaľovacieho menu (s ikonou šípky).',
      },
    },
  },
  argTypes: {
    items: { control: 'object' },
  },
} satisfies Meta<typeof WebsiteNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const DROPDOWN_ITEMS = [
  { label: 'Položka 1', href: '#' },
  { label: 'Položka 2', href: '#' },
  { label: 'Položka 3', href: '#' },
  { label: 'Položka 4', href: '#' },
  { label: 'Položka 5', href: '#' },
];

const DEFAULT_ITEMS = [
  { label: 'Sekcia', href: '#' },
  { label: 'Sekcia', href: '#' },
  { label: 'Sekcia', href: '#', active: true },
  { label: 'Sekcia', variant: 'dropdown' as const, dropdownItems: DROPDOWN_ITEMS },
  { label: 'Sekcia', variant: 'dropdown' as const, dropdownItems: DROPDOWN_ITEMS },
];

/** Štandardná navigačná lišta s obyčajnými a rozbaľovacími položkami. */
export const Default: Story = {
  name: 'Predvolená',
  args: {
    items: DEFAULT_ITEMS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Navigácia so zmesou prostých odkazov a položiek s rozbaľovacím menu. Aktívna položka je zvýraznená modrým spodným okrajom.',
      },
    },
  },
};

/** Všetky položky sú prosté navigačné odkazy bez rozbaľovacieho menu. */
export const LinksOnly: Story = {
  name: 'Len odkazy',
  args: {
    items: [
      { label: 'Domov', href: '#', active: true },
      { label: 'O nás', href: '#' },
      { label: 'Služby', href: '#' },
      { label: 'Kontakt', href: '#' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigácia obsahujúca iba prosté navigačné odkazy bez rozbaľovacích menu.',
      },
    },
  },
};

/** Navigácia integrovaná do kompletnej hlavičky ako posledný prvok. */
export const InHeader: Story = {
  name: 'V hlavičke',
  args: { items: DEFAULT_ITEMS },
  render: (args) => (
    <Header>
      <TopBar />
      <HeaderMainSection orgName="Názov organizácie" orgSubtitle="Podnadpis" />
      <WebsiteNavigation {...args} />
    </Header>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Kompletná hlavička — TopBar, HeaderMainSection a WebsiteNavigation ako posledný prvok pod hlavnou sekciou.',
      },
    },
  },
};
