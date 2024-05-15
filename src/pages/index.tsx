import Header from '@/components/header';
import List from '@/components/list';
import ModalList from '@/components/modalList';
import ModalAddTask from '@/components/modalTask';
import SideBar from '@/components/sidebar';
import { useState } from 'react';

export default function Home() {
    const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
    const [isModalListOpen, setIsModalListOpen] = useState(false);
    const openModalTask = () => {
        setIsModalTaskOpen(true);
    };
    const closeModalTask = () => {
        setIsModalTaskOpen(false);
    };
    const openModalList = () => {
        setIsModalListOpen(true);
    };
    const closeModalList = () => {
        setIsModalListOpen(false);
    };
    return (
        <>
            <div className="main-html">
                <Header onAddList={openModalList}/>
                <div className="main-content">
                    <SideBar />
                    <div className="main-lists">
                        <List onAddTask={openModalTask} />
                    </div>
                </div>
            </div>
            {isModalTaskOpen && <ModalAddTask closeModal={closeModalTask} />}
            {isModalListOpen && <ModalList closeModal={closeModalList} />}
        </>
    );
}
