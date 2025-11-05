import { useFetcher } from "react-router";
import { useLoaderData } from "react-router";

function Edit() {
    const fetcher = useFetcher();
    const { module, courses, langs } = useLoaderData();

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Редактирование модуля</h3>

            {fetcher?.data?.error && (
                <div className='flex justify-center absolute bg-red-300 border-2 p-4 border-red-400 rounded-md translate-x-120'>
                    {fetcher.data.error_text}
                </div>
            )}

            <fetcher.Form className="mt-4" method="post">
                <label className="block w-96">
                    <span className="text-gray-700 text-sm">Название</span>
                    <input type="text" name="name" defaultValue={module && module[1]} className="form-input w-full block p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <h2 className="text-muiv text-2xl mt-6 mb-4 font-medium">Направления подготовки</h2>

                {courses.map((course) => {
                    const isChecked = module && module[3]?.some((m_courses) => m_courses?.id === course[0]);
                    return (
                        <label key={course[0]} className="inline-flex items-center ml-6">
                            <input name="courses" type="checkbox" value={course[0]} defaultChecked={isChecked} className="form-checkbox h-5 w-5 text-indigo-600" />
                            <span className="ml-2 text-gray-700">{course[1]}</span>
                        </label>
                    );
                })}

                <h2 className="text-muiv text-2xl mt-6 mb-4 font-medium">Язык</h2>

                {langs.map((lang) => {
                    const isChecked = module && module[2]?.some((m_langs) => m_langs?.id === lang[0]);
                    return (
                        <label key={lang[0]} className="inline-flex items-center ml-6">
                            <input name="lang" type="radio" value={lang[0]} defaultChecked={isChecked} className="form-checkbox h-5 w-5 text-indigo-600" />
                            <span className="ml-2 text-gray-700">{lang[1]}</span>
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