import { Checkbox, CheckboxGroup } from '@id-sk/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'sm'],
      description: 'Veľkosť checkboxu',
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
      description: 'Pomocný text',
    },
    errorMessage: {
      control: 'text',
      description: 'Chybová správa',
    },
    disabled: {
      control: 'boolean',
      description: 'Či je checkbox zakázaný',
    },
    required: {
      control: 'boolean',
      description: 'Či je pole povinné',
    },
  },
  args: {
    label: 'Menovka',
    size: 'default',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Komponent checkboxu pre výber jednej alebo viacerých možností. Podporuje rôzne veľkosti a doplnkové texty.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Velky: Story = {
  name: 'Veľký',
  args: {
    label: 'Menovka',
    size: 'default',
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
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Zmenšená veľkosť pre kompaktné rozhrania. Odsadenie labelu je 34 px namiesto 44 px.',
      },
    },
  },
};

export const MalyDlhyText: Story = {
  name: 'Malý s dlhým textom',
  args: {
    label:
      'Malý checkbox s veľmi dlhým textom, ktorý by sa mal taktiež správne zalamovať. Odsadenie by malo byť menšie ako pri veľkom checkboxe (34px namiesto 44px).',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Malý checkbox s dlhým textom — overenie zalamovanie a odsadenia.',
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
        story: 'Prop hint zobrazí vysvetľujúci text pod labelom checkboxu.',
      },
    },
  },
};

export const DlhyPomocnyText: Story = {
  name: 'Dlhý pomocný text',
  args: {
    label: 'Menovka',
    hint: 'Toto je veľmi dlhý pomocný text, ktorý by sa mal správne zalamovať pod labelom checkboxu. Mal by dodržiavať rovnaké odsadenie od ľavého okraja ako samotný label.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dlhý pomocný text sa správne zalamuje pod labelom.',
      },
    },
  },
};

export const Tooltip: Story = {
  name: 'S nápoveďou',
  args: {
    label: 'Menovka',
    hint: 'Pomôcka',
    tooltip: {
      content: 'Toto je nápoveda k checkboxu. Vysvetľuje, čo sa stane, ak je vybraný.',
      preferredPosition: 'top',
      ariaLabel: 'Nápoveda k checkboxu',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip zobrazí ikonu „i" vedľa labelu s kontextovou nápovedom.',
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
        story: 'Prop errorMessage zobrazí chybovú správu pod checkboxom.',
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
        story: 'Povinný checkbox — zobrazí hviezdičku pri labeli.',
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
        story: 'Zakázaný (disabled) checkbox.',
      },
    },
  },
};

export const DlhyText: Story = {
  name: 'Dlhý text',
  args: {
    label:
      'Toto je veľmi dlhý text pre label checkboxu, ktorý by sa mal správne zalomiť na viacerých riadkoch, ak je kontajner príliš úzky. Overujeme, či odsadenie od samotného checkboxu zostáva zachované aj pri dlhšom texte.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label sa správne zalamuje a zachováva odsadenie od checkboxu.',
      },
    },
  },
};

export const ViacriadkovyText: Story = {
  name: 'Viacriadkový text',
  args: {
    label: (
      <span>
        Prvý riadok labelu
        <br />
        Druhý riadok labelu s dlhším textom, aby sme videli správanie
        <br />
        Tretí riadok
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Viacriadkový label s explicitnými zlommi riadkov.',
      },
    },
  },
};

export const Indeterminate: Story = {
  name: 'Neurčitý stav',
  args: {
    label: 'Menovka',
    indeterminate: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Indeterminate stav vizuálne signalizuje čiastočný výber (niektoré podpoložky sú vybrané, nie všetky).',
      },
    },
  },
};

function IndeterminateImplementaciaDemo() {
  const [checked, setChecked] = React.useState([true, false]);

  const allChecked = checked.every(Boolean);
  const isIndeterminate = checked.some(Boolean) && !allChecked;

  return (
    <CheckboxGroup legend="Príklad implementácie Indeterminate stavu">
      <Checkbox
        label="Vybrať všetko"
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(e) => setChecked([e.target.checked, e.target.checked])}
      />
      <div className="idsk-checkbox-group__subgroup">
        <Checkbox
          label="Možnosť A"
          checked={checked[0]}
          onChange={(e) => setChecked([e.target.checked, checked[1]])}
        />
        <Checkbox
          label="Možnosť B"
          checked={checked[1]}
          onChange={(e) => setChecked([checked[0], e.target.checked])}
        />
      </div>
    </CheckboxGroup>
  );
}

export const IndeterminateImplementacia: Story = {
  name: 'Neurčitý stav — implementácia',
  render: () => <IndeterminateImplementaciaDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Praktická ukážka „Vybrať všetko" s podpoložkami, ktorá riadi indeterminate stav cez React stav.',
      },
    },
  },
};

export const Skupina: Story = {
  render: () => (
    <CheckboxGroup
      legend="Obľúbené ovocie"
      hint="Vyberte aspoň jednu možnosť"
      required
      tooltip={{
        content: 'Môžete vybrať viacero možností.',
        preferredPosition: 'top',
        ariaLabel: 'Nápoveda k výberu ovocia',
      }}
    >
      <Checkbox label="Jablko" name="fruit" value="apple" />
      <Checkbox label="Banán" name="fruit" value="banana" />
      <Checkbox label="Pomaranč" name="fruit" value="orange" />
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'CheckboxGroup s nadpisom (headline-m), povinnosťou a tooltipom — zodpovedá dizajnu zo zadania.',
      },
    },
  },
};

export const SkupinaSOtazkou: Story = {
  name: 'Skupina s otázkou',
  render: () => (
    <CheckboxGroup
      legend="Aké druhy dopravy používate?"
      hint="Vyberte všetky možnosti, ktoré sa vás týkajú."
      required
      tooltip={{
        content: 'Vaša odpoveď bude použitá na zlepšenie verejnej dopravy.',
        preferredPosition: 'top',
        ariaLabel: 'Nápoveda k otázke o doprave',
      }}
    >
      <Checkbox
        label="Autobus"
        name="transport"
        value="bus"
        hint="MHD alebo prímestská doprava"
        tooltip={{
          content: 'Zahŕňa MHD aj diaľkové autobusy.',
          preferredPosition: 'top',
          ariaLabel: 'Nápoveda k autobusu',
        }}
      />
      <Checkbox label="Vlak" name="transport" value="train" hint="Osobný alebo rýchlik" />
      <Checkbox label="Bicykel" name="transport" value="bike" />
      <Checkbox label="Osobné auto" name="transport" value="car" />
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Ukážka skupiny checkboxov ako formulárová otázka — s hintom na úrovni skupiny aj na úrovni jednotlivých možností.',
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
      <div style={{ width: '100%', maxWidth: '375px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Mobilné zobrazenie checkboxu na úzkych obrazovkách.',
      },
    },
  },
};
