import React from "react"
import { Provider } from 'react-redux'
import {useStore} from "../redux-config/store"

import "react-vertical-timeline-component/style.min.css";
import "font-awesome/css/font-awesome.min.css";
import "video-react/styles/scss/video-react.scss";
import "bootstrap/dist/css/bootstrap.min.css"
import "../modules/home/styles/home.scss";
import "../modules/material/styles/material.scss";
import "../modules/header/styles/header.scss"
import "../modules/courses/styles/List.scss"
import "../modules/courses/styles/courseOverview.scss"
import "../modules/cases/styles/List.scss"
import "../modules/cases/styles/Layout.scss"
import "../styles/branding.scss";
import "../styles/main.scss";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
