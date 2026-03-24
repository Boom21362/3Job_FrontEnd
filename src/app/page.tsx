import Banner from "@/components/Banner";
import { TravelCard } from "@/components/TravelCard";

export default function Home() {
  return (
      <main className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-[#0062AD] via-[#004a82] to-[#002d54]">
       <Banner/>
       <TravelCard/>
      </main>
    
  );
}
