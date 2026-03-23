import getCompany from "@/libs/getCompany"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ cid: string }>
}) {
  const { cid } = await params

  // ดึงข้อมูลบริษัทจาก API โดยใช้ id จาก URL
  const companyData = await getCompany(cid)
  const company = companyData.data

  // เช็ค session ว่า user เป็น admin หรือเปล่า
  const session = await getServerSession(authOptions)
  const isAdmin = session?.user?.role === "admin"

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F5F5DC 53.85%, rgba(255,255,255,0.1) 100%)",
        padding: "28px 60px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Banner บนสุด */}
      <div
        style={{
          background: "#D9D9D9",
          borderRadius: "16px",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          fontSize: "24px",
          fontWeight: 600,
        }}
      >
        Banner
      </div>

      {/* Avatar + ชื่อ + ปุ่ม */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "-30px",
          marginBottom: "32px",
        }}
      >
        {/* Avatar ตัวอักษรแรกของชื่อบริษัท */}
        <div
          style={{
            width: "100px", height: "100px",
            background: "#1a1a2e",
            borderRadius: "16px",
            border: "4px solid #F5F5DC",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "40px", fontWeight: 700, color: "#fff",
            flexShrink: 0,
          }}
        >
          {company.name.charAt(0).toUpperCase()}
        </div>

        {/* ชื่อบริษัท + specialization tags */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#000", letterSpacing: "-0.5px", marginBottom: "6px" }}>
            {company.name}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {company.specializations.map((spec: string, i: number) => (
              <span
                key={i}
                style={{
                  fontSize: "12px", background: "#E6F1FB", color: "#0C447C",
                  borderRadius: "20px", padding: "3px 12px", fontWeight: 600,
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* ปุ่ม: admin เห็น Delete + Edit, ทุกคนเห็น Booking */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
          {isAdmin && (
            <>
              {/* ปุ่ม Delete เฉพาะ admin */}
              <button
                style={{
                  width: "150px", height: "52px", background: "#C62828",
                  borderRadius: "10px", border: "none", color: "#fff",
                  fontSize: "14px", fontWeight: 700, cursor: "pointer",
                }}
              >
                Delete Company
              </button>

              {/* ปุ่ม Edit เฉพาะ admin */}
              <Link href={`/company/${cid}/edit`}>
                <div
                  style={{
                    width: "150px", height: "52px", background: "#008EFB",
                    borderRadius: "10px", color: "#fff", fontSize: "14px",
                    fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  Edit Company
                </div>
              </Link>
            </>
          )}

          {/* ปุ่ม Booking ทุกคนเห็น */}
          <Link href={`/interviews/create?companyId=${cid}`}>
            <div
              style={{
                width: "150px", height: "52px", background: "#0062AD",
                borderRadius: "10px", color: "#fff", fontSize: "14px",
                fontWeight: 700, cursor: "pointer", textAlign: "center",
                lineHeight: 1.3, display: "flex", alignItems: "center",
                justifyContent: "center",
              }}
            >
              Booking<br />Interview
            </div>
          </Link>
        </div>
      </div>

      {/* ข้อมูลบริษัท */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ fontSize: "18px", color: "#000" }}>
          <strong>Phone Number:</strong> {company.tel}
        </div>
        <div style={{ fontSize: "18px", color: "#000" }}>
          <strong>Email:</strong> {company.website}
        </div>
        <div style={{ fontSize: "18px", color: "#000" }}>
          <strong>Address:</strong> {company.address}
        </div>
        <div style={{ fontSize: "18px", color: "#000" }}>
          <strong>Website:</strong> {company.website}
        </div>
        <div style={{ fontSize: "18px", color: "#000", marginTop: "6px", lineHeight: 1.7 }}>
          <strong>Description:</strong> {company.description}
        </div>
      </div>
    </main>
  )
}