/**
 * Mulberry32 seeded random number generator.
 * Produces deterministic, reproducible sequences given the same seed.
 * Both server and client will produce identical sequences.
 *
 * @param seed - 32-bit integer seed
 * @returns Function that returns random numbers [0, 1)
 */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0; // Convert to unsigned 32-bit

  return function nextRandom(): number {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a random 32-bit seed for the current request.
 * Call this on the server to create a seed that will be passed to the client.
 */
export function generateRequestSeed(): number {
  return Math.floor(Math.random() * (2 ** 32 - 1));
}
