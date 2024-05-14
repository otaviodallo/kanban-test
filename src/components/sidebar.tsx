import styles from '../styles/sidebar.module.scss'
import books from '../../public/books.png'
import Image from 'next/image';
import user from '../../public/user.png'


export default function SideBar() {
    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.main}>
                    <div className={styles.mainButtons}>
                        <div className={styles.divImage}>
                            <Image
                                src={books}
                                alt="livros"
                            />
                        </div>
                        <div className={styles.divImageAdd}>
                            +
                        </div>
                    </div>
                    <div className={styles.mainProfile}>
                        <div className={styles.divImageProfile}>
                            <Image
                                src={user}
                                alt="usuário"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}