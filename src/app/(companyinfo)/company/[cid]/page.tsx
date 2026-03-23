import getCompany from "@/libs/getCompany";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import DeleteCompanyButton from "@/components/DeleteCompanyButton"

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;

  // Fetch company data
  const companyData = await getCompany(cid);
  const company = companyData.data;

  // Check session and admin role
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  // Helper to handle Google Drive image links if necessary
  const getImageUrl = (url: string) => {
    if (!url) return null;
    const driveMatch = url.match(/\/d\/(.+?)\/(view|edit|usp)/);
    if (driveMatch && driveMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
    }
    return url;
  };

  const bannerImg = getImageUrl(company.compbannersrc);
  const logoImg = getImageUrl(company.compimgsrc);
  console.log(bannerImg)
  console.log(logoImg)

  return (
    // Replaced relative with static (default) so children's fixed/absolute positioning is relative to the viewport
    <main className="min-h-screen bg-[#F5F5DC] p-4 md:p-8 lg:px-[60px] font-sans ">
      
      {/* 1. Banner Section */}
      <div className="absolute top-0 left-0 right-0 z-0 w-full h-[250px] overflow-hidden shadow-inner bg-[#D9D9D9] rounded-b-3xl">
        {bannerImg ? (
          <img 
            src={bannerImg} 
            alt="Company Banner"
            referrerPolicy="no-referrer" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#888] text-2xl font-semibold">
            {company.name}
          </div>
        )}
      </div>

      {/* 2. Header Section (Avatar + Name + Buttons) */}
      {/* CHANGED:
          - -mt-12 to mt-[180px] to push this content *over* the bottom edge of the banner.
          - Removed px-4 and added p-4.
      */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mt-[180px] mb-10 p-4">
        
        {/* Avatar */}
        {/* CHANGED:
            - Replaced overflow-hidden shrink-0 with a dedicated wrapper div.
            - logoImg ternary logic remains the same.
        */}
        <div className="w-[140px] h-[140px] rounded-3xl shrink-0">
          <div className="w-full h-full bg-[#1a1a2e] rounded-3xl border-4 border-[#F5F5DC] shadow-2xl flex items-center justify-center overflow-hidden z-10">
            {logoImg ? (
              <img 
                src={logoImg} 
                alt="Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-white">
                {company.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Name and Tags */}
        <div className="flex-1 text-center md:text-left pb-2 z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {company.name}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {company.specializations.map((spec: string, i: number) => (
              <span 
                key={i} 
                className="text-xs bg-[#E6F1FB] text-[#0C447C] rounded-full px-4 py-1.5 font-bold shadow-sm"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex flex-wrap gap-3 justify-center shrink-0 pb-2 z-10">
          {isAdmin && (
            <>
                <DeleteCompanyButton cid={cid} />
                <Link href={`/company/${cid}/edit`}>
                <div className="w-[140px] h-[52px] bg-[#008EFB] hover:bg-blue-500 rounded-xl text-white font-bold text-sm flex items-center justify-center transition-colors shadow-md">
                  Edit Company
                </div>
              </Link>
            </>
          )}
          <Link href={`/interviews/create?companyId=${cid}`}>
            <div className="w-[140px] h-[52px] bg-[#0062AD] hover:bg-[#004a82] rounded-xl text-white font-bold text-sm flex items-center justify-center text-center leading-tight transition-all shadow-md active:scale-95">
              Booking<br/>Interview
            </div>
          </Link>
        </div>
      </div>

      {/* 3. INFO BOX */}
      {/* CHANGED: z-10 added */}
      <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-xl border border-white/20 mb-10 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0062AD] uppercase tracking-wider mb-1">Phone Number</span>
              <span className="text-xl text-slate-800 font-medium">{company.tel}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0062AD] uppercase tracking-wider mb-1">Email / Support</span>
              <span className="text-xl text-slate-800 font-medium truncate">{company.website}</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0062AD] uppercase tracking-wider mb-1">Office Address</span>
              <span className="text-xl text-slate-800 font-medium leading-relaxed">{company.address}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0062AD] uppercase tracking-wider mb-1">Official Website</span>
              <a href={`https://${company.website}`} target="_blank" className="text-xl text-blue-600 font-medium hover:underline truncate">
                {company.website}
              </a>
            </div>
          </div>
        </div>

        {/* 4. DESCRIPTION */}
        <div className="hidden sm:block mt-10 pt-10 border-t border-slate-200/60 z-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Company Description</h3>
          <p className="text-slate-600 text-lg leading-relaxed max-w-5xl">
            {company.description}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      {/* CHANGED: z-10 added */}
      <div className="flex justify-center pb-10 z-10">
        <Link 
          href="/company" 
          className="text-slate-500 hover:text-[#0062AD] transition-all underline underline-offset-8 decoration-1 decoration-slate-300 hover:decoration-[#0062AD] font-medium"
        >
          Back to Companies
        </Link>
      </div>
    </main>
  );
} 