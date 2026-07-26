export interface Property {
  id: string
  name: string
  location: string
  coordinates: string
  price: string
  beds: number
  baths: number
  area: string
  image: string
}

export const properties: Property[] = [
  {
    id: 'p01',
    name: 'Villa Meridian',
    location: 'Malibu, California',
    coordinates: '34.0259° N / 118.7798° W',
    price: '$18,500,000',
    beds: 6,
    baths: 8,
    area: '11,200 sq ft',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p02',
    name: 'The Obsidian House',
    location: 'Aspen, Colorado',
    coordinates: '39.1911° N / 106.8175° W',
    price: '$24,900,000',
    beds: 7,
    baths: 9,
    area: '14,000 sq ft',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p03',
    name: 'Casa Del Sol',
    location: 'Lake Como, Italy',
    coordinates: '45.9860° N / 9.2572° E',
    price: '$32,000,000',
    beds: 8,
    baths: 10,
    area: '16,400 sq ft',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p04',
    name: 'Skyline Penthouse',
    location: 'Manhattan, New York',
    coordinates: '40.7128° N / 74.0060° W',
    price: '$21,750,000',
    beds: 5,
    baths: 6,
    area: '8,900 sq ft',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p05',
    name: 'Azure Point Estate',
    location: 'Cap Ferrat, France',
    coordinates: '43.6844° N / 7.3320° E',
    price: '$41,200,000',
    beds: 9,
    baths: 11,
    area: '19,000 sq ft',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p06',
    name: 'The Glass Pavilion',
    location: 'Kyoto, Japan',
    coordinates: '35.0116° N / 135.7681° E',
    price: '$15,300,000',
    beds: 4,
    baths: 5,
    area: '7,200 sq ft',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  },
]

export const testimonials = [
  {
    id: 't01',
    quote:
      'Every detail of the acquisition felt considered, from the first tour to closing. It genuinely changed how we think about buying property.',
    name: 'Isabelle Cross',
    role: 'Villa Meridian, Malibu',
  },
  {
    id: 't02',
    quote:
      'The presentation alone told us this house was different. We knew within the first ten minutes of the tour.',
    name: 'Marcus Feld',
    role: 'The Obsidian House, Aspen',
  },
  {
    id: 't03',
    quote:
      'A discreet, precise process that respected our time and our privacy at every stage of the negotiation.',
    name: 'Yuki Tanaka',
    role: 'The Glass Pavilion, Kyoto',
  },
]

export const stats = [
  { id: 's01', value: 412, suffix: '+', label: 'Estates Sold' },
  { id: 's02', value: 27, suffix: '', label: 'Countries' },
  { id: 's03', value: 98, suffix: '%', label: 'Client Retention' },
  { id: 's04', value: 6.2, suffix: 'B', label: 'Total Volume ($)', decimals: 1 },
]
