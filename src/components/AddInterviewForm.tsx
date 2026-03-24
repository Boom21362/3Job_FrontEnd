"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createInterview } from "@/libs/createInterview";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MenuItem, Select, FormControl } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export default function AddInterviewForm({
  companies,
  token,
  userId,
}: {
  companies: any[];
  token: string;
  userId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedId = searchParams.get("companyId");

  const [selectedCompany, setSelectedCompany] = useState("");
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const idFromUrl = searchParams.get("companyId");
    if (idFromUrl) {
      setSelectedCompany(idFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCompany || !bookingDate) {
      alert("Please select both a company and a date.");
      return;
    }
    console.log("DEBUG -> selectedCompany:", selectedCompany);
    console.log("DEBUG -> userId:", userId);

    if (!selectedCompany) {
      alert("Company ID is missing in state!");
      return;
    }

    setLoading(true);
    try {
      const dateString = bookingDate.toISOString();

      const result = await createInterview(
        selectedCompany,
        dateString,
        userId,
        token,
      );

      // CRITICAL FIX: Add 'return' here so it stops if there's a backend error
      if (result?.error) {
        alert(`Booking failed: ${result.error}`);
        setLoading(false);
        return;
      }

      // If we got here, it actually worked!
      alert("Interview scheduled successfully!");
      router.push("/profile");
      router.refresh();
    } catch (error: any) {
      alert(`Network error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F9F1] p-4 md:p-8 lg:px-[60px] font-sans relative">
      <div className="absolute top-0 left-0 right-0 z-0 w-full h-[220px] bg-[#1a1a2e] rounded-b-[40px] flex items-center justify-center text-white/10 text-6xl font-black italic uppercase">
        New Interview
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pt-[140px]">
        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Company Selection */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-[#0062AD] uppercase mb-4">
                Target Company
              </label>
              <FormControl fullWidth>
                <Select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value as string)}
                  displayEmpty
                  sx={{ borderRadius: "1rem", backgroundColor: "#f8fafc" }}
                >
                  <MenuItem value="" disabled>
                    Select a Company
                  </MenuItem>
                  {companies.map((comp) => (
                    <MenuItem
                      key={comp._id || comp.id}
                      value={comp._id || comp.id}
                    >
                      {comp.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* 2. Date Picker */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-[#0062AD] uppercase mb-4">
                Interview Date
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={bookingDate}
                  onChange={(newValue) => setBookingDate(newValue)}
                  slotProps={{
                    textField: { fullWidth: true, variant: "outlined" },
                  }}
                />
              </LocalizationProvider>
            </div>

            {/* 3. Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#0062AD] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-[#004a82] active:scale-95 disabled:bg-slate-400"
              >
                {loading ? "Processing..." : "CREATE APPOINTMENT"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
