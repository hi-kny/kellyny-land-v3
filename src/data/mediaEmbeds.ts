/* ── Video & Podcast Embed Data ──
 *
 * Central file for all YouTube and Spotify embed IDs used across the site.
 * Central file for all YouTube and Spotify embed IDs used across the site.
 */

export interface VideoEmbed {
  platform: 'youtube';
  id: string;
  title: string;
  type: 'video' | 'playlist';
}

export interface PodcastEmbed {
  platform: 'spotify';
  id: string;
  title: string;
  type: 'playlist' | 'episode' | 'show';
  description?: string;
}

/* ── Speaking & Press: 8 YouTube Playlists ── */
export const speakingYouTubePlaylists: VideoEmbed[] = [
  { platform: 'youtube', id: 'PL64FK0FTjcLsDH7qVzWlgaciq1mqQoxEH', title: 'Celebrity Partnerships', type: 'playlist' },
  { platform: 'youtube', id: 'PL64FK0FTjcLvkfII31cp06nkCCz43Kbw8', title: 'Star Wars BB-8', type: 'playlist' },
  { platform: 'youtube', id: 'PL64FK0FTjcLvNoePEEF6p_u9IFWA0yxvw', title: 'Influencer Marketing', type: 'playlist' },
  { platform: 'youtube', id: 'PL64FK0FTjcLtPyG_AvSpDMJyMwfODsf1h', title: 'Sphero EDU', type: 'playlist' },
  { platform: 'youtube', id: 'PL64FK0FTjcLvITrPCLdm2kSsvMXe9YBXT', title: 'Snapchat Spectacles', type: 'playlist' },
  { platform: 'youtube', id: 'PL64FK0FTjcLutsikzQpmFd9xMKq1hPryZ', title: 'Parrot AR.Drone', type: 'playlist' },
  { platform: 'youtube', id: 'PL64FK0FTjcLvxYPiHtD_Px891gz3VxcWX', title: 'Brand Partnerships', type: 'playlist' },
  { platform: 'youtube', id: 'PL64FK0FTjcLtMrXeQtqEp5uZBzMoD__WD', title: 'ROLI', type: 'playlist' },
];

/* ── Portfolio: Video embeds per project (keyed by slug) ── */
export const portfolioVideos: Record<string, VideoEmbed[]> = {
  spectacles: [
    { platform: 'youtube', id: 'pZ5s1BBI4S8', title: 'I Got The Snapchat Spectacles Early', type: 'video' },
    { platform: 'youtube', id: 'iPyxxhFV2bs', title: 'Snapchat Spectacles Unboxing and review! | iJustine', type: 'video' },
  ],
  bb8: [
    { platform: 'youtube', id: 'NQgw_KOMY7M', title: 'BB-8 and the Marble', type: 'video' },
  ],
  'ar-drone': [
    { platform: 'youtube', id: '5fwjHO6VjWw', title: 'Parrot AR.Drone 2.0 - Fly and Record in HD', type: 'video' },
  ],
  sprk: [
    { platform: 'youtube', id: 'Yg8LmEkI_0c', title: 'What is Sphero SPRK Edition?', type: 'video' },
    { platform: 'youtube', id: 'hk4HylFFC4c', title: 'Just add imagination - Introducing SPRK+', type: 'video' },
  ],
  ollie: [
    { platform: 'youtube', id: 'G9rQN-uQarw', title: 'Ollie - Official Launch Video - Sphero Connected Toys', type: 'video' },
  ],
  roli: [
    { platform: 'youtube', id: 'sGKtTgEPa_E', title: 'NOISE: 3D Touch on the iPhone like you\'ve never heard it before', type: 'video' },
  ],
  'pop-up': [
    { platform: 'youtube', id: 'gwR7XAx6aTw', title: 'Snapchat Spectacles NYC Store Promo Video', type: 'video' },
    { platform: 'youtube', id: 'YDlJWQkXOYE', title: "People Wait Hours For Highly Anticipated Pair of Snapchat's 'Spectacles'", type: 'video' },
  ],
  zik: [
    { platform: 'youtube', id: '-QPX9-1LUi0', title: 'Carla Bruni behind the scenes of Parrot Zik ad', type: 'video' },
  ],
  zikmu: [
    { platform: 'youtube', id: 'qrO4YZeyl0I', title: 'Lady Gaga - Bad Romance (Official Music Video)', type: 'video' },
    { platform: 'youtube', id: 'ZQ2nCGawrSY', title: 'Zikmu by Parrot', type: 'video' },
    { platform: 'youtube', id: '3IBFYRslYfk', title: 'David Guetta Feat. Akon - Sexy Chick', type: 'video' },
  ],
  soundwall: [
    { platform: 'youtube', id: 'WEeT6IkqLxQ', title: 'Soundwall Solstice', type: 'video' },
    { platform: 'youtube', id: 'UqwznPOMYo4', title: 'Soundwall', type: 'video' },
  ],
  textshop: [
    { platform: 'youtube', id: 'OI25QhXa10k', title: 'Text Shop: A physical text-to-buy concept', type: 'video' },
  ],
};

