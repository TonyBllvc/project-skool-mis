import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@chakra-ui/react';
import { useAuthContext } from '../useAuthContext';

export const useChangePassword = (url) => {
    const navigate = useNavigate();
    const {user, dispatch } = useAuthContext()

    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)

    const toast = useToast()


    const change = async (password, newPassword, confirmNewPassword) => {

        if (newPassword !== confirmNewPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setPending(false)
            return;
        }

        const details = {
            id: user._id,
            password,
            newPassword,
        };

        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });

            const json = await res.json();

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
                setPending(false)
                toast({
                    title: 'Change of password Successful!',
                    description: 'Kindly login again',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
            }
            
        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setError(error.message)
            return
        }
        dispatch({ type: 'LOGOUT', payload: null})
        
        setPending(false)

        navigate('/')
    };

    return { change, pending, error, setPending }

}