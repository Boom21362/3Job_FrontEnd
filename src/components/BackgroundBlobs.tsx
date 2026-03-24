"use client";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Bottom Left Blob */}
      <div
        className="absolute w-[473px] h-[447px] -bottom-[100px] -left-[194px] rounded-full opacity-40 md:opacity-60"
        style={{
          background:
            "linear-gradient(180deg, #0062AD 0%, #008EFB 61.54%, #0381E1 100%)",
          animation: "float-slow 20s ease-in-out infinite",
        }}
      />

      {/* Top Right Blob */}
      <div
        className="absolute w-[473px] h-[447px] top-[100px] -right-[100px] rounded-full opacity-40 md:opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #0062AD 33%, #0068B8 65%, #0077D2 100%)",
          animation: "float-delayed 15s ease-in-out infinite",
        }}
      />

      {/* Inline Keyframes to avoid styled-jsx conflicts */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 20px); }
        }
      `}</style>
    </div>
  );
}
