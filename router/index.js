import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { blue } from '../utils/colors'
import Constants from 'expo-constants'
import { StatusBar, View } from 'react-native'
import Nav from './stackNavigator'

const Router = () => {
    return (
        <NavigationContainer>
            <AppStatusbar backgroundColor={blue} barStyle={'light-content'} />
            <Nav />
        </NavigationContainer>
    )
}

const AppStatusbar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default Router