import React, { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                // isAuthenticated: true,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                // isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // in other to keep the user logged in
    // we have to pickup user login details from the localStorage
    // then run an if check, validate the user is still logged
    // (by picking up the strings from browser storage)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        } else {
            dispatch({ type: 'LOGOUT' })
        }
    }, [])


    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

// export default AuthContextProvider; 