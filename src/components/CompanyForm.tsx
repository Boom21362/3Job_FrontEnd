"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSession } from "next-auth/react"

interface Company {
  _id: string
  name: string
  description: string
  address: string
  tel: string
  website: string
  specializations: string[]
  compimgsrc?: string 
  compbannersrc?: string
}

  interface CompanyFormProps {
    company?: Company
    companyId?: string
  }

export default function CompanyForm({ company, companyId }: CompanyFormProps) {
  const router = useRouter()
  const isEdit = !!companyId

  // Decode HTML entities (e.g. &amp; → &) from API data before pre-filling form
  const decodeHTML = (str: string) => {
    if (!str) return str
    const txt = document.createElement("textarea")
    txt.innerHTML = str
    return txt.value
  }

  const [form, setForm] = useState({
    name: decodeHTML(company?.name || ""),
    tel: company?.tel || "",
    website: company?.website || "",
    address: decodeHTML(company?.address || ""),
    description: decodeHTML(company?.description || ""),
    compimgsrc: company?.compimgsrc || "",
    compbannersrc: company?.compbannersrc || "",
  })

  // Tag state: pre-fill from existing company data if editing
  const [tags, setTags] = useState<string[]>(company?.specializations || [])
  const [tagInput, setTagInput] = useState("")

  // Convert Google Drive share link to direct image URL
  const getDirectDriveUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/\/d\/(.+?)\/(view|edit|usp|share|preview)/);
    if (match && match[1]) {
      // Using the direct link format that bypasses the Google Drive viewer
      return `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
    }
    return url;
  }

  // Add tag on Enter key or + button click
  const handleAddTag = () => {
    const val = tagInput.trim()
    if (!val || tags.includes(val)) return
    setTags([...tags, val])
    setTagInput("")
  }

  // Remove tag by index
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const session = await getSession()
      const token = (session?.user as any)?.accessToken
      const baseUrl = "https://3-job-back-end.vercel.app/api/v1"
      const url = isEdit ? `${baseUrl}/companies/${companyId}` : `${baseUrl}/companies`
      const method = isEdit ? "PUT" : "POST"

      // Explicitly define body to avoid sending unexpected fields that backend may reject
      const body = {
        name: form.name,
        tel: form.tel,
        website: form.website,
        address: form.address,
        description: form.description,
        compimgsrc: form.compimgsrc,
        compbannersrc: form.compbannersrc,
        specializations: tags,
      }

      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        // Success Alert
        alert(isEdit ? "Company updated successfully!" : "Company created successfully!")
        router.push("/company")
        router.refresh() // Ensures the list view updates with new data
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.message || "Failed to save company"}`)
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("A network error occurred. Please try again.")
    }
  }

  return (
    <main className="h-[calc(100vh-50px)] overflow-hidden flex flex-col items-center justify-center bg-[#F5F5DC] p-4">
      <div className="flex flex-col w-full max-w-[820px]">
        <div className="self-start bg-[#0062AD] text-white text-[13px] font-bold px-4 py-1 rounded-t-md">
          {isEdit ? "Edit" : "Add"}
        </div>

        <div className="bg-white shadow-xl flex flex-col md:flex-row w-full rounded-b-xl overflow-hidden">
          {/* Left Side: Inputs */}
          <div className="flex-[0_0_42%] p-5 flex flex-col gap-2 border-r border-gray-100">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Company Name*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none focus:border-[#0062AD]" />
            <input name="tel" value={form.tel} onChange={handleChange} placeholder="Phone Number*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none focus:border-[#0062AD]" />
            <input name="website" value={form.website} onChange={handleChange} placeholder="Website URL*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none focus:border-[#0062AD]" />
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none h-20 resize-none" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description*" className="border border-gray-300 rounded-lg p-3 text-sm font-semibold outline-none flex-1 min-h-[120px] resize-none" />
            {/* Tag Section */}
            <div>
              <p className="text-xs font-bold text-gray-700 mb-1">Tag:</p>
              <div className="flex flex-wrap gap-2 items-center">
                {/* Render existing tags with remove button */}
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-1 bg-[#E6F1FB] text-[#0C447C] text-xs font-bold px-3 py-1 rounded-full">
                    {tag}
                    {/* Remove tag on click */}
                    <span onClick={() => handleRemoveTag(index)} className="cursor-pointer text-sm">×</span>
                  </div>
                ))}
                {/* Tag input + add button */}
                <div className="flex items-center gap-1">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag() }}}
                    placeholder="Add tag..."
                    className="border border-gray-300 rounded-full px-3 py-1 text-xs font-semibold outline-none focus:border-[#0062AD] w-24 text-[#0C447C]"
                  />
                  <button
                    onClick={handleAddTag}
                    className="w-6 h-6 bg-[#E6F1FB] text-[#0C447C] rounded-full text-base font-bold flex items-center justify-center cursor-pointer hover:bg-[#B5D4F4]"
                  >+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Photos */}
          <div className="flex-1 p-5 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2 w-full">
                <input 
                  name="compimgsrc" // Matches the state key exactly
                  value={form.compimgsrc} 
                  onChange={handleChange} 
                  placeholder="Paste Google Drive Logo Link*" 
                  className="border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#0062AD]"
                />
                <div className="w-[110px] h-[100px] border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50">
                  {form.compimgsrc ? (
                    <img src={getDirectDriveUrl(form.compimgsrc)!} alt="logo preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
                  ) : (
                    <span className="text-[10px] text-gray-400 text-center px-2 font-bold uppercase">Logo Preview</span>
                  )}
                </div>
              </div>
              <img src="/img/3joblogo.png" alt="3job logo" className="h-10 w-auto ml-auto self-start" />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <input 
                name="compbannersrc" // Matches the state key exactly
                value={form.compbannersrc} 
                onChange={handleChange} 
                placeholder="Paste Google Drive Banner Link*" 
                className="border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#0062AD]"
              />
              <div className="flex-1 border border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50 min-h-[160px]">
                {form.compbannersrc ? (
                  <img src={getDirectDriveUrl(form.compbannersrc)!} alt="banner preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Banner Preview</span>
                )}
              </div>
            </div>

            <button onClick={handleSubmit} className="bg-[#0062AD] text-white rounded-lg p-4 text-sm font-bold tracking-widest hover:bg-[#004a82] transition-colors">
              {isEdit ? "SAVE CHANGES" : "CREATE COMPANY"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}