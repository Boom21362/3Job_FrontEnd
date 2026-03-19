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
            <Image src={'/img/logo.avif'} className={styles.logoimg}
            alt = 'logo'
            width={0} height={0} sizes='100vh'/>
            <TopMenuItem title='Select Car' pageref='/car'/>
            <TopMenuItem title='Reservations' pageref='/reservations'/>
            <TopMenuItem title='About' pageref='/about'/>
            <div className='flex flex-row absolute right-0'>
                <TopMenuItem title='Cart' pageref='/cart'/>'

            {
                session? <Link href="/api/auth/signout">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                        Sign-Out of {session.user?.name}
                    </div>
                </Link>
                :
                <Link href="/api/auth/signin">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                        Sign-In
                    </div>
                </Link>
            }
            </div>        
        </div>
    );
}