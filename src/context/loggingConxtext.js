import { createContext, useContext, useState } from "react";

const login_context = createContext(null);

const LoginProvider = ({ children }) => {
    const [username, setUsername] = useState(() => {
        // Check if the user is logged in from local storage
        const savedAdmin = localStorage.getItem("admin");
        const savedUsername = savedAdmin ? JSON.parse(savedAdmin)?.username : null;

        return savedUsername;
    });

    return (
        <login_context.Provider value={{ username, setUsername }}>
            {children}
        </login_context.Provider>
    );
};

const useLoginContext = () => {
    const context = useContext(login_context);
    if (!context) {
        throw new Error("useLoginContext must be used within a LoginProvider.");
    }
    return context;
};

export { LoginProvider, useLoginContext };
