
import { createStore } from 'redux'
import game from './state/reducers/game.reducer'
import { checkMatchedPair, flipUpCard } from './state/actions/game.actions';
import { MAX_PAIRS, getCard } from './Utils';

test('Check total number of cards in the games is equal to 12', () => {
    const store = createStore(game);
    const state = store.getState();
    expect(state.cards.length).toBe(MAX_PAIRS * 2);
});

test('Test that flipUpCard function turns image up', () => {
    const store = createStore(game);
    expect(getCard(1, store.getState().cards).imageUp).toBe(false);
    store.dispatch(flipUpCard(1));
    expect(getCard(1, store.getState().cards).imageUp).toBe(true);
});

test('Test that 3rd card flip checks for matches on previous cards and that the 3rd flip is valid', () => {
    const store = createStore(game);
    store.dispatch(flipUpCard(1));
    store.dispatch(flipUpCard(2));
    store.dispatch(flipUpCard(3));
    // the 3rd flip should trigger match check on previous cards
    expect(getCard(1, store.getState().cards).matched).toBe(true);
    expect(getCard(2, store.getState().cards).matched).toBe(true);
    // and flipping the 3rd card was valid
    expect(getCard(1, store.getState().cards).imageUp).toBe(true);
});

test('Test that pair is found after flipping two cards with same image', () => {
    const store = createStore(game);
    expect(store.getState().pairsFound).toBe(0);
    // flip the first card
    store.dispatch(flipUpCard(1));
    store.dispatch(checkMatchedPair());
    expect(store.getState().pairsFound).toBe(0);

    // flip the second card (should have same image as the first card)
    store.dispatch(flipUpCard(2));
    store.dispatch(checkMatchedPair());
    expect(store.getState().pairsFound).toBe(1);
    expect(getCard(1, store.getState().cards).matched).toBe(true);
    expect(getCard(2, store.getState().cards).matched).toBe(true);
    expect(getCard(1, store.getState().cards).image).toBe(getCard(1, store.getState().cards).image);
});

test('Test that pair is not found after flipping two cards with different images', () => {
    const store = createStore(game);
    expect(store.getState().pairsFound).toBe(0);
    store.dispatch(flipUpCard(1));
    store.dispatch(flipUpCard(3));
    store.dispatch(checkMatchedPair());
    expect(store.getState().pairsFound).toBe(0);
    expect(getCard(1, store.getState().cards).image).not.toBe(getCard(3, store.getState().cards).image);
});

test('Test that the game is completed after all pairs are found', () => {
    const store = createStore(game);
    expect(store.getState().finished).toBe(false);

    // Flip the first 5 pairs
    // Should not complete the game
    for (let id = 1; id <= 10; id = id + 2) {
        store.dispatch(flipUpCard(id));
        store.dispatch(flipUpCard(id + 1));
        store.dispatch(checkMatchedPair());
        expect(store.getState().finished).toBe(false);
    }

    // Flip the last pair of cards
    // Should complete the game
    store.dispatch(flipUpCard(11));
    store.dispatch(flipUpCard(12));
    store.dispatch(checkMatchedPair());
    expect(store.getState().finished).toBe(true);
});

test('Test that turnNo function is updated', () => {
    const store = createStore(game);
    expect(store.getState().turnNo).toBe(1);

    // Flip some cards and check that turnNo is updated
    let turnNo = 1;
    for (let id = 1; id <= 10; id = id + 2) {
        store.dispatch(flipUpCard(id));
        store.dispatch(flipUpCard(id + 1));
        store.dispatch(checkMatchedPair());
        turnNo++;
        expect(store.getState().turnNo).toBe(turnNo);
    }
});

