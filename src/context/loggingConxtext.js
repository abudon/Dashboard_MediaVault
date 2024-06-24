import {createContext, useContext, useState} from 'react'


const login_context = createContext(null)


const LoginProvider = ({children}) =>{
    const [username, setUsername] = useState(null);


    return(
        <login_context.Provider value={{username, setUsername}}>
            {children}
        </login_context.Provider>
    )
}

const useLoginConext = ()=>{

    const context = useContext(login_context);
    if (!context) {
        throw new Error("usePhotoLabContext should be used inside the PhotoLabContextProvider.");
    }

    return context;
    }

    export {
    LoginProvider, useLoginConext
    }