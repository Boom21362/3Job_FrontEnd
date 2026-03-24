// ดึงข้อมูลการสัมภาษณ์อันเดียวจาก API โดยใช้ id
export default async function getInterview(id: string, token: string) {
  const response = await fetch(
    `https://3-job-back-end.vercel.app/api/v1/interviews/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      next: { revalidate: 0 },
    },
  );

  if (!response.ok) {
    // DEBUG: See what the server is actually saying
    const errorText = await response.text();
    console.error(`Backend Error (${response.status}):`, errorText);

    if (response.status === 404) return null;

    // Provide more detail in the thrown error
    throw new Error(`Server responded with ${response.status}: ${errorText}`);
  }

  return await response.json();
}
