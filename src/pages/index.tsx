import Header from '@/components/header';
import List from '@/components/list';
import ModalAddTask from '@/components/modal';
import SideBar from '@/components/sidebar';
import { useState } from 'react';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="main-html">
                <Header />
                <div className="main-content">
                    <SideBar />
                    <div className="main-lists">
                        <List onAddTask={openModal}/>
                        <List onAddTask={openModal}/>
                        <List onAddTask={openModal}/>
                        <List onAddTask={openModal}/>
                    </div>
                </div>
            </div>
            {isModalOpen && <ModalAddTask closeModal={closeModal} />}
        </>
    );
}
