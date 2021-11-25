import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { white, pink } from '../utils/colors'
import TabNav from './tabNavigator'
import DeckDetails from '../components/DeckDetails'
import AddCard from '../components/AddCard'
import TakeQuiz from '../components/TakeQuiz'

const StackNavigatorConfig = {
    headerMode: 'screen'
}

const StackConfig = {
    TabNav: {
        name: 'Home',
        component: TabNav,
        options: {headerShown: false}
    },
    DeckDetails: {
        name: 'DeckDetails',
        component: DeckDetails,
        options: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: pink
            }
        }
    },
    AddCard: {
        name: 'AddCard',
        component: AddCard,
        options: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: pink
            },
            title: 'Add card'
        }
    },
    TakeQuiz: {
        name: 'TakeQuiz',
        component: TakeQuiz,
        options: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: pink
            }
        }
    }
}

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator {...StackNavigatorConfig}>
            <Stack.Screen {...StackConfig['TabNav']}/>
            <Stack.Screen {...StackConfig['DeckDetails']} options={({route})=>({
                ...StackConfig['DeckDetails'].options,
                title: route.params.title
            })}/>
            <Stack.Screen {...StackConfig['AddCard']}/>
            <Stack.Screen {...StackConfig['TakeQuiz']} options={({route})=> ({
                ...StackConfig['TakeQuiz'].options,
                title: route.params.deckId
            })}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator;