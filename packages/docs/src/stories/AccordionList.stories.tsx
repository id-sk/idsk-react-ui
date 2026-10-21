import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionList } from '@id-sk/react';

const meta = {
  title: 'Organisms/AccordionList',
  component: AccordionList,
  parameters: {
    docs: {
      description: {
        component:
          'AccordionList je kompozitný komponent kombinujúci nadpis, tlačidlo „Otvoriť všetko / Zavrieť všetko" a akordeón. Používa sa na zoskupenie viacerých rozbaľovacích sekcií pod spoločným záhlavím.',
      },
    },
  },
} satisfies Meta<typeof AccordionList>;

export default meta;
type Story = StoryObj<typeof AccordionList>;

export const Default: Story = {
  name: 'Predvolený',
  args: {
    title: 'Nadpis',
    hint: true,
    hintText: 'Popis akordeónového zoznamu',
    items: [
      {
        title: 'Prvá sekcia',
        children: <p>Obsah prvej sekcie akordeónu.</p>,
      },
      {
        title: 'Druhá sekcia',
        children: <p>Obsah druhej sekcie akordeónu.</p>,
      },
      {
        title: 'Tretia sekcia',
        children: <p>Obsah tretej sekcie akordeónu.</p>,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion list so záhlavím obsahujúcim nadpis, popis a tlačidlo „Otvoriť všetko / Zavrieť všetko".',
      },
    },
  },
};

export const WithDefaultOpen: Story = {
  name: 'Predvolene rozbalený',
  args: {
    title: 'Nadpis',
    hint: true,
    hintText: 'Popis akordeónového zoznamu',
    items: [
      {
        title: 'Predvolene rozbalená sekcia',
        children: <p>Táto sekcia je rozbalená hneď po načítaní stránky.</p>,
        defaultOpen: true,
      },
      {
        title: 'Predvolene zbalená sekcia',
        children: <p>Táto sekcia sa musí kliknúť na otvorenie.</p>,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion list s predvolene rozbalenou sekciou pomocou `defaultOpen: true`.',
      },
    },
  },
};

export const SingleOpen: Story = {
  name: 'Jedna sekcia naraz',
  args: {
    title: 'Nadpis',
    hint: true,
    hintText: 'Popis akordeónového zoznamu',
    singleOpen: true,
    items: [
      {
        title: 'Prvá sekcia',
        children: <p>Otvorenie tejto sekcie automaticky zatvorí ostatné.</p>,
      },
      {
        title: 'Druhá sekcia',
        children: <p>Obsah druhej sekcie.</p>,
      },
      {
        title: 'Tretia sekcia',
        children: <p>Obsah tretej sekcie.</p>,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion list v režime `singleOpen` — tlačidlo „Otvoriť všetko" je skryté, keďže v danom okamihu môže byť otvorená iba jedna sekcia.',
      },
    },
  },
};

export const WithDisabled: Story = {
  name: 'S deaktivovanou sekciou',
  args: {
    title: 'Nadpis',
    hint: true,
    hintText: 'Popis akordeónového zoznamu',
    items: [
      {
        title: 'Aktívna sekcia',
        children: <p>Táto sekcia je dostupná a môže byť rozbalená.</p>,
      },
      {
        title: 'Neaktívna sekcia',
        children: <p>Tento obsah nie je prístupný.</p>,
        disabled: true,
      },
      {
        title: 'Ďalšia aktívna sekcia',
        children: <p>Táto sekcia je tiež dostupná.</p>,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion list s deaktivovanou sekciou. Tlačidlo „Otvoriť všetko" ignoruje deaktivované položky.',
      },
    },
  },
};
