import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const [ chats, setChats ] = useState([])
  // const navigate = useNavigate()
  // made use of useNavigation, but can not function
  // because it does not work inside a useContext 

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("user"))

  //   setUser(userInfo)

  //   if (!userInfo) {
  //     // navigate("/")
  //   }
  // }, [])
  return (
    <ChatContext.Provider value={{chats, setChats  }}>
      {children}
    </ChatContext.Provider>

  )
}

// export default ContextProvider
