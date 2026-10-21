import { Textarea } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
      description: 'Vizuálny štýl textarea',
    },
    label: {
      control: 'text',
      description: 'Text pre label (štítok) textarea',
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
      description: 'Doplňujúci text pod textarea poľom (popis)',
    },
    errorDescription: {
      control: 'text',
      description: 'Text chyby zobrazený pri variante error',
    },
    tooltip: {
      control: 'object',
      description: 'Voliteľný tooltip zobrazený pri labeli (TooltipProps)',
    },
    maxLength: {
      control: 'number',
      description: 'Maximálny počet znakov — povinné pole (zobrazuje sa v počítadle)',
    },
    rows: {
      control: 'number',
      description: 'Počet riadkov (počiatočná výška)',
    },
  },
  args: {
    variant: 'default',
    label: 'Názov textového poľa',
    placeholder: 'Napr. Placeholder',
    rows: 5,
    maxLength: 200,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Viacriadkové textové pole. Podporuje povinné/nepovinné označenie, podnadpis (`subheading`), pomocný text (`description`), chybový stav (`error`), tooltip, dynamické počítadlo znakov (`maxLength`) a nastaviteľnú počiatočnú výšku (`rows`).',
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

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
        story: 'Povinné pole zobrazuje hviezdičku (*) vedľa labelu.',
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
    subheading: 'Popisný text',
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story: 'Prop subheading pridáva vysvetľujúci text pod label, pred textové pole.',
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
    description: 'Doplnkový text',
  },
  decorators: desktopDecorator,
  parameters: {
    docs: {
      description: {
        story: 'Prop description zobrazí pomocný text pod poľom prepojený cez aria-describedby.',
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
          'Variant error zvýrazní border červenou farbou, zobrazí ikonu varovania a chybovú správu errorDescription.',
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
        story: 'Zakázané (disabled) pole — interakcia nie je možná.',
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
    subheading: 'Popisný text',
    placeholder: 'Napr. Placeholder',
    description: 'Doplnkový text',
    variant: 'error',
    errorDescription: 'Chybový text',
    required: true,
    maxLength: 500,
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
    subheading: 'Popisný text',
    placeholder: 'Napr. Placeholder',
    description: 'Doplnkový text',
    maxLength: 500,
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
        story: 'Mobilné zobrazenie textarea na úzkych obrazovkách.',
      },
    },
  },
};
