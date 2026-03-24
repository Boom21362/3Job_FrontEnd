'use client'
import { useWindowListener } from "@/hooks/useWindowListener";
import { useRef,useEffect, useState } from "react";

export function VlogPlayer({vdoSrc, isPlaying} : {vdoSrc:string,isPlaying:boolean}){

    const vdoRef = useRef<HTMLVideoElement>(null)

    useEffect(()=>{
        //alert(vdoRef.current?.videoWidth)
         if(isPlaying){
        vdoRef.current?.play()
    }else{
        vdoRef.current?.pause()
    }
    },[isPlaying])

    useWindowListener("resize",(e)=>{})

    return (
  <video 
    src={vdoSrc} 
    className="w-full h-full object-cover" // This makes it fill the container
    controls loop muted
    autoPlay={isPlaying}
  />
);
}