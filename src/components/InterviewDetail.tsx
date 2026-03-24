"use client";
import Link from "next/link";
import dayjs from "dayjs";

export default function InterviewDetailView({
  interview,
  isAdmin,
  token,
  iid,
}: {
  interview: any;
  isAdmin: boolean;
  token: string;
  iid: string;
}) {
  console.log("Full Interview Data:", interview);
  const interviewDate = dayjs(interview.bookingDate || interview.intDate);
  const company = interview.company;

  return (
    <main className="min-h-screen bg-[#F9F9F1] p-4 md:p-8 lg:px-[60px] font-sans relative">
      {/* 1. Header Banner */}
      <div className="absolute top-0 left-0 right-0 z-0 w-full h-[250px] overflow-hidden shadow-inner bg-[#1a1a2e] rounded-b-[40px]">
        <div className="w-full h-full flex items-center justify-center text-white/5 text-5xl md:text-7xl font-black italic uppercase select-none">
          Interview Details
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* 2. Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mt-[160px] mb-10 p-4">
          <div className="w-[140px] h-[140px] bg-[#3F3E3D] rounded-3xl border-4 border-[#F9F9F1] shadow-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
            {company?.compimgsrc ? (
              <img
                src={company.compimgsrc}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl font-bold text-white uppercase">
                {company?.name?.[0] || "I"}
              </span>
            )}
          </div>

          <div className="flex-1 text-center md:text-left pb-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {company?.name || "Interview Session"}
            </h1>
            {/* Added Specializations Tags from Schema */}
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              {company?.specializations?.map((spec: string, i: number) => (
                <span
                  key={i}
                  className="text-[10px] bg-[#E6F1FB] text-[#0062AD] rounded-full px-3 py-1 font-bold uppercase tracking-wider"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-2">
            <Link href={`/interview/${iid}/edit`}>
              <button className="px-6 py-3 bg-[#008EFB] hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md active:scale-95">
                Edit Schedule
              </button>
            </Link>
          </div>
        </div>

        {/* 3. Info Glass Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/20 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: Schedule */}
            <div className="space-y-8">
              <div>
                <span className="text-xs font-bold text-[#0062AD] uppercase tracking-[0.2em] block mb-2">
                  Scheduled Date
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-slate-800">
                    {interviewDate.format("DD")}
                  </span>
                  <span className="text-xl font-bold text-slate-700">
                    {interviewDate.format("MMMM")}
                  </span>
                  <span className="text-xl font-bold text-slate-700">
                    {interviewDate.format("YYYY")}
                  </span>
                </div>
                <span className="text-md text-slate-700 font-medium italic mt-1 block">
                  {interviewDate.format("dddd")}
                </span>
              </div>

              {/* Added Website from Schema */}
              <div>
                <span className="text-xs font-bold text-[#0062AD] uppercase tracking-[0.2em] block mb-2">
                  Company Website
                </span>
                <a
                  href={company?.website}
                  target="_blank"
                  className="text-lg text-blue-600 hover:underline font-medium break-all"
                >
                  {company?.website || "No website provided"}
                </a>
              </div>
            </div>

            {/* Right Column: Schema Contact Info */}
            <div className="space-y-8 border-l border-slate-100 pl-0 md:pl-12">
              <div>
                <span className="text-xs font-bold text-[#0062AD] uppercase tracking-[0.2em] block mb-2">
                  Telephone (tel)
                </span>
                <span className="text-xl text-slate-800 font-medium">
                  {company?.tel || "N/A"}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#0062AD] uppercase tracking-[0.2em] block mb-2">
                  Office Address
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {company?.address || "Please contact company for details."}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Description Section from Schema */}
          <div className="mt-12 pt-10 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              About {company?.name}
            </h3>
            <p className="text-slate-600 leading-relaxed italic">
              "
              {company?.description ||
                "No description available for this company."}
              "
            </p>

            <div className="mt-8">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Preparation Checklist
              </h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg text-slate-600 text-sm border border-slate-100">
                  ✅ Resume Printed
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg text-slate-600 text-sm border border-slate-100">
                  ✅ Portfolio Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Footer */}
        <div className="flex justify-center pb-10">
          <Link
            href="/profile"
            className="group flex items-center gap-2 text-[#0062AD] hover:text-black transition-all font-bold"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span className="underline underline-offset-8 decoration-1 decoration-slate-300 group-hover:decoration-[#0062AD]">
              Return to Profile
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
