import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';

import BookCard from './components/BookCard';
import ListingPage from './pages/ListingPage';
import GenresHubPage from './pages/GenresHubPage';
import GenreListingPage from './pages/GenreListingPage';
import { ShopStoreProvider, useShopStore } from './store/shopStore';
import { genres, globalBestSellers, trendingBooks, getAllBooks } from './data/catalog';

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

          <NavLink to="/wishlist" className={({ isActive }) => `bw-nav__link ${isActive ? 'is-active' : ''}`}>
            Wishlist
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => `bw-nav__link ${isActive ? 'is-active' : ''}`}>
            Cart
          </NavLink>

          <NavLink
            to="/auth"
            className={({ isActive }) => `bw-nav__link bw-nav__link--cta ${isActive ? 'is-active' : ''}`}
          >
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

        <div className="bw-hero__panel">
          <div className="bw-hero__panelTitle">Minimal. Modern. Book-first.</div>

          <div className="bw-hero__filters" aria-label="Quick categories">
            <Link to="/trending" className="bw-hero__filter">
              Trending
            </Link>
            <Link to="/global" className="bw-hero__filter">
              Global
            </Link>
            <Link to="/genres" className="bw-hero__filter">
              Genres
            </Link>
            <Link to="/fast" className="bw-hero__filter">
              Fast
            </Link>
          </div>

          <div className="bw-hero__panelGrid" aria-hidden="true">
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

function HomePage({ quote }) {
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
          <SectionHeader title="International Best Sellers" to="/global" />
          <div className="bw-grid">
            {globalBestSellers.slice(0, 6).map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      </section>

      <div className="bw-container">
        <section className="bw-section" aria-label="Genres">
          <div className="bw-sectionHeader">
            <h2 className="bw-h2">Browse by Genre</h2>
            <Link to="/genres" className="bw-link" aria-label="Browse all genres">
              Browse all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="bw-genres" role="list">
            {genres.map((g) => (
              <Link key={g.slug} to={`/genres/${g.slug}`} className="bw-genre" role="listitem">
                <div className="bw-genre__title">{g.name}</div>
                <div className="bw-genre__desc">{g.description}</div>
              </Link>
            ))}
          </div>
        </section>
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
          Category pages, wishlist/cart persistence, and sign-in integration can be extended once backend and auth are wired
          up.
        </div>
      </div>
    </main>
  );
}

function SearchPage() {
  const [query, setQuery] = useState('');
  const dataset = useMemo(() => getAllBooks(), []);

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

function WishlistPage() {
  const { state } = useShopStore();
  const all = useMemo(() => getAllBooks(), []);
  const wishlisted = useMemo(() => all.filter((b) => state.wishlistIds.includes(b.id)), [all, state.wishlistIds]);

  return (
    <ListingPage
      title="Wishlist"
      description="Your saved reads. (Stored locally in this browser.)"
      books={wishlisted}
      pageSize={9}
    />
  );
}

function CartPage() {
  const { state, actions } = useShopStore();
  const all = useMemo(() => getAllBooks(), []);

  const cartItems = useMemo(() => {
    const byId = state.cartById || {};
    return Object.keys(byId)
      .map((id) => {
        const book = all.find((b) => b.id === id);
        if (!book) return null;
        return { book, qty: byId[id] };
      })
      .filter(Boolean);
  }, [all, state.cartById]);

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.book.price * item.qty, 0);
  }, [cartItems]);

  return (
    <main className="bw-container bw-page">
      <div className="bw-pageHeader">
        <h1 className="bw-h1">Cart</h1>
        <p className="bw-body">A lightweight cart (mocked checkout). Stored locally in this browser.</p>
      </div>

      {cartItems.length ? (
        <>
          <div className="bw-grid">
            {cartItems.map((item) => (
              <div key={item.book.id} className="bw-card">
                <div className="bw-card__body">
                  <div className="bw-card__titleRow">
                    <div className="bw-card__title">{item.book.title}</div>
                    <div className="bw-card__price">₹{item.book.price}</div>
                  </div>
                  <div className="bw-card__meta">
                    <span className="bw-card__author">{item.book.author}</span>
                    <span className="bw-card__dot" aria-hidden="true">
                      •
                    </span>
                    <span className="bw-card__tag">Qty {item.qty}</span>
                  </div>

                  <div className="bw-card__actions">
                    <button
                      type="button"
                      className="bw-btn bw-btn--ghost bw-btn--compact"
                      onClick={() => actions.removeFromCart(item.book.id)}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="bw-btn bw-btn--primary bw-btn--compact"
                      onClick={() => actions.addToCart(item.book.id)}
                    >
                      Add one more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bw-callout">
            <div className="bw-callout__title">Total: ₹{total}</div>
            <div className="bw-callout__body">
              This is a demo cart. Checkout is not implemented yet.
              <div style={{ marginTop: 10 }}>
                <button type="button" className="bw-btn bw-btn--ghost" onClick={actions.clearCart}>
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bw-empty">Your cart is empty. Add a book from any listing.</div>
      )}
    </main>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Application entry: provides routes, catalog browsing, and Wishlist/Cart store. */

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
    <ShopStoreProvider>
      <div className="App bw-appShell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage quote={quotes[quoteIndex]} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route
            path="/trending"
            element={
              <ListingPage
                title="Trending"
                description="A quick snapshot of what readers are picking up right now."
                books={trendingBooks}
                pageSize={9}
              />
            }
          />
          <Route
            path="/global"
            element={
              <ListingPage
                title="International / Global Best Sellers"
                description="Popular picks from around the world (mocked data)."
                books={globalBestSellers}
                pageSize={9}
              />
            }
          />
          <Route
            path="/international"
            element={
              <ListingPage
                title="International / Global Best Sellers"
                description="Popular picks from around the world (mocked data)."
                books={globalBestSellers}
                pageSize={9}
              />
            }
          />

          <Route
            path="/fast"
            element={
              <ListingPage
                title="Fast Browse"
                description="A simple grid of the full catalog for quick scanning."
                books={getAllBooks()}
                pageSize={12}
              />
            }
          />

          <Route path="/genres" element={<GenresHubPage genres={genres} />}>
            <Route
              index
              element={
                <section className="bw-nested__panel">
                  <h2 className="bw-h2">Pick a shelf</h2>
                  <p className="bw-body">Select a genre above to see all books in that category.</p>
                </section>
              }
            />
            <Route path=":slug" element={<GenreListingPage genres={genres} />} />
          </Route>

          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/auth" element={<PlaceholderPage title="Sign In / Login" description="Authentication UI placeholder." />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact Us" description="Contact page placeholder." />} />
          <Route path="/infringement" element={<PlaceholderPage title="Infringement" description="Infringement policy placeholder." />} />

          <Route path="*" element={<PlaceholderPage title="Page not found" description="The page you’re looking for doesn’t exist." />} />
        </Routes>
        <Footer />
      </div>
    </ShopStoreProvider>
  );
}

export default App;
