export default async function deleteInterview(id: string, token: string) {
  const response = await fetch(
    `https://3-job-back-end.vercel.app/api/v1/interviews/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete interview");
  }

  return await response.json();
}
