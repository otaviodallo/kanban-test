import Header from '@/components/header';
import List from '@/components/list';
import ModalList from '@/components/modalList';
import ModalAddTask from '@/components/modalTask';
import SideBar from '@/components/sidebar';
import { useState } from 'react';

export default function Home() {
    const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
    const [isModalListOpen, setIsModalListOpen] = useState(false);
    const [taskId, setTaskId] = useState("");
    const [listId, setListId] = useState("");
    const [fetchListsFunction, setFetchListsFunction] = useState<() => void>(() => { });

    const openModalTask = (listId: any) => {
        setIsModalTaskOpen(true);
        setTaskId(listId);
    };

    const closeModalTask = () => {
        setIsModalTaskOpen(false);
    };

    const openModalList = (listId: string) => {
        setIsModalListOpen(true);
        setListId(listId);
    };

    const closeModalList = () => {
        setIsModalListOpen(false);
    };

    const handleFetchLists = (fetchLists: () => void) => {
        setFetchListsFunction(() => fetchLists);
    };

    const handleTaskAdded = () => {
        fetchListsFunction();
    };

    return (
        <>
            <div className="main-html">
                <Header onAddList={() => openModalList('')} />
                <div className="main-content">
                    <SideBar />
                    <div className="main-lists">
                        <List onAddTask={(listId: any) => openModalTask(listId)} setFetchLists={handleFetchLists} />
                    </div>
                </div>
            </div>
            {isModalListOpen && <ModalList listId={listId} closeModal={closeModalList} onListAdded={handleTaskAdded} />}
            {isModalTaskOpen && (
                <ModalAddTask
                    listId={taskId}
                    closeModal={closeModalTask}
                    onTaskAdded={handleTaskAdded}
                />
            )}
        </>
    );
}
