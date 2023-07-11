import { useContext } from 'react'
import { LecturerContext } from '../context/LecturerContext';


// to check and ensure that we are within the component tree
export const useLecturerContext = () => {

    const context = useContext(LecturerContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;