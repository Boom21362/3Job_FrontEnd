import getCompanies from "@/libs/getCompanies"
import CompanyCatalog from "@/components/CompanyCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"

export default async function CompanyPage() {

  // ดึงข้อมูลบริษัทจาก API
  const companies = getCompanies()

  // เช็ค session ว่าเป็น admin หรือเปล่า
  const session = await getServerSession(authOptions)
  const isAdmin = session?.user?.role === "admin"

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F5F5DC 0%, #ffff394a 100%)",
        padding: "40px 165px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* blob ซ้ายล่าง */}
      <div style={{ position: "fixed", width: "473px", height: "447px", bottom: "-100px", left: "-194px", borderRadius: "50%", background: "linear-gradient(180deg, #0062AD 0%, #008EFB 61.54%, #0381E1 100%)", pointerEvents: "none", zIndex: 0 }} />

      {/* blob ขวาบน */}
      <div style={{ position: "fixed", width: "473px", height: "447px", top: "100px", right: "-100px", borderRadius: "50%", background: "radial-gradient(50% 50% at 50% 50%, #0062AD 33%, #0068B8 65%, #0077D2 100%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>   

        {/* ปุ่ม Add Company เฉพาะ admin */}
        {isAdmin && (
          <div style={{ marginBottom: "16px" }}>
            <Link href="/company/add">
              <div className="inline-flex h-[52px] px-6 bg-[#0062AD] hover:bg-[#004a82] rounded-xl items-center justify-center font-bold text-base text-white cursor-pointer transition-colors shadow-md">
                Add Company
              </div>
            </Link>
          </div>
        )}

        {/* list บริษัท ส่ง isAdmin ไปให้ CompanyCatalog */}
        <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
          <CompanyCatalog companyJson={companies} />
        </Suspense>
      </div>
    </main>
  )
}