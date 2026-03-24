import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import CompanyList from "@/components/CompanyList"

interface Company {
  _id: string
  name: string
  description: string
  address: string
  tel: string
  website: string
  specializations: string[]
}

interface CompanyCatalogProps {
  companyJson: Promise<{
    count: number
    data: Company[]
  }>
  // ลบ isAdmin ออกจาก props
}

export default async function CompanyCatalog({ companyJson }: CompanyCatalogProps) {

  // รอข้อมูลจาก API โหลดเสร็จ
  const companyJsonReady = await companyJson

  // เช็ค admin จาก session โดยตรง
  const session = await getServerSession(authOptions)
  const isAdmin = session?.user?.role === "admin"

  return (
    <div>
      <CompanyList companies={companyJsonReady.data} isAdmin={isAdmin} />
    </div>
  )
}