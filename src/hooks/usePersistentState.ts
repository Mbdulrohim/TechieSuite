import { useEffect, useState } from 'react';

/**
 * `useState`, mirrored into `localStorage`.
 *
 * Same call signature and return shape as `useState` — swap it in, add a key,
 * and nothing else about the call site changes:
 *
 *   const [cart, setCart] = usePersistentState<CartItem[]>('techiebase.cart', []);
 *
 * An optional third argument guards the parsed value — see `isValid` below.
 *
 * Storage is treated as a nicety, never as a source of truth. Every read and
 * write is wrapped, following `readJoined` in `WaitlistTeaser.tsx`:
 *
 *   - SSR / no `window` -> fall back to the initial value, write nothing.
 *   - Private browsing throws on `localStorage` access -> the app keeps working
 *     in memory for the session.
 *   - Malformed or stale JSON left by an older build -> the bad entry is
 *     discarded and the initial value is used instead.
 *
 * NOTE ON SHAPE DRIFT: this hook validates that stored JSON *parses*, not that
 * it still matches `T`. Anything richer than a primitive — the cart, which
 * stores whole `Product` objects — can rehydrate holding a product that has
 * since changed price or left the catalogue. Reconcile against the live
 * catalogue at the call site; see the note at the bottom of this file.
 */

/** Matches `useState`: a value, or a function producing one. */
type Initialiser<T> = T | (() => T);

/** Structurally identical to React's `Dispatch<SetStateAction<T>>`. */
type SetPersistentState<T> = (next: T | ((previous: T) => T)) => void;

const resolve = <T,>(initial: Initialiser<T>): T =>
  typeof initial === 'function' ? (initial as () => T)() : initial;

const hasStorage = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    // Touching the property is itself enough to throw in locked-down browsers.
    return Boolean(window.localStorage);
  } catch {
    return false;
  }
};

/** Reads and parses `key`, or returns the initial value for any reason at all. */
function readStored<T>(key: string, initial: Initialiser<T>, isValid?: (value: unknown) => boolean): T {
  if (!hasStorage()) return resolve(initial);

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return resolve(initial);

    const parsed: unknown = JSON.parse(raw);

    // Parsing is not the same as matching `T`. `null` would sail straight
    // through and blow up the first `.map()`, so it is rejected outright, and
    // callers can supply a stronger guard.
    if (parsed === null || parsed === undefined) return resolve(initial);
    if (isValid && !isValid(parsed)) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Ignore — the stale value is already being discarded in memory.
      }
      return resolve(initial);
    }

    return parsed as T;
  } catch {
    // Unreadable storage, or JSON left by an older build that no longer
    // parses. Drop it and start from the initial value.
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Nothing further to try — the value simply will not persist.
    }
    return resolve(initial);
  }
}

/**
 * @param key      localStorage key. Version it (`…​.v1`) if the shape may change.
 * @param initial  Value, or a lazy initialiser, exactly as `useState` takes.
 * @param isValid  Optional guard run against the *parsed* stored value. A
 *                 generic hook cannot check `T` at runtime, so pass one for
 *                 anything structural — `Array.isArray` is enough for the cart
 *                 and the wishlist. A value that fails is discarded.
 */
export function usePersistentState<T>(
  key: string,
  initial: Initialiser<T>,
  isValid?: (value: unknown) => boolean
): [T, SetPersistentState<T>] {
  // Lazy: storage is read once on mount, not on every render. `initial` and
  // `isValid` are deliberately not in any dependency array, so inline arguments
  // (`usePersistentState('k', [], Array.isArray)`) are harmless.
  const [value, setValue] = useState<T>(() => readStored(key, initial, isValid));

  useEffect(() => {
    if (!hasStorage()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded, or private browsing. The value still lives in React
      // state for this session, which is the important half.
    }
  }, [key, value]);

  // `setValue` is already referentially stable, so it is returned as-is —
  // callers can depend on it exactly as they would a `useState` setter.
  return [value, setValue];
}

/**
 * Convenience: clears a persisted key without touching component state.
 * Useful after checkout, where the cart should not come back on refresh.
 */
export function clearPersistentState(key: string): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing to do.
  }
}

/* ---------------------------------------------------------------------------
 * STALE REHYDRATED PRODUCTS — deliberately NOT handled here.
 *
 * `CartItem` embeds a full `Product`. A cart written last month can rehydrate
 * with a product that has been repriced, gone out of stock, or been removed
 * from `PRODUCTS` altogether — and the drawer would happily total it at the old
 * price. The hook cannot fix this: it is generic and knows nothing about the
 * catalogue.
 *
 * Reconcile in `App.tsx`, once, right after the state is created. Sketch:
 *
 *   const [cart, setCart] = usePersistentState<CartItem[]>(
 *     'techiebase.cart.v1', [], Array.isArray,
 *   );
 *
 *   // Runs once, on mount, so returning a fresh array cannot loop.
 *   useEffect(() => {
 *     setCart((prev) =>
 *       prev.flatMap((item) => {
 *         const live = PRODUCTS.find((p) => p.id === item.product.id);
 *         if (!live) return [];                  // delisted -> drop the line
 *         return [{ ...item, product: live }];   // otherwise re-point at live data
 *       }),
 *     );
 *   }, []);
 *
 * Points worth deciding before you wire it:
 *   - Always replace the stored `product` with the live one, never merge. The
 *     catalogue is the price of record.
 *   - Also re-resolve `selectedColor` / `selectedStorage` by name/capacity
 *     against the live product; a discontinued 1TB option should fall back to
 *     the first available one, or drop the line.
 *   - Compare `item.product.price` against `live.price` before overwriting if
 *     you want to tell the shopper "the price of this item changed" — that is a
 *     nicer experience than a silent total change, and cheap to add here.
 *   - Persist a schema version alongside the cart (e.g. key
 *     `techiebase.cart.v1`) so a future change to `CartItem` can invalidate old
 *     carts by bumping the key rather than writing a migration.
 * ------------------------------------------------------------------------- */
