import Image from 'next/image';
import { useEffect, useState } from 'react';
import check from '../../public/aprovar.png';
import entrar from '../../public/entrar.png';
import flecha from '../../public/flecha (1).png';
import raio from '../../public/raio-trovao.png';
import styles from '../../src/styles/list.module.scss';

interface ModalConfirmationProps {
    onAddTask: (id: number) => void;
    setFetchLists: (fetchLists: () => void) => void;
}

interface CompletedTaskState {
    [key: number]: Task[];
}

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
    const [completedTasksByList, setCompletedTasksByList] = useState<{ [key: number]: Task[] }>({});
    const [openCompletedTasks, setOpenCompletedTasks] = useState<{ [key: number]: boolean }>({});
    const [editingTask, setEditingTask] = useState<{ [key: number]: boolean }>({});
    const [editingList, setEditingList] = useState<{ [key: number]: boolean }>({});
    const [temporaryTaskTitle, setTemporaryTaskTitle] = useState<{ [key: number]: string }>({});
    const [temporaryListTitle, setTemporaryListTitle] = useState<{ [key: number]: string }>({});
    const [temporaryFinishUntil, setTemporaryFinishUntil] = useState<{ [key: number]: string }>({});
    const [editingFinishUntil, setEditingFinishUntil] = useState<{ [key: number]: boolean }>({});

    async function fetchLists() {
        try {
            const res = await fetch('/api/list');
            if (!res.ok) throw new Error('Failed to fetch lists');
            const data = await res.json();
            setLists(data);

            const completedTasks: CompletedTaskState = {};
            data.forEach((list: List) => {
                const completedTasksInList = list.tasks.filter((task: Task) => task.completedAt);
                completedTasks[list.id] = completedTasksInList;
            });
            setCompletedTasksByList(completedTasks);
        } catch (error) {
            console.error('Failed to fetch lists', error);
        }
    }

    useEffect(() => {
        fetchLists();
        setFetchLists(fetchLists);
    }, []);

    async function deleteTask(id: number) {
        try {
            const res = await fetch('/api/task', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Failed to delete task');
            fetchLists();
        } catch (error) {
            console.error('Failed to delete tasks', error);
        }
    }

    async function deleteList(id: number) {
        try {
            const res = await fetch('/api/list', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Failed to delete list');
            fetchLists();
        } catch (error) {
            console.error('Failed to delete lists', error);
        }
    }

    async function updateTask(task: Task) {
        try {
            const res = await fetch('/api/task', {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Failed to update task');
            fetchLists();
        } catch (error) {
            console.error('Failed to update task', error);
        }
    }

    async function updateList(list: List) {
        try {
            const res = await fetch('/api/list', {
                method: 'PUT',
                body: JSON.stringify(list),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Failed to update list');
            fetchLists();
        } catch (error) {
            console.error('Failed to update lists', error);
        }
    }

    const toggleCompletedTasks = (id: number) => {
        setOpenCompletedTasks((prevState) => {
            const isOpen = prevState[id] ?? false;
            return { ...prevState, [id]: !isOpen };
        });
    };

    const calculateDaysRemaining = (finishUntil?: string) => {
        if (!finishUntil) return 'Sem data especificada';
        const today = new Date();
        const finishDate = new Date(finishUntil);
        const offset = finishDate.getTimezoneOffset() * 60000;
        const brazilianDate = new Date(finishDate.getTime() - offset + (3 * 3600000));
        const day = brazilianDate.getUTCDate().toString().padStart(2, '0');
        const month = (brazilianDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = brazilianDate.getUTCFullYear();
        const hours = brazilianDate.getUTCHours().toString().padStart(2, '0');
        const minutes = brazilianDate.getUTCMinutes().toString().padStart(2, '0');
        const formattedDate = `${day}/${month}/${year}-${hours}:${minutes}`;
        if (brazilianDate < today) return 'Data de conclusão indefinida';
        const differenceInTime = brazilianDate.getTime() - today.getTime();
        return `${formattedDate}`;
    };

    const handleTaskDoubleClick = async (task: Task) => {
        const now = new Date().toISOString();
        try {
            const updatedTask = { ...task, completedAt: task.completedAt ? task.completedAt : now };
            const updatedLists = lists.map((list) => {
                if (list.id === task.listId) {
                    const updatedTasks = list.tasks.map((t) => (t.id === task.id ? updatedTask : t));
                    return { ...list, tasks: updatedTasks };
                }
                return list;
            });
            setLists(updatedLists);

            const updatedCompletedTasks = { ...completedTasksByList };
            const completedTasksInList = updatedCompletedTasks[task.listId] || [];
            updatedCompletedTasks[task.listId] = [...completedTasksInList, updatedTask];
            setCompletedTasksByList(updatedCompletedTasks);

            await updateTask(updatedTask);
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    const handleTaskUndoCompletion = async (task: Task) => {
        try {
            const updatedTask = { ...task, completedAt: null };
            const updatedLists = lists.map((list) => {
                if (list.id === task.listId) {
                    const updatedTasks = list.tasks.map((t) => (t.id === task.id ? updatedTask : t));
                    return { ...list, tasks: updatedTasks };
                }
                return list;
            });
            setLists(updatedLists);

            const updatedCompletedTasks = { ...completedTasksByList };
            updatedCompletedTasks[task.listId] = updatedCompletedTasks[task.listId].filter((t) => t.id !== task.id);
            setCompletedTasksByList(updatedCompletedTasks);

            await updateTask(updatedTask);
        } catch (error) {
            console.error('Failed to undo task completion', error);
        }
    };

    const handleEditTask = (taskId: number, title: string) => {
        setEditingTask((prev) => ({ ...prev, [taskId]: true }));
        setTemporaryTaskTitle((prev) => ({ ...prev, [taskId]: title }));
    };

    const handleEditList = (listId: number, title: string) => {
        setEditingList((prev) => ({ ...prev, [listId]: true }));
        setTemporaryListTitle((prev) => ({ ...prev, [listId]: title }));
    };

    const handleSaveTaskTitle = async (task: Task) => {
        try {
            const updatedTask = { ...task, title: temporaryTaskTitle[task.id] };
            await updateTask(updatedTask);
            setEditingTask((prev) => ({ ...prev, [task.id]: false }));
        } catch (error) {
            console.error('Failed to save task title', error);
        }
    };

    const handleSaveListTitle = async (list: List) => {
        try {
            const updatedList = { ...list, title: temporaryListTitle[list.id] };
            await updateList(updatedList);
            setEditingList((prev) => ({ ...prev, [list.id]: false }));
        } catch (error) {
            console.error('Failed to save list title', error);
        }
    };

    const handleTaskTitleChange = (taskId: number, title: string) => {
        setTemporaryTaskTitle((prev) => ({ ...prev, [taskId]: title }));
    };

    const handleListTitleChange = (listId: number, title: string) => {
        setTemporaryListTitle((prev) => ({ ...prev, [listId]: title }));
    };
    
    const handleEditFinishUntil = (taskId: number, date: string) => {
        setEditingFinishUntil((prev) => ({ ...prev, [taskId]: true }));
        const isoDate = new Date(date).toISOString();
        setTemporaryFinishUntil((prev) => ({ ...prev, [taskId]: isoDate }));
    };
    
    const handleFinishUntilChange = (taskId: number, date: string) => {
        const isoDate = new Date(date).toISOString();
        setTemporaryFinishUntil((prev) => ({ ...prev, [taskId]: isoDate }));
    };
    
    const handleSaveFinishUntil = async (task: Task) => {
        try {
            const updatedTask = { ...task, finishUntil: temporaryFinishUntil[task.id] };
            await updateTask(updatedTask);
            setEditingFinishUntil((prev) => ({ ...prev, [task.id]: false }));
        } catch (error) {
            console.error('Failed to save task finish date', error);
        }
    };
    
    return (
        <>
            {lists.map((list) => (
                <div key={list.id} className={styles.list}>
                    <div className={styles.main}>
                        <div className={styles.title}>
                            <div>
                                {editingList[list.id] ? (
                                    <input type="text" value={temporaryListTitle[list.id]} onChange={(e) => handleListTitleChange(list.id, e.target.value)} onBlur={() => handleSaveListTitle(list)} autoFocus />
                                ) : (
                                    <div onClick={() => handleEditList(list.id, list.title)}>
                                        <div>{list.title}</div>
                                    </div>
                                )}
                                <div className={styles.listDescription}>{list.description}</div>
                            </div>
                            <div className={styles.titlePoints}>
                                <a onClick={() => { deleteList(list.id); }}>excluir</a>
                            </div>
                        </div>
                        {list.tasks && (
                            <div className={styles.tasks}>
                                {list.tasks.filter((task) => !task.completedAt).map((task) => (
                                    <div key={task.id} className={styles.task} onDoubleClick={() => handleTaskDoubleClick(task)}>
                                        <div className={styles.taskMain}>
                                            <div className={styles.taskCheck}>
                                                <Image src={check} alt="check" />
                                            </div>
                                            <div className={styles.taskContent}>
                                                {editingTask[task.id] ? (
                                                    <input type="text" value={temporaryTaskTitle[task.id]} onChange={(e) => handleTaskTitleChange(task.id, e.target.value)} onBlur={() => handleSaveTaskTitle(task)} autoFocus />
                                                ) : (
                                                    <div onClick={() => handleEditTask(task.id, task.title)} className={styles.taskTitle}>{task.title}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.taskDelete}>
                                            {editingFinishUntil[task.id] ? (
                                                <input type="datetime-local" value={temporaryFinishUntil[task.id].slice(0, -1)} onChange={(e) => handleFinishUntilChange(task.id, e.target.value)} onBlur={() => handleSaveFinishUntil(task)} autoFocus />
                                            ) : (
                                                <p onClick={() => handleEditFinishUntil(task.id, task.finishUntil ?? '')}>{calculateDaysRemaining(task.finishUntil ?? undefined)}</p>
                                            )}
                                            <a onClick={() => { deleteTask(task.id); }}>X</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles.newTasks}>
                            <input type="text" id="newTask" name="newTaskInput" placeholder="add a new task" onClick={() => onAddTask(list.id)} />
                            <Image src={entrar} alt="entrar" />
                        </div>
                    </div>
                    <div className={styles.completedTasks}>
                        <div className={styles.completedList}>
                            <div className={styles.completedText}>
                                <div>Completed List</div>
                                <div className={styles.allTasksCompleted}>
                                    <a onClick={() => toggleCompletedTasks(list.id)}>
                                        <Image src={flecha} alt="flecha" />
                                    </a>
                                </div>
                            </div>
                            {openCompletedTasks && openCompletedTasks[list.id] && (
                                <div className={styles.tasksCompletedMain}>
                                    <div className={styles.tasks}>
                                        {(completedTasksByList[list.id] || []).map((task) => (
                                            <div key={task.id} className={styles.task} onDoubleClick={() => handleTaskUndoCompletion(task)}>
                                                <div className={styles.taskMain}>
                                                    <div className={styles.taskCheck}>
                                                        <Image src={check} alt="check" />
                                                    </div>
                                                    <div className={styles.taskContent}>
                                                        <div className={styles.taskTitle}>{task.title}</div>
                                                    </div>
                                                </div>
                                                <div className={styles.taskDelete}>
                                                    <p className={styles.taskDone}>Done</p>
                                                </div>
                                            </div>
                                        ))}
                                        {completedTasksByList[list.id]?.length === 0 && (
                                            <div className={styles.tasksCompletedContentEmpty}>
                                                <div className={styles.tasksCompletedEmptyDiv}>
                                                    <div>No tasks completed yet</div>
                                                    <div><Image src={raio} alt="raio" /></div>
                                                </div>
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
    )
}