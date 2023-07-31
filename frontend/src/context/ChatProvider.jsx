import React, { createContext, useContext, useEffect, useState } from 'react'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const [ selectedChat, setSelectedChat ] = useState('')
  const [ chats, setChats ] = useState([])
  const [ notification, setNotification ] = useState([])
  // made use of useNavigation, but can not function
  // because it does not work inside a useContext 

  useEffect(() => {

    // if (!userInfo) {
    //   // navigate("/")
    // }
  }, [])
  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat, chats, setChats, notification, setNotification  }}>
      {children}
    </ChatContext.Provider>

  )
}

export const ChatState = () => {
  const context = useContext(ChatContext)

  if(!context){
    throw Error('not assigned')
  }

  return context;
}
// export default ContextProvider
