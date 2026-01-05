import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';

/**
 * Ocean Professional minimalist theme:
 * - Primary: #374151
 * - Secondary: #9CA3AF
 * - Background: #FFFFFF
 * - Surface: #F9FAFB
 * - Text: #111827
 */

/**
 * Generates a new quote index that is not the same as the current index.
 * Uses a simple re-roll strategy which is sufficient for small lists.
 */
function nextNonRepeatingIndex(length, currentIndex) {
  if (length <= 1) return 0;
  let next = currentIndex;
  while (next === currentIndex) {
    next = Math.floor(Math.random() * length);
  }
  return next;
}

function Header() {
  return (
    <header className="bw-header">
      <div className="bw-header__inner">
        <Link to="/" className="bw-brand" aria-label="BWORM Home">
          <span className="bw-brand__mark">BWORM</span>
        </Link>

        <nav className="bw-nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `bw-nav__link ${isActive ? 'is-active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `bw-nav__link ${isActive ? 'is-active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => `bw-nav__link ${isActive ? 'is-active' : ''}`}>
            Search
          </NavLink>
          <NavLink to="/trending" className={({ isActive }) => `bw-nav__link ${isActive ? 'is-active' : ''}`}>
            Trending
          </NavLink>
          <NavLink to="/auth" className={({ isActive }) => `bw-nav__link bw-nav__link--cta ${isActive ? 'is-active' : ''}`}>
            Sign In / Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bw-footer">
      <div className="bw-container bw-footer__inner">
        <div className="bw-footer__brand">
          <div className="bw-footer__logo">BWORM</div>
          <div className="bw-footer__tagline">A minimalist home for book lovers.</div>
        </div>

        <nav className="bw-footer__links" aria-label="Footer">
          <Link to="/contact" className="bw-footer__link">
            Contact Us
          </Link>
          <Link to="/about" className="bw-footer__link">
            About Us
          </Link>
          <Link to="/infringement" className="bw-footer__link">
            Infringement
          </Link>
        </nav>
      </div>
    </footer>
  );
}

function BookCard({ book }) {
  return (
    <article className="bw-card" aria-label={`${book.title} by ${book.author}`}>
      <div className="bw-card__cover" aria-hidden="true">
        <div className="bw-card__coverInner">
          <div className="bw-card__coverTitle">{book.title}</div>
          <div className="bw-card__coverAuthor">{book.author}</div>
        </div>
      </div>

      <div className="bw-card__body">
        <div className="bw-card__title">{book.title}</div>
        <div className="bw-card__meta">
          <span className="bw-card__author">{book.author}</span>
          <span className="bw-card__dot" aria-hidden="true">
            •
          </span>
          <span className="bw-card__tag">{book.tag}</span>
        </div>
      </div>
    </article>
  );
}

