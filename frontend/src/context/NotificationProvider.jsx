import React, { createContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

export const NotifyContext = createContext()

export const NotifyContextProvider = ({ children }) => {
  const [ notification, setNotification ] = useState([])


  return (
    <NotifyContext.Provider value={{ notification, setNotification  }}>
      {children}
    </NotifyContext.Provider>

  )
}

// export default ContextProvider
