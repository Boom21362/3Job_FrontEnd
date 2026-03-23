// ดึงข้อมูลบริษัทอันเดียวจาก API โดยใช้ id
export default async function getCompany(id: string) {
  const response = await fetch(
    `https://3-job-back-end.vercel.app/api/v1/companies/${id}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch company")
  }

  return await response.json()
}