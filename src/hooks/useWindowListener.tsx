import { useState,useEffect } from "react"

export function useWindowListener(eventType:string,listener:EventListener){
    const [winwinth, setWinWidth] = useState(0)
    useEffect(()=>{
    
        window.addEventListener(eventType,listener)
        
        return ()=>{
            window.removeEventListener(eventType,listener)
        }
    }, [] )
}