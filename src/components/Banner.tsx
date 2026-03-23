    'use client'
    import { useState } from 'react';
    import styles from './banner.module.css'
    import Image from 'next/image';
    import { useRouter } from 'next/navigation';
    import { useSession } from 'next-auth/react';

    export default function Banner (){
        const covers = ['/img/banner.jpg', '/img/banner2.jpg', '/img/banner3.jpg']
        const [index,setIndex]= useState(0);
        const router = useRouter();

        const {data:session} = useSession() 
        console.log(session?.user.token)

        return(
            <div className={`${styles.banner}`} onClick={()=>{setIndex(index+1)}}>
                    <Image src={covers[index%3]} 
                    alt='cover'
                    fill={true}
                    priority
                    objectFit='cover'/>
                    <div className="relative top-[100px] z-20 mx-auto w-fit px-8 py-6
                    flex flex-col items-center text-center
                    border-4 border-white border-dashed rounded-xl 
                    bg-white/10 backdrop-blur-sm">
        <Image 
            src={'/img/3joblogobg.png'} 
            alt='logo'
            width={0} 
            height={0} 
            sizes='100vw'
            priority
            className="w-auto h-[100px] mx-auto mb-4 border-5 " 
        />

        <h3 className={`text-xl text-white font-bold tracking-wide`}>
            3Jobs 3Incomes 3Opportunities
        </h3>
        </div>
                    {
                        session? <div className='z-20 absolute top-5 right-10 font-semibold text-cyan-800 text-xl overflow-hidden'>Welcome! {session.user?.name}</div>:null
                    }
                    
            </div>
        )
    }