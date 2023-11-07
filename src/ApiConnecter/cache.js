// cache.js
const cache = new Map();

export function cacheRequest(key, data) {
  cache.set(key, data);
}

export function getCachedData(key) {
  return cache.get(key);
}
