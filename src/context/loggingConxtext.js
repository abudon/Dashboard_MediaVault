import {createContext, useContext, useState} from 'react'


const login_context = createContext(null)


const LoginProvider = ({children}) =>{
    const [username, setUsername] = useState(()=>{
        // Check if the user is logged in from local storage
        const savedUsername =JSON.parse(localStorage.getItem('admin')).username;

        return savedUsername? savedUsername : null;
    });


    return(
        <login_context.Provider value={{username, setUsername}}>
            {children}
        </login_context.Provider>
    )
}

const useLoginContext = ()=>{

    const context = useContext(login_context);
    if (!context) {
        throw new Error("usePhotoLabContext should be used inside the PhotoLabContextProvider.");
    }

    return context;
    }

    export {
    LoginProvider, useLoginContext
    }
