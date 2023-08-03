import React, { createContext, useReducer } from 'react'

export const NotificationContext = createContext();

// for notification timetable
export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        notification: action.payload
      }
    case 'CREATE_DATA':
      return {
        notification: [ action.payload, ...state.notification]
      }
      case 'PASS_DATA':
        return {
          notification: state.notification.filter((data) => data !== state.notification._id)
        }
        case 'PARSE_DATA':
          return {
            notification: state.notification.filter((data) => data !== state.notification)
          }
    case 'UPDATE_DATA':
      return {
        notification: [ action.payload, ...state.notification ]
      }
    case 'DELETE_DATA':
      return {
        notification: state.notification.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(notificationReducer, {
    notification: null,
  })

  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}