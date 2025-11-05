import { useCallback, useState } from 'react';
import userLogo from '../../assets/user.png';
import Api from '../../ApiClient';
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

function Header({ onToggle }) {
    const [userToggle, setUserToggle] = useState(false);
    const navigate = useNavigate();
    
    const logout = useCallback(async () => {
        await Api.delete('/loguot');
        localStorage.removeItem('auth_data');
        navigate('/auth');
    }, [navigate]);

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-stone-100 border-b-4 border-muiv">
            <div className="flex items-center">
                <button onClick={onToggle} className="text-gray-500 cursor-pointer lg:hidden">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="text-muiv cursor-pointer">
                        Назад
                    </button>
                </div>
            </div>


            <div className="flex items-center">
                <div className="relative">
                    <button onClick={() => setUserToggle((prevSate) => !prevSate)} className="block bg-muiv w-8 h-8 p-2 overflow-hidden cursor-pointer rounded-full shadow focus:outline-none">
                        <img className="object-cover invert w-full h-full" src={userLogo} />
                    </button>

                    <div className={`absolute ${userToggle ? 'opacity-100' : 'opacity-0'} transition duration-400 right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl`}>
                        <NavLink className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-muiv hover:text-white" to={'/dashboard/profile'}>
                            Мой профиль
                        </NavLink>
                        <span onClick={logout} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-muiv hover:text-white">Выход</span>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;
