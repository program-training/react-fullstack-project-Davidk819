import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/Main/Main'
import PageContextProvider from './components/ContextPage/ContextPage'
import Trips from './components/Trips/Trips'
import TripIDContextProvider from './components/ContextDetailsId/ContextDetailsId'

function App() {


  return (
    <>
    <TripIDContextProvider>
      <PageContextProvider>
        <Main></Main>
      </PageContextProvider>
      </TripIDContextProvider>

    </>
  )
}

export default App
