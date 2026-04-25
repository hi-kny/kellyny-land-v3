export interface Advisor {
  name: string;
  role: string;
  tagline: string;
  logo: string;
}

export const advisoryCompanies: Advisor[] = [
  {
    name: 'Apptronik',
    role: 'Angel Investor',
    tagline: "Meet Apollo, the 'iPhone' of humanoid robots.",
    logo: '/images/founders/advisors/apptronik.png',
  },
  {
    name: 'In Seam',
    role: 'Angel Investor',
    tagline: 'Luxury retail platform built for personal stylists.',
    logo: '/images/founders/advisors/in-seam.png',
  },
  {
    name: 'Maslo.ai',
    role: 'Early Advisor',
    tagline: 'The first of its kind for empathetic computing.',
    logo: '/images/founders/advisors/maslo.png',
  },
  {
    name: 'Skop',
    role: 'Board of Directors',
    tagline: "The 'peloton' of pilates reformers.",
    logo: '/images/founders/advisors/skop.png',
  },
  {
    name: 'PopSockets',
    role: 'CEO Advisor',
    tagline: 'The global phone accessories brand.',
    logo: '/images/founders/advisors/popsockets.png',
  },
  {
    name: 'Revolar',
    role: 'Board of Advisors',
    tagline: 'Personal safety wearable made for teens.',
    logo: '/images/founders/advisors/revolar.png',
  },
  {
    name: 'Shine',
    role: 'Board of Advisors, Observer',
    tagline: 'Elevate your bathroom.',
    logo: '/images/founders/advisors/shine.png',
  },
  {
    name: 'Soundwall',
    role: 'Board of Advisors',
    tagline: 'Art meets audio.',
    logo: '/images/founders/advisors/soundwall.png',
  },
];
