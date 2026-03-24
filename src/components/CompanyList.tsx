"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Company {
  _id: string;
  name: string;
  description: string;
  address: string;
  tel: string;
  website: string;
  specializations: string[];
  compimgsrc?: string;
  compbannersrc?: string;
}

interface CompanyListProps {
  companies: Company[];
  isAdmin: boolean;
}

export default function CompanyList({ companies }: CompanyListProps) {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Get unique specializations from all companies dynamically
  const allTags = Array.from(
    new Set(companies.flatMap((c) => c.specializations || [])),
  );

  const router = useRouter();
  const handleCardClick = (id: string) => {
    router.push(`/company/${id}`);
  };

  // Toggle tag on/off
  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filtered = companies.filter((c) => {
    // Search filter
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    // Tag filter: if no tags active, show all
    const matchTag =
      activeTags.length === 0 ||
      activeTags.some((tag) => c.specializations?.includes(tag));

    return matchSearch && matchTag;
  });

  const getDirectDriveUrl = (url: string | undefined) => {
    if (!url || url.trim() === "") return null;
    const match = url.match(/\/d\/(.+?)\/(view|edit|usp|share)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    if (url.startsWith("http")) {
      return url;
    }
    return null;
  };

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Search bar */}
      <div className="relative mb-4 mt-4 flex gap-3 items-center">
        <input
          type="text"
          placeholder="Search Companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-[70px] bg-[#D9D9D9] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-xl border-none px-8 font-semibold text-xl outline-none placeholder:text-gray-500"
        />
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="h-[70px] w-[120px] bg-white rounded-xl flex flex-col items-center justify-center shrink-0 gap-1 font-bold text-sm text-[#0062AD] border border-gray-300 cursor-pointer hover:bg-[#E6F1FB] hover:border-[#0062AD] transition-colors"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <line
              x1="0"
              y1="1"
              x2="16"
              y2="1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="3"
              y1="6"
              x2="13"
              y2="6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="11"
              x2="10"
              y2="11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Filter {activeTags.length > 0 && `(${activeTags.length})`}
        </button>
      </div>

      {/* Tag filter pills — show only when showFilter is true */}
      {showFilter && allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                activeTags.includes(tag)
                  ? "bg-[#E6F1FB] border-[#85B7EB] text-[#0C447C]"
                  : "bg-white border-gray-300 text-gray-500 hover:border-[#0062AD] hover:text-[#0062AD]"
              }`}
            >
              {tag}
            </button>
          ))}
          {activeTags.length > 0 && (
            <button
              onClick={() => setActiveTags([])}
              className="px-4 py-1.5 rounded-full text-xs font-bold border border-gray-300 text-gray-400 hover:text-red-400 hover:border-red-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col gap-6 pb-10">
        {filtered.length === 0 ? (
          <p className="text-[#969696] text-xl text-center mt-10">
            Company Not Found
          </p>
        ) : (
          filtered.map((company) => {
            const logoUrl = getDirectDriveUrl(company.compimgsrc);
            return (
              <div
                key={company._id}
                onClick={() => handleCardClick(company._id)}
              >
                <div className="group flex flex-col md:flex-row items-center gap-6 bg-white shadow-[inset_0px_4px_4px_rgba(0,0,0,0.15)] rounded-[30px] p-6 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#0062AD]/30">
                  {/* Logo Box */}
                  <div className="w-full md:w-[250px] h-[150px] bg-[#E9E9E9] rounded-xl shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${company.name} logo`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
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
                    {/* Specialization pills */}
                    {company.specializations?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {company.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 rounded-full text-xs font-bold bg-[#E6F1FB] text-[#0C447C]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Booking Button */}
                  <Link href={`/interview/add?companyId=${company._id}`}>
                    <div className="w-full md:w-[180px] h-[80px] bg-[#0062AD] hover:bg-[#004a82] rounded-xl flex items-center justify-center shrink-0 font-bold text-lg text-white text-center px-4 transition-colors cursor-pointer">
                      Booking
                      <br />
                      Interview
                    </div>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
