export default function ProfileBasePage() {
  return (
    <main className="flex flex-col items-center justify-start w-full pt-0 my-0">
      <h1 className="text-4xl font-extrabold text-[#0062AD] drop-shadow-sm">
        Your Profile
      </h1>
      {/* blob ซ้ายล่าง */}
      <div style={{ position: "fixed", width: "473px", height: "447px", bottom: "-100px", left: "-194px", borderRadius: "50%", background: "linear-gradient(180deg, #0062AD 0%, #008EFB 61.54%, #0381E1 100%)", pointerEvents: "none", zIndex: 0 }} />

      {/* blob ขวาบน */}
      <div style={{ position: "fixed", width: "473px", height: "447px", top: "100px", right: "-100px", borderRadius: "50%", background: "radial-gradient(50% 50% at 50% 50%, #0062AD 33%, #0068B8 65%, #0077D2 100%)", pointerEvents: "none", zIndex: 0 }} />
      <div className="w-24 h-1 bg-[#0062AD] mt-2 rounded-full opacity-20"></div>
    </main>
  );
}