import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { connect } from 'react-redux'
import Deck from './Deck'
import { white } from '../utils/colors'
import { handleFetchDecks } from '../actions'

const delay = (timeout) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })

const Decks = (props) => {
    useEffect(() => {
        props.dispatch(handleFetchDecks())
    }, [])

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefreshing(true);

        props.dispatch(handleFetchDecks())

        delay(2000).then(() => setRefreshing(false))
    }, [refreshing])

    const { deckIds } = props

    if (deckIds.length === 0) {
        return (
            <View style={[styles.container, { padding: 20 }]}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <Text style={styles.noDeck}>
                        There are no decks, Pull down to refresh
                    </Text>
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {deckIds.map((deck) => (
                    <TouchableOpacity key={deck} onPress={() => { props.navigation.navigate('DeckDetail', { deckId: deck, title: deck }) }}>
                        <Deck deck={deck} key={deck} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        paddingTop: 50
    },
    noDeck: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})