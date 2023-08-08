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

        <VStack w={['90%', '85%', '70%']} spacing='5px' color='black' >
          <FormControl>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>Surname</FormLabel>
            <Input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}> First Name</FormLabel>
            <Input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>Middle Name</FormLabel>
            <Input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleInputChange}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>Faculty</FormLabel>
            <Input
              type="text"
              name="surname"
              value={formData.faculty}
              onChange={handleInputChange}
              isDisabled
            />
          </FormControl>

          
          <FormControl>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>Department</FormLabel>
            <Input
              type="text"
              name="surname"
              value={formData.department}
              onChange={handleInputChange}
              isDisabled
            />
          </FormControl>

          {/* Add other form controls for first_name, middle_name, role, department, faculty, phone, email */}

          <FormControl>
            <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={loading}>
            Update Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default MyProfile;
