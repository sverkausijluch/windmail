import React, { Component } from 'react'
import { render } from "react-dom"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './dictionaries/colors.css'
import './App.css'
import './Mobile.css'
import PagesAccess_wrap from "./components/wraps/PagesAccess_wrap"

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
            <PagesAccess_wrap />
        </Provider>
      </React.StrictMode>
    )
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container)