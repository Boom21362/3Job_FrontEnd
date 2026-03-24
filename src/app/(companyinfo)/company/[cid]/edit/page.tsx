import CompanyForm from "@/components/CompanyForm"
import getCompany from "@/libs/getCompany"

// หน้าสำหรับ admin แก้ไขบริษัท
// ดึงข้อมูลปัจจุบันมาใส่ใน form ให้อัตโนมัติ
export default async function EditCompanyPage({
  params,
}: {
  params: Promise<{ cid: string }>
}) {
  const { cid } = await params
  const companyData = await getCompany(cid)
  const company = companyData.data

  console.log("company from API:", JSON.stringify(company, null, 2))
  
  return <CompanyForm company={company} companyId={cid} />
}