/* ── Fundraising Course: 6 Lesson Videos ── */
export const fundraisingPlaylistId = 'PL64FK0FTjcLurfwxLu5Iui4qOVng8_44_';

export interface FundraisingLesson {
  slug: string;
  emoji: string;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  videoId: string;
  topics: string[];
}

export const fundraisingLessons: FundraisingLesson[] = [
  {
    slug: 'fundraising-intro',
    emoji: '\u{1F914}',
    title: 'Introduction // How to Fundraise, A Series by Kelly Nyland',
    shortTitle: 'Introduction',
    description: 'Series overview, differentiation, and motivation for the course.',
    duration: '5 MIN',
    videoId: 'j1uRBo6rUl0',
    topics: [
      'What will we cover in the series?',
      'How is this series different than all of the Medium articles out there?',
      'What is my motivation for doing this?',
      "Don't skip the last video on rejection & objection handling!",
    ],
  },
  {
    slug: 'fundraising-step1',
    emoji: '\u{1F3C1}',
    title: 'Step 1 // How to qualify your investors',
    shortTitle: 'Qualify Investors',
    description: 'How to qualify investors — count and methodology.',
    duration: '9 MIN',
    videoId: '4FRoR1KvQBk',
    topics: [
      'Why founders waste time on unqualified investors',
      'Sector alignment & current investment activity',
      'Lead vs follow investor at your stage',
      'Statistical framework: ~120 qualified investors for 2-3 commitments',
    ],
  },
  {
    slug: 'fundraising-step2',
    emoji: '\u{270F}\u{FE0F}',
    title: 'Step 2 // How to setup your fundraising process',
    shortTitle: 'Setup Process',
    description: 'Investor selection, making connections, and building momentum.',
    duration: '11 MIN',
    videoId: 'dwnQ8Kr--x0',
    topics: [
      'Investor selection process',
      'Making warm connections',
      'Building fundraising momentum',
    ],
  },
  {
    slug: 'fundraising-step3',
    emoji: '\u{1F4CA}',
    title: 'Step 3 // How to prepare the documents you\'ll need',
    shortTitle: 'Prepare Documents',
    description: 'How to prepare the documents you need for your raise.',
    duration: '14 MIN',
    videoId: 'bgo90r_3nUo',
    topics: [
      'Company Overview',
      "'Send Ahead' 10 Page Deck",
      'Longer Form Deck with Appendix',
      'Growth Model',
      'GTM Plan',
      'Data Room',
    ],
  },
  {
    slug: 'fundraising-step4',
    emoji: '\u{1F3CE}\u{FE0F}',
    title: 'Step 4 // How to keep up the momentum',
    shortTitle: 'Maintain Momentum',
    description: 'The 3-week process framework to keep your raise on track.',
    duration: '13 MIN',
    videoId: 'fzatXiW1_4U',
    topics: [
      'Executing a tight 3-week process',
      'Moving investors through materials efficiently',
      'Email template examples',
      'Achieving definitive outcomes',
    ],
  },
  {
    slug: 'fundraising-step5',
    emoji: '\u{1F3AD}',
    title: 'Step 5 // How to turn rejection into insight',
    shortTitle: 'Handle Rejection',
    description: 'How to learn from "no" and refine your approach.',
    duration: '12 MIN',
    videoId: '5_kriwOm8NI',
    topics: [
      'Momentum after rejection',
      'Decoding rejection messages',
      'By the numbers',
      'Keeping track & looking for trends',
    ],
  },
];

/* ── Spotify Podcasts ── */
export const spotifyPodcasts: PodcastEmbed[] = [
  {
    platform: 'spotify',
    id: '0v41xRTouNdXUksQ2V0M0f',
    title: 'Guest Spotlights',
    type: 'playlist',
    description: 'All podcast segment talks with Kelly Nyland',
  },
  {
    platform: 'spotify',
    id: '7lhm727AVRiQldg25rtHW4',
    title: 'Blind Data',
    type: 'playlist',
    description: 'Podcast Mini Series on personal data',
  },
  {
    platform: 'spotify',
    id: '3PNp0GYwbvZPdRyphIxIVa',
    title: 'A Guide to the Ever-changing Payments Landscape',
    type: 'playlist',
    description: 'Podcast Mini Series on payment processing',
  },
];

