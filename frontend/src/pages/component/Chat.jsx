import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box } from "@chakra-ui/react";
import MyChats from "../../Components/MyChats";
import ChatBox from "../../Components/ChatBox";
import { useNavigate } from "react-router-dom";
import ChatNav from '../../miniComponents/ChatNav'

const Chat = ({ isActive }) => {
  const { user } = useAuthContext()
  // const { user } = ChatState()
  const navigate = useNavigate()
  const [ fetchAgain, setFetchAgain ] = useState('')

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))

    if (!userInfo) {
      navigate("/")
      console.log('incorrect')
    }
  }, [navigate])

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {user &&
        <ChatNav isActive={isActive} />
      }
      <Box w='100%' display='flex' justifyContent='space-between' h='91.5vh' bg='blue.200' >
      
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default Chat;
