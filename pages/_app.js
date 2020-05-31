import React from "react"
import { Provider } from 'react-redux'
import App from 'next/app'
import withReduxStore from "../redux-config/with-redux-store";

import "font-awesome/css/font-awesome.min.css";
import "video-react/styles/scss/video-react.scss";
import "bootstrap/dist/css/bootstrap.min.css"
import "../modules/home/styles/home.scss";
import "../modules/header/styles/header.scss"
import "../modules/courses/styles/List.scss"
import "../modules/cases/styles/List.scss"
import "../modules/cases/styles/Layout.scss"
import "../styles/main.scss";
import "../styles/branding.scss";

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
