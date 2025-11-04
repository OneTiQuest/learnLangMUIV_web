import { useCallback, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Dashboard/Sidebar';
import Header from './Dashboard/Header';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => setSidebarOpen((prevState) => !prevState), []);

    return (
        <div className="flex h-screen bg-gray-200 font-roboto">
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onToggle={toggleSidebar} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
