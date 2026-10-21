import { Button, type ButtonProps } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

type IconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { size?: number | string }
>;

// Eagerly load all icons from core at Vite build time
const iconModules = import.meta.glob<{ default: IconComponent }>(
  '../../../core/src/assets/icons/*.tsx',
  { eager: true },
);

const iconRegistry = Object.fromEntries(
  Object.entries(iconModules).map(([path, mod]) => {
    const name = path.split('/').pop()!.replace('.tsx', '');
    return [name, mod.default];
  }),
) as Record<string, IconComponent>;

const iconNames = Object.keys(iconRegistry).sort();

type ButtonStoryArgs = ButtonProps & {
  leftIconName?: string;
  rightIconName?: string;
};

function resolveIcon(name: string | undefined): React.ReactElement | undefined {
  if (!name) return undefined;
  const Icon = iconRegistry[name];
  return Icon ? <Icon /> : undefined;
}

const meta = {
  title: 'Atoms/Button',
  component: Button,
  render: ({ leftIconName, rightIconName, ...args }: ButtonStoryArgs) => (
    <Button {...args} leftIcon={resolveIcon(leftIconName)} rightIcon={resolveIcon(rightIconName)} />
  ),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'tertiaryNoPadding'],
      description: 'Vizuálny štýl tlačidla',
      table: { defaultValue: { summary: 'primary' } },
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'error', 'success', 'white'],
      description: 'Farebná schéma tlačidla',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Veľkosť tlačidla',
      table: { defaultValue: { summary: 'lg' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Deaktivované tlačidlo',
    },
    asChild: {
      control: 'boolean',
      description: 'Vykresliť ako potomok (napr. odkaz)',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'Obsah tlačidla',
    },
    leftIconName: {
      control: { type: 'select' },
      options: [undefined, ...iconNames],
      description: 'Ľavá ikona',
      table: { category: 'Icons' },
    },
    rightIconName: {
      control: { type: 'select' },
      options: [undefined, ...iconNames],
      description: 'Pravá ikona',
      table: { category: 'Icons' },
    },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    iconOnly: {
      control: 'boolean',
      description: 'Tlačidlo len s ikonkou – bez viditeľného textu. Vyžaduje aria-label.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    children: 'Tlačidlo',
    variant: 'primary',
    size: 'lg',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Základný komponent tlačidla pre interakciu s používateľom. Podporuje varianty primary, secondary, tertiary a tertiary bez paddingu, farebné schémy, veľkosti a ikony pred/za textom.',
      },
    },
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

/* ─── Primary ─── */
export const Primary = {
  name: 'Primárne',
  args: { variant: 'primary', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story:
          'Hlavné tlačidlo pre primárne akcie na stránke. Používajte ho iba raz na každej obrazovke.',
      },
    },
  },
} satisfies Story;
export const PrimarySuccess = {
  name: 'Primárne — zelené',
  args: { variant: 'primary', colorScheme: 'success', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Primary variant so zelenou farebnou schémou (success).',
      },
    },
  },
} satisfies Story;
export const PrimaryDisabled = {
  name: 'Primárne — zakázané',
  args: { variant: 'primary', disabled: true, children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Zakázaný stav primary tlačidla.',
      },
    },
  },
} satisfies Story;

/* ─── Secondary ─── */
export const Secondary = {
  name: 'Sekundárne',
  args: { variant: 'secondary', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Sekundárne tlačidlo pre doplnkové akcie vedľa primárneho tlačidla.',
      },
    },
  },
} satisfies Story;
export const SecondaryError = {
  name: 'Sekundárne — červené',
  args: { variant: 'secondary', colorScheme: 'error', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant s červenou farebnou schémou (error).',
      },
    },
  },
} satisfies Story;
export const SecondarySuccess = {
  name: 'Sekundárne — zelené',
  args: { variant: 'secondary', colorScheme: 'success', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant so zelenou farebnou schémou (success).',
      },
    },
  },
} satisfies Story;
export const SecondaryDisabled = {
  name: 'Sekundárne — zakázané',
  args: { variant: 'secondary', disabled: true, children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Zakázaný stav secondary tlačidla.',
      },
    },
  },
} satisfies Story;

