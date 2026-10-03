export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  imagePosition?: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "press-day-2026",
    tag: "Press Day",
    title: "Press Day: 100+ Journalists, One Morning",
    date: "November 4, 2026",
    excerpt:
      "A full morning, in the spotlight in front of Arabian press: scheduled brand launches, pre-appointed interviews, and a dedicated media centre.",
    image: "/images/booklet/press.jpg",
    body: [
      "A full morning, in the spotlight in front of Arabian press. Press Day brings together 100+ journalists from 10+ countries, with 20% international press, across 10+ press conferences.",
      "Scheduled brand launches will happen throughout Press Day to ensure that the media have access to the big news of the show.",
      "Exhibitors can offer their spokespeople for pre-appointed interviews with the media to fit around their own agenda.",
      "A dedicated media centre will provide studio space, technical support, and access to state-of-the-art broadcast facilities.",
      "All the press releases and assets from the press conference will be collated and hosted online by JIMS for use by Arabian media.",
    ],
  },
  {
    slug: "vip-night-2026",
    tag: "VIP Night",
    title: "Inside VIP Night: Industry Talks & Gala",
    date: "November 4, 2026",
    excerpt:
      "For those who want the privilege to be the first to see the show and connect with the industry. 1,000 pros & guests, 50+ key influencers.",
    image: "/images/booklet/talk.jpg",
    body: [
      "For those who want the privilege to be the first to see the show and connect with the industry. VIP Night welcomes 1,000 pros & guests and 50+ key influencers across 10+ curated sessions and talks.",
      "Guests will have an exclusive opportunity to experience all brand stands and zones before the experience opens to the public.",
      "Exclusive talks, panel discussions, and automotive masterclasses on tech, design, and sustainability for business and VIP guests.",
      "For the time-poor and those seeking an enhanced experience, JIMS will provide exclusive show tour experiences.",
      "Exhibitors and guests will be able to mix and enjoy champagne, canapés and dinner in a vibrant setting at Gala Night.",
    ],
  },
  {
    slug: "visitors-days-2026",
    tag: "Visitors Days",
    title: "Visitors Days: 300,000 Reasons to Attend",
    date: "November 5 to 7, 2026",
    excerpt:
      "Three days for visitors to get closer to the exhibits and entertainment. 300,000 visitors, 60% Saudis, 40% from around the world.",
    image: "/images/booklet/crowd.jpg",
    body: [
      "Three days for visitors to get closer to the exhibits and entertainment. 300,000 visitors are expected, 60% Saudis and 40% from the rest of the world, spending an average of 2.5 hours on-site.",
      "Visitors get an exclusive first look at global premieres, production-ready electric vehicles (EVs), and futuristic concept cars.",
      "Host outdoor entertainment such as carting demonstrations, stunt driving shows, and motorcycle displays.",
      "Interactive exhibits feature virtual reality simulators, intelligent driving systems, and family-friendly or educational zones for younger visitors.",
      "Attendees can register to drive the newest models on closed tracks or local routes to test performance and comfort.",
    ],
  },
  {
    slug: "thematic-spaces-2026",
    tag: "Thematic Spaces",
    title: "New for 2026: Thematic Experience Zones",
    date: "November 2026",
    excerpt:
      "The curated zones will offer new high profile opportunities for brands to participate and showcase vehicles or technologies: Auto Display Lens, Audience Activation Spaces, Conversation Spaces.",
    image: "/images/booklet/tech-zone.jpg",
    body: [
      "This year, we're doing things a little differently. Step inside the exhibition hall to enter a world of cutting-edge technology, sleek designs, and mind-boggling innovation.",
      "The JIMS takes you on a curated journey through inspiring thematic spaces, promising an unmissable event for all passionate auto fans and beyond.",
      "The curated zones will offer new high profile opportunities for brands to participate and showcase vehicles or technologies. Within these zones, exhibitors and visitors will discover additional curated moments to inspire and connect.",
      "Bespoke packages upon request: Auto Display Lens, Audience Activation Spaces, Conversation Spaces.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
