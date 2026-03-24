import Banner from "@/components/Banner";
import { TravelCard } from "@/components/TravelCard";

export default function Home() {
  return (
      <main className="h-100vh w-full overflow-hidden flex flex-col bg-gradient-to-br from-[#0062AD] via-[#004a82] to-[#002d54]">
       <div className="flex-none">
        <Banner />
      </div>
       <div className="flex-1 flex items-center justify-center p-4 min-h-0">
           <TravelCard />
      </div>
      </main>
    
  );
}
