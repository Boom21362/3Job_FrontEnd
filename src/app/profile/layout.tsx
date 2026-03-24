import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import BackgroundBlobs from "@/components/BackgroundBlobs";

export default function ProfileLayout({
  children,
  me,
  interviewsList,
}: {
  children: React.ReactNode;
  me: React.ReactNode;
  interviewsList: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen relative overflow-hidden p-4 md:p-10 lg:px-[165px]"
      style={{
        background:
          "linear-gradient(180deg, #F5F5DC 0%, rgba(255,255,57,0.29) 100%)",
      }}
    >
      <BackgroundBlobs />

      <div className="relative z-10 max-w-9xl mx-auto">
        <header className="flex flex-col items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0062AD]">
            Your Profile
          </h1>
          <div className="w-24 h-1 bg-[#0062AD] mt-2 rounded-full opacity-20"></div>
        </header>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full gap-y-10 lg:gap-x-12 xl:gap-x-20">
          {/* WRAP ME SLOT */}
          <div className="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0">
            <Suspense
              fallback={
                <div className="p-10 text-center bg-white/50 rounded-[32px] animate-pulse">
                  <p className="mb-2 font-bold text-[#0062AD]">Loading Me...</p>
                  <LinearProgress />
                </div>
              }
            >
              {me}
            </Suspense>
          </div>

          {/* WRAP INTERVIEWS LIST SLOT */}
          <div className="w-full flex-grow lg:min-w-0">
            <Suspense
              fallback={
                <div className="p-10 text-center bg-white/50 rounded-[32px] animate-pulse min-h-[400px] flex flex-col justify-center">
                  <p className="mb-2 font-bold text-[#0062AD]">
                    Fetching List...
                  </p>
                  <LinearProgress color="secondary" />
                </div>
              }
            >
              {interviewsList}
            </Suspense>
          </div>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </main>
  );
}
