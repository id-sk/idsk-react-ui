import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header, HeaderMainSection, HeaderMenuItem, TopBar, WebsiteNavigation } from '@id-sk/react';

const meta = {
  title: 'Molecules/HeaderMenuItem',
  component: HeaderMenuItem,
  parameters: {
    docs: {
      description: {
        component:
          'Jednotlivá položka navigačnej lišty hlavičky. Môže byť prostý odkaz (`variant="link"`) alebo spúšťač rozbaľovacieho menu (`variant="dropdown"` — zobrazí šípku nadol). Renderuje `<a>` keď je zadaný `href`, inak `<button>`.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['link', 'dropdown'] },
    active: { control: 'boolean' },
    href: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof HeaderMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Prostý navigačný odkaz. */
export const Link: Story = {
  name: 'Odkaz',
  args: { children: 'Sekcia', href: '#', variant: 'link' },
};

/** Aktívna položka — modrý spodný okraj. */
export const Active: Story = {
  name: 'Aktívna položka',
  args: { children: 'Sekcia', href: '#', variant: 'link', active: true },
};

/** Položka so šípkou a dropdown panelom s položkami. */
export const Dropdown: Story = {
  name: 'Rozbaľovacia položka',
  args: {
    children: 'Sekcia',
    variant: 'dropdown',
    dropdownItems: [
      { label: 'Položka 1', href: '#' },
      { label: 'Položka 2', href: '#' },
      { label: 'Položka 3', href: '#' },
      { label: 'Položka 4', href: '#' },
      { label: 'Položka 5', href: '#' },
    ],
  },
};

/** Všetky varianty vedľa seba v navigačnej lište. */
export const InNavigation: Story = {
  name: 'V navigačnej lište',
  args: {},
  render: () => (
    <Header>
      <TopBar />
      <HeaderMainSection orgName="Názov organizácie" orgSubtitle="Podnadpis" />
      <WebsiteNavigation
        items={[
          { label: 'Sekcia', href: '#' },
          { label: 'Sekcia', href: '#' },
          { label: 'Sekcia', href: '#', active: true },
          { label: 'Sekcia', href: '#', variant: 'dropdown' },
          { label: 'Sekcia', href: '#', variant: 'dropdown' },
        ]}
      />
    </Header>
  ),
  parameters: {
    docs: {
      description: {
        story: 'HeaderMenuItem komponenty v kompletnej hlavičke cez WebsiteNavigation.',
      },
    },
  },
};
