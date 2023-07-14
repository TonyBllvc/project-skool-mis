import { useContext } from 'react'
import { StudentDetailsContext } from '../context/StudentDetailsContext';


// to check and ensure that we are within the component tree
export const useStudentDetailsContext = () => {

    const context = useContext(StudentDetailsContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;