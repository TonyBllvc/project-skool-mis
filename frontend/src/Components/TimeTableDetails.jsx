import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useTableContext } from '../hooks/useCourseContext'

const TimeTableDetails = ({ school }) => {
    // const { idDetail, dispatch } = useTableContext()
    const navigate = useNavigate()
    const [idPick, setIdPick] = useState('')

    // const handleClick = async () => {
    //     // const res = parseInt(school._id)

    //     // console.log(res)
    //     const res = await fetch('/api/school/' + school._id)
    //     const json = await res.json()

    //     if (!res.ok) {
    //         console.log(json.error)
    //         return json.error
    //     }
    //     if (res.ok) {
    //         setIdPick(json)
    //         console.log(school)
    //         console.log('between')
    //         console.log(json)
    //         console.log('between')
    //     }
    // }

    // useEffect(() => {
    //     dispatch({ type: 'PICK_ID', payload: idPick })
    //     console.log(idPick)

    // }, [])

    // if (handleClick) {
    //     // navigate('/view_timetable')
    // }
    return (
        <div>
            <div className="mt-1 bg-white grid grid-cols-4 w-full py-3 px-1 mb-2">
                <div className="mx-1 flex justify-start items-center">
                    {school.day}
                </div>
                <div className="mx-1 flex justify-start items-center">
                    {/* <Link 
                // onClick={handleClick}
                    // to='/view_timetable'
                    className=" text-base text-slate-900 " > */}
                    {school.time_details.course_code}
                    {/* </Link> */}
                </div>
                <div className="mx-1 flex justify-start items-center">
                    {school.start} {school.am_one}
                </div>
                <div className="mx-1 flex justify-start items-center">
                    {school.end} {school.am_two}
                </div>
            </div>
        </div>
    )
}

export default TimeTableDetails
