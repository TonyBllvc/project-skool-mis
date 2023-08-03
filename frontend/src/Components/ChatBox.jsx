import React from 'react'
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../hooks/useNotifiContext';
import { useSelectChatContext } from '../hooks/useSelectChatContext';

// ***************************** Chat Interface ******************
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat} = useSelectChatContext()
  const {notification, setNotification } = useNotificationContext()
    // const { notification, dispatch: dispatchNotification } = useNotificationContext()
    // const { selectedChat,dispatch: dispatchSelectedChat } = useSelectedChatContext()
  const { user } = useAuthContext()

  return (
    <Box display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }} alignItems='center' flexDirection='column' p={3} bg='white' w={{ base: '100%', md: '65%' }} borderRadius='lg' borderWidth='1px' >
    
      <SingleChat user={user}  selectedChat={selectedChat} setSelectedChat={setSelectedChat}  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} notification={notification} setNotification={setNotification} />

    </Box>
  )
}

export default ChatBox;
