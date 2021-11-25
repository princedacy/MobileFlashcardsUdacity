import 'react-native-gesture-handler'
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Router from './router';
import reducer from './reducers'

class App extends Component {
  render() {
    const store = createStore(reducer)

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App