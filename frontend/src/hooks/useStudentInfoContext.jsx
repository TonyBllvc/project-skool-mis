import { useContext } from 'react'
import { StudentInfoContext } from '../context/StudentInfoContext';


// to check and ensure that we are within the component tree
export const useStudentInfoContext = () => {

    const context = useContext(StudentInfoContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;