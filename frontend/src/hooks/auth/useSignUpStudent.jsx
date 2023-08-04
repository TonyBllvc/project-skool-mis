import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

export const useSignUpStudent = (url) => {
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()

    const signup = async ( surname, first_name, middle_name, session, reg_no, role, department, faculty, phone, email, password) => {

        setPending(true)
        setError(null)

        // add picture later 
        if (!surname || !first_name || !middle_name || !role || !session || !reg_no || !department || !faculty || !phone || !email || !password) {
            toast({
                title: 'Please fill all the Fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setPending(false)
            return
        }

        // const regNo = reg_no

        const details = { surname, first_name, middle_name, session, reg_no, role, department, faculty, phone, email, password }
        try {

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await res.json()

            if (!res.ok) {
                setPending(false)
                setError(json.error)
                toast({
                    title: json.error,
                    message: "message" + json.message + " error "+ json.error,
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                })
                return
            }
            if (res.ok) {
                toast({
                    title: 'Login Successful!',
                    description: email + 'Has signed up successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
                // save user to local storage
                navigate('/login')
            }

            setPending(false)

        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setPending(false)

        }
    }

    return { signup, pending, error, setPending }
}

// export default useSignUpStudent;
