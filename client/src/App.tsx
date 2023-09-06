import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Main from "./components/Main/Main";
import PageContextProvider from "./components/ContextPage/ContextPage";
import Trips from "./components/Trips/Trips";
import TripIDContextProvider from "./components/ContextDetailsId/ContextDetailsId";
import TokenContextProvider from "./components/ContextToken/ContextToken";

function App() {
  return (
    <>
      <TokenContextProvider>
        <TripIDContextProvider>
          <PageContextProvider>
            <Main></Main>
          </PageContextProvider>
        </TripIDContextProvider>
      </TokenContextProvider>
    </>
  );
}

export default App;
