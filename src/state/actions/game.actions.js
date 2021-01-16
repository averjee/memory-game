export const FLIP_UP = 'FLIP_UP';
export const RANDOMIZE = 'RANDOMIZE';
export const CHECK_MATCHED_PAIR = 'CHECK_MATCHED_PAIR';
export const MARK_PAIR_AS_MATCHED = 'MARK_PAIR_AS_MATCHED';
export const FLIP_DOWN_PAIR = 'FLIP_DOWN_PAIR';
export const INIT_GAME = 'INIT_GAME';
export const GENERATE_PAIRS = 'GENERATE_PAIRS';

export function initGame() {
  return { type: INIT_GAME };
}

export function flipDownPair(id1, id2) {
  return { type: FLIP_DOWN_PAIR, id1: id1, id2: id2 }
}
export function markPairAsMatched(id1, id2) {
  return { type: MARK_PAIR_AS_MATCHED, id1: id1, id2: id2 }
}

export function checkMatchedPair() {
  return { type: CHECK_MATCHED_PAIR };
}

export function flipUpCard(id) {
  return { type: FLIP_UP, id };
}

export function shuffleCards() {
  return { type: RANDOMIZE };
}

export function generatePairs(numPairs) {
  return { type: GENERATE_PAIRS, numPairs };
}