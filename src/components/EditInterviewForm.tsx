"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import updateInterview from "@/libs/updateInterview";

// MUI & Dayjs Imports
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export default function InterviewDetailView({
  interview,
  token,
  iid,
}: {
  interview: any;
  token: string;
  iid: string;
}) {
  const router = useRouter();
  const company = interview.company;
  console.log(company)

  // State Management
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(
    interview.intDate ? dayjs(interview.intDate) : null,
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) {
      alert("Please select a date");
      return;
    }

    const startDate = dayjs('2022-05-10');
    const endDate = dayjs('2022-05-13');

    if (bookingDate.isBefore(startDate, 'day') || bookingDate.isAfter(endDate, 'day')) {
      alert("Invalid Date: Interview date must be between 10-05-2022 and 13-05-2022");
      return;
    }

    setLoading(true);
    try {
      const formattedDate = bookingDate.toISOString();
      await updateInterview(interview._id, formattedDate, token);

      alert("Interview updated successfully!");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F9F1] p-4 md:p-8 lg:px-[60px] font-sans relative">
      {/* Dark Header Background */}
      <div className="absolute top-0 left-0 right-0 z-0 w-full h-[220px] overflow-hidden shadow-inner bg-[#1a1a2e] rounded-b-[40px]">
        <div className="w-full h-full flex items-center justify-center text-white text-6xl font-black italic uppercase select-none">
          Edit Interview
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mt-[140px] mb-10 p-4">
          <div className="w-[120px] h-[120px] bg-[#3F3E3D] rounded-3xl border-4 border-[#F9F9F1] shadow-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-4xl font-bold text-white">
              {company?.compimgsrc ? (
              <img
                src={company.compimgsrc}
                alt="Logo"
                className="w-full h-full object-cover transition-all duration-500 hover:-rotate-10 hover:scale-110 "
              />
            ) : (
              <span className="text-5xl font-bold text-white uppercase">
                {company?.name?.[0] || "I"}
              </span>
            )}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left pb-2 pt-10">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Update Interview Schedule
            </h1>
            <p className="text-[#0062AD] font-bold text-lg flex flex-col">
              Interview ID:{" "}
              <span className="text-slate-500 font-mono text-sm">{iid}</span>
              Company : {""}
              <div className="text-slate-500 font-mono text-sm">{company.name}</div>
            </p>  
          </div>
        </div>

        {/* Form Box */}
        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/20 mb-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-[#0062AD] uppercase tracking-wider mb-4">
                Select New Interview Date
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="bg-white rounded-2xl w-full"
                  value={bookingDate}
                  onChange={(newValue) => setBookingDate(newValue)}
                  minDate={dayjs('2022-05-10')}
                  maxDate={dayjs('2022-05-13')}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "1rem",
                          backgroundColor: "#f8fafc",
                          "& fieldset": {
                            borderColor: "#e2e8f0",
                            borderWidth: "2px",
                          },
                          "&:hover fieldset": { borderColor: "#0062AD" },
                          "&.Mui-focused fieldset": { borderColor: "#0062AD" },
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#0062AD] hover:bg-[#004a82] text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg active:scale-95 disabled:bg-slate-400"
              >
                {loading ? "Updating..." : "Confirm Changes"}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 px-8 rounded-2xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
