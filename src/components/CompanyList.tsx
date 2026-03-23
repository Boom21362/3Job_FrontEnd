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

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Search bar */}
      <div className="relative mb-9">
        <input
          type="text"
          placeholder="Search Companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-[70px] bg-[#D9D9D9] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-xl border-none px-8 font-semibold text-xl outline-none placeholder:text-gray-500"
        />
      </div>

      {/* Company Cards List */}
      <div className="flex flex-col gap-6">
        {filtered.length === 0 && (
          <p className="text-[#969696] te xt-xl text-center mt-10">
            Company Not Found
          </p>
        )}

        {filtered.map((company) => (
          <Link key={company._id} href={`/company/${company._id}`}>
            <div className="group flex flex-col md:flex-row items-center gap-6 bg-white shadow-[inset_0px_4px_4px_rgba(0,0,0,0.15)] rounded-[30px] p-6 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#0062AD]/30">
              
              {/* Logo / Avatar Box */}
              <div className="w-full md:w-[250px] h-[150px] bg-[#E9E9E9] rounded-xl shrink-0 flex items-center justify-center text-4xl font-bold text-slate-700 shadow-sm">
                {company.name.charAt(0).toUpperCase()}
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-1 min-w-0 w-full gap-2">
                <h2 className="font-bold text-2xl md:text-3xl text-black truncate">
                  {company.name}
                </h2>
                
                {/* Fixed Overlap: Use line-clamp and remove fixed font sizes */}
                <p className="font-medium text-lg text-[#969696] leading-snug line-clamp-3 md:line-clamp-2">
                  {company.description}
                </p>
                
                {/* Specializations (Bonus: adds extra context) */}
                <div className="flex flex-wrap gap-2 mt-1">
                    {company.specializations?.slice(0, 3).map((s, i) => (
                        <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                            {s}
                        </span>
                    ))}
                </div>
              </div>

              {/* Booking Button */}
              <div className="w-full md:w-[180px] h-[80px] bg-[#0062AD] hover:bg-[#004a82] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-xl flex items-center justify-center shrink-0 font-bold text-lg text-white text-center px-4 transition-colors">
                Booking Interview
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}