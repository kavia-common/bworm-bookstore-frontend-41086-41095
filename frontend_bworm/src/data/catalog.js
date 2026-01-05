const ALLOWED_PRICES = [179, 199, 239, 249];

/**
 * Picks a stable-but-varied price from the allowed set based on a string seed.
 * This keeps prices deterministic on initial load while ensuring the catalog
 * isn't monotonically increasing/decreasing.
 */
function priceFromSeed(seed) {
  const str = String(seed || '');
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) % 1000000007;
  }
  return ALLOWED_PRICES[hash % ALLOWED_PRICES.length];
}

/**
 * Normalizes a book object to ensure required fields exist and price is in range.
 */
function normalizeBook(book) {
  const id = book.id || `${book.title}-${book.author}`.toLowerCase().replace(/\s+/g, '-');
  return {
    id,
    title: book.title,
    author: book.author,
    tag: book.tag || 'Book',
    genreSlug: book.genreSlug || 'fiction',
    coverImageUrl: book.coverImageUrl || '',
    // Ensure every book has a price in the required range.
    price: typeof book.price === 'number' ? book.price : priceFromSeed(id),
    // Optional metadata
    description: book.description || ''
  };
}

// Expanded Trending catalog (prices will be normalized)
export const trendingBooks = [
  {
    id: 't1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    tag: 'Thriller',
    genreSlug: 'crime-thriller',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg'
  },
  {
    id: 't2',
    title: 'Atomic Habits',
    author: 'James Clear',
    tag: 'Self-Help',
    genreSlug: 'non-fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'
  },
  {
    id: 't3',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    tag: 'Classic',
    genreSlug: 'fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg'
  },
  {
    id: 't4',
    title: 'Ikigai',
    author: 'Héctor García',
    tag: 'Wellness',
    genreSlug: 'non-fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg'
  },
  {
    id: 't5',
    title: 'The Girl on the Train',
    author: 'Paula Hawkins',
    tag: 'Suspense',
    genreSlug: 'crime-thriller',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781594633669-L.jpg'
  },
  {
    id: 't6',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    tag: 'History',
    genreSlug: 'non-fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780062316110-L.jpg'
  },
  {
    id: 't7',
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    tag: 'Literary',
    genreSlug: 'fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780375704024-L.jpg'
  },
  // Added items
  {
    id: 't8',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    tag: 'Personal Finance',
    genreSlug: 'non-fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg',
    price: 159
  },
  {
    id: 't9',
    title: 'Dune',
    author: 'Frank Herbert',
    tag: 'Sci-Fi',
    genreSlug: 'fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg'
  },
  {
    id: 't10',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    tag: 'Mystery',
    genreSlug: 'crime-thriller',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780241988268-L.jpg',
    price: 200
  },
  {
    id: 't11',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    tag: 'Fiction',
    genreSlug: 'fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg'
  },
  {
    id: 't12',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    tag: 'Sci-Fi',
    genreSlug: 'fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg'
  },
  {
    id: 't13',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    tag: 'Fiction',
    genreSlug: 'fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg'
  },
  {
    id: 't14',
    title: 'Dark Matter',
    author: 'Blake Crouch',
    tag: 'Thriller',
    genreSlug: 'crime-thriller',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781101904220-L.jpg'
  },
  {
    id: 't15',
    title: 'Deep Work',
    author: 'Cal Newport',
    tag: 'Productivity',
    genreSlug: 'non-fiction',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg'
  }
].map(normalizeBook);

