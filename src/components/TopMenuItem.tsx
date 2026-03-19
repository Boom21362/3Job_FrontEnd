import Link from "next/link";
import styles from './topmenu.module.css'

export default function TopMenuItem ({title,pageref}:{title:string,pageref:string}){
    return(
        <Link href={pageref} className={styles.itemcontainer}>
            {title}
        </Link>
    );
}