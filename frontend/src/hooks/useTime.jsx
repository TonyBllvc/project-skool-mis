// import React, { useEffect } from 'react'
// import { useTimeContext } from './useTimeContext'
// import { format } from 'date-fns'

// const useTime = () => {
//     const { dispatch } = useTimeContext()

//     // const setTime = () => {
        
//     useEffect(() => {
//         const fetchTime = () => {
//             const selectedDate = new Date()

//             // const timeOfDay = format(selectedDate, 'HH')
//             const hr = format(selectedDate, 'HH')
//             const minute = format(selectedDate, 'm')
//             // const hr = 17;
//             // const minute = 31;
    
//             // to get the time o the day
//             if ((hr >= 0) && (hr <= 11)) {
//                 dispatch({ type: 'SET_TIME', payload: 'Good-Morning'})
//             }else if((hr >= 12) && (hr <= 17 && minute <= 30)){
//                 dispatch({ type: 'SET_TIME', payload: 'Good-Afternoon'})
//             }else if((hr >= 17 && minute >= 31) && (hr <= 20) ){
//                 dispatch({ type: 'SET_TIME', payload: 'Good-Evening'})
//                 dispatch('')
//             }else if((hr >= 21) && (hr <= 23 && minute <= 59) ){
//                 dispatch({ type: 'SET_TIME', payload: 'Lovely-Evening'})
//                 dispatch('Lovely-Night')
//             }
    
//         }

//         fetchTime()

//     }, [])
//     // }
   

//   return 
// }

// export default useTime
