import React, { createContext, useReducer } from 'react'

export const StudentDetailsContext = createContext();

// for studentDetails timetable
export const studentDetailsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        studentDetails: action.payload
      }
    case 'CREATE_DATA':
      return {
        studentDetails: [...state.studentDetails, action.payload, ]
      }
    case 'UPDATE_DATA':
      return {
        studentDetails: [ action.payload, ...state.studentDetails ]
      }
    case 'DELETE_DATA':
      return {
        studentDetails: state.studentDetails.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const StudentDetailsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(studentDetailsReducer, {
    studentDetails: null,
  })

  return (
    <StudentDetailsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentDetailsContext.Provider>
  )
}

// export default WorkoutsContextProvider;