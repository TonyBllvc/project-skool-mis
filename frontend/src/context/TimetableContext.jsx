import React, { createContext, useEffect, useReducer } from 'react'

export const TimeTableContext = createContext();

// for timetable timetable
export const TimetableReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        timetable: action.payload
      }
    case 'FETCH_DATA':
      return {
        timetable: action.payload
      }
    case 'CREATE_DATA':
      const updated = [...state.timetable, action.payload]
      const sorted = updated.sort((a, b) => a.day.localeCompare(b.day, 'en', { sensitivity: 'base' }))
      return {
        ...state,
        timetable: sorted
      }
    case 'UPDATE_DATA':
      return {
        timetable: [action.payload, ...state.timetable]
      }
    case 'DELETE_DATA':
      return {
        timetable: state.timetable.filter((data) => data._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TimetableContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(TimetableReducer, {
    timetable: null,
  })

  // useEffect(() => {
  //   dispatch({ type: 'SET_DATA', payload: state})
  // }, [])


  return (
    <TimeTableContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TimeTableContext.Provider>
  )
}

// export default WorkoutsContextProvider;