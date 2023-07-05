import { format } from 'date-fns';
import React, { createContext, useEffect, useReducer } from 'react'

export const TimeContext = createContext();

export const timeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIME':
      return {
        time: action.payload
      }
    default:
      return state
  }
}

export const TimeContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(timeReducer, {
    time: null
  })

  const selectedDate = new Date()
  const hr = format(selectedDate, 'HH')

  useEffect(() => {
    const hour = parseInt(hr)
    // console.log(hour)

    // to get the time o the day
    if ((hour >= 0) && (hour <= 11)) {
        dispatch({ type: 'SET_TIME', payload: 'Good-Morning'})
    }else if((hour >= 12) && (hour < 18)){
        dispatch({ type: 'SET_TIME', payload: 'Good-Afternoon'})
    }else if((hour >= 18 ) && (hour <= 20) ){
        dispatch({ type: 'SET_TIME', payload: 'Good-Evening'})
        // dispatch('')
    }else if((hour >= 21 && hour <= 23)){
        dispatch({ type: 'SET_TIME', payload: 'Lovely-Night'})
        // dispatch('Lovely-Night')
    }else{
      dispatch({ type: 'SET_TIME', payload: 'Time unspecified'})
    }

    // }
}, [hr])


  return (
    <TimeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TimeContext.Provider>
  )
}

// export default WorkoutsContextProvider;