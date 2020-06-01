import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import getStore from '../example/redux/store'
import { startClock, serverRenderClock } from '../example/redux/actions'
import Examples from '../example/components/examples'

const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])

  return (
    <>
      <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link>
    </>
  )
}

export async function getStaticProps() {
  const store = getStore()
  store.dispatch(serverRenderClock())

  return {
    props: {},
  }
}

export default Index
