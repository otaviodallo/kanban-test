import raio from '../../public/raio.png'
import sino from '../../public/packard-bell.png'
import Image from 'next/image';
import styles from '../styles/header.module.scss'

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.main}>
                    <div className={styles.headerLeft}>
                        <Image
                            src={raio}
                            alt='raio'
                            className={styles.headerImgRaio}
                        />
                        <p>Taskanban</p>
                    </div>
                    <div className={styles.headerCenter}>
                        <Image
                            src={sino}
                            alt='sino'
                            className={styles.headerImgSino}
                        />
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <button>New List +</button>
                    </div>
                </div>
            </header>
        </>
    )
}
