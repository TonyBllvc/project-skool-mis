import { useContext } from 'react'
import { CourseContext } from '../context/CourseContext';


// to check and ensure that we are within the component tree
export const useCourseContext = () => {

    const context = useContext(CourseContext);

    if (!context) {
        throw Error('useCourseContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;