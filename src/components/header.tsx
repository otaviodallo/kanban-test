import raio from '../../public/raio.png';
import sino from '../../public/packard-bell.png';
import lupa from '../../public/lupa.png';
import Image from 'next/image';
import styles from '../styles/header.module.scss';

interface ModalAddTaskProps {
    onAddList: () => void;
}

export default function Header({ onAddList }: ModalAddTaskProps) {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.main}>
                    <div className={styles.headerLeft}>
                        <Image
                            src={raio}
                            alt="raio"
                            className={styles.headerImgRaio}
                        />
                        <p>Taskanban</p>
                    </div>
                    <div className={styles.headerCenter}>
                        <Image
                            src={sino}
                            alt="sino"
                            className={styles.headerImgSino}
                        />
                        <div className={styles.headerCenterInput}>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Search Board"
                            />
                            <Image src={lupa} alt="lupa" />
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <button onClick={onAddList}>New List +</button>
                    </div>
                </div>
            </header>
        </>
    );
}
