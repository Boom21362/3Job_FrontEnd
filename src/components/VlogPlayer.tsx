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

    useWindowListener("resize",(e)=>{alert('Window width : '+ (e.target as Window).innerWidth)})

    return(
        <video className="w-[40%]" ref={vdoRef} src={vdoSrc} controls loop muted/>
    );
}