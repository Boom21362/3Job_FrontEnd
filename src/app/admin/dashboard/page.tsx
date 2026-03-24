import Link from 'next/link';
import { getServerSession } from "next-auth";



import { authOptions } from '@/libs/authOptions';
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    // Security Gate
    if (!session || session.user.role !== 'admin') {
        redirect("/");
    }

    return (
        <main className="h-[calc(100vh-50px)] overflow-hidden flex flex-col items-center justify-center bg-[#F5F5DC] ">
            <h1 className="text-4xl font-extrabold text-[#0062AD] mb-2">Admin Control Center</h1>
            <p className="text-slate-500 mb-12 text-lg text-center">
                Welcome back, {session.user.name}. What would you like to manage today?
            </p>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                
                {/* Button 1: Manage Companies */}
                <Link href="/company" className="flex-1 group">
                    <div className="bg-white p-10 rounded-2xl shadow-md border-2 border-transparent hover:border-[#0062AD] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#0062AD] transition-colors">
                            <span className="text-3xl">🏢</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Manage Companies</h2>
                        <p className="text-slate-500">Add, edit, or remove company profiles and contact details.</p>
                    </div>
                </Link>

                {/* Button 2: Manage Interviews (Reservations) */}
                <Link href="/reservations/manage" className="flex-1 group">
                    <div className="bg-white p-10 rounded-2xl shadow-md border-2 border-transparent hover:border-[#0062AD] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#0062AD] transition-colors">
                            <span className="text-3xl">📅</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Manage Interviews</h2>
                        <p className="text-slate-500">View all vaccination/interview queues and adjust schedules.</p>
                    </div>
                </Link>

            </div>

            <Link href="/profile" className="mt-12 text-slate-700 hover:text-[#0062AD] transition-all underline decoration-slate-400 decoration-1 underline-offset-4">
                Back to my profile
            </Link>
        </main>
    );
}