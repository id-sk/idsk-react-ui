import { Select } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
      description: 'Vizuálny stav poľa',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
      description: 'Veľkosť poľa (default = L, sm = M)',
    },
    label: {
      control: 'text',
      description: 'Text labelu rozbaľovacieho poľa',
    },
    labelDescription: {
      control: 'text',
      description: 'Doplňujúci popis pod labelom (podnadpis)',
    },
    required: {
      control: 'boolean',
      description: 'Povinné pole — zobrazí hviezdičku a aktivuje HTML5 validáciu',
    },
    disabled: {
      control: 'boolean',
      description: 'Deaktivuje celé pole',
    },
    placeholder: {
      control: 'text',
      description: 'Text predvolenej (prázdnej) možnosti',
    },
    inputDescription: {
      control: 'text',
      description: 'Pomocný text pod poľom (hint)',
    },
    errorDescription: {
      control: 'text',
      description: 'Chybový text — zobrazí sa iba pri variant="error"',
    },
    tooltip: {
      control: false,
      description: 'Voliteľný tooltip zobrazený pri labeli (TooltipProps)',
    },
  },
  args: {
    variant: 'default',
    label: 'Názov rozbaľovacieho pola',
    placeholder: 'Vyberte možnosť',
    options: [
      { value: 'sk', label: 'Slovensko' },
      { value: 'cz', label: 'Česká republika' },
      { value: 'at', label: 'Rakúsko' },
      { value: 'hu', label: 'Maďarsko' },
      { value: 'pl', label: 'Poľsko' },
    ],
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Rozbaľovacie pole postavené na Radix UI Select. Podporuje povinné/nepovinné označenie, podnadpis labelu (`labelDescription`), pomocný text (`inputDescription`), chybový stav, tooltip, dve veľkosti (`default`, `sm`), zoskupené možnosti (`groups`) a riadený (`controlled`) aj neriadený (`uncontrolled`) režim.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '610px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Predvolený',
  parameters: {
    docs: {
      description: {
        story: 'Základný stav rozbaľovacieho poľa s placeholderom.',
      },
    },
  },
};

export const Required: Story = {
  name: 'Povinné pole',
  args: {
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Povinné pole — hviezdička s `aria-hidden`, natívny atribút `required`. Formulár sa nedá odoslať bez výberu platnej hodnoty.',
      },
    },
  },
};

export const Optional: Story = {
  name: 'Nepovinné pole',
  args: {
    required: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Nepovinné pole — zobrazuje text "(nepovinné pole)" vedľa labelu.',
      },
    },
  },
};

export const WithLabelDescription: Story = {
  name: 'S popisom menovky',
  args: {
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pole s podnadpisom labelu pre dodatočný kontext.',
      },
    },
  },
};

export const WithHint: Story = {
  name: 'S pomocným textom',
  args: {
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
    inputDescription: 'Pomocný text pre používateľa',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pole s pomocným textom (hint) pod poľom. Hint je prepojený cez `aria-describedby`.',
      },
    },
  },
};

export const Error: Story = {
  name: 'Chybový stav',
  args: {
    variant: 'error',
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
    errorDescription: 'Chybový text',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Chybový stav — červený border, ikona upozornenia, chybový text. `aria-invalid="true"` a `aria-describedby` prepájajú chybu so selectom.',
      },
    },
  },
};

export const ErrorWithHint: Story = {
  name: 'Chybový stav s pomocným textom',
  args: {
    variant: 'error',
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
    inputDescription: 'Pomocný text pre používateľa',
    errorDescription: 'Chybový text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chybový stav s hintom — `aria-describedby` obsahuje obe ID (hint aj chyba).',
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Zakázané',
  args: {
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Deaktivované pole — vizuálne odlíšené, nie je v poradí Tab, nie je interaktívne.',
      },
    },
  },
};

export const Selected: Story = {
  name: 'Predvybraná hodnota',
  args: {
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
    defaultValue: 'sk',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Vybraná hodnota — pole zobrazuje zvolenú možnosť v primárnej farbe textu (nie placeholder).',
      },
    },
  },
};

