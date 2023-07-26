import { useContext } from 'react'
import { TimeTableContext } from '../context/TimetableContext';


// to check and ensure that we are within the component tree
export const useTimetableContext = () => {

    const context = useContext(TimeTableContext);

    if (!context) {
        throw Error('useTimetableContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;