import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useTimeContext } from '../../hooks/useTimeContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useChangePassword } from '../../hooks/auth/useChangePassword';

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app';
const ChangePassword = () => {
  const { time } = useTimeContext()
  const { user } = useAuthContext()
  const [show, setShow] = useState(false)

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [url, setUrl] = useState('')

  const { change, pending, error } = useChangePassword(url)
  const toast = useToast()

  const handleShowHide = () => {
    setShow(!show)
    // this i so the password is not changed
    // setGuestShow(guestShow)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.role === 'Admin') {
      setUrl('https://my-project-mis-api.onrender.com/api/admin/update_password')
      await change(password, newPassword, confirmNewPassword)
    } else if (user.role === 'Student') {
      setUrl('https://my-project-mis-api.onrender.com/api/student/update_password')
      await change(user._id, password, newPassword, confirmNewPassword)
    } else if (user.role === 'Lecturer') {
      setUrl('https://my-project-mis-api.onrender.com/api/lecturer/update_password')
      await change(user._id, password, newPassword, confirmNewPassword)
    }

    // change(password, newPassword, confirmNewPassword)
  }

  return (
    <Box>
      {/* the top section */}
      <div className='w-full'>
        <h1 className='text-lg sm:text-2xl cursor-pointer font-serif font-semibold text-green-600'>
          Welcome, {user.surname} {user.first_name}
        </h1>
      </div>

      <div className="mt-7  mb-10">
        {/* This would have model schema created */}
        <h2 className="text-green-500 text-base sm:text-2xl font-mono font-bold">
          Change Password
        </h2>
      </div>

      <form onSubmit={handleSubmit} className='w-full flex justify-center'>

        <VStack w={['90%', '85%', '60%', '50%']} spacing='5px' color='black' >
          <FormControl w='100%' isRequired>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>Current Password</FormLabel>
            <InputGroup><Input height={['35px', '35px', '40px', '40px']} type={show ?
              'text' : 'password'} fontSize={['9.5', '12', '14', '15']} bg='green.100' placeholder='Type Current password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' fontSize={['12.5', '13', '15', '16']} onClick={handleShowHide}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl w='100%' isRequired>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>New Password</FormLabel>
            <InputGroup><Input height={['35px', '35px', '40px', '40px']} type={show ?
              'text' : 'password'} fontSize={['9.5', '12', '14', '15']} bg='green.100' placeholder='Type new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' fontSize={['12.5', '13', '15', '16']} onClick={handleShowHide}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl w='100%' isRequired>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>Confirm New Password</FormLabel>
            <InputGroup>
              <Input height={['35px', '35px', '40px', '40px']} type={show ?
                'text' : 'password'} fontSize={['9.5', '12', '14', '15']} bg='green.100' placeholder='Confirm password'
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' fontSize={['12.5', '13', '15', '16']} onClick={handleShowHide}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button color='white' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={pending}>
            Change Password
          </Button>
          {error && <div className="text-red-700 font-bold mt-3 text-center border-red-700 border-solid border-2"> {error} </div>}
        </VStack>
      </form>
    </Box>
  );
};

export default ChangePassword;
