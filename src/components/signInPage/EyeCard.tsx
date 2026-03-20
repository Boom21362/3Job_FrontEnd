'use client'
import { Eye } from "./Eye";

// Sub-components used inside the Card
function Eyes() {
  return (
    <div className="relative shrink-0 flex gap-1 justify-center">
      <Eye isRightEye={false} />
      <Eye isRightEye={true} />
    </div>
  );
}

function Monster() {
  return (
    <div className="relative w-full h-[320px] overflow-hidden rounded-t-sm" 
         style={{ backgroundColor: "#0062AD" }}>
      <div className="flex items-center justify-center h-full">
        <Eyes />
      </div>
    </div>
  );
}

export function EyeCard() {
  return (
    /* The main "Poster" background */
    <div className="w-full h-full bg-[#F5F5DC] shadow-lg border border-gray-200" style={{ maxWidth: '458px' }}>
      <div className="p-5 flex flex-col gap-4">
        <Monster />
        
        {/* The Text Legend */}
        <div className="text-black font-sans">
          <img
    src="/img/3joblogo.png"
    width={150}
    height={150}
    alt="3Job logo"
  />
          <p className="text-xl font-medium p-2">Book Interviews with your favorite companies 
            <div className="text-2xl font-bold">TODAY!</div></p>
        </div>
      </div>
    </div>
  );
}