export interface HeritageSite {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
  location: string;
  highlights: string[];
}

export const HERITAGE_SITES: HeritageSite[] = [
  {
    id: "hundred-islands",
    imageSrc: "/hundred-islands.jpg",
    imageAlt: "Panoramic aerial view of Hundred Islands National Park surrounded by crystal clear turquoise waters, Alaminos",
    title: "Hundred Islands National Park",
    description:
      "One of the Philippines' oldest national parks, featuring 124 islands and islets in Lingayen Gulf. Explore hidden coves, snorkel vibrant reefs, and kayak through limestone formations off the coast of Alaminos City.",
    href: "/destinations/hundred-islands",
    location: "Alaminos City, Pangasinan",
    highlights: [
      "124 islands and islets across Lingayen Gulf",
      "Snorkeling and diving among vibrant coral reefs",
      "Kayaking through limestone rock formations",
      "Island hopping to Governor's, Quezon, and Children's Islands",
    ],
  },
  {
    id: "bolinao-lighthouse",
    imageSrc: "/bolinao_lighthouse.jpg",
    imageAlt: "Bolinao Lighthouse standing tall against a bright blue sky, Pangasinan",
    title: "Bolinao Lighthouse",
    description:
      "Built in 1905, the Bolinao Lighthouse is one of the tallest in the Philippines at 67 metres. Perched on dramatic sea cliffs, it offers sweeping panoramas of the South China Sea and the Bolinao coastline.",
    href: "/destinations/bolinao-lighthouse",
    location: "Patar, Bolinao, Pangasinan",
    highlights: [
      "One of the tallest lighthouses in the Philippines at 67 metres",
      "Built by the Spanish in 1905, still active today",
      "Panoramic clifftop views of the South China Sea",
      "Near Patar Beach, ideal for a sunset visit",
    ],
  },
  {
    id: "balungao-hot-spring",
    imageSrc: "/balungao-hot-spring.jpg",
    imageAlt: "Naturally heated mineral pools and cottages surrounded by lush greenery at Balungao Hot Spring",
    title: "Balungao Hot Spring",
    description:
      "Tucked in the foothills of Balungao, these naturally heated mineral pools are renowned for their therapeutic properties. Surrounded by verdant landscape, the spring is a peaceful retreat from the lowland heat.",
    href: "/destinations/balungao-hot-spring",
    location: "Barangay Buer, Balungao, Pangasinan",
    highlights: [
      "Naturally heated mineral pools at the foot of Mt. Balungao",
      "Believed therapeutic and skin-healing properties",
      "Cottages and picnic areas set in lush greenery",
      "A quiet nature escape away from the coast",
    ],
  },
];

export function getHeritageSiteById(id: string): HeritageSite | undefined {
  return HERITAGE_SITES.find((site) => site.id === id);
}
