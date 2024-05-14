import styles from '../../src/styles/modal.module.scss'

interface ModalAddTaskProps {
    closeModal: () => void;
}

export default function ModalAddTask({ closeModal }: ModalAddTaskProps) {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.contentInput1}>
                        <div className={styles.input}>
                            <input placeholder='Enter the task title here' />
                        </div>
                        <div>
                            <div className={styles.inputSave}>
                                <div className={styles.inputSaveCaracter}>0/50</div>
                                <div><button onClick={closeModal}>Save</button></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentInput2}>
                        <div className={styles.input}>
                            <input placeholder='Add a short description' />
                        </div>
                    </div>
                    <div className={styles.contentInput3}>
                        <div className={styles.input}>
                            <input placeholder='Create subtask' />
                        </div>
                        <div>
                            <div className={styles.inputSave}>
                                <div>
                                    <button>Return to add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentInput4}>
                        <div className={styles.text}>
                            Timed task
                        </div>
                        <div>
                            <div className={styles.inputSave}>
                                <input type='checkbox' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}