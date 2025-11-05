import { useFetcher } from "react-router";
import { useLoaderData } from "react-router";

function Edit() {
    const fetcher = useFetcher();
    const { user, courses, langs, roles } = useLoaderData();
    
    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Редактирование пользователя</h3>

            {fetcher?.data?.error && (
                <div className='flex justify-center absolute bg-red-300 border-2 p-4 border-red-400 rounded-md translate-x-120'>
                    {fetcher.data.error_text}
                </div>
            )}

            <fetcher.Form className="mt-4" method="post">
                <label className="block w-96">
                    <span className="text-gray-700 text-sm">Логин</span>
                    <input type="text" name="login" defaultValue={user && user[3]} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <label className="block mt-6 w-96">
                    <span className="text-gray-700 text-sm">Пароль</span>
                    <input type="text" name="password" defaultValue={user && user[4]} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <label className="block mt-6 w-96">
                    <span className="text-gray-700 text-sm">Имя</span>
                    <input type="text" name="first_name" defaultValue={user && user[1]} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <label className="block mt-6 w-96">
                    <span className="text-gray-700 text-sm">Фамилия</span>
                    <input type="text" name="last_name" defaultValue={user && user[2]} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <h2 className="text-muiv text-2xl mt-6 mb-4 font-medium">Направления подготовки</h2>

                {courses.map((course) => {
                    const isChecked = user && user[10]?.some((u_course) => u_course?.id === course[0]);
                    return (
                        <label key={course[0]} className="inline-flex items-center ml-6">
                            <input name="courses" type="checkbox" value={course[0]} defaultChecked={isChecked} className="form-checkbox h-5 w-5 text-indigo-600" />
                            <span className="ml-2 text-gray-700">{course[1]}</span>
                        </label>
                    );
                })}

                <h2 className="text-muiv text-2xl mt-6 mb-4 font-medium">Языки</h2>

                {langs.map((lang) => {
                    const isChecked = user && user[9]?.some((u_lang) => u_lang?.id === lang[0]);
                    return (
                        <label key={lang[0]} className="inline-flex items-center ml-6">
                            <input name="langs" type="checkbox" value={lang[0]} defaultChecked={isChecked} className="form-checkbox h-5 w-5 text-indigo-600" />
                            <span className="ml-2 text-gray-700">{lang[1]}</span>
                        </label>
                    );
                })}

                <h2 className="text-muiv text-2xl mt-6 mb-4 font-medium">Роль</h2>

                {roles.map((role) => {
                    const isChecked = user && user[6]  === role[0];
                    return (
                        <label key={role[0]} className="inline-flex items-center ml-6">
                            <input name="role" type="radio" value={role[0]} defaultChecked={isChecked} className="form-checkbox h-5 w-5 text-indigo-600" />
                            <span className="ml-2 text-gray-700">{role[1]}</span>
                        </label>
                    );
                })}

                <div className="mt-6">
                    <button type='submit' className="py-2 px-4 cursor-pointer text-center bg-muiv rounded-md w-96 text-white text-sm">
                        Сохранить
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}

export default Edit;