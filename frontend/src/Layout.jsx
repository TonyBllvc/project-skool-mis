import React from 'react'
import NavBar from './Layout/NavBar'

const Layout = ({ children }) => {
    return (

        <div className="w-full bg-green-500 min-h-screen flex flex-row justify-center sm:justify-center p-0 m-0 ">
            <div className="w-1/6 -ml-8 sm:ml-0 sm:w-1/5 flex relative z-0 sm:bg-transparent sm:z-0 sm:flex h-full overflow-y-hidden overscroll-none">
                <NavBar />
            </div>
            <div className="w-5/6 sm:4/5 z-30 sm:mr-4 relative min-h-screen overflow-y-visible overscroll-contain bg-white shadow-md shadow-slate-800 mt-4 rounded-3xl mb-8">
                <div className="rounded-lg h-full overflow-visible overscroll-y-auto mt-4 pt-2 mb-3 mx-2 px-2 sm:p-2 sm:mx-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout