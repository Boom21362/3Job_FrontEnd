"use client"

import { useState } from "react"
import Link from "next/link"

interface Company {
  _id: string
  name: string
  description: string
  address: string
  tel: string
  website: string
  specializations: string[]
  complogosrc?: string 
  compbannersrc?: string
}

interface CompanyListProps {
  companies: Company[]
  isAdmin: boolean
}

export default function CompanyList({ companies }: CompanyListProps) {
  const [search, setSearch] = useState("")

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  const getDirectDriveUrl = (url: string | undefined) => {
    if (!url) return null;
    const match = url.match(/\/d\/(.+?)\/(view|edit|usp|share)/);
    if (match && match[1]) {
      // Using the lh3 format is generally more reliable for PNG/JPG previews
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    return url; 
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Search bar */}
      <div className="relative mb-9 mt-4">
        <input
          type="text"
          placeholder="Search Companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-[70px] bg-[#D9D9D9] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-xl border-none px-8 font-semibold text-xl outline-none placeholder:text-gray-500"
        />
      </div>

      <div className="flex flex-col gap-6 pb-10">
        {filtered.length === 0 ? (
           <p className="text-[#969696] text-xl text-center mt-10">Company Not Found</p>
        ) : (
          filtered.map((company) => {
            const logoUrl = getDirectDriveUrl(company.complogosrc);
            console.log(logoUrl)
            return (
              <Link key={company._id} href={`/company/${company._id}`}>
                <div className="group flex flex-col md:flex-row items-center gap-6 bg-white shadow-[inset_0px_4px_4px_rgba(0,0,0,0.15)] rounded-[30px] p-6 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#0062AD]/30">
                  
                  {/* Logo Box */}
                  <div className="w-full md:w-[250px] h-[150px] bg-[#E9E9E9] rounded-xl shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                    {logoUrl ? (
                     <img 
                  src={logoUrl} 
                    alt={`${company.name} logo`} 
                    referrerPolicy="no-referrer" // Add this line
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = `<span class="text-4xl font-bold text-slate-700">${company.name.charAt(0).toUpperCase()}</span>`;
                    e.currentTarget.parentElement!.innerHTML = fallback;
                    }}
                    />
                    ) : (
                      <span className="text-4xl font-bold text-slate-700">
                        {company.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 min-w-0 w-full gap-2">
                    <h2 className="font-bold text-2xl md:text-3xl text-black truncate">
                      {company.name}
                    </h2>
                    <p className="font-medium text-lg text-[#969696] leading-snug line-clamp-2">
                      {company.description}
                    </p>
                  </div>

                  {/* Booking Button */}
                  <div className="w-full md:w-[180px] h-[80px] bg-[#0062AD] hover:bg-[#004a82] rounded-xl flex items-center justify-center shrink-0 font-bold text-lg text-white text-center px-4 transition-colors">
                    Booking Interview
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

