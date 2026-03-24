export async function createInterview(
  companyId: string,
  dateString: string,
  userId: string,
  token: string,
) {
  const response = await fetch(
    `https://3-job-back-end.vercel.app/api/v1/companies/${companyId}/interviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intDate: dateString,
        user: userId,
        company: companyId,
        id: companyId,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create interview");
  }

  return await response.json();
}
