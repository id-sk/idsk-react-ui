import type { Meta, StoryObj } from '@storybook/react-vite';

import { NotificationButton } from '@id-sk/react';
import MailIcon from '../../../core/src/assets/icons/MailIcon';
import NotificationsIcon from '../../../core/src/assets/icons/NotificationsIcon';

const meta = {
  title: 'Molecules/NotificationButton',
  component: NotificationButton,
  parameters: {
    docs: {
      description: {
        component:
          'Ikonové tlačidlo s voliteľným červeným badge indikátorom novej notifikácie. Ikona sa odovzdáva ako prop — môže to byť zvon, email, alebo ľubovoľná iná ikona. Keď je `hasNew=true`, komponent automaticky doplní text `newLabel` priamo do `aria-label` (napr. „Notifikácie - Nová notifikácia“), pretože čítače obrazovky ignorujú textový obsah potomkov, ak je na prvku nastavený `aria-label`.',
      },
    },
  },
  argTypes: {
    hasNew: { control: 'boolean' },
    newLabel: { control: 'text' },
    'aria-label': { control: 'text' },
  },
} satisfies Meta<typeof NotificationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bell: Story = {
  name: 'Zvonček — bez notifikácie',
  args: {
    icon: <NotificationsIcon size={25} />,
    hasNew: false,
    'aria-label': 'Notifikácie',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ikona zvončeka bez aktívneho badge — žiadne nové notifikácie.',
      },
    },
  },
};

export const BellWithNew: Story = {
  name: 'Zvonček — nová notifikácia',
  args: {
    icon: <NotificationsIcon size={25} />,
    hasNew: true,
    newLabel: 'Nová notifikácia',
    'aria-label': 'Notifikácie',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ikona zvončeka s červeným badge indikátorom (`hasNew=true`). Výsledný `aria-label` je „Notifikácie - Nová notifikácia“.',
      },
    },
  },
};

export const Mail: Story = {
  name: 'Email — bez notifikácie',
  args: {
    icon: <MailIcon size={25} />,
    hasNew: false,
    'aria-label': 'Správy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ikona emailu bez aktívneho badge — žiadne nové správy.',
      },
    },
  },
};

export const MailWithNew: Story = {
  name: 'Email — nová správa',
  args: {
    icon: <MailIcon size={25} />,
    hasNew: true,
    newLabel: 'Nová správa',
    'aria-label': 'Správy',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ikona emailu s červeným badge indikátorom novej správy. Výsledný `aria-label` je „Správy - Nová správa“.',
      },
    },
  },
};
