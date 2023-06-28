import React from 'react'
import NavDashBoard from '../navBar/NavDashBoard'
import DashBoardContentLec from '../component/DashBoardContentLec'

const LecDashBoard = () => {
  return (
    <div className="w-full min-h-screen flex flex-row p-0 m-0 bg-green-500">
      <div className='w-1/5 h-full relative overflow-y-hidden overscroll-none'>
        <NavDashBoard />
      </div>
      <div className='w-4/5 mr-5 relative min-h-screen overflow-y-visible overscroll-contain bg-slate-200 mt-4 rounded-3xl mb-8'>
        <div className="bg-blue-100 rounded-lg shadow-slate-800 overflow-visible overscroll-y-auto mt-4 pt-2 mx-4 px-2 ">
          <DashBoardContentLec />
        </div>
      </div>


    </div>
  )
}

export default LecDashBoard
