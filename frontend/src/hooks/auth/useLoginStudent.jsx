import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@chakra-ui/react';
import { useAuthContext } from '../useAuthContext';

export const useLoginStudent = (url) => {
    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)

    const { dispatch } = useAuthContext()
    const toast = useToast()

    const login = async (reg_no, role, password) => {
        setPending(true)
        setError(null)


        // add picture later 
        if (!reg_no || !role || !password) {
            toast({
                title: 'Please fill all the Fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return
        }

        const details = { reg_no, role, password }

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await res.json()

            if (!res.ok) {
                setPending(false)
                setError(json.error)
                toast({
                    title: json.error,
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                })
                return
            }
            if (res.ok) {
                toast({
                    title: 'Login Successful!',
                    description: reg_no + ' logged in successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
                localStorage.setItem('user', JSON.stringify(json))
            }

            // update auth Context
            dispatch({ type: 'LOGIN', payload: json })

            setPending(false)

            navigate('/')
        } catch (error) {
            toast({
                title: 'Error occurred, can not login now!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setPending(false)
        }
    }

    return { login, pending, error, setPending }
}

// export default useSignup;
