import muivLogo from '../../assets/muiv.jpg';
import { useFetcher } from "react-router";
import { NavLink } from "react-router";

function Login() {
    const fetcher = useFetcher();

    return (
        <div className="flex flex-col p-6 relative max-w-sm w-full bg-white shadow-md rounded-md">
            <div className="flex justify-center items-center cursor-default">
                <img className="h-10 w-10" src={muivLogo} />
                <span className="text-gray-700 ml-2 font-semibold text-2xl">Вход</span>
            </div>

            {fetcher?.data?.error && (
                <div className='flex justify-center absolute bg-red-300 border-2 p-4 border-red-400 rounded-md -translate-x-70'>
                    {fetcher.data.error_text}
                </div>
            )}

            <fetcher.Form className="mt-4" method="post">
                <label className="block">
                    <span className="text-gray-700 text-sm">Логин</span>
                    <input type="text" name="login" className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <label className="block mt-6">
                    <span className="text-gray-700 text-sm">Пароль</span>
                    <input type="password" name="password" className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <div className="flex justify-between items-center mt-8">
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="form-checkbox text-indigo-600" />
                            <span className="mx-2 text-gray-600 text-sm">Запомнить меня</span>
                        </label>
                    </div>

                    <div>
                        <NavLink className="block text-sm fontme text-muiv hover:underline" to={'/auth/register'}>
                            Регистрация
                        </NavLink>
                    </div>
                </div>

                <div className="mt-6">
                    <button type='submit' className="py-2 px-4 cursor-pointer text-center bg-muiv rounded-md w-full text-white text-sm">
                        Войти
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}

export default Login;