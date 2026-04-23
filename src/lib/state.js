/**
 * Tiny reactive store — pub/sub with selective subscriptions.
 *
 *   const store = createStore({ design: 'aurora' });
 *   const unsub = store.subscribe('design', (next) => { ... });
 *   store.set('design', 'glass');      // notifies subscribers of 'design'
 *   store.get('design');
 *   store.all();                       // shallow copy of state
 *
 * Keys without subscribers cost nothing. Values are compared with Object.is
 * so setting the same value is a no-op.
 */

/**
 * @template {Record<string, unknown>} T
 * @param {T} initial
 */
export function createStore(initial) {
  const state = { ...initial };
  /** @type {Map<keyof T, Set<(v: unknown, prev: unknown) => void>>} */
  const listeners = new Map();

  /**
   * @template {keyof T} K
   * @param {K} key
   * @param {(next: T[K], prev: T[K]) => void} fn
   */
  function subscribe(key, fn) {
    let set = listeners.get(key);
    if (!set) listeners.set(key, (set = new Set()));
    set.add(fn);
    return () => set.delete(fn);
  }

  /**
   * @template {keyof T} K
   * @param {K} key
   * @param {T[K]} value
   */
  function set(key, value) {
    const prev = state[key];
    if (Object.is(prev, value)) return;
    state[key] = value;
    const set = listeners.get(key);
    if (set) for (const fn of set) fn(value, prev);
  }

  /**
   * @template {keyof T} K
   * @param {K} key
   */
  function get(key) {
    return state[key];
  }

  function all() {
    return { ...state };
  }

  return { subscribe, set, get, all };
}
