import React, { createContext, useState } from 'react';


type Token = string | null;

interface TokenContextProps {
    token: Token;
    setToken: React.Dispatch<React.SetStateAction<Token>>;
}
interface Props {
    children: React.ReactNode;
}

export const TokenContext = createContext<TokenContextProps | null>(null)

export default function TokenContextProvider(props:Props) {
    const [token, setToken] = useState<Token>(null);


    return (
        <TokenContext.Provider value={{token:token, setToken }}>
            {props.children}
        </TokenContext.Provider>
    )
}