import { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext';


// to check and ensure that we are within the component tree
export const useNotificationContext = () => {

    const context = useContext(NotificationContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;