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

  // เก็บค่าที่ user พิมพ์ใน search bar
  const [search, setSearch] = useState("")

  // กรองบริษัทที่ชื่อหรือ description ตรงกับคำค้นหา
  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Search bar ที่ใช้งานได้จริง */}
      <div style={{ position: "relative", marginBottom: "36px" }}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            height: "75px",
            background: "#D9D9D9",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            borderRadius: "10px",
            border: "none",
            paddingLeft: "29px",
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "25px",
            outline: "none",
          }}
        />
      </div>

      {/* แสดง card บริษัทที่ผ่านการ filter แล้ว */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <p style={{ color: "#969696", fontSize: "20px", textAlign: "center" }}>
            ไม่พบบริษัทที่ค้นหา
          </p>
        )}

        {filtered.map((company) => (
          // กดทั้ง card เพื่อไปหน้ารายละเอียดบริษัท
          <Link key={company._id} href={`/company/${company._id}`}>
            <div
              className="flex items-center gap-4 cursor-pointer hover:-translate-y-1 transition-all duration-200"
              style={{
                background: "#FFFFFF",
                boxShadow: "inset 0px 4px 4px rgba(0,0,0,0.25)",
                borderRadius: "30px",
                padding: "15px",
                width: "100%",
                height: "180px",
              }}
            >
              {/* กล่องรูป ใช้ตัวอักษรแรกแทน logo */}
              <div
                style={{
                  width: "253px", height: "150px",
                  background: "#E9E9E9", borderRadius: "4px",
                  flexShrink: 0, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "25px", fontWeight: 600, color: "#000",
                }}
              >
                {company.name.charAt(0).toUpperCase()}
              </div>

              {/* ชื่อและ description จาก database */}
              <div className="flex flex-col flex-1" style={{ gap: "12px" }}>
                <span style={{
                  fontFamily: "Inter", fontWeight: 600,
                  fontSize: "25px", color: "#000000",
                }}>
                  {company.name}
                </span>
                <span style={{
                  fontFamily: "Inter", fontWeight: 600,
                  fontSize: "25px", color: "#969696",
                }}>
                  {company.description}
                </span>
              </div>

              {/* ปุ่ม Booking Interview */}
              <div style={{
                width: "187px", height: "88px",
                background: "rgba(0,98,173,0.9)",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                borderRadius: "10px", display: "flex",
                alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontFamily: "Inter",
                fontWeight: 600, fontSize: "25px",
                color: "#FFFFFF", textAlign: "center",
              }}>
                Booking Interview
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}