import React, { useState } from 'react'

const ResultBoard = () => {
    const [test, setTest  ] = useState('')
    const [practical, setPractical ] = useState('')
    const [exam, setExam  ] = useState('')
    const [score, setScore  ] = useState('')
    const [grade, setGrade  ] = useState('')
    const [point, setPoint  ] = useState('')
    const [remark, setRemark  ] = useState('')
    // const [score, setScore  ] = useState('')

    const handleScores = async() => {
        
    const sum_up = parseFloat(test) + parseFloat(practical) + parseFloat(exam)
    const sumUp = sum_up.toFixed(2) // for the score in (%)

    if (sumUp > 100) {
        // return res.status(400).json({ error: " Score must be below 100%" })
    }

    if(sumUp >= 0 &&  sumUp <= 39 ){
        const grade = 'F'
        const remark = 'Failure'
    }else if(sumUp >= 40 && sumUp <= 44){
        const grade = 'E'
        const remark = 'Poor Pass'
    }else if(sumUp >= 45 && sumUp <= 49){
        const grade = 'D'
        const remark = 'Pass'
    }else if(sumUp >= 50 && sumUp <= 59){
        const grade = 'C'
        const remark = 'Good'
    }else if(sumUp >= 60&& sumUp <= 69){
        const grade = 'B'
        const remark = 'Very Good'
    }else if(sumUp >= 70 && sumUp <= 100){
        const grade = 'A'
        const remark = 'Excellent'
    }

    }

  return (
    <div>ResultBoard</div>
  )
}

export default ResultBoard