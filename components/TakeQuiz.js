import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, blue, red, green } from '../utils/colors'
import {clearLocalNotification, setLocalNotification} from '../utils/notificationsHelper'

class TakeQuiz extends Component {
    state = {
        showAnswer: false,
        currentQuestionIndex: 0,
        correctAnswers: 0
    }

    handleResponse = (response) => {
        const {currentQuestionIndex: newIndex, correctAnswers: newCorrectAnswer} = this.state
    
        this.setState({
            showAnswer: false,
            currentQuestionIndex: newIndex + 1,
            correctAnswers: response ? newCorrectAnswer + 1 : newCorrectAnswer,
        })
        if (this.props.questions.length === newIndex + 1) {
            clearLocalNotification().then(setLocalNotification())
        }
    }

    handleReset = () => {
        this.setState({
            showAnswer: false,
            currentQuestionIndex: 0,
            correctAnswers: 0
        })
    }


    render(){
        const {showAnswer, currentQuestionIndex, correctAnswers} = this.state
        const {questions, deckId, navigation} = this.props

        if (!questions.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.quizTitle}>
                        You can not take the test at this time. There are no cards in this deck
                    </Text>
                    <View>
                        <TouchableOpacity style={[styles.button, styles.coloredButton]} onPress={()=>{
                            navigation.navigate('DeckDetails', {deckId, title: deckId})
                        }}>
                            <Text style={{color: white}}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        if (questions.length === currentQuestionIndex) {
            return (
                <View style={styles.container}>
                    <Text style={styles.quizTitle}>
                        {correctAnswers} correct answers out of {questions.length}
                    </Text>
                    <View>
                        <TouchableOpacity style={[styles.button, styles.transparentButton]} onPress={()=> this.handleReset()}>
                            <Text style={{color: blue}}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.coloredButton]} onPress={()=>{
                            navigation.navigate('DeckDetails', {
                                deckId,
                                title: deckId
                            })
                        }}>
                            <Text style={{color: white}}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.quizNum}>
                    {currentQuestionIndex + 1}/{questions.length}
                </Text>
                <View>
                    <Text style={styles.quizTitle}>
                        {questions[currentQuestionIndex].question}
                    </Text>
                </View>
                {showAnswer && (
                    <View>
                        <Text style={styles.answerLabel}>Answer</Text>
                        <Text style={styles.quizAnswer}>{questions[currentQuestionIndex].answer}</Text>
                    </View>
                )}
                <View style={styles.buttonsGroup}>
                    {!showAnswer && (
                        <View>
                            <TouchableOpacity style={[styles.button, {backgroundColor: blue}]} onPress={()=> this.setState({showAnswer: true})}>
                                <Text style={{color: white}}>Show Answer</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View>
                    <TouchableOpacity style={[styles.button, {backgroundColor: green}]} onPress={()=>this.handleResponse(true)}>
                        <Text style={{color: white}}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: red}]} onPress={()=> this.handleResponse(false)}>
                        <Text style={{color: white}}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50,
        paddingBottom: 50
    },
    quizAnswer: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: green
    },
    quizNum: {
        alignItems: 'flex-start'
    },
    quizTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonsGroup: {
        alignItems: 'center',
        marginBottom: 50
    },
    button: {
        margin: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10
    },
    transparentButton: {
        backgroundColor: white,
        borderColor: blue,
        borderWidth: 1
    },
    coloredButton: {
        backgroundColor: blue
    }, 
    answerLabel: {
        color: red,
        textAlign: 'center',
        fontSize: 20
    }
})

const mapStateToProps = (decks, {route}) => {
    const {deckId} = route.params;

    return {
        deckId,
        questions: decks[deckId].questions
    }
}

export default connect(mapStateToProps)(TakeQuiz)