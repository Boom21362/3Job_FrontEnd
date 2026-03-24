'use client'
import { VlogPlayer } from "./VlogPlayer";
import { useState } from "react";
import { Rating } from "@mui/material";
import { Box } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export function TravelCard(){
    const router = useRouter();
    const {data:session} = useSession() 
    const [playing,setPlaying] = useState(true);

   return (
  <div className="w-[90%] max-w-5xl mx-auto my-10 p-6 rounded-xl bg-gray-200 shadow-2xl flex flex-col md:flex-row items-center gap-8">
    
    {/* VIDEO SIDE - Takes up half the card */}
  <div className="w-full md:w-1/2 h-full min-h-[300px] flex justify-center items-center overflow-hidden rounded-lg bg-black">
  <VlogPlayer vdoSrc="/video/Generic_Recruitment_Ads.mp4" isPlaying={playing} />
</div>  

    {/* TEXT & BUTTON SIDE - Takes up the other half */}
    <div className="w-full md:w-1/2 flex flex-col space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          @ 3job. Book Interviews with your favorite companies
        </h2>
        <span className="text-3xl font-extrabold text-[#0062AD]">TODAY!</span>
      </div>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Rating name="read-only" value={4.5} precision={0.5} readOnly />
        <Box sx={{ ml: 2, fontWeight: "bold", fontSize: 28 }}>4.5</Box>
      </Box>

      {/* Button is now part of the flow, no more "weird" floating */}
      <button 
        className='w-full bg-white text-[#0062AD] border-2 border-[#0062AD] font-bold py-4 rounded-lg transition-all
                   hover:bg-[#0062AD] hover:text-white text-xl shadow-md active:scale-95'
        onClick={(e) => { e.stopPropagation(); router.push(session ? '/profile' : '/auth/register') }}
      >
        {session ? "To your Profile!" : "Create Interviews NOW!"}
      </button>
    </div>
  </div>
);}