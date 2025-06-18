export const DATA_SOCIAL = [
  // {
  //   icon: '/icons/ic_facebook.svg',
  //   href: '#',
  // },
  {
    icon: '/icons/ic_linkedin.svg',
    href: 'https://www.linkedin.com/in/markawoodland/',
  },
  {
    icon: '/icons/ic_x.svg',
    href: 'https://x.com/MarkAWoodland',
  },
  {
    icon: '/icons/ic_instagram.svg',
    href: 'https://www.instagram.com/markawoodland/?hl=en',
  },
  // {
  //   icon: '/icons/ic_youTube.svg',
  //   href: '#',
  // },
];

interface IMenuHeader {
  label: string;
  href: string;
  dropdown?: IMenuHeader[];
}

export const MENU_HEADER: IMenuHeader[] = [
  {
    label: 'HOME',
    href: '/',
  },
  {
    label: 'ABOUT',
    href: '/about',
  },
  {
    label: 'INITIATIVES',
    href: '/initiatives',
    dropdown: [
      {
        label: 'Kismet',
        href: '/initiatives/kismet',
      },
      {
        label: 'Xplore',
        href: '/initiatives/xplore',
      },
    ],
  },

  {
    label: 'MEDIA',
    href: '/media',
  },
  {
    label: 'BLOG',
    href: '/blogs',
  },
];

export const MENU_FOOTER = [
  {
    label: 'Mark Woodland',
    links: [
      {
        label: 'About',
        href: '/about',
      },
      {
        label: 'Media',
        href: '/media',
      },
      {
        label: 'Blog',
        href: '/blogs',
      },
    ],
  },
  {
    label: 'Policies',
    links: [
      {
        label: 'Technology & education',
        href: '/initiatives/technology-education',
      },
      {
        label: 'Healthcare reform',
        href: '/initiatives/healthcare-reform',
      },
      {
        label: 'Economic growth',
        href: '/initiatives/economic-growth',
      },
    ],
  },
  {
    label: 'Contact',
    links: [
      {
        label: 'Contact',
        href: '/contact',
      },
      {
        label: 'Privacy policy',
        href: '/privacy-policy',
      },
    ],
  },
];
