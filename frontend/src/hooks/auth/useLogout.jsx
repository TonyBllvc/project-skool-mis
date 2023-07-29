import React from 'react'
import { useNoticeContext } from '../useNoticeContext'
import { useCourseContext } from '../useCourseContext'
import { useLecturerContext } from '../useLecturerContext'
import { useStudentContext } from '../useStudentContext'
import { useAuthContext } from '../useAuthContext'

const useLogout = () => {

    const { dispatch } = useAuthContext()

    const { dispatch: dispatchStudents } = useStudentContext()
    const { dispatch: dispatchLecturers } = useLecturerContext()
    const { dispatch: dispatchCourses } = useCourseContext()
    const { dispatch: dispatchNotice } = useNoticeContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        // so as to clear previous data after logout
        dispatchStudents({ type: 'GET_DATA', payload: null })
        dispatchLecturers({ type: 'SET_DATA', payload: null })
        dispatchCourses({ type: 'GET_COURSE', payload: null })
        dispatchNotice({ type: 'GET_DATA', payload: null })
    }

    return { logout }
}

export default useLogout