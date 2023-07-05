import { useContext } from 'react'
import { TimeContext } from '../context/TimeContext';


// to check and ensure that we are within the component tree
export const useTimeContext = () => {

    const context = useContext(TimeContext);

    if (!context) {
        throw Error('useTimeContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;