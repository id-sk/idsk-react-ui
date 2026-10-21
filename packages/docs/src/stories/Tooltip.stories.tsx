import { Input, Radio, RadioGroup, Select, Tooltip } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  argTypes: {
    preferredPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description:
        'Preferovaný smer zobrazenia. Automaticky sa prispôsobí dostupnému miestu vo viewporte.',
    },
    label: {
      control: 'text',
      description: 'Viditeľný popis vľavo od ikony',
    },
    content: {
      control: 'text',
      description: 'Text tooltipu — iba čistý text, max. 290 znakov',
    },
    ariaLabel: {
      control: 'text',
      description: 'Prístupný popis tlačidla pre čítačky obrazovky',
    },
  },
  args: {
    preferredPosition: 'top',
    label: 'Dátum narodenia',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo.',
    ariaLabel: 'Nápoveda k dátumu narodenia',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '180px 100px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Kontextová nápoveda zobrazená po kliknutí alebo nabehnutí na ikonu „i". Podporuje štyri smery zobrazenia (`top`, `bottom`, `left`, `right`) s automatickým prispôsobením viewportu, voliteľný viditeľný `label` a prístupný `ariaLabel` pre čítačky obrazovky. Maximálna dĺžka obsahu je 290 znakov.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  name: 'Základný',
  parameters: {
    docs: {
      description: {
        story: 'Základný stav — tooltip sa zobrazí po kliknutí alebo nabehnutí na ikonu „i".',
      },
    },
  },
};

export const PositionTop: Story = {
  name: 'Pozícia — hore',
  args: { preferredPosition: 'top' },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip zobrazený hore (predvolené).',
      },
    },
  },
};

export const PositionBottom: Story = {
  name: 'Pozícia — dole',
  args: { preferredPosition: 'bottom' },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip zobrazený dole.',
      },
    },
  },
};

export const PositionLeft: Story = {
  name: 'Pozícia — vľavo',
  args: { preferredPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip zobrazený vľavo.',
      },
    },
  },
};

export const PositionRight: Story = {
  name: 'Pozícia — vpravo',
  args: { preferredPosition: 'right' },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip zobrazený vpravo.',
      },
    },
  },
};

export const LongContent: Story = {
  name: 'Dlhý obsah (blízko limitu)',
  args: {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. In voluptate esse.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Obsah blízko limitu 290 znakov.',
      },
    },
  },
};

export const AllPositions: Story = {
  name: 'Všetky smery',
  render: (args) => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '48px', alignItems: 'flex-start' }}
    >
      <Tooltip {...args} preferredPosition="top" label="Hore" ariaLabel="Nápoveda hore" />
      <Tooltip {...args} preferredPosition="bottom" label="Dole" ariaLabel="Nápoveda dole" />
      <Tooltip {...args} preferredPosition="left" label="Vľavo" ariaLabel="Nápoveda vľavo" />
      <Tooltip {...args} preferredPosition="right" label="Vpravo" ariaLabel="Nápoveda vpravo" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Všetky štyri smery vedľa seba.',
      },
    },
  },
};

export const Mobile: Story = {
  name: 'Mobilné zobrazenie',
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '375px', padding: '180px 24px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Mobilný viewport — tooltip sa otvára na ťuknutie (toggle) a zostáva otvorený.',
      },
    },
  },
};

export const FormIntegration: Story = {
  name: 'Formulár — integrácia',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '610px' }}>
      {/* Text input s tooltipom */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Tooltip
          label="Rodné číslo"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          ariaLabel="Nápoveda k rodnému číslu"
          preferredPosition="top"
        />
        <Input placeholder="Napr. 900101/1234" aria-label="Rodné číslo" />
      </div>

      {/* Radio group s tooltipom */}
      <RadioGroup
        legend="Pohlavie"
        tooltip={{
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          ariaLabel: 'Nápoveda k pohláviu',
          preferredPosition: 'right',
        }}
      >
        <Radio name="gender" value="male" label="Muž" />
        <Radio name="gender" value="female" label="Žena" />
      </RadioGroup>

      {/* Select s tooltipom */}
      <Select
        label="Krajina pôvodu"
        placeholder="Vyberte krajinu..."
        options={[
          { label: 'Slovenská republika', value: 'sk' },
          { label: 'Česká republika', value: 'cz' },
          { label: 'Rakúsko', value: 'at' },
          { label: 'Maďarsko', value: 'hu' },
        ]}
        tooltip={{
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          ariaLabel: 'Nápoveda k krajine pôvodu',
          preferredPosition: 'top',
        }}
      />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Integrácia s komplexným formulárom — tooltip pri textovom poli, radio buttonoch a selecte.',
      },
    },
  },
};
