import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useAuthContext } from '../../hooks/useAuthContext';

const MyProfile = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: user.title,
    surname: user.surname,
    first_name: user.first_name,
    middle_name: user.middle_name,
    role: user.role,
    department: user.department,
    faculty: user.faculty,
    phone: user.phone,
    email: user.email,
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success or navigate to another page
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle fetch error
    }
  };

  return (
    <Box mb='40px'>
      {/* the top section */}
      <div className='w-full'>
        <h1 className='text-lg sm:text-2xl cursor-pointer font-serif font-semibold text-green-600'>
          Welcome, {user.surname} {user.first_name}
        </h1>
      </div>

      <div className="mt-7  mb-10">
        {/* This would have model schema created */}
        <h2 className="text-green-500 text-base sm:text-2xl font-mono font-bold">
          Your Profile
        </h2>
      </div>

      <form onSubmit={handleSubmit} className='w-full flex justify-center'>

        <VStack w={['95%', '90%', '90%']} spacing='5px' color='black' >
          <Box width='100%' display='flex' flexDirection='row' justifyContent='space-around'>
            <Box width='46%'>
              <FormControl mb='25px'>
                <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}>Title</FormLabel>
                <Input
                  type="text" fontSize={['9.5', '12', '14', '15']} bg='green.100'
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mb='25px'>
                <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}>
                  Surname
                </FormLabel>
                <Input
                  type="text" fontSize={['9.5', '12', '14', '15']} bg='green.100'
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mb='25px'>
                <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}> First Name</FormLabel>
                <Input
                  type="text" fontSize={['9.5', '12', '14', '15']} bg='green.100'
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mb='25px'>
                <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}>Middle Name</FormLabel>
                <Input
                  type="text" fontSize={['9.5', '12', '14', '15']} bg='green.100'
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>

            <Box width='46%'>
              <FormControl mb='25px'>
                <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}>Faculty</FormLabel>
                <Input
                  type="text"
                  name="faculty" fontSize={['9.5', '12', '14', '15']} bg='green.100'
                  value={formData.faculty}
                  onChange={handleInputChange}
                  isDisabled
                />
              </FormControl>


              <FormControl mb='25px'>
                <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}>
                  Department
                </FormLabel>
                <Input
                  type="text"
                  name="department" fontSize={['9.5', '12', '14', '15']} bg='green.100'
                  value={formData.department}
                  onChange={handleInputChange}
                  isDisabled
                />
              </FormControl>


              <FormControl mb='25px'>
                <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}>
                  Phone Number
                </FormLabel>
                <Input
                  type="tel"
                  name="phone" fontSize={['9.5', '12', '14', '15']} bg='green.100'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mb='25px'>
                <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  name="email" fontSize={['9.5', '12', '14', '15']} bg='green.100'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>
          </Box>
          {/* Add other form controls for first_name, middle_name, role, department, faculty, phone, email */}

          <Box width='100%' display='flex' justifyContent='center'>
          <FormControl mb='25px'  width={['100%', '97%', '90%', '90%']}>
            <FormLabel color='black' fontWeight='semibold' fontSize={['12.5', '13', '16', '16.5']}>Password</FormLabel>
            <Input
              type="password"
              name="password" fontSize={['9.5', '12', '14', '15']} bg='green.100'
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>
          </Box>

          <Box width='100%' display='flex' justifyContent='center'>
            <Button color='white' colorScheme='whatsapp'  width={['100%', '97%', '90%', '90%']} style={{ marginTop: 15 }} type='submit' isLoading={loading}>
              Update Profile
            </Button>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};

export default MyProfile;
