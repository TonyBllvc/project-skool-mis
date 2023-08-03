import { useContext } from 'react'
import { ChatsContext } from '../context/ChatsContext';


// to check and ensure that we are within the component tree
export const useChatContext = () => {

    const context = useContext(ChatsContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;