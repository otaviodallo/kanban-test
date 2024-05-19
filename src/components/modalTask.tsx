import { useState } from 'react';
import { z } from "zod";
import styles from '../../src/styles/modal.module.scss';

interface ModalAddTaskProps {
    closeModal: () => void;
    listId: string;
    onTaskAdded: () => void;
}

// Definindo o schema de validação
const TaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(50, "Title cannot exceed 50 characters"),
    listId: z.number(),
    finishUntil: z.string().optional().nullable().refine((date) => {
        if (!date) return true;
        return !isNaN(Date.parse(date));
    }, "Invalid date format"),
});

export default function ModalAddTask({ closeModal, listId, onTaskAdded }: ModalAddTaskProps) {
    const [showDeadlineInput, setShowDeadlineInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState({
        title: "",
        listId: listId,
        finishUntil: ""
    });

    const handleClose = () => {
        closeModal();
    };

    const handleShowDeadlineInput = () => {
        setShowDeadlineInput((prev) => !prev);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const formData = {
            title: formValues.title,
            listId: parseInt(listId),
            finishUntil: formValues.finishUntil ? new Date(formValues.finishUntil).toISOString() : null
        };
        const result = TaskSchema.safeParse(formData);
        if (!result.success) {
            setLoading(false);
            setError(result.error.errors.map(err => err.message).join(", "));
            return;
        }

        try {
            const res = await fetch("/api/task", {
                method: "POST",
                body: JSON.stringify(result.data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }
            onTaskAdded();
            closeModal();
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    };

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
                                    required
                                />
                            </div>
                            <div>
                                <div className={styles.inputSave}>
                                    <div className={styles.inputSaveCaracter}>
                                        {formValues.title.length}/50
                                    </div>
                                    <div className={styles.buttonsFinish}>
                                        <button type="submit" disabled={loading}>Save</button>
                                        <a onClick={handleClose}>X</a>
                                    </div>
                                </div>
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
                                    id="finishUntil"
                                    name="finishUntil"
                                    onChange={(e) => setFormValues({ ...formValues, finishUntil: e.target.value })}
                                />
                            </div>
                        )}
                        {error && <div className={styles.error}>{error}</div>}
                    </form>
                </div>
            </div>
        </>
    );
}
