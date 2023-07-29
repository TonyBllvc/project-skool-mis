import React, { createContext, useEffect, useReducer } from 'react'

export const CourseContext = createContext();

export const courseReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_DATA':
        const updated =  [...state.course, action.payload]
        const sorted = updated.sort((a, b) => a.course_code.localeCompare(b.course_code, 'en', { sensitivity: 'base' }))
      return {
          ...state, 
        course: sorted 
      }
    case 'GET_COURSE':
      return {
        course: action.payload
      }
    case 'DELETE_DATA':
      return {
        course: state.course.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const CourseContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(courseReducer, {
    course: []
  })

  // useEffect(() => {

    // setTimeout(() => {
      
    //   // dispatch({ type: 'GET_COURSE', payload: state })
    // }, 1000);

  // }, [dispatch])
  return (
    <CourseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CourseContext.Provider>
  )
}

// export default WorkoutsContextProvider;