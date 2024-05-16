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

export default function List({ onAddTask }) {
    const [lists, setLists] = useState<List[]>([]);

    async function fetchLists() {
        try {
            const res = await fetch('/api/list');
            if (!res.ok) {
                throw new Error("Failed to fetch lists");
            }
            const data = await res.json();
            setLists(data);
        } catch (error) {
            console.error("Failed to fetch lists", error);
        }
    }
    useEffect(() => {
        fetchLists();
    }, []);

    async function deleteTask(id: number) {
        try {
            const res = await fetch("/api/task", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(!res.ok) {
                throw new Error("Failed to delete task")
            }
        } catch(error) {
            console.error("Failed to delete tasks", error)
        }
    }

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
                        {list.tasks && (
                            <div className={styles.tasks}>
                                {list.tasks.map((task) => (
                                    <div key={task.id} className={styles.task}>
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
                                        <div className={styles.taskDelete}>
                                            <a onClick={() => deleteTask(list.id)}>X</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles.newTasks}>
                            <input
                                type="text"
                                id="newTask"
                                name="newTaskInput"
                                placeholder="add a new task"
                                onClick={() => onAddTask(list.id)}
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
                                { }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
