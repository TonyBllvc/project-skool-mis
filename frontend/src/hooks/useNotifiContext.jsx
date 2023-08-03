import { useContext } from "react";
import { NotifyContext } from "../context/NotificationProvider";

export const useNotificationContext = () => {
    const context = useContext(NotifyContext)
  
    if(!context){
      throw Error('not assigned')
    }
  
    return context;
  }