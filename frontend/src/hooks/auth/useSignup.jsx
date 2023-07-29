import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

export const useSignUp = (url) => {
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()

    const signup = async (title, surname, first_name, middle_name, role, department, faculty, phone, email, password) => {

        setPending(true)
        setError(null)

        // add picture later 
        if (!title || !surname || !first_name || !middle_name || !role || !department || !faculty || !phone || !email || !password) {
            toast({
                title: 'Please fill all the Fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return
        }

        const details = { title, surname, first_name, middle_name, role, department, faculty, phone, email, password }

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
                description: email + ' logged in successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top",
            })
            // save user to local storage
            navigate('/login')
        }

        setPending(true)

    }

    return { signup, pending, error, setPending }
}

// export default useSignUp;
