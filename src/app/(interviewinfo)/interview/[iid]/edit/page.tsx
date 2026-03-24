  import getInterview from "@/libs/getInterview";
  import { getServerSession } from "next-auth";
  import { authOptions } from "@/libs/authOptions";
  import { redirect, notFound } from "next/navigation";
  import EditInterviewForm from "@/components/EditInterviewForm";

  export default async function EditInterviewPage({
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

    // Just return the component and pass the data
    return <EditInterviewForm interview={interview} token={token} iid={iid} />;
  }
