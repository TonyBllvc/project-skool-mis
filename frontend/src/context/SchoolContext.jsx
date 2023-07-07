import React, { createContext, useReducer } from 'react'

export const SchoolContext = createContext();

export const schoolReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        school: action.payload
      }
      case 'CREATE_DATA':
        return {
          school: [action.payload, ...state.workouts]
        }
    default:
      return state
  }
}

export const SchoolContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(schoolReducer, {
    school: null
  })

  return (
    <SchoolContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SchoolContext.Provider>
  )
}

// export default WorkoutsContextProvider;