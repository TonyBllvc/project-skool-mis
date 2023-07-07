import React from 'react'

const ViewTimeDetails = ({ idDetails }) => {
    return (
        <div>
            <div className="mt-9 ">
                {/* This would have model schema created */}
                <h2 className="text-gray-500 font-mono font-bold text-xl">
                    100 level Time-Table
                </h2>
            </div>

            {/* The chat table */}
            <div className="mt-2">

                <div className="w-full">
                    {/* The table for filling */}
                    <div className="mt-2">
                        <div className="w-full">
                            {/* Table with contents */}
                            <div className="mt-10 bg-white grid grid-cols-3 rounded-lg shadow-lg hover:shadow-slate-800 py-4 px-1 mb-4">
                                <div className="mx-1 flex justify-center items-center">
                                    <h2 className="text-slate-600 pl-2 text-base">
                                        Monday
                                    </h2>
                                </div>

                                <div className="mx-1 flex justify-center items-center">
                                    <h2 className="text-slate-600 pl-2 text-base">
                                        100 Level
                                    </h2>
                                </div>

                                <div className="mx-1  grid grid-cols-2 ">
                                    <h2 className="text-slate-600 pl-2 text-sm">
                                        10:20 AM
                                    </h2>
                                    <h2 className="text-slate-600 pl-2 text-sm">
                                        11:00 PM
                                    </h2>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                {/* <StudentList /> */}
                {/* { results && <StudentList recordsUpload={results}  /> } */}
            </div>
        </div>
    )
}

export default ViewTimeDetails