export const SizeSm: Story = {
  name: 'Malá veľkosť',
  args: {
    size: 'sm',
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
  },
  parameters: {
    docs: {
      description: {
        story: 'Malá veľkosť (M) — výška 40 px na všetkých zariadeniach.',
      },
    },
  },
};

export const SelectedSizeSm: Story = {
  name: 'Predvybraná hodnota — malá veľkosť',
  args: {
    size: 'sm',
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
    defaultValue: 'sk',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vybraná hodnota — malá veľkosť (M).',
      },
    },
  },
};

export const WithGroups: Story = {
  name: 'So skupinami možností',
  args: {
    label: 'Mesto',
    placeholder: 'Vyberte mesto',
    required: true,
    options: undefined,
    groups: [
      {
        label: 'Slovensko',
        options: [
          { value: 'ba', label: 'Bratislava' },
          { value: 'ke', label: 'Košice' },
          { value: 'bb', label: 'Banská Bystrica' },
        ],
      },
      {
        label: 'Česká republika',
        options: [
          { value: 'prg', label: 'Praha' },
          { value: 'brno', label: 'Brno' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Zoskupené možnosti pomocou `groups` — každá skupina má `label` a pole `options`.',
      },
    },
  },
};

export const WithDisabledOption: Story = {
  name: 'S deaktivovanou možnosťou',
  args: {
    label: 'Krajina',
    placeholder: 'Vyberte krajinu',
    required: true,
    options: [
      { value: 'sk', label: 'Slovensko' },
      { value: 'cz', label: 'Česká republika' },
      { value: 'at', label: 'Rakúsko (nedostupné)', disabled: true },
      { value: 'hu', label: 'Maďarsko' },
      { value: 'pl', label: 'Poľsko (nedostupné)', disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Jednotlivé možnosti možno deaktivovať cez `disabled: true` na položke — `data-disabled` riadi Radix UI a správanie je plne prístupné.',
      },
    },
  },
};

export const WithTooltip: Story = {
  name: 'S tooltipom',
  args: {
    label: 'Krajina pôvodu',
    required: true,
    labelDescription: 'Popis rozbaľovacieho poľa',
    tooltip: {
      label: '',
      content: 'Vyberte krajinu, v ktorej bol produkt vyrobený alebo odkiaľ pochádza.',
      ariaLabel: 'Nápoveda k poľu',
      preferredPosition: 'top',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Prop `tooltip` zobrazí ikonu „i" vedľa labelu s kontextovou nápovedom (komponent Tooltip).',
      },
    },
  },
};

const ControlledSelect = (args: ComponentProps<typeof Select>) => {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col gap-4">
      <Select {...args} value={value} onValueChange={setValue} />
      <p className="text-sm text-gray-600">
        Vybraná hodnota: <strong>{value || '(žiadna)'}</strong>
      </p>
    </div>
  );
};

export const AlwaysOpen: Story = {
  name: 'Vždy otvorený',
  args: {
    label: 'Vždy otvorené rozbaľovacie pole',
    open: true,
    onOpenChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Riadený stav `open={true}` s prázdnym `onOpenChange` — dropdown zostáva natrvalo otvorený, užitočné pre vizuálnu kontrolu a dokumentáciu obsahu ponuky.',
      },
    },
  },
};

export const Controlled: Story = {
  name: 'Riadený stav (controlled)',
  render: (args) => <ControlledSelect {...args} />,
  args: {
    label: 'Riadený select',
    placeholder: 'Vyberte možnosť',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Riadený (controlled) režim — `value` a `onValueChange` riadia stav externe. Vybraná hodnota sa zobrazuje pod poľom.',
      },
    },
  },
};

export const WithOptionWithoutValue: Story = {
  name: 'S možnosťou bez hodnoty',
  args: {
    label: 'Krajina bez explicitnej hodnoty',
    placeholder: 'Vyberte krajinu',
    required: true,
    options: [
      { label: 'Nevyberte žiadnu' },
      { value: 'sk', label: 'Slovensko' },
      { value: 'cz', label: 'Česká republika' },
      { value: 'at', label: 'Rakúsko' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Možnosť bez explicitnej `value` vlastnosti — label sa použije ako hodnota. Užitočné pre placeholder alebo default možnosti.',
      },
    },
  },
};
