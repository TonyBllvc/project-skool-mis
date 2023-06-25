import { Button, Image } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images/images-71.jpg'
import bg from '../images/isolBook.jpg'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

const Home = () => {
    return (
        <div className='w-full h-full '>

            {/* avigation system */}
            <nav className='w-full h-20 relative flex flex-row justify-between px-3 items-center'>
                <div className='w-1/2 flex pl-5'>
                    <NavLink>
                        <Image src={logo} borderRadius='none' bgPosition='center' boxSize='65px' w='70px' h='55px' alt='logo' />

                        {/* <img src={} alt='logo/> */}
                    </NavLink>
                </div>
                <div className='flex justify-center w-1/2 pr-5'>
                    <NavLink to='/' className=' text-lg font-serif mr-5 text-green-500 border-green-400 border-solid border-b-2 ' >
                        Home
                    </NavLink>
                    <NavLink to='/dashboard' className=' text-lg font-serif mr-5 text-green-500   ' >
                        About Us
                    </NavLink>
                    <NavLink to='/contact' className=' text-lg font-serif mr-5 text-green-500   ' >
                        Contact Us
                    </NavLink>
                </div>
                <div className='flex justify-end w-1/2 pr-5'>
                    <NavLink to='/login' >
                        <Button colorScheme='whatsapp' mr={3} variant='outline' >
                            Join In
                        </Button>
                    </NavLink>
                    <NavLink to='/signup' >
                        <Button colorScheme='whatsapp' variant='solid' >
                            Get Started
                        </Button>
                    </NavLink>
                </div>
            </nav>

            {/* Body */}
            <div className='w-full h-auto flex flex-row '>
                <div className='w-1/2 ml-12 mt-9'>
                    <div className='w-full h-full flex flex-col justify-center pl-32 pr-3'>
                        <div className=' h-1/2 mt-14 flex items-center'>
                            <h1 className='font-bold font-serif text-7xl'>
                                Learning Core with beauty
                            </h1>
                        </div>
                        <div className=' h-1/2 flex justify-end items-center'>
                            <h3 className=' font-serif text-3xl'>
                                Experience enhanced learning and management in beauty and elegance
                            </h3>
                        </div>
                        <div className=' h-1/3 flex items-start pt-7'>
                            <NavLink to='/login'>
                                <Button colorScheme='whatsapp' boxShadow='2xl' rounded='lg' fontSize={21} py={8} px={7} variant='solid' >
                                    Let's get started
                                    <BsFillArrowRightCircleFill className='text-4xl text-center font-serif ml-4' />
                                </Button>
                            </NavLink>
                        </div>
                    </div>

                </div>
                <div className='w-1/2'>
                    <div className='w-full h-full pr-3'>
                        <div className='w-full' style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'relative', backgroundPosition: 'center', height: '520px' }}>
                            {/*  Right hand background image( with books) */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Body */}

        </div>
    )
}

export default Home
