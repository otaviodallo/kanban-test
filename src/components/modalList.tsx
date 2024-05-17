import { useState } from 'react';
import styles from '../../src/styles/modal.module.scss';

interface ModalAddListProps {
    closeModal: () => void;
    listId: string
    onListAdded: () => void;
}

export default function ModalList({ closeModal, listId, onListAdded }: ModalAddListProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
    });

    const handleClose = () => {
        closeModal()
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        try {
            const res = await fetch("/api/list", {
                method: "POST",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }
            onListAdded()
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
        closeModal()
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.contentInput1}>
                            <div className={styles.input}>
                                <input type="hidden" name="listId" value={listId} />
                                <input
                                    placeholder="Enter the list title here"
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
                    </form>
                </div>
            </div>
        </>
    );
}
