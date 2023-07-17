import React, { createContext, useReducer } from 'react'

export const NoticeContext = createContext();

// for notice timetable
export const noticeReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        notice: action.payload
      }
    case 'CREATE_DATA':
      return {
        notice: [...state.notice, action.payload, ]
      }
    case 'UPDATE_DATA':
      return {
        notice: [ action.payload, ...state.notice ]
      }
    case 'DELETE_DATA':
      return {
        notice: state.notice.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const NoticeContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(noticeReducer, {
    notice: null,
  })

  return (
    <NoticeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoticeContext.Provider>
  )
}