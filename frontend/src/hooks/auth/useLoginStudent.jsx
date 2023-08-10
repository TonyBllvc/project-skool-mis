import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@chakra-ui/react';
import { useAuthContext } from '../useAuthContext';
import { useNoticeContext } from '../useNoticeContext';
import { useCourseContext } from '../useCourseContext';
import { useLecturerContext } from '../useLecturerContext';
import { useStudentContext } from '../useStudentContext';

export const useLoginStudent = (url) => {
    const navigate = useNavigate();

    const { dispatch: dispatchStudents } = useStudentContext()
    const { dispatch: dispatchLecturers } = useLecturerContext()
    const { dispatch: dispatchCourses } = useCourseContext()
    const { dispatch: dispatchNotice } = useNoticeContext()

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
                    description: json.surname + " " + json.first_name + ' logged in successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
                sessionStorage.setItem('user', JSON.stringify(json))
            }

            // update auth Context
            dispatch({ type: 'LOGIN', payload: json })
            const expire = 3600000

            setTimeout(() => {

            }, expire);
            setPending(false)

            navigate('/')
        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setPending(false)
        }
    }

    // useEffect(() => {
    //     const expire = 10000

    //     setTimeout(() => {
    //         localStorage.removeItem('user')
    //         toast({
    //             title: 'Please login again!',
    //             status: 'warning',
    //             duration: 3000,
    //             isClosable: true,
    //             position: "top",
    //         })

    //         dispatch({ type: 'LOGOUT', payload: null })
    //         // so as to clear previous data after logout
    //         dispatchStudents({ type: 'GET_DATA', payload: null })
    //         dispatchLecturers({ type: 'SET_DATA', payload: null })
    //         dispatchCourses({ type: 'GET_COURSE', payload: null })
    //         dispatchNotice({ type: 'GET_DATA', payload: null })
    //         navigate('/login')
    //     }, expire);
    // }, [login ])
    return { login, pending, error, setPending }
}

// export default useSignup;
