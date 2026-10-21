import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserAvatar } from '@id-sk/react';

const meta = {
  title: 'Atoms/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar používateľa zobrazuje identitu prihláseného používateľa. Podporuje tri varianty ikony: profilová fotografia (`avatarSrc`), iniciály (`initials`) a generická ikona osoby (predvolená). Pri nastavení `onClick` je komponent interaktívny a slúži ako tlačidlo; bez `onClick` sa renderuje ako `div`.',
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    caption: { control: 'text' },
    avatarSrc: { control: 'text' },
    initials: { control: 'text' },
    showDetails: { control: 'boolean' },
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Foto — profile photo in a circle. Clicking opens a profile page. */
export const Foto: Story = {
  name: 'Profilová fotografia',
  args: {
    name: 'Meno Priezvisko',
    caption: 'Popisný text',
    avatarSrc: 'https://i.pravatar.cc/40',
    onClick: () => alert('Profil'),
  },
};

/** Avatar — generic person icon on a black circle (default when no photo or initials). */
export const Avatar: Story = {
  name: 'Generická ikona',
  args: {
    name: 'Meno Priezvisko',
    caption: 'Popisný text',
    onClick: () => alert('Profil'),
  },
};

/** Inicials — user initials on a black circle. */
export const Initials: Story = {
  name: 'Iniciály',
  args: {
    name: 'Meno Priezvisko',
    caption: 'Popisný text',
    initials: 'MM',
    onClick: () => alert('Profil'),
  },
};

/** Non-interactive — no onClick, rendered as a div. */
export const NonInteractive: Story = {
  name: 'Statický',
  args: {
    name: 'Meno Priezvisko',
    caption: 'Popisný text',
    initials: 'MM',
  },
};

/** Without details — only the avatar circle, no name or caption. */
export const NoDetails: Story = {
  name: 'Bez popisov',
  args: {
    name: 'Meno Priezvisko',
    initials: 'MM',
    showDetails: false,
    onClick: () => alert('Profil'),
  },
};

/** All three variants side by side. */
export const AllVariants: Story = {
  name: 'Všetky varianty',
  args: { name: 'Meno Priezvisko' },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <UserAvatar
        name="Meno Priezvisko"
        caption="Foto variant"
        avatarSrc="https://i.pravatar.cc/40"
        onClick={() => {}}
      />
      <UserAvatar name="Meno Priezvisko" caption="Avatar variant" onClick={() => {}} />
      <UserAvatar
        name="Meno Priezvisko"
        caption="Inicials variant"
        initials="MM"
        onClick={() => {}}
      />
    </div>
  ),
};
