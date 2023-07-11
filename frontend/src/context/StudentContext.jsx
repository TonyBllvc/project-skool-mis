import React, { createContext, useReducer } from 'react'

export const StudentContext = createContext();

// for student timetable
export const studentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        student: action.payload
      }
    case 'CREATE_DATA':
      return {
        student: [...state.student, action.payload, ]
      }
    case 'UPDATE_DATA':
      return {
        student: [ action.payload, ...state.student ]
      }
    case 'DELETE_DATA':
      return {
        student: state.student.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const StudentContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(studentReducer, {
    student: null,
  })

  return (
    <StudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentContext.Provider>
  )
}

// export default WorkoutsContextProvider;