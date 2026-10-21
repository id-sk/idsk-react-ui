import { Radio, RadioGroup } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'sm'],
      description: 'Veľkosť radio buttonu',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'Text popisku',
    },
    hint: {
      control: 'text',
      description: 'Doplnkový text',
    },
    errorMessage: {
      control: 'text',
      description: 'Chybová správa',
    },
    disabled: {
      control: 'boolean',
      description: 'Či je radio button zakázaný',
    },
    required: {
      control: 'boolean',
      description: 'Či je pole povinné',
    },
  },
  args: {
    label: 'Menovka',
    name: 'radio-story',
    size: 'default',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Komponent radio buttonu pre výber jednej možnosti zo skupiny. Podporuje rôzne veľkosti a doplnkové texty.',
      },
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Velky: Story = {
  name: 'Veľký',
  args: {
    label: 'Menovka',
    hint: 'Pomôcka',
    size: 'default',
    tooltip: { content: 'Vysvetlenie pre túto možnosť' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Štandardná veľkosť pre formuláre na desktope.',
      },
    },
  },
};

export const Maly: Story = {
  name: 'Malý',
  args: {
    label: 'Menovka',
    hint: 'Pomôcka',
    size: 'sm',
    tooltip: { content: 'Vysvetlenie pre túto možnosť' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Zmenšená veľkosť pre kompaktné rozhrania.',
      },
    },
  },
};

export const S_PomocnymTextom: Story = {
  name: 'S pomocným textom',
  args: {
    label: 'Menovka',
    hint: 'Pomôcka',
  },
  parameters: {
    docs: {
      description: {
        story: 'Prop hint zobrazí vysvetľujúci text pod labelom radio buttonu.',
      },
    },
  },
};

export const S_Chybou: Story = {
  name: 'S chybou',
  args: {
    label: 'Menovka',
    errorMessage: 'Chybový text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Prop errorMessage zobrazí chybovú správu pod radio buttonom.',
      },
    },
  },
};

export const Povinny: Story = {
  name: 'Povinný',
  args: {
    label: 'Menovka',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Povinný radio button — zobrazí hviezdičku pri labeli.',
      },
    },
  },
};

export const Zakazany: Story = {
  name: 'Zakázaný',
  args: {
    label: 'Menovka',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Zakázaný (disabled) radio button.',
      },
    },
  },
};

export const Skupina: Story = {
  render: () => (
    <RadioGroup
      legend="Obľúbené ovocie"
      hint="Vyberte jednu možnosť"
      required
      tooltip={{ content: 'Môžete vybrať práve jednu možnosť.', preferredPosition: 'top' }}
    >
      <Radio label="Jablko" name="fruit" value="apple" />
      <Radio label="Banán" name="fruit" value="banana" />
      <Radio label="Pomaranč" name="fruit" value="orange" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'RadioGroup s nadpisom (headline-m), povinnosťou a tooltipom — zodpovedá dizajnu zo zadania.',
      },
    },
  },
};

export const SkupinaSOtazkou: Story = {
  name: 'Skupina s otázkou',
  render: () => (
    <RadioGroup
      legend="Ako cestujete do práce?"
      hint="Vyberte možnosť, ktorá najlepšie opisuje váš typický spôsob dopravy."
      required
      tooltip={{
        content: 'Vaša odpoveď nám pomôže zlepšiť dopravnú infraštruktúru.',
        preferredPosition: 'top',
      }}
    >
      <Radio
        label="Autobus"
        name="commute"
        value="bus"
        hint="MHD alebo prímestská doprava"
        tooltip={{ content: 'Zahŕňa MHD aj diaľkové autobusy.', preferredPosition: 'top' }}
      />
      <Radio label="Vlak" name="commute" value="train" hint="Osobný alebo rýchlik" />
      <Radio label="Bicykel" name="commute" value="bike" />
      <Radio label="Osobné auto" name="commute" value="car" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Ukážka skupiny radio buttonov ako formulárová otázka — s hintom na úrovni skupiny aj na úrovni jednotlivých možností.',
      },
    },
  },
};

export const SkupinaS_Chybou: Story = {
  name: 'Skupina s chybou',
  render: () => (
    <RadioGroup legend="Obľúbené ovocie" errorMessage="Musíte vybrať jednu možnosť">
      <Radio label="Jablko" name="fruit-error" value="apple" />
      <Radio label="Banán" name="fruit-error" value="banana" />
      <Radio label="Pomaranč" name="fruit-error" value="orange" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skupina radio buttonov v chybovom stave.',
      },
    },
  },
};

export const Mobile: Story = {
  name: 'Mobilné zobrazenie',
  args: { label: 'Menovka', hint: 'Pomôcka' },
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
        story: 'Mobilné zobrazenie radio buttonu na úzkych obrazovkách.',
      },
    },
  },
};
