import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { Avatar, Tooltip, useToast } from '@chakra-ui/react'
import { HiTrash } from 'react-icons/hi'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser, isUserMessage } from '../config/chatLogic'


// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app'
const ScrollableChat = ({ setMessages, messages, user, toggle, setToggle }) => {
  const toast = useToast()

  const deleteMessage = async (MessageId) => {

    try {

      const response = await fetch('https://my-project-mis-api.onrender.com/api/message/' + MessageId, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        }
      })
      // const json = await response.json();

      if (response.ok) {
        setMessages((prev) => prev.filter((data) => data._id !== MessageId))
      }

      if (!response.ok) {
        toast({
          title: 'Error Occurred!',
          // description: e,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "top",
        })
        return

      }

    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      return

    }
  }

  // Sort the messages based on their creation date (assuming messages have a 'createdAt' property)
  const sortedMessages = messages.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));


  const renderDeleteButton = (m) => {
    if (toggle && m._id && m.chat_owner._id && m.sender._id === user._id) {
      return (
        <HiTrash className='text-base text-red-500 font-semibold mt-1 cursor-pointer' onClick={() => deleteMessage(m._id)} />
      );
    }
    return null;
  };

  return (
    <ScrollableFeed>

      {messages && messages.map((m, i) => (
        <div style={{ display: 'flex' }} key={m._id} onClick={() => (m._id && user._id && m.chat_owner._id && m.sender._id ? setToggle(!toggle) : '')} >

          {
            (isSameSender(messages, m, i, user._id) || isLastMessage(messages, m, user._id)) && (
              <Tooltip label={m.sender.surname} placement='bottom-start' hasArrow >
                <Avatar mt='7px' mr={1} size='sm' cursor='pointer' name={{m.sender.surname} {m.sender.first_name}} src={m.sender.pic} />
              </Tooltip>
            )}

          <span style={{ backgroundColor: `${m.sender._id === user._id ? 'white' : '#b9f5d0'}`, borderRadius: '20px', padding: '5px 15px', maxWidth: '75%', marginLeft: isSameSenderMargin(messages, m, i, user._id), marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10 }} >
            {m.content}
          </span>
          {renderDeleteButton(m)}
        </div>

      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
