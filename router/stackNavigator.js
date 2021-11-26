import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { white, blue } from '../utils/colors'
import TabNav from './tabNavigator'
import DeckDetails from '../components/DeckDetail'
import AddCard from '../components/AddCard'
import TakeQuiz from '../components/TakeQuiz'

// const StackNavigatorConfig = {
//     headerMode: 'screen'
// }

const StackConfig = {
    TabNav: {
        name: 'Home',
        component: TabNav,
        options: {headerShown: false}
    },
    DeckDetails: {
        name: 'DeckDetails',
        component: DeckDetails,
        // screenOptions: {
        //     headerMode: 'screen',
        //     headerTintColor: white,
        //     headerStyle: {
        //         backgroundColor: blue
        //     }
        // }
    },
    AddCard: {
        name: 'AddCard',
        component: AddCard,
        options: {
            // headerTintColor: white,
            // headerStyle: {
            //     backgroundColor: blue
            // },
            title: 'Add card'
        }
    },
    TakeQuiz: {
        name: 'TakeQuiz',
        component: TakeQuiz,
        // options: {
        //     headerTintColor: white,
        //     headerStyle: {
        //         backgroundColor: blue
        //     }
        // }
    }
}

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerMode: 'screen', headerTintColor: white, headerStyle: {backgroundColor: blue}}}>
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