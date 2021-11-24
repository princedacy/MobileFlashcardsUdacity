import { ADD_DECK_TITLE, ADD_CARD_TO_DECK, FETCH_DECKS } from "../actions";

const decks = (state={}, action) => {
    switch(action.type) {
        case FETCH_DECKS:
            return {
                ...action.decks
            };
        case ADD_DECK_TITLE: 
            return {
                ...state,
                [action.title]: {title: action.title, questions: []}
            };
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat(action.card)
                }
            };
        default:
            return state;
    }
}

export default decks