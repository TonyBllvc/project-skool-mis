import { useContext } from "react";
import { SelectedChatContext } from "../context/SelectedChatProvider";

export const useSelectChatContext = () => {
    const context = useContext(SelectedChatContext)
  
    if(!context){
      throw Error('not assigned')
    }
  
    return context;
  }