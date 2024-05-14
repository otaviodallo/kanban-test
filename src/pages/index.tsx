import Header from '@/components/header';
import List from '@/components/list';
import SideBar from '@/components/sidebar';

export default function Home() {
    return (
        <>
            <div className='main-html'>
                <Header />
                <div className='main-content'>
                    <SideBar />
                    <div className='main-lists'>
                        <List />
                        <List />
                        <List />
                        <List />
                    </div>
                </div>
            </div>
        </>

    );
}
