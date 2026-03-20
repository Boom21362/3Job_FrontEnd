// src/app/profile/layout.tsx

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
    <div className="flex flex-col items-left w-full min-h-screen bg-white pt-10">
      
      {children} 

      <div className="flex flex-row items-start justify-center gap-6 mt-0 w-full max-w-5xl px-4">
    
        <div className="flex-none"> 
          {me}
        </div>

        <div className="flex-none">
          {interviewsList}
        </div>

      </div>
    </div>
  );
}