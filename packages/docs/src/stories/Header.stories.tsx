import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import {
  Button,
  Header,
  HeaderDrawer,
  HeaderMainSection,
  type HeaderUser,
  MailIcon,
  NotificationsIcon,
  TopBar,
  WebsiteNavigation,
} from '@id-sk/react';

const DROPDOWN_ITEMS = [
  { label: 'Položka 1', href: '#' },
  { label: 'Položka 2', href: '#' },
  { label: 'Položka 3', href: '#' },
  { label: 'Položka 4', href: '#' },
  { label: 'Položka 5', href: '#' },
];

const NAV_ITEMS = [
  { label: 'Sekcia', href: '#' },
  { label: 'Sekcia', href: '#' },
  { label: 'Sekcia', href: '#', active: true },
  { label: 'Sekcia', variant: 'dropdown' as const, dropdownItems: DROPDOWN_ITEMS },
  { label: 'Sekcia', variant: 'dropdown' as const, dropdownItems: DROPDOWN_ITEMS },
];

const DRAWER_ACTION_ITEMS = [
  { label: 'eSchránka', href: '#', icon: <MailIcon size={25} /> },
  { label: 'Notifikácie', href: '#', icon: <NotificationsIcon size={25} /> },
  { label: 'Placeholder', href: '#' },
  { label: 'Tlačidlo' },
];

const DRAWER_NAV_ITEMS = [
  { label: 'Sekcia', href: '#' },
  { label: 'Sekcia', href: '#' },
  { label: 'Sekcia', href: '#' },
  { label: 'Sekcia', href: '#', hasDropdown: true },
  { label: 'Sekcia', href: '#', hasDropdown: true },
];

/** Wires a Header's mobile Menu button to a real HeaderDrawer instance, so the
 * hamburger button opens a working drawer in every story instead of doing nothing. */
function DrawerHost({
  user,
  children,
}: {
  user?: HeaderUser;
  children: (onMenuClick: () => void) => React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {children(() => setMenuOpen(true))}
      <HeaderDrawer
        open={menuOpen}
        onOpenChange={setMenuOpen}
        user={user}
        onLogin={() => {}}
        navItems={DRAWER_NAV_ITEMS}
      />
    </>
  );
}

type HeaderStoryArgs = {
  // Header
  variant?: 'default' | 'transparent';
  sticky?: boolean;
  // HeaderMainSection
  orgName?: string;
  orgSubtitle?: string;
  showSearch?: boolean;
  showMail?: boolean;
  mailHasNew?: boolean;
  showNotifications?: boolean;
  notificationsHasNew?: boolean;
  showLogin?: boolean;
  loginLabel?: string;
  menuLabel?: string;
};

function MainSection({
  orgName,
  orgSubtitle,
  showSearch,
  showMail,
  mailHasNew,
  showNotifications,
  notificationsHasNew,
  showLogin,
  loginLabel,
  menuLabel,
  onMenuClick,
}: Partial<HeaderStoryArgs> & { onMenuClick?: () => void }) {
  return (
    <HeaderMainSection
      orgName={orgName}
      orgSubtitle={orgSubtitle}
      showSearch={showSearch}
      showMail={showMail}
      mailHasNew={mailHasNew}
      showNotifications={showNotifications}
      notificationsHasNew={notificationsHasNew}
      showLogin={showLogin}
      loginLabel={loginLabel}
      menuLabel={menuLabel}
      onMenuClick={onMenuClick}
    />
  );
}

