'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/libs/register";
import { Alert, CircularProgress } from "@mui/material";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      // 1. Call your lib function
      await register(formData); 
      
      // 2. If successful, go to login
      router.push("/auth/signin");
    } catch (err: any) {
      // 3. Handle backend errors (e.g., User already exists)
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
}