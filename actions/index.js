import { getDecks, saveDeckTitle, deleteDeck, addCardToDeck } from "../utils/api";

export const FETCH_DECKS = 'FETCH_DECKS'
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

const fetchDecks = (decks) => {
    return {
        type: FETCH_DECKS,
        decks
    }
}

export const handleFetchDecks = () => {
    return async (dispatch) => {
        return getDecks().then((decks)=> dispatch(fetchDecks(decks)))
    }
} 

const addDeckTitle = (title) => {
    return {
        type: ADD_DECK_TITLE,
        title
    }
}

export const handleAddDeckTitle = (title) => {
    return async (dispatch) => {
        await saveDeckTitle(title)
        return dispatch(addDeckTitle(title))
    }
}

const addCard = (title, card) => {
    return {
        type: ADD_CARD_TO_DECK,
        title,
        card
    }
}

export const handleAddCard = (title, card)=>{
    return async (dispatch)=> {
        await addCardToDeck(title, card)
        return dispatch(addCard(title, card))
    }
}

export const handleDeleteDeck = (key) => {
    return async (dispatch) => {
        await deleteDeck(key)
        return dispatch(handleFetchDecks())
    }
}