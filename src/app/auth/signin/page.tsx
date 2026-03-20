'use client'
import { signIn,getSession } from "next-auth/react"
import { Box, TextField, Button, Typography,CircularProgress } from "@mui/material";
import Image from "next/image";
import EyeBanner from "@/components/signInPage/EyeBanner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: "/", 
    });

    console.log("Client Side Result:", result);

  if (result?.error) {
      alert("Login failed! " + result.error);
      setIsLoading(false);
    } else {
      const session = await getSession();

    if (session?.user?.role === "admin") {
    router.push("/admin/dashboard");
    } else {
    router.push("/profile");
    }
      router.refresh(); 
    }
  }

  return (
    <div className="flex flex-row w-full min-h-screen items-center justify-center bg-gradient-to-br from-[#0062AD] via-[#004a82] to-[#002d54]">
      
      <div className="px-5">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 400,
            height: 550,
            borderRadius: 2,
            bgcolor: '#F5F5DC',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow:'hidden',
            p: 4,
            boxShadow: 2
          }}
        >
          <Image src="/img/3joblogo.png"  width={200}
      height={100}
      alt="3Job logo"/>
          <Typography variant="h4" mb={3} fontWeight="bold" paddingTop={3}>Sign In</Typography>
          <TextField name="email" label="Email" fullWidth margin="normal" />
          <TextField name="password" label="Password" type="password" fullWidth margin="normal" />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
            fullWidth 
            sx={{ mt: 3, bgcolor: '#0062AD', '&:hover': { bgcolor: '#004a82' } }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
          <div className="text-sm mt-2">
            Don't have account? <Link href='/auth/register' className="!text-[#004a82]">Register Here!</Link>
          </div>
        </Box>
      </div>

      <div>
        <Box
          sx={{
            width: 400,
            height: 550,
            borderRadius: 2,
            overflow: 'hidden',
             display: { xs: 'none', md: 'block' },
            alignItems: 'center',
            boxShadow: 4,
            bgcolor:'#F5F5DC'
          }}>
          <EyeBanner />
        </Box>
      </div>
    </div>
  )
}