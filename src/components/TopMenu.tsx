import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function TopMenu(){
    
    const session = await getServerSession(authOptions)
    
    return(
        <div className={styles.menucontainer}>
            <Link href="/">
            <Image src={'/img/3joblogo.png'} className={styles.logoimg}
            alt = 'logo'
            width={0} height={0} sizes='100vh'/>
            </Link>
            <TopMenuItem title='Companies' pageref='/company'/>
            <TopMenuItem title='Make Interviews' pageref='/reservations'/>
            <TopMenuItem title='Your Profile' pageref='/profile'/>
            <div className='flex flex-row absolute right-0'>
                <div className='flex items-center h-full pr-3 py-4 text-cyan-600 text-sm'>
                <TopMenuItem title='Cart' pageref='/cart'/>
                <TopMenuItem title='Register' pageref='/auth/register'/>
                </div>
            {
                session? <Link href="/api/auth/signout">
                    <div className='flex items-center h-full pr-3 py-4 text-cyan-600 text-sm'>
                        Sign-Out of {session.user?.name}
                    </div>
                </Link>
                :
                <Link href="/auth/signin">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                        Sign-In
                    </div>
                </Link>
            }
            </div>        
        </div>
    );
}