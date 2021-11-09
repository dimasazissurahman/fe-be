import React, { useEffect, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (userData.length === 0) {
            const data = localStorage.getItem("userObject");
            setUserData(JSON.parse(data));
        }
    }, [userData]);

    return <AppContext.Provider value={{
        userData: userData,
        setUserData: setUserData,
    }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppProvider };