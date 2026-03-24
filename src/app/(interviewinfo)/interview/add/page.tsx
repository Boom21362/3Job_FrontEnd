import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getCompanies from "@/libs/getCompanies";
import AddInterviewForm from "@/components/AddInterviewForm";

export default async function AddInterviewPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const token = (session.user as any).accessToken;
  const userId = (session.user as any).id || (session.user as any)._id;

  // Fetch companies so the user can choose which one to book with
  const companiesData = await getCompanies();
  const companies = companiesData.data || [];

  return (
    <AddInterviewForm companies={companies} token={token} userId={userId} />
  );
}
