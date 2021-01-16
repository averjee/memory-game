export const MAX_PAIRS = 6;

export function generateCardSet() {
  let cards = [];
  let id=1;
  for(let i=1; i <= MAX_PAIRS; i++) {
    let card1 = {
      id: id,
      image : i,
      imageUp: false,
      matched: false
    };
    id++;
    let card2 = {
      id: id,
      image : i,
      imageUp: false,
      matched: false
    };
    cards = [
      ...cards,
      card1,
      card2
    ];
    id++;
  }

  return cards;
};

export function getCard(id, cards) {
  return cards.find(c => c.id === id)
}

export function isUnique(id1, id2, cards) {
  return true ? cards.find(x => x.id === id1).image === cards.find(x => x.id === id2).image : false;
}
