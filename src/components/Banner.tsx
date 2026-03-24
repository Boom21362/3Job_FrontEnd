"use client";
import { useState } from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ["/img/banner.jpg", "/img/banner2.jpg", "/img/banner3.jpg"];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const { data: session } = useSession();
  console.log(session?.user.token);

  return (
    <div
      className={`${styles.banner}`}
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      <Image
        src={covers[index % 3]}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
      />
      <div
        className="relative top-[100px] z-20 mx-auto w-fit px-8 py-6
                    flex flex-col items-center text-center
                    border-4 border-white border-dashed rounded-xl 
                    bg-white/10 backdrop-blur-sm"
      >
        <Image
          src={"/img/3joblogobg.png"}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="w-auto h-[100px] mx-auto mb-4 border-5 "
        />

        <h3 className={`text-xl text-white font-bold tracking-wide`}>
          3Jobs 3Incomes 3Opportunities
        </h3>
      </div>
      {session ? (
        <div className="absolute top-6 right-8 flex items-center gap-3 px-4 py-2 bg-slate-100/80 hover:bg-slate-100/70 hover:scale-102 hover:shadow-xl transition-all duration-300 transition-colors rounded-full border border-slate-200 shadow-sm animate-fade-in-down">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white text-xs font-bold uppercase shadow-inner">
            {session.user?.name?.charAt(0) || "U"}
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold leading-none">
              Welcome
            </span>
            <span className="text-sm font-semibold text-slate-900 leading-tight">
              {session.user?.name}
            </span>
          </div>
        </div>
      ) : null}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {covers.map((_, i) => {
          const isActive = index % covers.length === i;
          return (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-all ${isActive ? "bg-white" : "bg-white/30"}`}
            />
          );
        })}
      </div>
    </div>
  );
}
