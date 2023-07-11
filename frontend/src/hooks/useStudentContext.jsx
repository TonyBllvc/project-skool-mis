import { useContext } from 'react'
import { StudentContext } from '../context/StudentContext';


// to check and ensure that we are within the component tree
export const useStudentContext = () => {

    const context = useContext(StudentContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;