import { useEffect, useState } from 'react';
import Image from 'next/image';
import check from '../../public/aprovar.png';
import entrar from '../../public/entrar.png';
import flecha from '../../public/flecha (1).png';
import styles from '../../src/styles/list.module.scss';
import trovao from '../../public/raio-trovao.png';
import { z } from 'zod';

interface ModalConfirmationProps {
    onAddTask: (id: number) => void;
    setFetchLists: (fetchLists: () => void) => void;
}

const TaskSchema = z.object({
    id: z.number(),
    title: z.string(),
    listId: z.number(),
    finishUntil: z.date().nullable(),
    completedAt: z.date().nullable()
});

const TaskArraySchema = z.array(TaskSchema);

interface Task {
    id: number;
    title: string;
    listId: number;
    finishUntil?: string | null;
    completedAt?: string | null;
}

interface List {
    id: number;
    title: string;
    description: string;
    tasks: Task[];
}

export default function List({ onAddTask, setFetchLists }: ModalConfirmationProps) {
    const [lists, setLists] = useState<List[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const [openCompletedTasks, setOpenCompletedTasks] = useState<{ [key: number]: boolean }>({});

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
        setFetchLists(fetchLists);
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
            fetchLists();
            if (!res.ok) {
                throw new Error("Failed to delete task");
            }
        } catch (error) {
            console.error("Failed to delete tasks", error);
        }
    }

    async function deleteList(id: number) {
        try {
            const res = await fetch("/api/list", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            fetchLists();
            if (!res.ok) {
                throw new Error("Failed to delete list");
            }
        } catch (error) {
            console.error("Failed to delete lists", error);
        }
    }

    const toggleCompletedTasks = (id: number) => {
        setOpenCompletedTasks(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const calculateDaysRemaining = (finishUntil?: string) => {
        if (!finishUntil) return "Sem data especificada";
        const today = new Date();
        const finishDate = new Date(finishUntil);
        if (finishDate < today) return "Data de conclusão indefinida";
        const differenceInTime = finishDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return `${differenceInDays} dias restantes`;
    };

    const handleTaskDoubleClick = async (listId: number, taskId: number) => {
        const now = new Date().toISOString();
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                const updatedTasks = list.tasks.map(task => {
                    if (task.id === taskId) {
                        task.completedAt = now;
                        return task;
                    }
                    return task;
                });
                const completedTask = updatedTasks.find(task => task.id === taskId);
                if (completedTask) {
                    setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, completedTask]);
                }
                return {
                    ...list,
                    tasks: updatedTasks.filter(task => task.id !== taskId)
                };
            }
            return list;
        });
        setLists(updatedLists);
    };

    return (
        <>
            {lists.map((list) => (
                <div key={list.id} className={styles.list}>
                    <div className={styles.main}>
                        <div className={styles.title}>
                            <div>
                                <div>{list.title}</div>
                                <div className={styles.listDescription}>{list.description}</div>
                            </div>
                            <div className={styles.titlePoints}>
                                <a onClick={() => { deleteList(list.id) }}>excluir</a>
                            </div>
                        </div>
                        {list.tasks && (
                            <div className={styles.tasks}>
                                {list.tasks.map((task) => (
                                    <div key={task.id} className={styles.task} onDoubleClick={() => handleTaskDoubleClick(list.id, task.id)}>
                                        <div className={styles.taskMain}>
                                            <div className={styles.taskCheck}>
                                                <Image src={check} alt="check" />
                                            </div>
                                            <div className={styles.taskContent}>
                                                <div className={styles.taskTitle}>
                                                    {task.title}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.taskDelete}>
                                            <p>{calculateDaysRemaining(task.finishUntil ?? undefined)}</p>
                                            <a onClick={() => { deleteTask(task.id) }}>X</a>
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
                    <div className={styles.completedTasks}>
                        <div className={styles.completedList}>
                            <div className={styles.completedText}>
                                <div>Completed List</div>
                                <div>
                                    <a onClick={() => toggleCompletedTasks(list.id)}>
                                        <Image
                                            src={flecha}
                                            alt="flecha"
                                        />
                                    </a>
                                </div>
                            </div>
                            {openCompletedTasks[list.id] && (
                                <div className={styles.tasksCompletedMain}>
                                    <div className={styles.tasksCompletedContent}>
                                        {completedTasks.map(task => (
                                            <div key={task.id} className={styles.task}>
                                                <div className={styles.taskMain}>
                                                    <div className={styles.taskCheck}>
                                                        <Image src={check} alt="check" />
                                                    </div>
                                                    <div className={styles.taskContent}>
                                                        <div className={styles.taskTitle}>
                                                            {task.title}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.taskDelete}>
                                                    <p>Completed at: {task.completedAt}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {completedTasks.length === 0 && (
                                            <div className={styles.tasksCompletedContentEmpty}>
                                                No tasks completed yet
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
