import React, { createContext, useReducer } from 'react'

export const CourseContext = createContext();

export const courseReducer = (state, action) => {
  switch (action.type) {
      case 'GET_COURSE':
        return {
          course: action.payload 
        }
    default:
      return state
  }
}

export const CourseContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(courseReducer, {
    idDetail: null
  })

  return (
    <CourseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CourseContext.Provider>
  )
}

// export default WorkoutsContextProvider;