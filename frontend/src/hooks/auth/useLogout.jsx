import React from 'react'
import { useNoticeContext } from '../useNoticeContext'
import { useCourseContext } from '../useCourseContext'
import { useLecturerContext } from '../useLecturerContext'
import { useStudentContext } from '../useStudentContext'
import { useAuthContext } from '../useAuthContext'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {

    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const toast = useToast()

    const { dispatch: dispatchStudents } = useStudentContext()
    const { dispatch: dispatchLecturers } = useLecturerContext()
    const { dispatch: dispatchCourses } = useCourseContext()
    const { dispatch: dispatchNotice } = useNoticeContext()

    const logout = () => {
        // remove user from storage
        sessionStorage.removeItem('user')
        toast({
            title: 'Logout Successful!',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top",
        })

        dispatch({ type: 'LOGOUT' })
        // so as to clear previous data after logout
        dispatchStudents({ type: 'GET_DATA', payload: null })
        dispatchLecturers({ type: 'SET_DATA', payload: null })
        dispatchCourses({ type: 'GET_COURSE', payload: null })
        dispatchNotice({ type: 'GET_DATA', payload: null })
        navigate('/')
    }


    return { logout }
}

export default useLogout