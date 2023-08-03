import { useContext } from "react";
import { ChatContext } from "../context/ChatProvider";

export const useChatState = () => {
    const context = useContext(ChatContext)
  
    if(!context){
      throw Error('not assigned')
    }
  
    return context;
  }