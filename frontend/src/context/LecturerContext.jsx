import React, { createContext, useReducer } from 'react'

export const LecturerContext = createContext();

// for lecturer timetable
export const lecturerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        lecturer: action.payload
      }
    case 'CREATE_DATA':
      return {
        lecturer: [...state.lecturer, action.payload, ]
      }
    case 'UPDATE_DATA':
      return {
        lecturer: [ action.payload, ...state.lecturer ]
      }
    case 'DELETE_DATA':
      return {
        lecturer: state.lecturer.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const LecturerContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(lecturerReducer, {
    lecturer: null,
  })

  return (
    <LecturerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LecturerContext.Provider>
  )
}

// export default WorkoutsContextProvider;