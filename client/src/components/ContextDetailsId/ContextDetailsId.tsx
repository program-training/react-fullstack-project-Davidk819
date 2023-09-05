import React, { createContext, useState } from 'react';

type ID = string;

interface TripIDContextProps {
    currentID: ID;
    setCurrentTripID: React.Dispatch<React.SetStateAction<ID>>;
}

interface Props {
    children: React.ReactNode;
}

export const TripIDContext = createContext<TripIDContextProps | null>(null);

export default function TripIDContextProvider(props: Props) {
    const [currentTripID, setCurrentTripID] = useState<ID>("");

    return (
        <TripIDContext.Provider value={{ currentID: currentTripID, setCurrentTripID }}>
            {props.children}
        </TripIDContext.Provider>
    )
}
