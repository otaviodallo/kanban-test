import Image from 'next/image';
import check from '../../public/aprovar.png';
import entrar from '../../public/entrar.png';
import styles from '../../src/styles/list.module.scss';
import { useEffect, useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    listId: number;
}

interface List {
    id: number;
    title: string;
    tasks: Task[];
}

interface ModalAddTaskProps {
    closeModal: () => void;
}

export default function List({ closeModal }: ModalAddTaskProps) {
    const [lists, setLists] = useState<List[]>([]);

    async function fetchLists() {
        try {
            const res = await fetch('/api/list');
            if (!res.ok) {
                throw new Error("Failed to fetch lists");
            }
            const listsData = await res.json();

            const listsWithTasks = await Promise.all(
                listsData.map(async (list: any) => {
                    const taskRes = await fetch(`/api/task?id=${list.id}`);
                    if (!taskRes.ok) {
                        throw new Error("Failed to fetch tasks for list");
                    }
                    const tasksData = await taskRes.json();
                    return { ...list, tasks: tasksData };
                })
            );

            setLists(listsWithTasks);
        } catch (error) {
            console.error("Failed to fetch lists and tasks", error);
        }
    }

    useEffect(() => {
        fetchLists();
    }, []);

    return (
        <>
            {lists.map((list) => (
                <div key={list.id} className={styles.list}>
                    <div className={styles.main}>
                        <div className={styles.title}>
                            <div>{list.title}</div>
                            <div className={styles.titlePoints}>
                                <a>...</a>
                            </div>
                        </div>
                        <div className={styles.tasks}>
                            {list.tasks.map((task, index) => (
                                <div key={index} className={styles.task}>
                                    <div className={styles.taskMain}>
                                        <div className={styles.taskCheck}>
                                            <Image src={check} alt="check" />
                                        </div>
                                        <div className={styles.taskContent}>
                                            <div className={styles.taskTitle}>
                                                {task.title}
                                            </div>
                                            <div className={styles.taskDescription}>
                                                {task.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                {/* Completed tasks */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
