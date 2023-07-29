import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

// to check and ensure that we are within the component tree
export const useAuthContext = () => {

    const context = useContext(AuthContext); 

    if(!context){
        throw Error('useAuthContext must be used inside a AuthsContextProvider')
    }

    return context; 

}

// export default useAuthContext;