import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
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
    return (
      <div className="p-10">
        Error: Authentication token missing. Please re-login.
      </div>
    );
  }

  try {
    const profile = await getUserProfile(token);
    const createdAt = new Date(profile.data.createdAt);

    return (
      <div className="flex flex-col items-center justify-center w-full">
        <main
          className="bg-white/80 backdrop-blur-md p-6 md:p-10 rounded-[32px] shadow-xl border border-white/80 
               w-full max-w-[450px] flex flex-col items-center text-center transition-all duration-300"
        >
          {/* Profile Image - Responsive Container */}
          <div className="w-32 h-32 md:w-40 md:h-40 mb-6">
            <img
              className="w-full h-full rounded-full border-4 border-white object-cover shadow-lg transition-all duration-500 hover:rotate-5 hover:scale-110"
              src="/img/ProfilePic.png"
              alt="Profile"
            />
          </div>

          {/* Greeting */}
          <div className="text-2xl md:text-3xl font-black text-[#0062AD] mb-6 leading-tight">
            Hello
            <span className="text-black"> {profile.data.name}</span>!
          </div>

          {/* Info List - Switched from Table to Divs for better scaling */}
          <div className="w-full space-y-4 mb-8 text-sm md:text-base">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start border-b border-slate-100 pb-2 gap-1">
              <span className="font-bold text-[#0062AD] uppercase text-[10px] tracking-widest">
                Email
              </span>
              <span className="text-slate-600 break-all">
                {profile.data.email}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start border-b border-slate-100 pb-2 gap-1">
              <span className="font-bold text-[#0062AD] uppercase text-[10px] tracking-widest">
                Tel.
              </span>
              <span className="text-slate-600">
                {profile.data.telephone_number}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start border-b border-slate-100 pb-2 gap-1">
              <span className="font-bold text-[#0062AD] uppercase text-[10px] tracking-widest">
                Joined
              </span>
              <span className="text-slate-600 text-center sm:text-right">
                {createdAt.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {session.user.role === "admin" && (
            <Link href="/admin/dashboard" className="w-full">
              <button className="w-full bg-[#0062AD] hover:bg-[#004a82] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group active:scale-95">
                <span>Admin Dashboard</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </Link>
          )}
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-10 text-red-500">
        Failed to load profile data from backend.
      </div>
    );
  }
}
