import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useAuthContext } from './AuthContext'; // Adjust the path based on your context file

const ProfilePage = () => {
  const { user } = useAuthContext();
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
      <Text>Update Your Profile</Text>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Surname</FormLabel>
          <Input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Add other form controls for first_name, middle_name, role, department, faculty, phone, email */}

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button type="submit">Update Profile</Button>
      </form>
    </Box>
  );
};

export default ProfilePage;
