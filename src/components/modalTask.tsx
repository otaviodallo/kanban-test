import { useState } from 'react';
import styles from '../../src/styles/modal.module.scss';
import { z } from "zod";

interface ModalAddTaskProps {
    closeModal: () => void;
    listId: string
}

export default function ModalAddTask({ closeModal, listId }: ModalAddTaskProps) {
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [showDeadlineInput, setShowDeadlineInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        listId: ""
    });

    const handleClose = () => {
        closeModal()
    }

    const handleShowDeadlineInput = () => {
        setShowDeadlineInput((prev) => !prev);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const listId = parseInt(formData.get('listId') as string)

        try {
            const res = await fetch("/api/task", {
                method: "POST",
                body: JSON.stringify({ title, description, listId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }

        closeModal()
    };

    const TaskSchema = z.object({
        title: z.string(),
        description: z.string(),
        listId: z.number(),
        deadline: z.date().nullable()
    });

    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.contentInput1}>
                            <input type="hidden" name="listId" value={listId} />
                            <div className={styles.input}>
                                <input
                                    placeholder="Enter the task title here"
                                    name="title"
                                    value={formValues.title}
                                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <div className={styles.inputSave}>
                                    <div className={styles.inputSaveCaracter}>
                                        0/50
                                    </div>
                                    <div className={styles.buttonsFinish}>
                                        <button type="submit">Save</button>
                                        <a onClick={handleClose}>X</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentInput2}>
                            <div className={styles.input}>
                                <input
                                    placeholder="Add a short description"
                                    name="description"
                                    value={formValues.description}
                                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
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
                                    <input type="checkbox" onClick={handleShowDeadlineInput} />
                                </div>
                            </div>
                        </div>
                        {showDeadlineInput && (
                            <div className={styles.inputDate}>
                                <div>Data limite:</div>
                                <input
                                    type="datetime-local"
                                    id="deadline"
                                    name="deadline"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setDeadline(value ? new Date(value) : null);
                                    }}
                                />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}