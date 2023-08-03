import React, { createContext, useReducer } from 'react'

export const ChatsContext = createContext();

// for chats timetable
export const chatsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        chats: action.payload
      }
    case 'CREATE_DATA':
      return {
        chats: [...state.chats, action.payload, ]
      }
    case 'UPDATE_DATA':
      return {
        chats: [ action.payload, ...state.chats ]
      }
    case 'DELETE_DATA':
      return {
        chats: state.chats.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ChatsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(chatsReducer, {
    chats: null,
  })

  return (
    <ChatsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  )
}