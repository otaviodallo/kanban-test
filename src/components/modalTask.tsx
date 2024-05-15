import { db } from '@/db/index';
import { useState } from 'react';
import styles from '../../src/styles/modal.module.scss';

interface ModalAddTaskProps {
    closeModal: () => void;
}

export default function ModalAddTask({ closeModal }: ModalAddTaskProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.contentInput1}>
                            <div className={styles.input}>
                                <input
                                    placeholder="Enter the task title here"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className={styles.inputSave}>
                                    <div className={styles.inputSaveCaracter}>
                                        0/50
                                    </div>
                                    <div>
                                        <button type="submit">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentInput2}>
                            <div className={styles.input}>
                                <input
                                    placeholder="Add a short description"
                                    name="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles.contentInput3}>
                            <div className={styles.input}>
                                <input placeholder="Create subtask" />
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
                            <div className={styles.text}>Timed task</div>
                            <div>
                                <div className={styles.inputSave}>
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
