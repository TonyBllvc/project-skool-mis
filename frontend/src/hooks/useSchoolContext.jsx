import { useContext } from 'react'
import { SchoolContext } from '../context/SchoolContext';


// to check and ensure that we are within the component tree
export const useSchoolContext = () => {

    const context = useContext(SchoolContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;