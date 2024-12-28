import React,{createContext, useContext, useState} from 'react';

// Create context
const SearchContext = createContext({});

// Provider component
const SearchProvider = ({children}) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
            {children}
        </SearchContext.Provider>
    )
}

// Custom hook for consuming the context
const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }

    return context;
}

export {SearchProvider, useSearch};