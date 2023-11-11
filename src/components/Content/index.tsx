import { ReactNode } from 'react';
import styles from './index.module.css'
export default function Content({
    children, 
    title, 
    operation
}:{
    children: ReactNode;
    title: string;
    operation?: ReactNode}) {
   //{children}是content的子节点，也就是form
    return (
        <>
            <div className={styles.title}>
                {title}
                <span className={styles.btn}>{operation}</span>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </>
    )
    
}