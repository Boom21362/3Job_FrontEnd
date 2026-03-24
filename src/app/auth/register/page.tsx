'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/libs/register"; // Your fetcher
import EyeBanner from "@/components/signInPage/EyeBanner";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    // We create a plain object and cast it to 'any' to avoid the TS error
    const userData = Object.fromEntries(formData.entries());
    const tel = userData.tel as string;
    const telPattern = /^0\d{2}-\d{7}$/; // matches 0XX-XXXXXXX

  if (!telPattern.test(tel)) {
    alert("Phone number must be in the format 0XX-XXXXXXX");  
    setIsLoading(false);
    return; // stop execution
  }
    try {
      await register(userData as any); 
      router.push("/auth/signin"); // Send them to the login eyes!
    } catch (err: any) {
      setError(err.message || "Email already registered or Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row w-full min-h-screen items-center justify-center bg-[#F5F5DC] p-4">
      
      <Box sx={{ width: 400, height: 550, overflow: 'hidden', display: { xs: 'none', md: 'block' }, boxShadow: 4 }}>
        <EyeBanner />
      </Box>

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          width: 400, height: 550, bgcolor: 'white', p: 4, 
          display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: 2 
        }}
      > 
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
  <img
    src="/img/3joblogo.png"
    width={100}
    height={100}
    alt="3Job logo"
  />
</div>  
        <Typography variant="h4" mb={2} fontWeight="bold" color="#0062AD" sx={{paddingTop:1}}>Sign Up</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField name="name" label="Full Name" fullWidth margin="dense" required />
        <TextField name="tel" label="Phone Number (0XX-XXXXXXX)" fullWidth margin="dense" required />
        <TextField name="email" label="Email" type="email" fullWidth margin="dense" required />
        <TextField name="password" label="Password" type="password" fullWidth margin="dense" required />
        
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isLoading}
          fullWidth 
          sx={{ mt: 3, py: 1.5, bgcolor: '#0062AD' ,'&:hover': { bgcolor: '#004a82' }}}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
        </Button>
         <div className="text-sm mt-2">
            Already have account? <Link href='/auth/signin' className="!text-[#004a82]">Log-in Here!</Link>
          </div>
      </Box>
    </div>
  );
}