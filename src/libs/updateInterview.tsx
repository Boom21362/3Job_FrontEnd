export default async function updateInterview(
  id: string,
  bookingDate: string,
  token: string,
) {
  const response = await fetch(
    `https://3-job-back-end.vercel.app/api/v1/interviews/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intDate: bookingDate,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update interview booking");
  }

  return await response.json();
}