/* ─── Tertiary ─── */
export const Tertiary = {
  name: 'Terciárne',
  args: { variant: 'tertiary', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story:
          'Terciárne tlačidlo pre menej dôležité akcie. Zobrazuje sa ako textový odkaz s podčiarknutím pri hover.',
      },
    },
  },
} satisfies Story;
export const TertiaryError = {
  name: 'Terciárne — červené',
  args: { variant: 'tertiary', colorScheme: 'error', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary variant s červenou farebnou schémou (error).',
      },
    },
  },
} satisfies Story;
export const TertiarySuccess = {
  name: 'Terciárne — zelené',
  args: { variant: 'tertiary', colorScheme: 'success', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary variant so zelenou farebnou schémou (success).',
      },
    },
  },
} satisfies Story;
export const TertiaryDisabled = {
  name: 'Terciárne — zakázané',
  args: { variant: 'tertiary', disabled: true, children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Zakázaný stav tertiary tlačidla.',
      },
    },
  },
} satisfies Story;
export const TertiaryWhite = {
  name: 'Terciárne — biele',
  args: { variant: 'tertiary', colorScheme: 'white', children: 'Tlačidlo' },
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#1d2433',
          padding: '2rem',
          borderRadius: '8px',
          display: 'inline-block',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Tertiary variant s bielou farebnou schémou pre tmavé pozadia.',
      },
    },
  },
} satisfies Story;

/* ─── Tertiary No Padding ─── */
export const TertiaryNoPadding = {
  name: 'Bez odsadenia',
  args: { variant: 'tertiaryNoPadding', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story:
          'Variant bez paddingu pre vkladanie tlačidla priamo do textu alebo do iných komponentov.',
      },
    },
  },
} satisfies Story;

/* ─── Sizes ─── */
export const SizeSM = {
  name: 'Malá veľkosť',
  args: { size: 'sm', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Malá veľkosť (sm) tlačidla.',
      },
    },
  },
} satisfies Story;
export const SizeMD = {
  name: 'Stredná veľkosť',
  args: { size: 'md', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Stredná veľkosť (md) tlačidla.',
      },
    },
  },
} satisfies Story;
export const SizeLG = {
  name: 'Veľká veľkosť',
  args: { size: 'lg', children: 'Tlačidlo' },
  parameters: {
    docs: {
      description: {
        story: 'Veľká veľkosť (lg) — predvolená.',
      },
    },
  },
} satisfies Story;

/* ─── With icons ─── */
export const WithLeftIcon = {
  name: 'Ľavá ikona',
  args: {
    children: 'Tlačidlo',
    leftIconName: 'SendIcon',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ľavá ikona pred textom tlačidla pomocou prop leftIcon. Ikony sú automaticky zabalené do aria-hidden spanu.',
      },
    },
  },
} satisfies Story;

export const WithRightIcon = {
  name: 'Pravá ikona',
  args: {
    children: 'Tlačidlo',
    rightIconName: 'DownloadIcon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pravá ikona za textom tlačidla pomocou prop rightIcon.',
      },
    },
  },
} satisfies Story;

export const WithBothIcons = {
  name: 'Obe ikony',
  args: {
    children: 'Tlačidlo',
    leftIconName: 'AddIcon',
    rightIconName: 'ArrowForwardIcon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ikony pred aj za textom tlačidla.',
      },
    },
  },
} satisfies Story;

/* ─── Icon only ─── */
export const IconOnly = {
  name: 'Len ikona',
  args: {
    iconOnly: true,
    leftIconName: 'SendIcon',
    'aria-label': 'Odoslať',
    children: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tlačidlo len s ikonkou bez viditeľného textu. Vyžaduje aria-label.',
      },
    },
  },
} satisfies Story;

export const IconOnlySecondary = {
  name: 'Len ikona — sekundárne',
  args: {
    iconOnly: true,
    variant: 'secondary',
    leftIconName: 'AddIcon',
    'aria-label': 'Pridať',
    children: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant tlačidla len s ikonkou.',
      },
    },
  },
} satisfies Story;

export const IconOnlyTertiary = {
  name: 'Len ikona — terciárne',
  args: {
    iconOnly: true,
    variant: 'tertiary',
    leftIconName: 'CloseIcon',
    'aria-label': 'Zatvoriť',
    children: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary variant tlačidla len s ikonkou.',
      },
    },
  },
} satisfies Story;

export const IconOnlySM = {
  name: 'Len ikona — malé',
  args: {
    iconOnly: true,
    size: 'sm',
    leftIconName: 'SearchIcon',
    'aria-label': 'Hľadať',
    children: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Malé tlačidlo len s ikonkou (veľkosť sm).',
      },
    },
  },
} satisfies Story;

/* ─── AsChild ─── */
export const AsChild = {
  name: 'Ako iný prvok',
  args: {
    asChild: true,
    children: <a href="https://example.com">Link tlačidlo</a>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Prop asChild umožňuje vykresliť tlačidlo ako iný element (napr. <a>) pri zachovaní všetkých štýlov. Využíva Radix UI Slot.',
      },
    },
  },
} satisfies Story;

/* ─── Mobile ─── */
export const Mobile: Story = {
  name: 'Mobilné zobrazenie',
  args: { children: 'Tlačidlo' },
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
        story: 'Mobilné zobrazenie tlačidla na úzkych obrazovkách.',
      },
    },
  },
};
