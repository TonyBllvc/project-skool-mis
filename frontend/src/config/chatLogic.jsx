import React,{ } from 'react'

export const getSender = (loggedUser, users) => {
  // for private chats ( single user chats)
  // for every users' array, if the first user in the array is ...
  // .. the logged in user id, parse the name o the second user...
  // .. else, return first user
  return users[0]._id === loggedUser._id ? (users[1].surname, users[1].first_name)  : users[0].surname
}

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0]
}

// ************************** Single Chats ***********************************

// messages - takes the messages
// m - current messages
// i - index of messages
// userId - user id 
export const isSameSender = (messages, m, i, userId) => {
  return (
    // check if less that length of all messages
    i < messages.length - 1 && (
      // 1st logic - if next message is not equal to the next sender]
      // or
      // 2nd logic - if message is undefined 
      // and
      // 3rd logic - if current message is not qual to current id 
      messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) && messages[i].sender._id !== userId
  )
}

export const isLastMessage = (messages, i, userId) => {
  return (
    // 1st logic - if last message of other user
    // and
    // 2nd logic - the id of the last message array is not equal to current logged user id
    // and
    // 3rd logic - message actually exists
    i === messages.length - 1 && messages[messages.length - 1].sender._id !== userId && messages[messages.length - 1].sender._id
  )
}

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    // if it is same ender logged in, return 33 marin
    i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id && messages[i].sender._id !== userId) {
    return 33
  } else if (
    // else return 0
    (i < messages.length - 1 && messages[i + 1].sender._id !== m.sender._id && messages[i].sender._id !== userId) || (i === messages.length - 1 && messages[i].sender._id !== userId)) {
    return 0 
  } else {
    return 'auto'
  }
}

export const isSameUser = (messages, m, i) => {
  // is index greater than 0, and if sender id of previous message is equal to id of current sender
  return i > 0 && messages[i - 1].sender._id === m.sender._id
}

// *********************************************************