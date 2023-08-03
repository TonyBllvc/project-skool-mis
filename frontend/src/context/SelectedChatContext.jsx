import React, { createContext, useReducer } from 'react'

export const SelectedChatContext = createContext();

// for selectedChat timetable
export const selectedChatReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        selectedChat: action.payload
      }
    case 'CREATE_DATA':
      return {
        selectedChat: [...state.selectedChat, action.payload, ]
      }
    case 'UPDATE_DATA':
      return {
        selectedChat: [ action.payload, ...state.selectedChat ]
      }
    case 'DELETE_DATA':
      return {
        selectedChat: state.selectedChat.filter((data) => data._id !== action.payload._id)
      }
      case 'EMPTY_DATA':
        return {
          selectedChat: null
        }
    default:
      return state
  }
}

export const SelectedChatContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(selectedChatReducer, {
    selectedChat: null,
  })

  return (
    <SelectedChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SelectedChatContext.Provider>
  )
}