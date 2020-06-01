import React, { useState, useEffect } from "react"
import Head from 'next/head'
import MobileHeader from "../modules/header/components/MobileHeader"
import Header from "../modules/header/components/Header"

export default function Layout({
 children,
 title = 'ATH LEAPS',
  className
}) {
  const [mobileDisplay, setMobileDisplay] = useState(null);

  useEffect(() => {
    if (window.innerWidth <= 900) {
      setMobileDisplay(true)
    }
  }, [mobileDisplay]);

  return (
    <div className={"body--scholar" + ` ${className}`}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,400i,500,600,700&display=swap, Fira Mono"
          rel="stylesheet"
        />
      </Head>
      {mobileDisplay ? (
        <MobileHeader />
      ) : (
        <Header />
      )}
      {children}

    </div>
  )
}
