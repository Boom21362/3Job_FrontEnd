import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import InterviewCard from "@/components/InterviewCard";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/auth/signin");
  }
  const isAdmin = session?.user?.role === "admin";

  const token = (session.user as any).accessToken;

  if (!token) {
    console.error("Session exists but accessToken is missing!");
    return (
      <div className="p-10">
        Error: Authentication token missing. Please re-login.
      </div>
    );
  }

  try {
    const interviewData = await getInterviews(token);
    const interviews = interviewData.data || [];

    return (
      <div className="w-full flex flex-col items-center bg-slate-100 p-8 rounded-xl shadow-xl border border-slate-200 min-h-[80vh]">
        <h2 className="text-2xl font-bold mb-6 text-black ">Interviews</h2>

        <div className="flex-grow overflow-y-auto pr-2 py-2 space-y-6 custom-scrollbar">
          {interviews.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-slate-500 italic">
                No interviews scheduled yet.
              </p>
            </div>
          ) : (
            interviews.map((item: any) => (
              <InterviewCard
                key={item._id}
                item={item}
                isAdmin={isAdmin}
                token={token}
              />
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-10 text-red-500">
        Failed to load interviews data from backend.
      </div>
    );
  }
}
