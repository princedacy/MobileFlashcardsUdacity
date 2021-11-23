import AsyncStorage from "@react-native-async-storage/async-storage";

const decks = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    javascript: {
        title: 'Javascript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}


const DECKS_KEY = 'DECKS_KEY';


export const getDecks = async () => {
    const newDecks = await AsyncStorage.getItem(DECKS_KEY).then(JSON.parse);
    return newDecks === null
        ? await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
        : newDecks
};


export const getDeck = (id) => {
    return AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then((results) => results[id])
};


export const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({ [title]: { title, questions: [] } }))
}


export const addCardToDeck = async (title, card) => {
    const decks = await (await AsyncStorage.getItem(DECKS_KEY).then(JSON.parse);
    decks[title].questions.push(card);
    return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
};


export const deleteDeck = async (key) => {
    const results = await AsyncStorage.getItem(DECKS_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
}