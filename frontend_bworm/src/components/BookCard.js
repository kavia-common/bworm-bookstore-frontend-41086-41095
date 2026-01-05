import React, { useMemo, useState } from 'react';
import { useShopStore } from '../store/shopStore';

function bookTitleInitials(title) {
  if (!title) return '?';
  const words = title
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return `${words[0][0] || ''}${words[1][0] || ''}`.toUpperCase();
}

function formatPrice(price) {
  const p = Number(price);
  if (Number.isNaN(p)) return '₹—';
  return `₹${p}`;
}

function BookCardCover({ title, author, coverImageUrl }) {
  const [imageFailed, setImageFailed] = useState(false);

  const showImage = Boolean(coverImageUrl) && !imageFailed;
  const initials = useMemo(() => bookTitleInitials(title), [title]);

  return (
    <div className="bw-card__cover" aria-label={`Cover for ${title}`}>
      {showImage ? (
        <img
          className="bw-card__coverImg"
          src={coverImageUrl}
          alt={`Cover of ${title}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="bw-card__coverFallback" aria-hidden="true">
          <div className="bw-card__coverFallbackInitials">{initials}</div>
          <div className="bw-card__coverFallbackMeta">
            <div className="bw-card__coverTitle">{title}</div>
            <div className="bw-card__coverAuthor">{author}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export default function BookCard({ book }) {
  /** Renders a book card with Wishlist and Cart actions. */
  const { state, actions } = useShopStore();

  const inWishlist = state.wishlistIds.includes(book.id);
  const cartQty = state.cartById[book.id] || 0;

  return (
    <article className="bw-card bw-card--interactive" aria-label={`${book.title} by ${book.author}`}>
      <BookCardCover title={book.title} author={book.author} coverImageUrl={book.coverImageUrl} />

      <div className="bw-card__body">
        <div className="bw-card__titleRow">
          <div className="bw-card__title">{book.title}</div>
          <div className="bw-card__price" aria-label={`Price ${formatPrice(book.price)}`}>
            {formatPrice(book.price)}
          </div>
        </div>

        <div className="bw-card__meta">
          <span className="bw-card__author">{book.author}</span>
          <span className="bw-card__dot" aria-hidden="true">
            •
          </span>
          <span className="bw-card__tag">{book.tag}</span>
        </div>

        <div className="bw-card__actions" aria-label="Book actions">
          <button
            type="button"
            className={`bw-iconBtn ${inWishlist ? 'is-active' : ''}`}
            onClick={() => actions.toggleWishlist(book.id)}
            aria-pressed={inWishlist}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            title={inWishlist ? 'Wishlisted' : 'Wishlist'}
          >
            <span aria-hidden="true">♡</span>
            <span className="bw-iconBtn__label">Wishlist</span>
          </button>

          <button
            type="button"
            className="bw-btn bw-btn--primary bw-btn--compact"
            onClick={() => actions.addToCart(book.id)}
            aria-label="Add to cart"
          >
            Add to Cart{cartQty ? ` (${cartQty})` : ''}
          </button>
        </div>
      </div>
    </article>
  );
}
