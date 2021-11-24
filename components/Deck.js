import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import {gray} from '../utils/colors'


const Deck = (props) => {
    const {deck} = props;

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {deck.title}
                </Text>
                <Text style={styles.cardsNumber}>
                    {deck.questions && deck.questions.length} cards
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderBottomColor: gray,
        borderBottomWidth: 1,
        padding: 20
    },
    title: {
        fontSize: 25,
        marginBottom: 10
    },
    cardsNumber: {
        fontSize: 15,
        alignItems: 'center',
        color: gray
    }
})

const mapStateToProps = (decks, {deck}) => {
    return {
        deck: decks[deck],
    }
}

export default connect(mapStateToProps)(Deck)