'use server'
import { redirect } from "next/navigation";

export async function register(formData: any) {

  const name = formData.name;
  const tel = formData.tel;
  const email = formData.email;
  const password = formData.password;

  const response = await fetch("https://3-job-back-end.vercel.app/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      telephone_number: tel,
      email : email,
      password : password,
      role: "user"
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Backend Error:", errorData.message);
    return { error: errorData.message || "Registration failed" };
  }

  redirect("/auth/signin");
}