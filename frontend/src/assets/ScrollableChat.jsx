import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { Avatar, Tooltip } from '@chakra-ui/react'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/chatLogic'

const ScrollableChat = ({ messages, user }) => {
  return (
    <ScrollableFeed>
      {messages && messages.map((m, i) => (
        <div style={{ display: 'flex' }} key={m._id} >

          {
            ( isSameSender(messages, m, i, user._id) || isLastMessage(messages, m, user._id) ) && (
              <Tooltip label={m.sender.surname} placement='bottom-start' hasArrow >
                <Avatar mt='7px' mr={1} size='sm' cursor='pointer' name={m.sender.surname} src={m.sender.pic} />
              </Tooltip>
            )}

          <span style={{ backgroundColor: `${m.sender._id === user._id ? 'white' : '#b9f5d0'}`, borderRadius: '20px', padding: '5px 15px', maxWidth: '75%', marginLeft: isSameSenderMargin(messages, m, i, user._id), marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10 }} >
            {m.content}
          </span>

        </div>

      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
