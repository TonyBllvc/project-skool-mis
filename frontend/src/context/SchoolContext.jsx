import React, { createContext, useReducer } from 'react'

export const SchoolContext = createContext();

// for school timetable
export const schoolReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        school: action.payload
      }
    case 'FETCH_DATA':
      return {
        document: action.payload
      }
    case 'CREATE_DATA':
      return {
        school: [...state.school, action.payload, ]
      }
    case 'UPDATE_DATA':
      return {
        school: [ action.payload, ...state.school ]
      }
    case 'DELETE_DATA':
      return {
        school: state.school.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const SchoolContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(schoolReducer, {
    school: null,
    document: null
  })

  return (
    <SchoolContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SchoolContext.Provider>
  )
}

// export default WorkoutsContextProvider;