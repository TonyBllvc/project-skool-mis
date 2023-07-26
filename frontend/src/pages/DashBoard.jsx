import React, { useEffect, useState } from 'react'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import DashBox from './component/DashBox'
import { useStudentContext } from '../hooks/useStudentContext'
import { useLecturerContext } from '../hooks/useLecturerContext'
import { useCourseContext } from '../hooks/useCourseContext'
import { useNoticeContext } from '../hooks/useNoticeContext'
import Home from './Home'

const DashBoard = () => {


    useEffect(() => {
        document.title = 'Dashboard page'
    }, [])
    
  const { dispatch: dispatchStudents } = useStudentContext()
  const { dispatch: dispatchLecturers } = useLecturerContext()
  const { dispatch: dispatchCourses } = useCourseContext()
  const { dispatch: dispatchNotice } = useNoticeContext()

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch('/api/student/student_list')
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
      const res = await fetch('/api/lecturer/lecturer_list')
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
      const res = await fetch('/api/course/get_courses')
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
        const res = await fetch('api/notice/get_notice')
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
                {/* <DashBox /> */}
                <Home />
                {/* Pass a logic here for both students and lecturers */}
            </div>
        </div>


    )
}

export default DashBoard
