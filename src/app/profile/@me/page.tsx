import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  // 1. Check session FIRST before accessing properties
  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  // 2. Now it is safe to get the accessToken
  const token = (session.user as any).accessToken;

  // 3. Final safety check: if we have a session but NO token for some reason
  if (!token) {
    console.error("Session exists but accessToken is missing!");
    return <div className="p-10">Error: Authentication token missing. Please re-login.</div>;
  }

  try {
    const profile = await getUserProfile(token);
    const createdAt = new Date(profile.data.createdAt);

   return (
  <div className="flex flex-col items-center justify-center min-h-[90vh] w-full py-10">

    <main className="bg-slate-100 p-10 rounded-xl shadow-xl border border-slate-200 
                     w-[450px] flex flex-col items-center text-center">
      
      <div className="w-1/2 mb-8">
        <img 
          className="w-full aspect-square rounded-full border-8 border-white object-cover shadow-md"
          src="/img/ProfilePic.png" 
          alt="Profile" 
        />
      </div>

      <div className="text-3xl font-bold text-[#0062AD] mb-6">
        Hello <span className="text-black">{profile.data.name}</span> !
      </div>
      
      <table className="table-auto border-separate border-spacing-y-3 text-slate-700 w-full max-w-[300px]">
        <tbody className="text-left">
          <tr>
            <td className="font-bold pr-4 text-xl">Email</td>
            <td>{profile.data.email}</td>
          </tr>
          <tr>
            <td className="font-bold pr-4 text-xl">Tel.</td>
            <td>{profile.data.telephone_number}</td>
          </tr>
          <tr>
            <td className="font-bold pr-4 text-xl">Member From</td>
            <td>{createdAt.toLocaleDateString('en-GB',{
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Asia/Bangkok"
            })}</td> 
          </tr>
        </tbody>
      </table>
      {session.user.role === 'admin' && (
                <Link href="/admin/dashboard" className="w-full pt-4">
                    <button className="w-full bg-[#0062AD] hover:bg-[#004a82] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group">
                        <span>Admin DashBoard</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </Link>
            )}
    </main>
  </div>
);
  } catch (error) {
    return <div className="p-10 text-red-500">Failed to load profile data from backend.</div>;
  }
}