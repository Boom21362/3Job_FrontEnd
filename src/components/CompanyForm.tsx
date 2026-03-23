"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Company {
  name?: string
  tel?: string
  website?: string
  address?: string
  description?: string
}

interface CompanyFormProps {
  // ถ้ามี company ส่งมา = edit mode, ถ้าไม่มี = add mode
  company?: Company
  companyId?: string
}

export default function CompanyForm({ company, companyId }: CompanyFormProps) {
  const router = useRouter()
  const isEdit = !!companyId

  // เก็บค่า input ทุก field
  const [form, setForm] = useState({
    name: company?.name || "",
    tel: company?.tel || "",
    website: company?.website || "",
    email: "",
    address: company?.address || "",
    description: company?.description || "",
  })

  // เก็บรูป logo และ banner ที่ user เลือก
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  // อัพเดท field ที่ user พิมพ์
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // preview รูปที่ user เลือก
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner") => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (type === "logo") setLogoPreview(url)
    else setBannerPreview(url)
  }

  // submit form สร้างหรือแก้ไขบริษัท ใช้ Vercel URL แทน localhost
  const handleSubmit = async () => {
    const baseUrl = "https://3-job-back-end.vercel.app/api/v1"
    const url = isEdit
      ? `${baseUrl}/companies/${companyId}`
      : `${baseUrl}/companies`
    const method = isEdit ? "PUT" : "POST"

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    router.push("/company")
  }

  return (
    <main className="h-[calc(100vh-50px)] overflow-hidden flex flex-col items-center justify-center bg-[#F5F5DC]">

      <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "820px" }}>

        {/* badge Add/Edit ติดอยู่บนซ้ายของ card */}
        <div style={{
          alignSelf: "flex-start",
          background: "#0062AD",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 700,
          padding: "4px 16px",
          borderRadius: "4px 4px 0 0",
        }}>
          {isEdit ? "Edit" : "Add"}
        </div>

        <div style={{ background: "#fff", boxShadow: "0 0 12px rgba(0,0,0,0.1)", display: "flex", width: "100%" }}>

          {/* ฝั่งซ้าย: input fields */}
          <div style={{ flex: "0 0 42%", padding: "20px", display: "flex", flexDirection: "column", gap: "8px", borderRight: "1px solid #eee" }}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Company Name*"
              style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px 14px", fontSize: "13px", fontWeight: 600, outline: "none", width: "100%" }} />
            <input name="tel" value={form.tel} onChange={handleChange} placeholder="Phone Number*"
              style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px 14px", fontSize: "13px", fontWeight: 600, outline: "none", width: "100%" }} />
            <input name="website" value={form.website} onChange={handleChange} placeholder="Website*"
              style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px 14px", fontSize: "13px", fontWeight: 600, outline: "none", width: "100%" }} />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email*" type="email"
              style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px 14px", fontSize: "13px", fontWeight: 600, outline: "none", width: "100%" }} />
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address*"
              style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px 14px", fontSize: "13px", fontWeight: 600, outline: "none", width: "100%", height: "80px", resize: "none" }} />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description*"
              style={{ border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px", padding: "12px 14px", fontSize: "13px", fontWeight: 600, outline: "none", width: "100%", flex: 1, resize: "none", minHeight: "120px" }} />
          </div>

          {/* ฝั่งขวา: logo, banner, ปุ่ม submit */}
          <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              {/* กล่อง Logo กดเพื่อเลือกรูป */}
              <label style={{ width: "110px", height: "100px", border: "1px solid rgba(0,0,0,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", flexShrink: 0 }}>
                {logoPreview
                  ? <img src={logoPreview} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(0,0,0,0.25)" }}>Logo*</span>
                }
                <input type="file" accept="image/*" onChange={(e) => handleImage(e, "logo")} style={{ display: "none" }} />
              </label>

              {/* logo 3job */}
              <div style={{ marginLeft: "auto" }}>
                <img src="/img/logo.avif" alt="3job logo" style={{ height: "40px", width: "auto" }} />
              </div>
            </div>

            {/* กล่อง Banner กดเพื่อเลือกรูป */}
            <label style={{ flex: 1, border: "1px solid rgba(0,0,0,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", minHeight: "180px" }}>
              {bannerPreview
                ? <img src={bannerPreview} alt="banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(0,0,0,0.25)" }}>Banner*</span>
              }
              <input type="file" accept="image/*" onChange={(e) => handleImage(e, "banner")} style={{ display: "none" }} />
            </label>

            {/* ปุ่ม submit */}
            <button onClick={handleSubmit}
              style={{ background: "#0062AD", color: "#fff", border: "none", borderRadius: "8px", padding: "14px", fontSize: "14px", fontWeight: 700, cursor: "pointer", letterSpacing: "1px", width: "100%" }}>
              {isEdit ? "SAVE CHANGES" : "CREATE ACCOUNT"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}