import shuffle from "shuffle-array";
import { MAX_PAIRS, generateCardSet, isUnique } from "../../Utils";
import * as Actions from "../actions/game.actions";

const initialState = {
  turnNo: 1,
  pairsFound: 0,
  numClicksWithinTurn: 0,
  firstCard: null,
  secondCard: null,
  finished: false,
  cards: generateCardSet()
};

function memoryCards(state = [], action) {
  switch (action.type) {
    case Actions.FLIP_UP:
      return state.map(card => {
        if (action.id === card.id) {
          return {
            ...card,
            imageUp: true
          };
        }
        return card;
      });

    case Actions.MARK_PAIR_AS_MATCHED:
      return state.map(card => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return {
            ...card,
            matched: true
          };
        }
        return card;
      });

    case Actions.FLIP_DOWN_PAIR:
      return state.map(card => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return {
            ...card,
            imageUp: false
          };
        }
        return card;
      });

    case Actions.RANDOMIZE:
      let newCards = [...state];
      newCards = shuffle(newCards);
      return newCards;

    default:
      return state;
  }
}

export default function game(state = initialState, action) {
  switch (action.type) {
    case Actions.INIT_GAME:
      return {
        ...initialState,
        cards: memoryCards(initialState.cards, Actions.shuffleCards())
      };

    case Actions.CHECK_MATCHED_PAIR:
      if ( state.numClicksWithinTurn === 2 && isUnique(state.firstCard, state.secondCard, state.cards)) {
        let pairsFound = state.pairsFound + 1;
        let finished = false;
        if (pairsFound === MAX_PAIRS) {
          finished = true;
        }
        return {
          ...state,
          pairsFound: pairsFound,
          turnNo: state.turnNo + 1,
          numClicksWithinTurn: 0,
          finished: finished,
          cards: memoryCards(
            state.cards,
            Actions.markPairAsMatched(state.firstCard, state.secondCard)
          )
        };
      } else if (state.numClicksWithinTurn === 2) {
        return {
          ...state,
          numClicksWithinTurn: 0,
          turnNo: state.turnNo + 1,
          cards: memoryCards(
            state.cards,
            Actions.flipDownPair(state.firstCard, state.secondCard)
          )
        };
      }
      return state;

    case Actions.FLIP_UP:
      if (state.numClicksWithinTurn === 2) {
        let s = game(state, Actions.checkMatchedPair());
        return game(s, Actions.flipUpCard(action.id));
      }

      let { imageUp, matched } = state.cards.find(x => x.id === action.id);
      if (imageUp || matched) {
        return state;
      }

      return {
        ...state,
        firstCard: state.numClicksWithinTurn === 0 ? action.id : state.firstCard,
        secondCard: state.numClicksWithinTurn !== 0 ? action.id : state.secondCard,
        numClicksWithinTurn: state.numClicksWithinTurn + 1,
        cards: memoryCards(state.cards, action)
      };

    case Actions.RANDOMIZE:
      return {
        ...state,
        cards: memoryCards(state.cards, action)
      };

    default:
      return state;
  }
}
