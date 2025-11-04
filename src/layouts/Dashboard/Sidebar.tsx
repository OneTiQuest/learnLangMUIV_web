import muivLogo from '../../assets/muiv.png';
import { NavLink } from "react-router";
import { useLoaderData } from "react-router";

function getStuentNav() {
    return (
        <>
            <NavLink to={'#'} className="flex items-center px-6 py-2 mt-4 text-muiv transition duration-300 hover:bg-muiv hover:bg-opacity-25 hover:text-white">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>

                <span className="mx-3">Мои оценки</span>
            </NavLink>
        </>
    );
}

function getTeacherNav() {
    return (
        <>
            <NavLink to={'#'} className="flex items-center px-6 py-2 mt-4 text-muiv transition duration-300 hover:bg-muiv bg-opacity-25 hover:text-white">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>

                <span className="mx-3">Оценки учеников</span>
            </NavLink>
        </>
    );
}
function getAdminNav() {
    return (
        <>
            <NavLink className="flex items-center px-6 py-2 mt-4 text-muiv transition duration-300 hover:bg-muiv hover:bg-opacity-25 hover:text-white" to={'/dashboard/users'}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>

                <span className="mx-3">Пользователи</span>
            </NavLink>
        </>
    );
}

function Sidebar({ isOpen = false, onToggle }) {
    const { userData } = useLoaderData();

    return (
        <>
            <div className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={onToggle}></div>

            <div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-stone-300 lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <img className="w-12 h-12" src={muivLogo} />

                        <span className="mx-2 text-2xl font-semibold text-muiv">Кабинет</span>
                    </div>
                </div>

                <nav className="mt-10">
                    <NavLink to={'/dashboard/modules'} className="flex items-center px-6 py-2 mt-4 text-muiv transition duration-300 hover:bg-muiv hover:bg-opacity-25 hover:text-white">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>

                        <span className="mx-3">Обучение</span>
                    </NavLink>

                    {userData.isAdmin && getAdminNav()}
                    {userData.isTeacher && getTeacherNav()}
                    {userData.isStudent && getStuentNav()}
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
