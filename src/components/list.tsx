import styles from '../../src/styles/list.module.scss';
import entrar from '../../public/entrar.png';
import check from '../../public/aprovar.png';
import Image from 'next/image';

export default function List({ onAddTask }) {
    return (
        <>
            <div className={styles.list}>
                <div className={styles.main}>
                    <div className={styles.title}>
                        <div>Lithic Product</div>
                        <div className={styles.titlePoints}>
                            <a>...</a>
                        </div>
                    </div>
                    <div className={styles.tasks}>
                        <div className={styles.task}>
                            <div className={styles.taskMain}>
                                <div className={styles.taskCheck}>
                                    <Image src={check} alt="check" />
                                </div>
                                <div className={styles.taskContent}>
                                    <div className={styles.taskTitle}>
                                        Create mini design site
                                    </div>
                                    <div className={styles.taskDescription}>
                                        Mini design site
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.task}>
                            <div className={styles.taskMain}>
                                <div className={styles.taskCheck}>
                                    <Image src={check} alt="check" />
                                </div>
                                <div className={styles.taskContent}>
                                    <div className={styles.taskTitle}>
                                        Create mini design site
                                    </div>
                                    <div className={styles.taskDescription}>
                                        Mini design site
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.task}>
                            <div className={styles.taskMain}>
                                <div className={styles.taskCheck}>
                                    <Image src={check} alt="check" />
                                </div>
                                <div className={styles.taskContent}>
                                    <div className={styles.taskTitle}>
                                        Create mini design site
                                    </div>
                                    <div className={styles.taskDescription}>
                                        Mini design site
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.newTasks}>
                        <input
                            type="text"
                            id="newTask"
                            name="newTaskInput"
                            placeholder="add a new task"
                            onClick={onAddTask}
                        />
                        <Image src={entrar} alt="entrar" />
                    </div>
                </div>
                <div>
                <div className={styles.completedList}>
                    <div className={styles.completedText}>
                        <div>Completed List</div>
                    </div>
                    <div className={styles.tasks}>
                        <div className={styles.task}>
                            <div className={styles.taskMain}>
                                <div className={styles.taskCheck}>
                                    <Image src={check} alt="check" />
                                </div>
                                <div className={styles.taskContent}>
                                    <div className={styles.taskTitle}>
                                        Create mini design site
                                    </div>
                                    <div className={styles.taskDescription}>
                                        Mini design site
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.task}>
                            <div className={styles.taskMain}>
                                <div className={styles.taskCheck}>
                                    <Image src={check} alt="check" />
                                </div>
                                <div className={styles.taskContent}>
                                    <div className={styles.taskTitle}>
                                        Create mini design site
                                    </div>
                                    <div className={styles.taskDescription}>
                                        Mini design site
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.task}>
                            <div className={styles.taskMain}>
                                <div className={styles.taskCheck}>
                                    <Image src={check} alt="check" />
                                </div>
                                <div className={styles.taskContent}>
                                    <div className={styles.taskTitle}>
                                        Create mini design site
                                    </div>
                                    <div className={styles.taskDescription}>
                                        Mini design site
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
