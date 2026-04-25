export interface PressItem {
  outlet?: string;
  headline: string;
  url: string;
  date?: string;
  image?: string;
  category?: string;
}

// TODO KELLY: add date + image per item (40 total) so press-gallery can render real tiles.
export const pressItems: PressItem[] = [
  { headline: 'Why Spectacles will succeed where Google Glass failed', url: 'https://adage.com/article/guest-columnists/snapchat-s-spectacles-succeed-google-glass-failed/306013', outlet: 'AdAge' },
  { headline: "The marketing genius behind Snap's new Spectacles", url: 'https://www.vox.com/2016/11/20/13688096/snap-snapchat-spectacles-marketing-success', outlet: 'Vox' },
  { headline: '2016 tech recap: Snapchat Spectacles', url: 'https://www.theverge.com/2016/12/26/14041548/2016-tech-recap-snapchat-spectacles', outlet: 'The Verge' },
  { headline: "BB-8 Awakens: Is Sphero's New Droid the Most Awesome Star Wars Toy Ever?", url: 'https://www.wsj.com/articles/bb-8-awakens-is-spheros-new-droid-the-most-awesome-star-wars-toy-ever-1441285524', outlet: 'WSJ' },
  { headline: 'This Will Be the Star Wars Toy Every Kid Wants This Holiday', url: 'https://time.com/4021163/bb-8-sphero-toy/', outlet: 'TIME' },
  { headline: 'Ex-Snap employees raise $4.3M for conversational commerce', url: 'https://techcrunch.com/2021/12/13/ex-snap-employees-raise-4m-for-conversational-commerce-startup-whym/', outlet: 'TechCrunch' },
  { headline: 'SnapGlass? HoloChat? Snapchat is secretly hiring wearable technology experts', url: 'https://www.cnet.com/tech/mobile/snapchat-glasses-vergence-snap-labs-hints-wearable/', outlet: 'CNET' },
  { headline: 'ON A WHYM: The marketing mavens behind Spectacles launch', url: 'https://www.bizjournals.com/losangeles/news/2019/11/25/on-a-whym-the-marketing-mavens-behind-spectacles.html', outlet: 'LA Business Journal' },
  { headline: 'SMS is the new email', url: 'https://www.modernretail.co/retailers/sms-is-the-new-email-dtc-brands-are-getting-into-text-messaging/', outlet: 'Modern Retail' },
  { headline: 'How the Startup Behind the Hottest New Star Wars Toy Preps for Holiday', url: 'https://adage.com/article/cmo-strategy/startup-bb-8-prepping-holidays/300312', outlet: 'AdAge' },
  { headline: 'Snap Spectacles Win 3 Golds at Cannes', url: 'https://www.adweek.com/creativity/snap-spectacles-win-3-golds-at-cannes-for-their-functional-beautiful-design/', outlet: 'Adweek' },
  { headline: 'The People Who Matter at Snap', url: 'https://www.theinformation.com/articles/the-people-who-matter-at-snap', outlet: 'The Information' },
  { headline: 'Brands are creating an entire text-based commerce platform', url: 'https://www.modernretail.co/retailers/sms-is-the-new-email-dtc-brands-are-getting-into-text-messaging/', outlet: 'Modern Retail' },
  { headline: '2019 TechStars Demo Day Advisor', url: 'https://www.techstars.com', outlet: 'TechStars' },
  { headline: 'A Stunt Like No Other — Shorty Awards', url: 'https://shortyawards.com/10th/usopenxspectacles-a-stunt-like-no-other', outlet: 'Shorty Awards' },
  { headline: 'Turn Dialog into Dollars', url: 'https://www.crowdcast.io/e/turn-dialog-into-dollars/register', outlet: 'Crowdcast' },
  { headline: '2018 Growth Marketing Conference Keynote', url: 'https://growthmarketingconf.com', outlet: 'Growth Marketing Conference' },
  { headline: 'Saatchi Art Selection Committee', url: 'https://canvas.saatchiart.com/the-other-art-fair/la-introducing-selection-committee-member-kelly-nyland', outlet: 'Saatchi Art' },
  { headline: '10 Successful Women — FabFitFun', url: 'https://fabfitfun.com/magazine/women-share-2019-goals/', outlet: 'FabFitFun' },
  { headline: '2016 Open Design Jury — Core77', url: 'https://designawards.core77.com/judging-alumni?category_id=0&competition_id=2&page_number=3&sort_by=0', outlet: 'Core77' },
  { headline: 'Leveraging A.I. for Creativity', url: 'https://www.youtube.com/watch?v=blhPZ__Z6d8', outlet: 'YouTube' },
  { headline: 'Female-Founded Company — Her Campus', url: 'https://www.hercampus.com/school/montevallo/ceo-founder-petalfox-kelly-nyland-shares-what-it-means-run-female-founded-company/', outlet: 'Her Campus' },
  { headline: 'CEO Kelly Nyland on the power of Conversational Commerce', url: 'https://www.womeninretail.com/podcast/whym-co-founders-on-conversational-commerce-supporting-women-owned-businesses-and-more/', outlet: 'Women in Retail' },
  { headline: 'Kelly Nyland — 2023 Keynote Speaker', url: 'https://www.youtube.com/watch?v=7N8Cy_QVuM0', outlet: 'YouTube' },
  { headline: 'Taking Charge of the Market with a Billion-Dollar Idea', url: 'https://goproperrebel.com/taking-charge-of-the-market-with-a-billion-dollar-idea/', outlet: 'Proper Rebel' },
  { headline: 'Kelly Nyland behind Spectacles', url: 'https://open.spotify.com/episode/1Q9vnvrKyslX7QCYNVWYQP', outlet: 'Spotify' },
  { headline: 'Request for Book Testimonial — Physics of Brand', url: 'https://www.amazon.com/Physics-Brand-Understand-Forces-Behind/dp/1440342679', outlet: 'Amazon' },
  { headline: 'Jab Jab Jab Right Hook', url: 'https://books.apple.com/us/book/jab-jab-jab-right-hook/id599910525', outlet: 'Apple Books' },
  { headline: 'Kelly Nyland, Spectacles Launch', url: 'https://open.spotify.com/episode/6XqKswDoqcxgkk6lD3iRYW', outlet: 'Spotify' },
  { headline: 'Launching A Startup w/ Kelly Nyland', url: 'https://open.spotify.com/episode/4cqH0jnCAKtSZxWkXQQxcm', outlet: 'Spotify' },
  { headline: 'Episode 228: Kelly Nyland, CEO of Whym', url: 'https://www.hireotter.com/behindcompanylines/episode-228-kelly-nyland-ceo-of-whym', outlet: 'Behind Company Lines' },
  { headline: 'eCommerce & Text Messaging with Kelly Nyland', url: 'https://open.spotify.com/episode/02jZFHQtfzwBPPRmrIjlIM', outlet: 'Spotify' },
  { headline: '5 on Funding with Kelly Nyland', url: 'https://www.linkedin.com/pulse/5-funding-kelly-nyland-founder-ceo-whym-beck-bamberger/', outlet: 'LinkedIn Pulse' },
  { headline: 'Starting a Multi-million Dollar Company with Kelly Nyland', url: 'https://open.spotify.com/episode/4xLyCeRb44RnTGdKBmlNUl', outlet: 'Spotify' },
  { headline: 'Start Your Own Thing — Glitter Guide', url: 'https://www.instagram.com/glitterguide/', outlet: 'Glitter Guide' },
  { headline: "An Investor's guide to the ever-changing payment processing landscape", url: 'https://open.spotify.com/episode/3PNp0GYwbvZPdRyphIxIVa', outlet: 'Spotify' },
  { headline: '2020 WGSN Shopper Report', url: '/assets/pdfs/Shopper_Forecast_2020.pdf', outlet: 'WGSN', category: 'PDF' },
  { headline: 'RON ROBINSON Magazine', url: '/assets/pdfs/RONROBINSON.pdf', outlet: 'Ron Robinson', category: 'PDF' },
];