/* ── Press Link URLs (matched from Squarespace inventory) ── */
export const pressUrls: Record<string, string> = {
  'Shopper_Forecast_2020': '/assets/pdfs/Shopper_Forecast_2020.pdf',
  'BB-8 Awakens WSJ': 'https://www.wsj.com/articles/bb-8-awakens-is-spheros-new-droid-the-most-awesome-star-wars-toy-ever-1441285524',
  'Marketing genius Vox': 'https://www.vox.com/2016/11/20/13688096/snap-snapchat-spectacles-marketing-success',
  'Star Wars Toy Time': 'https://time.com/4021163/bb-8-sphero-toy/',
  'Spectacles Verge': 'https://www.theverge.com/2016/12/26/14041548/2016-tech-recap-snapchat-spectacles',
  'Ex-Snap TechCrunch': 'https://techcrunch.com/2021/12/13/ex-snap-employees-raise-4m-for-conversational-commerce-startup-whym/?tpcc=tcplustwitter',
  'The Information': 'https://www.theinformation.com/articles/the-people-who-matter-at-snap',
  'TechStars': 'https://www.techstars.com',
  'Shorty Awards': 'https://shortyawards.com/10th/usopenxspectacles-a-stunt-like-no-other',
  'CNET Wearables': 'https://www.cnet.com/tech/mobile/snapchat-glasses-vergence-snap-labs-hints-wearable/',
  'Adweek Cannes': 'https://www.adweek.com/creativity/snap-spectacles-win-3-golds-at-cannes-for-their-functional-beautiful-design/',
  'BizJournals WHYM': 'https://www.bizjournals.com/losangeles/news/2019/11/25/on-a-whym-the-marketing-mavens-behind-spectacles.html',
  'Modern Retail SMS': 'https://www.modernretail.co/retailers/sms-is-the-new-email-dtc-brands-are-getting-into-text-messaging/',
  'Ad Age Holiday': 'https://adage.com/article/cmo-strategy/startup-bb-8-prepping-holidays/300312',
  'Ad Age Spectacles': 'https://adage.com/article/guest-columnists/snapchat-s-spectacles-succeed-google-glass-failed/306013',
  'Growth Marketing Conf': 'https://growthmarketingconf.com',
  'Saatchi Art': 'https://canvas.saatchiart.com/the-other-art-fair/la-introducing-selection-committee-member-kelly-nyland',
  'FabFitFun': 'https://fabfitfun.com/magazine/women-share-2019-goals/',
  'Crowdcast': 'https://www.crowdcast.io/e/turn-dialog-into-dollars/register',
  'Core77': 'https://designawards.core77.com/judging-alumni?category_id=0&competition_id=2&page_number=3&sort_by=0',
  'Glitter Guide': 'https://www.instagram.com/glitterguide/?hl=en',
  'YouTube AI': 'https://www.youtube.com/watch?v=blhPZ__Z6d8',
  'HerCampus': 'https://www.hercampus.com/school/montevallo/ceo-founder-petalfox-kelly-nyland-shares-what-it-means-run-female-founded-company/',
  'RONROBINSON': '/assets/pdfs/RONROBINSON.pdf',
  'Amazon Physics Brand': 'https://www.amazon.com/Physics-Brand-Understand-Forces-Behind/dp/1440342679/ref=cm_cr_othr_d_product_top?ie=UTF8',
  'Apple Books': 'https://books.apple.com/us/book/jab-jab-jab-right-hook/id599910525',
  'Women in Retail': 'https://www.womeninretail.com/podcast/whym-co-founders-on-conversational-commerce-supporting-women-owned-businesses-and-more/',
  'GoProperRebel': 'https://goproperrebel.com/taking-charge-of-the-market-with-a-billion-dollar-idea/',
  'YouTube 2023 Keynote': 'https://www.youtube.com/watch?v=7N8Cy_QVuM0',
  'LinkedIn Funding': 'https://www.linkedin.com/pulse/5-funding-kelly-nyland-founder-ceo-whym-beck-bamberger/?trackingId=G7gJ6xDjQeW2W9t4916W3Q%3D%3D',
  'Commerce Evolution Ebook': '/assets/pdfs/Commerce-Evolution-Ebook-3.pdf',
  'Medium Payments': 'https://ryanhornberger.medium.com/an-investors-guide-to-the-ever-changing-payment-processing-landscape-f507fc23dd08',
};

/* ── Advisor Press Links ── */
export const advisorPressLinks: Record<string, string> = {
  'Apptronik': 'https://www.cnn.com/2023/08/23/world/apptronik-apollo-humanoid-robot-scn/index.html',
  'In Seam': 'https://www.businessoffashion.com',
  'Maslo.ai': 'https://techcrunch.com',
  'Skop': 'https://techcrunch.com',
  'PopSockets': 'https://www.popsockets.com',
  'Revolar': 'https://www.teenvogue.com',
  'Shine': 'https://techcrunch.com',
  'Soundwall': 'https://design-milk.com',
};
