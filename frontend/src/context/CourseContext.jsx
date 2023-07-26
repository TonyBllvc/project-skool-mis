import React, { createContext, useReducer } from 'react'

export const CourseContext = createContext();

export const courseReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_DATA':
      return {
        course: [...state.notice, action.payload,]
      }
    case 'GET_COURSE':
      return {
        course: action.payload
      }
    case 'DELETE_DATA':
      return {
        course: state.notice.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const CourseContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(courseReducer, {
    course: null
  })

  return (
    <CourseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CourseContext.Provider>
  )
}

// export default WorkoutsContextProvider;