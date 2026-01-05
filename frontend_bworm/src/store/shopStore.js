import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

const STORAGE_KEY = 'bworm.shop.v1';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function loadInitialState() {
  if (typeof window === 'undefined') return { wishlistIds: [], cartById: {} };
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  if (!parsed || typeof parsed !== 'object') return { wishlistIds: [], cartById: {} };
  return {
    wishlistIds: Array.isArray(parsed.wishlistIds) ? parsed.wishlistIds : [],
    cartById: parsed.cartById && typeof parsed.cartById === 'object' ? parsed.cartById : {}
  };
}

function persistState(state) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const ShopStoreContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const id = action.payload;
      const exists = state.wishlistIds.includes(id);
      const wishlistIds = exists ? state.wishlistIds.filter((x) => x !== id) : [...state.wishlistIds, id];
      return { ...state, wishlistIds };
    }
    case 'ADD_TO_CART': {
      const id = action.payload;
      const prev = state.cartById[id] || 0;
      return { ...state, cartById: { ...state.cartById, [id]: prev + 1 } };
    }
    case 'REMOVE_FROM_CART': {
      const id = action.payload;
      const prev = state.cartById[id] || 0;
      if (prev <= 1) {
        const next = { ...state.cartById };
        delete next[id];
        return { ...state, cartById: next };
      }
      return { ...state, cartById: { ...state.cartById, [id]: prev - 1 } };
    }
    case 'CLEAR_CART':
      return { ...state, cartById: {} };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function ShopStoreProvider({ children }) {
  /** Provides Wishlist and Cart state with localStorage persistence. */
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    persistState(state);
  }, [state]);

  const toggleWishlist = useCallback((bookId) => dispatch({ type: 'TOGGLE_WISHLIST', payload: bookId }), []);
  const addToCart = useCallback((bookId) => dispatch({ type: 'ADD_TO_CART', payload: bookId }), []);
  const removeFromCart = useCallback((bookId) => dispatch({ type: 'REMOVE_FROM_CART', payload: bookId }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const wishlistCount = state.wishlistIds.length;
  const cartCount = useMemo(
    () => Object.values(state.cartById).reduce((sum, qty) => sum + (Number(qty) || 0), 0),
    [state.cartById]
  );

  const value = useMemo(
    () => ({
      state,
      actions: { toggleWishlist, addToCart, removeFromCart, clearCart },
      derived: { wishlistCount, cartCount }
    }),
    [state, toggleWishlist, addToCart, removeFromCart, clearCart, wishlistCount, cartCount]
  );

  return <ShopStoreContext.Provider value={value}>{children}</ShopStoreContext.Provider>;
}

// PUBLIC_INTERFACE
export function useShopStore() {
  /** Hook to access shop store state/actions. */
  const ctx = useContext(ShopStoreContext);
  if (!ctx) throw new Error('useShopStore must be used within ShopStoreProvider');
  return ctx;
}