const meta = {
  title: 'Organisms/Header',
  component: Header,
  render: ({ variant, sticky, ...rest }: HeaderStoryArgs) => (
    <DrawerHost>
      {(onMenuClick) => (
        <Header variant={variant} sticky={sticky}>
          <TopBar />
          <MainSection {...rest} onMenuClick={onMenuClick} />
          <WebsiteNavigation items={NAV_ITEMS} />
        </Header>
      )}
    </DrawerHost>
  ),
  args: {
    variant: 'default',
    sticky: false,
    orgName: 'Názov organizácie',
    orgSubtitle: 'Podnadpis',
    showSearch: true,
    showMail: false,
    mailHasNew: false,
    showNotifications: false,
    notificationsHasNew: false,
    showLogin: true,
    loginLabel: 'Prihlásiť sa',
    menuLabel: 'Menu',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'transparent'],
      description: 'Vizuálny štýl hlavičky',
      table: { defaultValue: { summary: 'default' } },
    },
    sticky: {
      control: 'boolean',
      description: 'Hlavička zostáva viditeľná pri scrollovaní',
      table: { defaultValue: { summary: 'false' } },
    },
    orgName: {
      control: 'text',
      description: 'Názov organizácie alebo služby',
      table: { category: 'HeaderMainSection' },
    },
    orgSubtitle: {
      control: 'text',
      description: 'Podnadpis pod názvom',
      table: { category: 'HeaderMainSection' },
    },
    showSearch: {
      control: 'boolean',
      description: 'Zobraziť tlačidlo vyhľadávania',
      table: { category: 'HeaderMainSection', defaultValue: { summary: 'true' } },
    },
    showMail: {
      control: 'boolean',
      description: 'Zobraziť ikonu správ',
      table: { category: 'HeaderMainSection', defaultValue: { summary: 'false' } },
    },
    mailHasNew: {
      control: 'boolean',
      description: 'Badge — nová správa',
      table: { category: 'HeaderMainSection', defaultValue: { summary: 'false' } },
    },
    showNotifications: {
      control: 'boolean',
      description: 'Zobraziť ikonu notifikácií',
      table: { category: 'HeaderMainSection', defaultValue: { summary: 'false' } },
    },
    notificationsHasNew: {
      control: 'boolean',
      description: 'Badge — nová notifikácia',
      table: { category: 'HeaderMainSection', defaultValue: { summary: 'false' } },
    },
    showLogin: {
      control: 'boolean',
      description: 'Zobraziť tlačidlo prihlásenia',
      table: { category: 'HeaderMainSection', defaultValue: { summary: 'true' } },
    },
    loginLabel: {
      control: 'text',
      description: 'Text tlačidla prihlásenia',
      table: { category: 'HeaderMainSection', defaultValue: { summary: 'Prihlásiť sa' } },
    },
    menuLabel: {
      control: 'text',
      description: 'Text mobilného tlačidla Menu',
      table: { category: 'HeaderMainSection', defaultValue: { summary: 'Menu' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Hlavička stránky — molekula zložená z TopBar-u a HeaderMainSection (logo, akcie). TopBar je prvý prvok zobrazený na samom vrchu, HeaderMainSection obsahuje logo organizácie a akčnú zónu.',
      },
    },
  },
} satisfies Meta<HeaderStoryArgs>;

export default meta;
type Story = StoryObj<HeaderStoryArgs>;

/** Štandardná hlavička s TopBar-om, sekciou s logom a navigačnou lištou. */
export const Default: Story = {
  name: 'Predvolený',
  parameters: {
    docs: {
      description: {
        story:
          'Kompletná hlavička — TopBar nasledovaný sekciou s názvom organizácie, vyhľadávaním a prihlásením.',
      },
    },
  },
};

/** Rozbalený TopBar spolu s hlavnou sekciou a navigáciou. */
export const WithExpandedTopBar: Story = {
  name: 'S rozbaleným TopBar-om',
  render: ({ variant, sticky, ...rest }) => (
    <DrawerHost>
      {(onMenuClick) => (
        <Header variant={variant} sticky={sticky}>
          <TopBar defaultExpanded />
          <MainSection {...rest} onMenuClick={onMenuClick} />
          <WebsiteNavigation items={NAV_ITEMS} />
        </Header>
      )}
    </DrawerHost>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hlavička s rozbaleným informačným pruhom — zobrazuje text o oficiálnosti stránky.',
      },
    },
  },
};

