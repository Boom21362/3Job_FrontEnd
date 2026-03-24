import getInterview from "@/libs/getInterview";
import getCompany from "@/libs/getCompany";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, notFound } from "next/navigation";
import InterviewDetail from "@/components/InterviewDetail";

export default async function InterviewDetailPage({
  params,
}: {
  params: Promise<{ iid: string }>;
}) {
  const { iid } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const token = (session.user as any).accessToken;

  const interviewData = await getInterview(iid, token);
  if (!interviewData || !interviewData.data) {
    return notFound();
  }
  const interview = interviewData.data;
  const fullCompanyData = await getCompany(
    interview.company._id || interview.company.id,
  );
  const enrichedInterview = {
    ...interview,
    company: fullCompanyData.data,
  };

  const isAdmin = session.user.role === "admin";

  return (
    <InterviewDetail
      interview={enrichedInterview}
      isAdmin={isAdmin}
      token={token}
      iid={iid}
    />
  );
}
