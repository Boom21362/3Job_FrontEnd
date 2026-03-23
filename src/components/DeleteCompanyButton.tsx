"use client"

import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DeleteCompanyButton({ cid }: { cid: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirm = window.confirm("ต้องการลบบริษัทนี้ใช่ไหม?")
    if (!confirm) return

    const session = await getSession()
    const token = (session?.user as any)?.accessToken

    await fetch(`https://3-job-back-end.vercel.app/api/v1/companies/${cid}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })

    router.push("/company")
  }

  return (
    <button
      onClick={handleDelete}
      className="w-[140px] h-[52px] bg-[#C62828] hover:bg-red-700 rounded-xl text-white font-bold text-sm flex items-center justify-center transition-colors shadow-md cursor-pointer"
    >
      Delete Company
    </button>
  )
}