// ฟังก์ชันนี้ทำหน้าที่ดึงข้อมูลบริษัทจาก Backend API
export default async function getCompanies() {

    // เชื่อมต่อไปยัง Backend API ที่รันอยู่บน port 5000
    const response = await fetch(
        "https://3-job-back-end.vercel.app/api/v1/companies"
    )
    // ถ้า API ตอบกลับมาว่าไม่สำเร็จ ให้โยน error ออกไป
    if (!response.ok) {
        throw new Error("Failed to fetch companies")
    }

    // แปลง response เป็น JSON แล้วส่งกลับออกไปให้ component ใช้
    return await response.json()
}