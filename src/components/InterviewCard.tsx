"use client";

import Link from "next/link";
import deleteInterview from "@/libs/deleteInterview";
import { useRouter } from "next/navigation";

interface InterviewCardProps {
  item: any;
  isAdmin: boolean;
  token: string;
}

export default function InterviewCard({
  item,
  isAdmin,
  token,
}: InterviewCardProps) {
  const router = useRouter();

  const calculateDaysLeft = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Passed";
    if (diffDays === 0) return "Today";
    return `${diffDays} days left`;
  };

  const daysLeft = calculateDaysLeft(item.intDate);
  const titleDisplay = isAdmin
    ? item.user?.name || "Candidate"
    : item.company?.name || "Company";
  const subTitleDisplay = isAdmin
    ? item.company?.name || "Company"
    : item.user?.name || "Your Profile";

  const handleDelete = async (e: React.MouseEvent) => {
    // Prevent the card click from triggering when deleting
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this interview?")) {
      try {
        await deleteInterview(item._id, token);
        router.refresh();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const handleCardClick = () => {
    router.push(`/interview/${item._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative group bg-white px-6 py-4 mr-1 rounded-2xl shadow-md border border-slate-200 flex items-center justify-between transition-all duration-100 hover:shadow-lg hover:scale-[1.005] hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative w-16 h-16 bg-[#3F3E3D] rounded-xl flex items-center justify-center border-4 border-[#FDFCE5] shadow-sm flex-shrink-0 transition-all duration-500 group-hover:scale-110">
          <span className="text-white text-2xl font-bold">
            {titleDisplay[0]}
          </span>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-black leading-tight">
            {titleDisplay}
          </h3>
          <p className="text-slate-500 font-medium text-md">
            {subTitleDisplay}
          </p>

          <div className="flex items-center gap-4 mt-2 pt-2 border-t border-slate-100">
            <span className="text-[#0062AD] text-sm font-bold underline">
              Date:{" "}
              {new Date(item.intDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <div
              className={`flex items-center gap-1.5 text-sm font-bold ${daysLeft === "Passed" ? "text-slate-400" : "text-red-600"}`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
              </svg>
              <span>{daysLeft}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Edit Button */}
      <div className="pl-4" onClick={(e) => e.stopPropagation()}>
        <Link href={`/interview/${item._id}/edit`}>
          <button className="bg-[#0062AD] hover:bg-[#004a82] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md text-sm leading-tight text-center flex-shrink-0 active:scale-95">
            Edit
            <br />
            Interview
          </button>
        </Link>
      </div>

      {/* Delete Icon */}
      <button
        onClick={handleDelete}
        className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-md border border-slate-100 hover:scale-125 hover:rotate-2 transition-transform z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
