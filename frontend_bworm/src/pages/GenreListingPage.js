import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ListingPage from './ListingPage';
import { getBooksForCategory } from '../data/catalog';

// PUBLIC_INTERFACE
export default function GenreListingPage({ genres }) {
  /** Renders a genre-specific listing at /genres/:slug. */
  const params = useParams();
  const navigate = useNavigate();
  const slug = params.slug;

  const genre = useMemo(() => genres.find((g) => g.slug === slug), [genres, slug]);
  const books = useMemo(() => getBooksForCategory({ category: slug }), [slug]);

  if (!genre) {
    return (
      <section className="bw-nested__panel">
        <h2 className="bw-h2">Genre not found</h2>
        <p className="bw-body">That category doesn’t exist in the current mocked list.</p>
        <button type="button" className="bw-btn bw-btn--primary" onClick={() => navigate('/genres')}>
          Back to genres
        </button>
      </section>
    );
  }

  return (
    <ListingPage
      title={genre.name}
      description={genre.description}
      books={books}
      pageSize={9}
    />
  );
}
