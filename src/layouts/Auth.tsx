import { Outlet } from 'react-router';

function Auth() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200 px-6">
            <Outlet />
        </div>
    );
}

export default Auth;
