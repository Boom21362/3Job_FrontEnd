"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Company {
  name?: string
  tel?: string
  website?: string
  address?: string
  description?: string
  complogosrc?: string // Added to support existing links
  compbannersrc?: string
}

interface CompanyFormProps {
  company?: Company
  companyId?: string
}

export default function CompanyForm({ company, companyId }: CompanyFormProps) {
  const router = useRouter()
  const isEdit = !!companyId

  const [form, setForm] = useState({
    name: company?.name || "",
    tel: company?.tel || "",
    website: company?.website || "",
    email: "",
    address: company?.address || "",
    description: company?.description || "",
    logo: company?.complogosrc || "", // Store the Drive Link
    banner: company?.compbannersrc || "", // Store the Drive Link
  })

  // Helper function to convert Google Drive "view" links to "direct" image links
  const getDirectDriveUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/\/d\/(.+?)\/(view|edit|usp)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
    }
    return url; // Return as is if it's already a direct link or not a drive link
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const baseUrl = "https://3-job-back-end.vercel.app/api/v1"
    const url = isEdit ? `${baseUrl}/companies/${companyId}` : `${baseUrl}/companies`
    const method = isEdit ? "PUT" : "POST"

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    router.push("/company")
  }

  return (
    <main className="h-[calc(100vh-50px)] overflow-hidden flex flex-col items-center justify-center bg-[#F5F5DC] p-4">
      <div className="flex flex-col w-full max-w-[820px]">
        
        {/* Badge */}
        <div className="self-start bg-[#0062AD] text-white text-[13px] font-bold px-4 py-1 rounded-t-md">
          {isEdit ? "Edit" : "Add"}
        </div>

        <div className="bg-white shadow-xl flex flex-col md:flex-row w-full rounded-b-xl overflow-hidden">
          
          {/* Left Side: Inputs */}
          <div className="flex-[0_0_42%] p-5 flex flex-col gap-2 border-r border-gray-100">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Company Name*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none focus:border-[#0062AD]" />
            <input name="tel" value={form.tel} onChange={handleChange} placeholder="Phone Number*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none focus:border-[#0062AD]" />
            <input name="website" value={form.website} onChange={handleChange} placeholder="Website URL*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none focus:border-[#0062AD]" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email*" type="email" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none focus:border-[#0062AD]" />
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none h-20 resize-none" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none flex-1 min-h-[120px] resize-none" />
          </div>

          {/* Right Side: Google Drive Links & Previews */}
          <div className="flex-1 p-5 flex flex-col gap-4">
            
            <div className="flex items-center gap-4">
              {/* Logo Link & Preview */}
              <div className="flex flex-col gap-2 w-full">
                <input 
                  name="logo" 
                  value={form.logo} 
                  onChange={handleChange} 
                  placeholder="Paste Google Drive Logo Link*" 
                  className="border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#0062AD]"
                />
                <div className="w-[110px] h-[100px] border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50">
                  {form.logo ? (
                    <img src={getDirectDriveUrl(form.logo)!} alt="logo preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
                  ) : (
                    <span className="text-[10px] text-gray-400 text-center px-2 font-bold uppercase">Logo Preview</span>
                  )}
                </div>
              </div>
              
              <img src="/img/3joblogo.png" alt="3job logo" className="h-10 w-auto ml-auto self-start" />
            </div>

            {/* Banner Link & Preview */}
            <div className="flex flex-col gap-2 flex-1">
              <input 
                name="banner" 
                value={form.banner} 
                onChange={handleChange} 
                placeholder="Paste Google Drive Banner Link*" 
                className="border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#0062AD]"
              />
              <div className="flex-1 border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50 min-h-[160px]">
                {form.banner ? (
                  <img src={getDirectDriveUrl(form.banner)!} alt="banner preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Banner Preview</span>
                )}
              </div>
            </div>

            <button onClick={handleSubmit} className="bg-[#0062AD] text-white rounded-lg p-4 text-sm font-bold tracking-widest hover:bg-[#004a82] transition-colors">
              {isEdit ? "SAVE CHANGES" : "CREATE ACCOUNT"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}