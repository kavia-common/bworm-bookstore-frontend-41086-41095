import React, { useMemo, useState } from 'react';
import BookCard from '../components/BookCard';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// PUBLIC_INTERFACE
export default function ListingPage({ title, description, books, pageSize = 9 }) {
  /** Generic grid listing page with simple pagination. */
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil((books?.length || 0) / pageSize)), [books, pageSize]);
  const safePage = clamp(page, 1, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;
    return (books || []).slice(start, end);
  }, [books, safePage, pageSize]);

  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;

  return (
    <main className="bw-container bw-page">
      <div className="bw-pageHeader">
        <h1 className="bw-h1">{title}</h1>
        <p className="bw-body">{description}</p>
      </div>

      {pageItems.length ? (
        <>
          <div className="bw-grid">
            {pageItems.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>

          <div className="bw-pagination" aria-label="Pagination">
            <button
              type="button"
              className="bw-btn bw-btn--ghost bw-btn--compact"
              onClick={() => setPage((p) => clamp(p - 1, 1, totalPages))}
              disabled={!canPrev}
            >
              Prev
            </button>

            <div className="bw-pagination__meta" aria-live="polite">
              Page <strong>{safePage}</strong> of <strong>{totalPages}</strong>
            </div>

            <button
              type="button"
              className="bw-btn bw-btn--ghost bw-btn--compact"
              onClick={() => setPage((p) => clamp(p + 1, 1, totalPages))}
              disabled={!canNext}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="bw-empty">No books found for this category yet.</div>
      )}
    </main>
  );
}
