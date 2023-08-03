import { useContext } from 'react'
import { SelectedChatContext } from '../context/SelectedChatContext';


// to check and ensure that we are within the component tree
export const useSelectedChatContext = () => {

    const context = useContext(SelectedChatContext);

    if (!context) {
        throw Error('useSchoolContext must be used inside a TimeContextProvider')
    }

    return context;

}

// export default useWorkoutsContext;