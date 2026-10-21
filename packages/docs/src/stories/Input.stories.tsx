import { Input } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
      description: 'Vizuálny štýl vstupu',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
      description: 'Veľkosť vstupu',
    },
    label: {
      control: 'text',
      description: 'Text pre label (štítok) vstupu',
    },
    subheading: {
      control: 'text',
      description: 'Doplňujúci text pre label (podnadpis)',
    },
    required: {
      control: 'boolean',
      description: 'Či je pole povinné',
    },
    disabled: {
      control: 'boolean',
      description: 'Či je pole zakázané (disabled)',
    },
    description: {
      control: 'text',
      description: 'Doplňujúci text pod vstupným poľom (popis)',
    },
    errorDescription: {
      control: 'text',
      description: 'Text chyby zobrazený pri variante error',
    },
    tooltip: {
      control: 'object',
      description: 'Voliteľný tooltip zobrazený pri labeli (TooltipProps)',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Typ vstupu',
    },
  },
  args: {
    variant: 'default',
    label: 'Názov textového poľa',
    placeholder: 'Napr. Placeholder',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Textové vstupné pole pre jednoriadkový vstup. Podporuje povinné/nepovinné označenie, podnadpis (`subheading`), pomocný text (`description`), chybový stav (`error`), tooltip, dve veľkosti (`default`, `sm`) a natívny typ (`text`, `email`, `password`, …).',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

const desktopDecorator: Story['decorators'] = [
  (Story) => (
    <div style={{ width: '610px' }}>
      <Story />
    </div>
  ),
];

/**
 * Povinné / nepovinné pole — hviezdička vs. "(nepovinné pole)"
 */
export const Required: Story = {
  name: 'Povinné',
  args: {
    label: 'Názov textového poľa',
    required: true,
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story: 'Povinné pole zobrazuje hviezdičku (*) vedľa labelu s aria-hidden.',
      },
    },
  },
};

export const Optional: Story = {
  name: 'Nepovinné',
  args: {
    label: 'Názov textového poľa',
    required: false,
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story: 'Nepovinné pole zobrazuje text "(nepovinné pole)".',
      },
    },
  },
};

/**
 * Pole s podnadpisom (subheading)
 */
export const WithSubheading: Story = {
  name: 'S podnadpisom',
  args: {
    label: 'Názov textového poľa',
    subheading: 'Podnadpis textového poľa',
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story: 'Prop subheading pridáva vysvetľujúci text pod label, pred vstupné pole.',
      },
    },
  },
};

/**
 * Pole s pomocným popisom pod vstupom (description)
 */
export const WithDescription: Story = {
  name: 'S popisom',
  args: {
    label: 'Názov textového poľa',
    placeholder: 'Napr. Placeholder',
    description: 'Popisný text',
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story:
          'Prop description zobrazí pomocný text pod vstupným poľom prepojený cez aria-describedby.',
      },
    },
  },
};

/**
 * Pole s tooltipom pri labeli — zobrazí info ikonu s nápovedom
 */
export const WithTooltip: Story = {
  name: 'S tooltipom',
  args: {
    label: 'Názov textového poľa',
    required: true,
    tooltip: {
      label: '',
      content: 'Toto je nápoveda k poľu. Vysvetľuje, čo má používateľ zadať.',
      ariaLabel: 'Nápoveda k poľu',
      preferredPosition: 'top',
    },
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story: 'Prop tooltip zobrazí ikonu „i" vedľa labelu s kontextovou nápovedom.',
      },
    },
  },
};

/**
 * Chybový stav — zobrazí ikonu varovania a popis chyby
 */
export const Error: Story = {
  name: 'Chybový stav',
  args: {
    label: 'Názov textového poľa',
    required: true,
    variant: 'error',
    errorDescription: 'Chybový text',
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story:
          'Variant error zobrazí ikonu varovania vo vstupnom poli a errorDescription pod ním. Nastaví sa aria-invalid="true".',
      },
    },
  },
};

/**
 * Zakázané (disabled) pole
 */
export const Disabled: Story = {
  name: 'Zakázané (disabled)',
  args: {
    label: 'Názov textového poľa',
    placeholder: 'Napr. Placeholder',
    disabled: true,
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story: 'Prop disabled zablokuje interakciu s poľom.',
      },
    },
  },
};

/**
 * Veľkostné varianty: sm / default / lg
 */
export const Sizes: Story = {
  name: 'Veľkosti',
  decorators: desktopDecorator,
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Input {...args} size="sm" label="Malé pole" />
      <Input {...args} size="default" label="Veľké pole" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Komponent podporuje dve veľkosti: sm (malé) a default (veľké).',
      },
    },
  },
};

/**
 * Kompletný desktop variant so všetkými prvkami
 */
export const Desktop: Story = {
  name: 'Desktop — kompletný',
  args: {
    label: 'Názov textového poľa',
    subheading: 'Podnadpis textového poľa',
    placeholder: 'Napr. Placeholder',
    description: 'Popisný text',
    variant: 'error',
    errorDescription: 'Chybový text',
    required: true,
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story: 'Kompletný desktop variant so všetkými prvkami.',
      },
    },
  },
};

export const Mobile: Story = {
  name: 'Mobilné zobrazenie',
  args: {
    label: 'Názov textového poľa',
    subheading: 'Podnadpis textového poľa',
    placeholder: 'Napr. Placeholder',
    description: 'Popisný text',
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
        story: 'Mobilné zobrazenie textového poľa na úzkych obrazovkách.',
      },
    },
  },
};
