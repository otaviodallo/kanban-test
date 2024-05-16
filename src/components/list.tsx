import Image from 'next/image';
import check from '../../public/aprovar.png';
import entrar from '../../public/entrar.png';
import styles from '../../src/styles/list.module.scss';
import { useEffect, useState } from 'react';

interface ModalConfirmationProps {
    onAddTask: (id: number) => void;
}
interface Task {
    id: number;
    title: string;
    description: string;
    listId: number;
    finishUntil: Date;
}

interface List {
    id: number;
    title: string;
    tasks: Task[];
}

export default function List({ onAddTask }: ModalConfirmationProps) {
    const [lists, setLists] = useState<List[]>([]);
    const [editingListId, setEditingListId] = useState<number | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
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
            fetchLists();
            if (!res.ok) {
                throw new Error("Failed to delete task")
            }
        } catch (error) {
            console.error("Failed to delete tasks", error)
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
            })
            fetchLists();
            if (!res.ok) {
                throw new Error("Failed to delete list")
            }
        } catch (error) {
            console.error("Failed to delete lists", error)
        }
    }
    async function updateList(id: number, title: string) {
        try {
            const res = await fetch("/api/list", {
                method: "PUT",
                body: JSON.stringify({ id, title }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            fetchLists();
            if (!res.ok) {
                throw new Error("Failed to update list")
            }
        } catch (error) {
            console.error("Failed to update lists", error)
        }
    }
    async function updateTask(id: number, title: string) {
        try {
            const res = await fetch("/api/task", {
                method: "PUT",
                body: JSON.stringify({ id, title }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            fetchLists();
            if (!res.ok) {
                throw new Error("Failed to update task")
            }
        } catch (error) {
            console.error("Failed to update tasks", error)
        }
    }
    function handleEditList(id: number, title: string) {
        setEditingListId(id);
        setEditValue(title);
    }

    function handleEditTask(id: number, title: string) {
        setEditingTaskId(id);
        setEditValue(title);
    }
    function handleKeyPress(event: React.KeyboardEvent, id: number, type: 'list' | 'task') {
        if (event.key === 'Enter') {
            if (type === 'list') {
                updateList(id, editValue);
            } else {
                updateTask(id, editValue);
            }
            setEditingListId(null);
            setEditingTaskId(null);
            setEditValue('');
        }
    }

    return (
        <>
            {lists.map((list) => (
                <div key={list.id} className={styles.list}>
                    <div className={styles.main}>
                        <div className={styles.title}>
                            {editingListId === list.id ? (
                                <input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, list.id, 'list')}
                                    onBlur={() => setEditingListId(null)}
                                />
                            ) : (
                                <div onClick={() => handleEditList(list.id, list.title)}>
                                    {list.title}
                                </div>
                            )}
                            <div className={styles.titlePoints}>
                                <a onClick={() => deleteList(list.id)}>excluir</a>
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
                                                {editingTaskId === task.id ? (
                                                    <input
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        onKeyPress={(e) => handleKeyPress(e, task.id, 'task')}
                                                        onBlur={() => setEditingTaskId(null)}
                                                    />
                                                ) : (
                                                    <div
                                                        className={styles.taskTitle}
                                                        onClick={() => handleEditTask(task.id, task.title)}
                                                    >
                                                        {task.title}
                                                    </div>
                                                )}
                                                <div className={styles.taskDescription}>
                                                    {task.description}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.taskDelete}>
                                            <div>Data Limite: </div>
                                            <a onClick={() => deleteTask(task.id)}>X</a>
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
