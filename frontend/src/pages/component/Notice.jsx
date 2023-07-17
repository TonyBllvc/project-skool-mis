import { Avatar, Box, Card, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import NoticeDetails from '../../Components/NoticeDetails'
import { useNoticeContext } from "../../hooks/useNoticeContext.jsx"

const Notice = () => {
    const { notice, dispatch } = useNoticeContext()

    useEffect(() => {
        const fetchSession = async () => {
            const res = await fetch('api/notice/get_notice')
            const json = await res.json()

            if (!res.ok) {
                return console.log(json.error)
            }

            if (res.ok) {
                dispatch({ type: 'GET_DATA', payload: json })
            }
        }
        fetchSession()

    }, [])


    return (
        <Box width='100%' display='flex' flexDirection='column' >
            <Box mb='10px' ml='10px'>
                <Text fontFamily='heading' fontSize='30px' fontWeight='bold'>
                    Notice
                </Text>
            </Box>
            <hr />
            <Box mt='10px'>
                {notice && notice.map((notice, index) => (
                    <NoticeDetails notice={notice} key={index} />
                ))}
            </Box>

        </Box>
    )
}

export default Notice