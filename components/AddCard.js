import React, {Component} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {gray, white, pink} from '../utils/colors'
import {connect} from 'react-redux'
import {handleAddCard} from '../actions'


class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    handleSubmit = (deckId) => {
        const {question, answer} = this.state;
        this.props.dispatch(handleAddCard(deckId, {question, answer}))
        this.props.navigation.goBack()
    }

    render(){
        const {question, answer} = this.state
        const {deckId} = this.props

        return (
            <View style={styles.container}>
                <TextInput style={styles.textBox} placeholder={'Question'} onChangeText={(question)=> this.setState({question})} value={question}/>
                <TextInput style={styles.textBox} placeholder={'Answer'} onChangeText={(answer)=> this.setState({answer})} value={answer}/>
                <TouchableOpacity style={styles.button} disabled={question === '' || answer === ''} onPress={()=>this.handleSubmit(deckId)}>
                    <Text style={{color: white}}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    deckLabel: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 'center',
        width: 350
    },
    button: {
        margin: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
        backgroundColor: pink
    },
    textBox: {
        borderColor: gray,
        borderWidth: 2,
        borderRadius: 10,
        width: 300,
        paddingLeft: 10,
        marginBottom: 20
    }
})

const mapStateToProps = (decks, {route}) => {
    const {deckId} = route.params

    return {
        deckId,
        deck: decks[deckId]
    }
}

export default connect(mapStateToProps)(AddCard)