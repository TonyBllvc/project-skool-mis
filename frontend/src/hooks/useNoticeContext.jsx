import { useContext } from 'react'
import { NoticeContext } from '../context/NoticeContext';


// to check and ensure that we are within the component tree
export const useNoticeContext = () => {

    const context = useContext(NoticeContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;