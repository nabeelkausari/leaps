import React from "react"
import NProgress from 'nprogress'
import Router from 'next/router'
import { Provider } from 'react-redux'
import {useStore} from "../redux-config/store"
import IncompatibleView from "../components/IncompatibleView/IncompatibleView"

import "react-vertical-timeline-component/style.min.css";
import "font-awesome/css/font-awesome.min.css";
import "video-react/styles/scss/video-react.scss";
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/components/nprogress.css";
import "../styles/components/_incompatible-view.scss";
import "../styles/branding.scss";
import "../styles/main.scss";
import "../modules/home/styles/home.scss";
import "../modules/material/styles/material.scss";
import "../modules/header/styles/header.scss"
import "../modules/courses/styles/List.scss"
import "../modules/courses/styles/courseOverview.scss"
import "../modules/covidAnalysis/styles/covid.scss"
import "../modules/cases/styles/List.scss"
import "../modules/cases/styles/Layout.scss"

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <IncompatibleView />
      <Component {...pageProps} />
    </Provider>
  )
}
