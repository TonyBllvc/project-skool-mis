import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            // console.log('wrong page')
            navigate(-1)
        }, 800);

        // let timer = setTimeout(() => {
        //     // console.log('wrong page')
        //     navigate(-1)
        // }, 800);

        // return () => clearTimeout(timer)
    });

  return (
    <div>
      <h2> Sorry </h2>
      <p> Page Not found</p>
      <Link to='/' > Back to the homepage... </Link>
    </div>
  )
}

export default NotFound
