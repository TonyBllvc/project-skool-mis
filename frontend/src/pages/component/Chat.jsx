import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box } from "@chakra-ui/react";
import MyChats from "../../Components/MyChats";
import ChatBox from "../../Components/ChatBox";
import { useNavigate } from "react-router-dom";
import ChatNav from '../../miniComponents/ChatNav'
import logoFav from '../../images/images_logo_fav.jpg'

const Chat = () => {
  const { user } = useAuthContext()
  // const { user } = ChatState()
  const navigate = useNavigate()
  const [ fetchAgain, setFetchAgain ] = useState('') 
  
  useEffect(() => {
    document.title = 'Chat'

    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = logoFav; // Replace with your favicon path
    document.head.appendChild(faviconLink);

    // Clean up when component unmounts
    return () => {
      document.head.removeChild(faviconLink);
    }
  }, [])

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("user"))

    if (!userInfo) {
      navigate("/")
      console.log('No user')
    }
  }, [navigate])

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {user &&
        <ChatNav />
      }
      <Box w='100%' display='flex' justifyContent='space-between' h='91.5vh' bg='blue.200' >
      
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default Chat;
