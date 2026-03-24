// ฟังก์ชันนี้ทำหน้าที่ดึงข้อมูลการสัมภาษณ์จาก Backend API
export default async function getInterviews(token: string) {
  // เชื่อมต่อไปยัง Backend API ที่รันอยู่บน port 5000
  const response = await fetch(
    "https://3-job-back-end.vercel.app/api/v1/interviews",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      next: { tags: ["interviews"] }, // Useful for revalidation later
    },
  );
  // ถ้า API ตอบกลับมาว่าไม่สำเร็จ ให้โยน error ออกไป
  if (!response.ok) {
    throw new Error("Failed to fetch interviews");
  }

  // แปลง response เป็น JSON แล้วส่งกลับออกไปให้ component ใช้
  return await response.json();
}
