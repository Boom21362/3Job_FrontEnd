'use client'
import { VlogPlayer } from "./VlogPlayer";
import { useState } from "react";
import { Rating } from "@mui/material";
import { useWindowListener } from "@/hooks/useWindowListener";
import {Box} from "@mui/material";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export function TravelCard(){
    const router = useRouter();
    const {data:session} = useSession() 
    console.log(session?.user.token)
    const [playing,setPlaying] = useState(true);

    return(
        <div className="w-[80%] shadow=lg mx-[10%] my-10 p- 2 rounded-lg bg-gray-200 flex flex-row">
            <VlogPlayer vdoSrc="/video/Generic_Recruitment_Ads.mp4" isPlaying={playing}></VlogPlayer>
            <div className="m-5"> 
                <p className="text-2xl font-medium p-2 ">@ 3Jobs Book Interviews with your favorite companies 
            <div className="text-2xl font-bold text-[#0062AD]">TODAY!</div></p>
                <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="text-feedback"
        value={4.5}
        readOnly
        precision={0.5}
      />
      <Box sx={{ ml: 2, fontWeight:"bold", fontSize:40}}>4.5</Box>
    </Box>
    { session? <button className='bg-[#F5F5DC] text-[#0062AD] border border-[#0062AD] font-semibold py-2 px-2 m-2 rounded z-30 absolute
                hover:bg-cyan-600 hover:text-white hover:border-transparent hover:cursor-pointer'
                onClick={(e)=>{ e.stopPropagation(); router.push('/profile')}}>
                    To your Profile!
                </button>:<button className='bg-white text-[#0062AD] border border-[#0062AD] font-semibold py-2 px-2 m-2 rounded z-30 absolute 
                hover:bg-cyan-600 hover:text-white hover:border-transparent hover:cursor-pointer'
                onClick={(e)=>{ e.stopPropagation(); router.push('/api/auth/signin')}}>
                    Create Interviews NOW!
                </button>}
            </div>
        </div>
    );
}