/** Vlastné akcie vložené medzi vyhľadávanie a tlačidlo prihlásenia. */
export const WithCustomActions: Story = {
  name: 'S vlastnými akciami',
  render: ({ variant, sticky, ...rest }) => (
    <DrawerHost>
      {(onMenuClick) => (
        <Header variant={variant} sticky={sticky}>
          <TopBar />
          <HeaderMainSection
            {...rest}
            onMenuClick={onMenuClick}
            actions={
              <Button variant="tertiary" size="md">
                Tlačidlo
              </Button>
            }
          />
          <WebsiteNavigation items={NAV_ITEMS} />
        </Header>
      )}
    </DrawerHost>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Slot `actions` umožňuje vložiť ľubovoľné prvky (napr. textové tlačidlá, ikony) medzi vyhľadávanie a prihlásenie.',
      },
    },
  },
};

/** Hlavička bez vyhľadávania a bez tlačidla prihlásenia. */
export const MinimalActions: Story = {
  name: 'Minimálne akcie',
  args: {
    showSearch: false,
    showLogin: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Verzia bez vyhľadávacieho tlačidla a bez prihlásenia — len logo, názov a navigácia.',
      },
    },
  },
};

/** Transparentná hlavička na farebnom pozadí. */
export const Transparent: Story = {
  name: 'Priehľadný variant',
  args: { variant: 'transparent' },
  render: ({ variant, sticky, ...rest }) => (
    <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #4a7fb5 100%)', padding: 0 }}>
      <DrawerHost>
        {(onMenuClick) => (
          <Header variant={variant} sticky={sticky}>
            <TopBar />
            <MainSection {...rest} onMenuClick={onMenuClick} />
            <WebsiteNavigation items={NAV_ITEMS} />
          </Header>
        )}
      </DrawerHost>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Transparentný variant — vhodný na hero sekcie alebo farebné pozadia.',
      },
    },
  },
};

/** Varianta pre prihláseného užívateľa — avatar, mail, notifikácie namiesto login tlačidla. */
export const LoggedIn: Story = {
  name: 'Prihlásený užívateľ',
  render: () => (
    <DrawerHost user={{ name: 'Meno', caption: 'Popisný text', onClick: () => {} }}>
      {(onMenuClick) => (
        <Header>
          <TopBar />
          <HeaderMainSection
            orgName="Názov služby"
            orgSubtitle="Názov organizácie"
            showMail
            showNotifications
            notificationsHasNew
            user={{ name: 'Meno', caption: 'Popisný text', onClick: () => {} }}
            onMenuClick={onMenuClick}
            actions={
              <Button variant="tertiary" size="md">
                Tlačidlo
              </Button>
            }
          />
          <WebsiteNavigation items={NAV_ITEMS} />
        </Header>
      )}
    </DrawerHost>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Prihlásený stav — avatar s menom namiesto login tlačidla, mail a notifikácie v akčnej zóne.',
      },
    },
  },
};

/** Varianta pre prihláseného užívateľa s profilovou fotkou. */
export const LoggedInWithPhoto: Story = {
  name: 'Prihlásený — s fotkou',
  render: () => (
    <DrawerHost
      user={{
        name: 'Meno',
        caption: 'Popisný text',
        avatarSrc: 'https://i.pravatar.cc/40',
        onClick: () => {},
      }}
    >
      {(onMenuClick) => (
        <Header>
          <TopBar />
          <HeaderMainSection
            orgName="Názov služby"
            orgSubtitle="Názov organizácie"
            showMail
            mailHasNew
            showNotifications
            user={{
              name: 'Meno',
              caption: 'Popisný text',
              avatarSrc: 'https://i.pravatar.cc/40',
              onClick: () => {},
            }}
            onMenuClick={onMenuClick}
          />
          <WebsiteNavigation items={NAV_ITEMS} />
        </Header>
      )}
    </DrawerHost>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Prihlásený stav s profilovou fotkou a mail badge indikátorom.',
      },
    },
  },
};

