import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function GenresHubPage({ genres }) {
  /** Genre hub with links; renders nested routes under /genres/* via Outlet. */
  return (
    <main className="bw-container bw-page">
      <div className="bw-pageHeader">
        <h1 className="bw-h1">Genres</h1>
        <p className="bw-body">Browse curated shelves by genre and best seller lists.</p>
      </div>

      <div className="bw-genres" role="list" aria-label="Genre categories">
        {genres.map((g) => (
          <Link key={g.slug} to={`/genres/${g.slug}`} className="bw-genre" role="listitem">
            <div className="bw-genre__title">{g.name}</div>
            <div className="bw-genre__desc">{g.description}</div>
          </Link>
        ))}
      </div>

      <div className="bw-nested" aria-label="Genre listing">
        <Outlet />
      </div>
    </main>
  );
}
