import {createContext,useContext} from "react";

const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const data = {
        company: {
            href: "https://princevisuals.com/",
            name: "PRINCE VISUALS"
        },
        links: [
            {href: "https://princevisuals.com/", name: "Prince Visuals"},
            {href: "#", name: "About Us"},
            {href: "#", name: "Blog"},
            {href: "#", name: "License"}
            ]
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

const useData = () =>{
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useMiscData should be used inside the MiscProvider.");
    }
    return context;
}

export {DataProvider, useData};