import React, { createContext, useState } from 'react';

type Page = 'Home' | 'Trips' | 'TripDetails' | 'UpdateTrip' | 'UserLogin' | 'NewTripForm' | "UserRegistration" | Details;

interface Details {
    id: string
}

interface PageContextType {
    currentPage: Page;
    setCurrentPage:React.Dispatch<React.SetStateAction<Page>>;
}

interface Props {
    children:React.ReactNode;
}
export const UsePageContext = createContext<PageContextType | null>(null);


export default function PageContextProvider(props:Props) {
    const [currentPage,setCurrentPage] = useState<Page>("Home")
 

    return (
        <UsePageContext.Provider value={{currentPage,setCurrentPage}}>
            {props.children}
        </UsePageContext.Provider>
    )
}