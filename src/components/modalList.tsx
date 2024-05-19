import { useState } from 'react';
import { z } from 'zod';
import styles from '../../src/styles/modal.module.scss';

interface ModalAddListProps {
    closeModal: () => void;
    listId: string;
    onListAdded: () => void;
}

const ListSchema = z.object({
    title: z.string().min(1, "Title is required").max(50, "Title cannot exceed 50 characters"),
    description: z.string().optional()
});

export default function ModalList({
    closeModal,
    listId,
    onListAdded,
}: ModalAddListProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
    });

    const handleClose = () => {
        closeModal();
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(""); 
        const formData = {
            title: formValues.title,
            description: formValues.description,
        };

        const result = ListSchema.safeParse(formData);
        if (!result.success) {
            setLoading(false);
            setError(result.error.errors.map(err => err.message).join(", "));
            return;
        }

        try {
            const res = await fetch('/api/list', {
                method: 'POST',
                body: JSON.stringify(result.data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }
            onListAdded();
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
                            <div className={styles.input}>
                                <input
                                    type="hidden"
                                    name="listId"
                                    value={listId}
                                />
                                <input
                                    placeholder="Enter the list title here"
                                    name="title"
                                    value={formValues.title}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            title: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <div className={styles.inputSave}>
                                    <div className={styles.buttonsFinish}>
                                        <button type="submit" disabled={loading}>Save</button>
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
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        {error && <div className={styles.error}>{error}</div>}
                    </form>
                </div>
            </div>
        </>
    );
}
