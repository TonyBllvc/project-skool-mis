import React, { useEffect, useState } from 'react'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { NavLink, useNavigate } from 'react-router-dom'
import DashBox from './component/DashBox'
import { useStudentContext } from '../hooks/useStudentContext'
import { useLecturerContext } from '../hooks/useLecturerContext'
import { useCourseContext } from '../hooks/useCourseContext'
import { useNoticeContext } from '../hooks/useNoticeContext'
import Home from './Home'
import { useAuthContext } from '../hooks/useAuthContext'

const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app'
const DashBoard = () => {

    useEffect(() => {
        document.title = 'Dashboard'
    }, [])

    const { user, dispatch } = useAuthContext()
  //   const navigate = useNavigate()

  //   useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem('user'))

  //     if (user) {
  //         dispatch({ type: 'LOGIN', payload: user })
  //         navigate('/dashboard')
  //     } else {
  //         dispatch({ type: 'LOGOUT' })
  //         navigate('/login')
  //     }
  // }, [navigate])


  const {  dispatch: dispatchStudents } = useStudentContext()
  const { dispatch: dispatchLecturers } = useLecturerContext()
  const { dispatch: dispatchCourses } = useCourseContext()
  const { dispatch: dispatchNotice } = useNoticeContext()

  setTimeout(() => {
    
  }, 10000);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch(`${baseURL}/api/student/student_list`, {
        // we need to send authorization headers(required for authorization)
        headers: {
            // to output the bearer token 
            // by user the ${user.token}
            // this is then picked by the middleware in the backend that protects our routes
            'Authorization': `Bearer ${user.token}`
        }
    })
      const json = await res.json()

      if (!res.ok) {
        return console.log(json.error)
      }

      if (res.ok) {
        return dispatchStudents({ type: 'GET_DATA', payload: json })
      }
    }
    fetchStudents()

  }, [])

  useEffect(() => {
    const fetchLecturer = async () => {
      const res = await fetch(`${baseURL}/api/lecturer/lecturer_list`, {
        // we need to send authorization headers(required for authorization)
        headers: {
            // to output the bearer token 
            // by user the ${user.token}
            // this is then picked by the middleware in the backend that protects our routes
            'Authorization': `Bearer ${user.token}`
        }
    })
      const json = await res.json()

      if (!res.ok) {
        return console.log(json.error)
      }

      if (res.ok) {
        dispatchLecturers({ type: 'SET_DATA', payload: json })
      }
    }
    fetchLecturer()

  }, [])

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`${baseURL}/api/course/get_courses`, {
        // we need to send authorization headers(required for authorization)
        headers: {
            // to output the bearer token 
            // by user the ${user.token}
            // this is then picked by the middleware in the backend that protects our routes
            'Authorization': `Bearer ${user.token}`
        }
    })
      const json = await res.json()

      if (!res.ok) {
        return console.log(json.error)
      }

      if (res.ok) {
        dispatchCourses({ type: 'GET_COURSE', payload: json })
      }
    }
    fetchCourse()

  }, [])

  useEffect(() => {
    const fetchNotice = async () => {
        const res = await fetch(`${baseURL}/api/notice/get_notice`, {
          // we need to send authorization headers(required for authorization)
          headers: {
              // to output the bearer token 
              // by user the ${user.token}
              // this is then picked by the middleware in the backend that protects our routes
              'Authorization': `Bearer ${user.token}`
          }
      })
        const json = await res.json()

        if (!res.ok) {
            return console.log(json.error)
        }

        if (res.ok) {
            dispatchNotice({ type: 'GET_DATA', payload: json })
        }
    }
    fetchNotice()

}, [])


    return (
        <div className='overscroll-contain overflow-visible'>
            <div className='w-full font-mono font-bold text-lg mb-14 '>
                <DashBox />
                {/* <Home /> */}
                {/* Pass a logic here for both students and lecturers */}
            </div>
        </div>


    )
}

export default DashBoard