export const pressCategories = [
  'Celebrity Partnerships',
  'Star Wars BB-8',
  'Influencer Marketing',
  'Sphero EDU',
  'Snapchat Spectacles',
  'Parrot AR.Drone',
  'Brand Partnerships',
  'ROLI',
];

export const featuredQuotes = [
  {
    quote:
      "The marketing genius behind Snap's new Spectacles is something we haven't seen in a long, long time. We all want a pair.",
    source: 'Vox',
    author: 'Kurt Wagner',
  },
  {
    quote:
      'Sphero deserves kudos for managing to do what so many others put off. Truly, this is a perfect execution.',
    source: 'Jab, Jab, Jab Right Hook',
    author: 'Gary Vaynerchuk',
  },
  {
    quote:
      'With the launch of the brilliantly marketed Spectacles, Snapchat proved that a tech company could create genuine consumer desire.',
    source: 'The Verge',
    author: 'Thomas Ricker',
  },
];

export const pressPdfs = [
  { title: '2020 WGSN Shopper Report', url: '/assets/pdfs/Shopper_Forecast_2020.pdf' },
  { title: 'RON ROBINSON Magazine', url: '/assets/pdfs/RONROBINSON.pdf' },
  { title: 'Commerce Evolution E-Book', url: '/assets/pdfs/Commerce-Evolution-Ebook-3.pdf' },
];