function MobileMenuDrawerDemo() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <>
      <Header>
        <TopBar />
        <HeaderMainSection
          orgName="Názov organizácie"
          orgSubtitle="Podnadpis"
          onMenuClick={() => setMenuOpen(true)}
        />
        <WebsiteNavigation items={NAV_ITEMS} />
      </Header>
      <HeaderDrawer
        open={menuOpen}
        onOpenChange={setMenuOpen}
        onLogin={() => {}}
        actionItems={DRAWER_ACTION_ITEMS}
        navItems={DRAWER_NAV_ITEMS}
      />
    </>
  );
}

function MobileMenuDrawerLoggedInDemo() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <>
      <Header>
        <TopBar />
        <HeaderMainSection
          orgName="Názov služby"
          orgSubtitle="Názov organizácie"
          user={{ name: 'Meno', caption: 'Popisný text', onClick: () => {} }}
          onMenuClick={() => setMenuOpen(true)}
        />
        <WebsiteNavigation items={NAV_ITEMS} />
      </Header>
      <HeaderDrawer
        open={menuOpen}
        onOpenChange={setMenuOpen}
        user={{ name: 'Meno', caption: 'Popisný text', onClick: () => {} }}
        profileDetails={[
          { label: 'Číslo schránky', value: 'E000738420402' },
          { label: 'IČO', value: '123456789' },
          { label: 'Zastupovanie', value: 'Zákonné' },
        ]}
        onMyZone={() => {}}
        onSwitchRepresentation={() => {}}
        onLogout={() => {}}
        actionItems={DRAWER_ACTION_ITEMS}
        navItems={DRAWER_NAV_ITEMS}
      />
    </>
  );
}

/** Prihlásený užívateľ — profil s info riadkami, Moja zóna, Prepnúť zastupovanie, Odhlásiť sa. */
export const MobileMenuDrawerLoggedIn: Story = {
  name: 'Mobilné menu — prihlásený',
  render: () => <MobileMenuDrawerLoggedInDemo />,
  parameters: {
    // Auto-opens a full-screen Radix Dialog drawer on mount; excluded from the
    // docs page so it doesn't cover the whole page. Still available as a canvas story.
    docs: {
      disable: true,
      description: {
        story:
          'Verzia zásuvky pre prihláseného užívateľa — zobrazuje avatar, info o účte a akčné tlačidlá.',
      },
    },
  },
};

/** Mobilná zásuvka — zobrazí sa po kliknutí na tlačidlo Menu (≤520 px). */
export const MobileMenuDrawer: Story = {
  name: 'Mobilné menu (zásuvka)',
  render: () => <MobileMenuDrawerDemo />,
  parameters: {
    // Auto-opens a full-screen Radix Dialog drawer on mount; excluded from the
    // docs page so it doesn't cover the whole page. Still available as a canvas story.
    docs: {
      disable: true,
      description: {
        story:
          'Mobilná navigačná zásuvka s prihlásením, vyhľadávaním, akčnou zónou a navigáciou. Tlačidlo Menu je viditeľné pri šírke ≤ 520 px.',
      },
    },
  },
};

/** Ukotvená hlavička pri scrollovaní. */
export const Sticky: Story = {
  name: 'Ukotvený obsah',
  args: { sticky: true },
  render: ({ variant, sticky, ...rest }) => (
    <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #e5e7eb' }}>
      <DrawerHost>
        {(onMenuClick) => (
          <Header variant={variant} sticky={sticky}>
            <TopBar />
            <MainSection {...rest} onMenuClick={onMenuClick} />
            <WebsiteNavigation items={NAV_ITEMS} />
          </Header>
        )}
      </DrawerHost>
      <div style={{ padding: '1rem', height: '600px', color: '#6b7280' }}>
        Obsah stránky — posúvajte pre overenie ukotveného správania.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ukotvený variant — hlavička zostáva viditeľná pri scrollovaní stránky.',
      },
    },
  },
};
