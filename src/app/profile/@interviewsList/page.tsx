import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const token = (session.user as any).accessToken;


   if (!token) {
    console.error("Session exists but accessToken is missing!");
    return <div className="p-10">Error: Authentication token missing. Please re-login.</div>;
  }
  try{
    //getInterviews TODO: PLEASE ADD INTERVIEWS LIST TO HERE (use @me/page.tsx for ref.)
     
    return(<div className="flex flex-col items-center justify-center min-h-[90vh] w-full py-10">

    <main className="bg-slate-100 p-10 rounded-xl shadow-xl border border-slate-200 
                     w-[450px] flex flex-col items-center text-center">

        <div className="text-3xl font-bold text-[#0062AD] mb-6">
        ADD interview lists here!! (Check Figma for more info)
      </div>
    </main>
    </div> 
            
    );}  
    catch (error) {
    return <div className="p-10 text-red-500">Failed to load profile data from backend.</div>;
  }
}