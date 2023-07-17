import { Box, Button, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images/images_logo.jpg'
import bg from '../images/isolBook.png'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

const Home = () => {
    return (
        <div className='w-full h-full '>

            {/* avigation system */}
            <nav className='w-full h-24 relative flex flex-row justify-between px-3 items-center'>
                <div className='w-1/3 flex pl-5'>
                    <NavLink>
                        <Image src={logo} borderRadius='none' bgPosition='center' boxSize='65px' w='150px' h='95px' alt='logo' />

                        {/* <img src={} alt='logo/> */}
                    </NavLink>
                </div>
                <div className='flex justify-center w-1/3 pr-5'>
                    <NavLink to='/' className={({isActive}) => isActive ? ' text-lg font-serif mr-5 text-green-500 border-green-400 border-solid border-b-2 ' : ' text-lg font-serif mr-5 text-green-500'} >
                        Home
                    </NavLink>
                    <NavLink to='/dashboard'  className={({isActive}) => isActive ? ' text-lg font-serif mr-5 text-green-500 border-green-400 border-solid border-b-2 ' : ' text-lg font-serif mr-5 text-green-500'} >
                        About Us
                    </NavLink>
                    <NavLink to='/contact' className={({isActive}) => isActive ? ' text-lg font-serif mr-5 text-green-500 border-green-400 border-solid border-b-2 ' : ' text-lg font-serif mr-5 text-green-500'}>
                        Contact Us
                    </NavLink>
                </div>
                <div className='flex justify-end w-1/3 pr-3'>
                    <NavLink to='/login' >
                        <Button colorScheme='whatsapp' mr={3} variant='outline' >
                            Join In
                        </Button>
                    </NavLink>
                    <NavLink to='/sign_up' >
                        <Button colorScheme='whatsapp' variant='solid' >
                            Get Started
                        </Button>
                    </NavLink>
                </div>
            </nav>

            {/* Body */}
            <Box width='100%'>
                <Box width="100%" display='flex' mt={10} flexDirection='row' justifyContent='center'>
                    {/*  content on left  */}
                    <Box width='46%' ml={20} zIndex={2} position='relative'>
                        <Box width='100%' height='100%' display='flex' flexDirection='column' justifyContent='center'>
                            <Box height='30%' zIndex={2}  whiteSpace='break-spaces'>
                                <Text fontWeight='bold' lineHeight='70px' wordSpacing='30px' fontFamily='heading' fontSize={['30', '30', '45']} >
                                    Learn Core with Beauty
                                </Text>
                            </Box>
                            <Box height='30%' mt={1} zIndex={2} whiteSpace='break-spaces'>
                                <Text fontWeight='semibold' fontFamily='body' fontSize={['15', '20', '26']}>
                                    Experience enhanced learning and management in beauty and elegance
                                </Text>
                            </Box>
                            <Box height='30%' mt={30}  zIndex={2}  whiteSpace='break-spaces'>
                                <NavLink to='/login' >
                                    <Button colorScheme='whatsapp' boxShadow='2xl' rounded='lg' fontSize={21} py={8} px={7} variant='solid' >
                                        Let's get started
                                        <BsFillArrowRightCircleFill className='text-4xl text-center font-serif ml-4' />
                                    </Button>
                                </NavLink>
                            </Box>
                        </Box>
                    </Box>

                    {/* content on right  */}
                    <Box width='50%' mr={20} zIndex={10} height='100%' position='relative'>
                        <Box width='100%' height='100%'  zIndex={10} >
                            <Box  mt={-10} ml={-4} backgroundImage={`url(${bg})`} backgroundRepeat='no-repeat' backgroundSize='contain' backgroundPosition='center' height='490px' width='100%' zIndex={10}>
                                {/* For background */}
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>

            {/* Second Body */}

        </div>
    )
}

export default Home
