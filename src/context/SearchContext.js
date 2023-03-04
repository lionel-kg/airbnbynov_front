import {createContext, React, useState} from 'react';

const SearchContext = createContext({
    search: "",
});

export default SearchContext;

export const SearchContextProvider = ({children}) => {

    const [search, setSearch] = useState("");

    const updateSearch = (value) => {
        setSearch(value);
    }
   
    const context = {
        updateSearch,
        search
    }

    return (
        <SearchContext.Provider value={context}>
            {children}
        </SearchContext.Provider>
    );
}