// Expanded International/Global best sellers
export const globalBestSellers = [
  {
    id: 'g1',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    tag: 'Fiction',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780735219090-L.jpg'
  },
  {
    id: 'g2',
    title: 'Educated',
    author: 'Tara Westover',
    tag: 'Memoir',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg'
  },
  {
    id: 'g3',
    title: 'Becoming',
    author: 'Michelle Obama',
    tag: 'Biography',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg'
  },
  {
    id: 'g4',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    tag: 'Fiction',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781594480003-L.jpg'
  },
  {
    id: 'g5',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    tag: 'Mystery',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg'
  },
  {
    id: 'g6',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    tag: 'Behavioral Science',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg'
  },
  {
    id: 'g7',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    tag: 'Fiction',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg'
  },
  // Added items
  {
    id: 'g8',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    tag: 'Young Adult',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg'
  },
  {
    id: 'g9',
    title: 'A Man Called Ove',
    author: 'Fredrik Backman',
    tag: 'Fiction',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781476738024-L.jpg',
    price: 159
  },
  {
    id: 'g10',
    title: 'The Book Thief',
    author: 'Markus Zusak',
    tag: 'Historical Fiction',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780375831003-L.jpg'
  },
  {
    id: 'g11',
    title: 'The Martian',
    author: 'Andy Weir',
    tag: 'Sci-Fi',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg'
  },
  {
    id: 'g12',
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    tag: 'Business',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg',
    price: 200
  },
  {
    id: 'g13',
    title: 'Pachinko',
    author: 'Min Jin Lee',
    tag: 'Fiction',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781455563920-L.jpg'
  },
  {
    id: 'g14',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    tag: 'Fantasy',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg'
  },
  {
    id: 'g15',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    tag: 'Classic',
    genreSlug: 'international-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780156013987-L.jpg'
  }
].map(normalizeBook);

// Genre hub config + mapping.
// These slugs are required by the user: /genres/fiction, /genres/non-fiction, /genres/indian-best-sellers,
// /genres/international-best-sellers, /genres/crime-thriller
export const genres = [
  { slug: 'fiction', name: 'Fiction', description: 'Novels, stories, and imaginative worlds.' },
  { slug: 'non-fiction', name: 'Non-Fiction', description: 'Ideas, history, memoirs, and practical reads.' },
  { slug: 'indian-best-sellers', name: 'Indian Best Sellers', description: 'Beloved picks from Indian authors and readers.' },
  { slug: 'international-best-sellers', name: 'International Best Sellers', description: 'Global favorites and chart-toppers.' },
  { slug: 'crime-thriller', name: 'Crime & Thriller', description: 'Mystery, suspense, and page-turners.' }
];

// A small mocked "Indian Best Sellers" set to populate the required genre route.
export const indianBestSellers = [
  {
    id: 'i1',
    title: 'The White Tiger',
    author: 'Aravind Adiga',
    tag: 'Fiction',
    genreSlug: 'indian-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781416562603-L.jpg'
  },
  {
    id: 'i2',
    title: 'The Palace of Illusions',
    author: 'Chitra Banerjee Divakaruni',
    tag: 'Mythology',
    genreSlug: 'indian-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780330458535-L.jpg'
  },
  {
    id: 'i3',
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    tag: 'Fiction',
    genreSlug: 'indian-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780679457312-L.jpg'
  },
  {
    id: 'i4',
    title: 'Train to Pakistan',
    author: 'Khushwant Singh',
    tag: 'Classic',
    genreSlug: 'indian-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780143065883-L.jpg'
  },
  {
    id: 'i5',
    title: 'The Immortals of Meluha',
    author: 'Amish Tripathi',
    tag: 'Fantasy',
    genreSlug: 'indian-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9789380658742-L.jpg'
  },
  {
    id: 'i6',
    title: 'I Too Had a Love Story',
    author: 'Ravinder Singh',
    tag: 'Romance',
    genreSlug: 'indian-best-sellers',
    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780143418764-L.jpg'
  }
].map(normalizeBook);

/**
 * Builds the full catalog list, deduping by id.
 */
export function getAllBooks() {
  const all = [...trendingBooks, ...globalBestSellers, ...indianBestSellers];
  const seen = new Set();
  const deduped = [];
  for (const b of all) {
    if (!seen.has(b.id)) {
      seen.add(b.id);
      deduped.push(b);
    }
  }
  return deduped;
}

/**
 * Returns books for a given category/route.
 */
export function getBooksForCategory({ category }) {
  switch (category) {
    case 'trending':
      return trendingBooks;
    case 'global':
    case 'international':
      return globalBestSellers;
    case 'indian-best-sellers':
      return indianBestSellers;
    case 'international-best-sellers':
      return globalBestSellers;
    case 'fiction':
      return getAllBooks().filter((b) => b.genreSlug === 'fiction');
    case 'non-fiction':
      return getAllBooks().filter((b) => b.genreSlug === 'non-fiction');
    case 'crime-thriller':
      return getAllBooks().filter((b) => b.genreSlug === 'crime-thriller');
    default:
      return [];
  }
}