function SectionHeader({ title, to }) {
  return (
    <div className="bw-sectionHeader">
      <h2 className="bw-h2">{title}</h2>
      <Link to={to} className="bw-link" aria-label={`See all ${title}`}>
        See all <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

function Genres({ genres }) {
  return (
    <section className="bw-section" aria-label="Genres">
      <div className="bw-sectionHeader">
        <h2 className="bw-h2">Browse by Genre</h2>
        <span className="bw-sectionHeader__hint">Find your next read</span>
      </div>

      <div className="bw-genres" role="list">
        {genres.map((g) => (
          <Link key={g.slug} to={`/genre/${g.slug}`} className="bw-genre" role="listitem">
            <div className="bw-genre__title">{g.name}</div>
            <div className="bw-genre__desc">{g.description}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WelcomeHero({ quote }) {
  return (
    <section className="bw-hero" aria-label="Welcome">
      <div className="bw-container bw-hero__inner">
        <div className="bw-hero__copy">
          <h1 className="bw-h1">Welcome to BWORM</h1>
          <p className="bw-subtitle">A calm, curated bookstore for readers who love the craft of stories.</p>

          <div className="bw-quote" aria-live="polite">
            <div className="bw-quote__label">Today’s bookish thought</div>
            <div className="bw-quote__text">“{quote}”</div>
          </div>

          <div className="bw-hero__actions">
            <Link to="/search" className="bw-btn bw-btn--primary">
              Search books
            </Link>
            <Link to="/trending" className="bw-btn bw-btn--ghost">
              Explore trending
            </Link>
          </div>
        </div>

        <div className="bw-hero__panel" aria-hidden="true">
          <div className="bw-hero__panelTitle">Minimal. Modern. Book-first.</div>
          <div className="bw-hero__panelGrid">
            <div className="bw-miniStat">
              <div className="bw-miniStat__value">Trending</div>
              <div className="bw-miniStat__label">Fresh picks updated often</div>
            </div>
            <div className="bw-miniStat">
              <div className="bw-miniStat__value">Global</div>
              <div className="bw-miniStat__label">Best sellers worldwide</div>
            </div>
            <div className="bw-miniStat">
              <div className="bw-miniStat__value">Genres</div>
              <div className="bw-miniStat__label">Fiction to thrillers</div>
            </div>
            <div className="bw-miniStat">
              <div className="bw-miniStat__value">Fast</div>
              <div className="bw-miniStat__label">Simple browsing experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ quote, trendingBooks, bestSellers, genres }) {
  return (
    <main>
      <WelcomeHero quote={quote} />

      <section className="bw-section" aria-label="Trending Books">
        <div className="bw-container">
          <SectionHeader title="Trending Books" to="/trending" />
          <div className="bw-grid">
            {trendingBooks.slice(0, 6).map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="bw-section bw-section--alt" aria-label="International Best Sellers">
        <div className="bw-container">
          <SectionHeader title="International Best Sellers" to="/best-sellers" />
          <div className="bw-grid">
            {bestSellers.slice(0, 6).map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      </section>

      <div className="bw-container">
        <Genres genres={genres} />
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="bw-container bw-page">
      <h1 className="bw-h1">About BWORM</h1>
      <p className="bw-body">
        BWORM is a minimalist bookstore experience built for browsing, discovering, and falling in love with books again.
        This demo uses mocked data and simple routes—no external services required yet.
      </p>

      <div className="bw-callout">
        <div className="bw-callout__title">What’s next?</div>
        <div className="bw-callout__body">
          Search enhancements, category pages with filters, and sign-in integration can be added once backend and auth are
          wired up.
        </div>
      </div>
    </main>
  );
}

function SearchPage({ trendingBooks, bestSellers }) {
  const [query, setQuery] = useState('');
  const dataset = useMemo(() => [...trendingBooks, ...bestSellers], [trendingBooks, bestSellers]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return dataset.filter((b) => `${b.title} ${b.author} ${b.tag}`.toLowerCase().includes(q)).slice(0, 12);
  }, [dataset, query]);

  return (
    <main className="bw-container bw-page">
      <h1 className="bw-h1">Search</h1>
      <p className="bw-body">Type a title, author, or tag. (Mock search over sample books.)</p>

      <div className="bw-search">
        <label className="bw-label" htmlFor="search-input">
          Search books
        </label>
        <input
          id="search-input"
          className="bw-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., thriller, Murakami, business..."
        />
      </div>

      {query.trim() ? (
        <section className="bw-section bw-section--tight" aria-label="Search results">
          <div className="bw-sectionHeader">
            <h2 className="bw-h2">Results</h2>
            <span className="bw-sectionHeader__hint">{results.length} found</span>
          </div>
          {results.length ? (
            <div className="bw-grid">
              {results.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          ) : (
            <div className="bw-empty">No matches. Try a different keyword.</div>
          )}
        </section>
      ) : (
        <div className="bw-empty">Start typing to search the sample catalog.</div>
      )}
    </main>
  );
}

function TrendingPage({ trendingBooks }) {
  return (
    <main className="bw-container bw-page">
      <div className="bw-pageHeader">
        <h1 className="bw-h1">Trending</h1>
        <p className="bw-body">A quick snapshot of what readers are picking up right now.</p>
      </div>

      <div className="bw-grid">
        {trendingBooks.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </main>
  );
}

function BestSellersPage({ bestSellers }) {
  return (
    <main className="bw-container bw-page">
      <div className="bw-pageHeader">
        <h1 className="bw-h1">International Best Sellers</h1>
        <p className="bw-body">Popular picks from around the world (mocked data).</p>
      </div>

      <div className="bw-grid">
        {bestSellers.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </main>
  );
}

function GenrePage({ genres, trendingBooks, bestSellers }) {
  const params = useParams();
  const navigate = useNavigate();
  const genre = genres.find((g) => g.slug === params.slug);

  // Simple mocked mapping: use tags/labels to pick a subset.
  const dataset = useMemo(() => [...trendingBooks, ...bestSellers], [trendingBooks, bestSellers]);
  const books = useMemo(() => {
    if (!genre) return [];
    const key = genre.name.toLowerCase();
    return dataset
      .filter((b) => (b.genre || '').toLowerCase().includes(key) || (b.tag || '').toLowerCase().includes(key))
      .slice(0, 12);
  }, [dataset, genre]);

  if (!genre) {
    return (
      <main className="bw-container bw-page">
        <h1 className="bw-h1">Genre not found</h1>
        <p className="bw-body">That category doesn’t exist in the mocked list.</p>
        <button type="button" className="bw-btn bw-btn--primary" onClick={() => navigate('/')}>
          Back to home
        </button>
      </main>
    );
  }

  return (
    <main className="bw-container bw-page">
      <div className="bw-pageHeader">
        <h1 className="bw-h1">{genre.name}</h1>
        <p className="bw-body">{genre.description}</p>
      </div>

      {books.length ? (
        <div className="bw-grid">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      ) : (
        <div className="bw-empty">No mocked books mapped to this genre yet.</div>
      )}
    </main>
  );
}

function PlaceholderPage({ title, description }) {
  return (
    <main className="bw-container bw-page">
      <h1 className="bw-h1">{title}</h1>
      <p className="bw-body">{description}</p>
      <div className="bw-callout">
        <div className="bw-callout__title">Note</div>
        <div className="bw-callout__body">This is a placeholder view for now—no backend/services required.</div>
      </div>
    </main>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Note: Env vars exist but may be empty; this step avoids relying on them.
   */

  const quotes = useMemo(
    () => [
      'Books are uniquely portable magic.',
      'A room without books is like a body without a soul.',
      'Once you learn to read, you will be forever free.',
      'There is no friend as loyal as a book.',
      'Books are a refuge, a sort of cloistered retreat.',
      'Reading is dreaming with open eyes.',
      'Some books leave us free and some books make us free.',
      'We read to know we are not alone.',
      'If you don’t like to read, you haven’t found the right book.',
      'So many books, so little time.'
    ],
    []
  );

  const trendingBooks = useMemo(
    () => [
      { id: 't1', title: 'The Silent Patient', author: 'Alex Michaelides', tag: 'Thriller', genre: 'Crime & Thriller' },
      { id: 't2', title: 'Atomic Habits', author: 'James Clear', tag: 'Self-Help', genre: 'Non-Fiction' },
      { id: 't3', title: 'The Alchemist', author: 'Paulo Coelho', tag: 'Classic', genre: 'Fiction' },
      { id: 't4', title: 'Ikigai', author: 'Héctor García', tag: 'Wellness', genre: 'Non-Fiction' },
      { id: 't5', title: 'The Girl on the Train', author: 'Paula Hawkins', tag: 'Suspense', genre: 'Crime & Thriller' },
      { id: 't6', title: 'Sapiens', author: 'Yuval Noah Harari', tag: 'History', genre: 'Non-Fiction' },
      { id: 't7', title: 'Norwegian Wood', author: 'Haruki Murakami', tag: 'Literary', genre: 'Fiction' }
    ],
    []
  );

  const bestSellers = useMemo(
    () => [
      { id: 'b1', title: 'Where the Crawdads Sing', author: 'Delia Owens', tag: 'Fiction', genre: 'Fiction' },
      { id: 'b2', title: 'Educated', author: 'Tara Westover', tag: 'Memoir', genre: 'Non-Fiction' },
      { id: 'b3', title: 'Becoming', author: 'Michelle Obama', tag: 'Biography', genre: 'Non-Fiction' },
      { id: 'b4', title: 'The Kite Runner', author: 'Khaled Hosseini', tag: 'Fiction', genre: 'Fiction' },
      { id: 'b5', title: 'The Da Vinci Code', author: 'Dan Brown', tag: 'Mystery', genre: 'Crime & Thriller' },
      { id: 'b6', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', tag: 'Business', genre: 'Non-Fiction' },
      { id: 'b7', title: 'The Midnight Library', author: 'Matt Haig', tag: 'Fiction', genre: 'Fiction' }
    ],
    []
  );

  const genres = useMemo(
    () => [
      { slug: 'fiction', name: 'Fiction', description: 'Novels, stories, and imaginative worlds.' },
      { slug: 'non-fiction', name: 'Non-Fiction', description: 'Ideas, history, memoirs, and practical reads.' },
      { slug: 'indian-best-sellers', name: 'Indian Best Sellers', description: 'Beloved picks from Indian authors and readers.' },
      { slug: 'international-best-sellers', name: 'International Best Sellers', description: 'Global favorites and chart-toppers.' },
      { slug: 'crime-thriller', name: 'Crime & Thriller', description: 'Mystery, suspense, and page-turners.' },
      { slug: 'business', name: 'Business', description: 'Work, productivity, and leadership.' }
    ],
    []
  );

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotating quotes: change every 3–5 seconds without immediate repeats.
  useEffect(() => {
    const minMs = 3000;
    const maxMs = 5000;

    let timeoutId;

    const scheduleNext = () => {
      const delay = Math.floor(minMs + Math.random() * (maxMs - minMs));
      timeoutId = window.setTimeout(() => {
        setQuoteIndex((prev) => nextNonRepeatingIndex(quotes.length, prev));
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [quotes.length]);

  return (
    <div className="App bw-appShell">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage quote={quotes[quoteIndex]} trendingBooks={trendingBooks} bestSellers={bestSellers} genres={genres} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage trendingBooks={trendingBooks} bestSellers={bestSellers} />} />
        <Route path="/trending" element={<TrendingPage trendingBooks={trendingBooks} />} />
        <Route path="/best-sellers" element={<BestSellersPage bestSellers={bestSellers} />} />
        <Route path="/genre/:slug" element={<GenrePage genres={genres} trendingBooks={trendingBooks} bestSellers={bestSellers} />} />

        <Route path="/auth" element={<PlaceholderPage title="Sign In / Login" description="Authentication UI placeholder." />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Us" description="Contact page placeholder." />} />
        <Route path="/infringement" element={<PlaceholderPage title="Infringement" description="Infringement policy placeholder." />} />

        <Route path="*" element={<PlaceholderPage title="Page not found" description="The page you’re looking for doesn’t exist." />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
