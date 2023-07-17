import React, { createContext, useReducer } from 'react'

export const StudentInfoContext = createContext();

// for studentInfo timetable
export const studentInfoReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        studentInfo: action.payload
      }
    case 'CREATE_DATA':
      return {
        studentInfo: [...state.studentInfo, action.payload, ]
      }
    case 'UPDATE_DATA':
      return {
        studentInfo: [ action.payload, ...state.studentInfo ]
      }
    case 'DELETE_DATA':
      return {
        studentInfo: state.studentInfo.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const StudentInfoContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(studentInfoReducer, {
    studentInfo: null,
  })

  return (
    <StudentInfoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentInfoContext.Provider>
  )
}

// export default WorkoutsContextProvider;