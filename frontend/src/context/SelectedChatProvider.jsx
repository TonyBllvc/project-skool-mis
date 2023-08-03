import React, { createContext, useState } from 'react'

export const SelectedChatContext = createContext()

export const SelectedChatContextProvider = ({ children }) => {
    const [ selectedChat, setSelectedChat ] = useState('')

    

    return (
        <SelectedChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </SelectedChatContext.Provider>
    )
}

// export default SelectedChatContextProvider; 