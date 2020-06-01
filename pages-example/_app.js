import React from "react"
import { Provider } from 'react-redux'
import App from 'next/app'
import withReduxStore from '../redux-config/with-redux-store'
import "../example/components/clock.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
