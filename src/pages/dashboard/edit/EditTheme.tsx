import { useFetcher } from "react-router";
import { useLoaderData } from "react-router";

function Edit() {
    const fetcher = useFetcher();
    const { theme, modules } = useLoaderData();
    
    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Редактирование темы</h3>

            {fetcher?.data?.error && (
                <div className='flex justify-center absolute bg-red-300 border-2 p-4 border-red-400 rounded-md translate-x-120'>
                    {fetcher.data.error_text}
                </div>
            )}

            <fetcher.Form className="mt-4" method="post">
                <label className="block w-96">
                    <span className="text-gray-700 text-sm">Название</span>
                    <input type="text" name="name" defaultValue={theme && theme[1]} className="block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <h2 className="text-muiv text-2xl mt-6 mb-4 font-medium">Модуль</h2>

                <select name="module" defaultValue={theme && theme[3]} className="block w-96 p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed">
                    {modules.map((module) => {
                        return (
                            <option key={module[0]} value={module[0]}>
                                {module[1]}
                            </option>
                        );
                    })}
                </select>

                <div className="mt-6">
                    <button type='submit' className="py-2 w-96 px-4 cursor-pointer text-center bg-muiv rounded-md text-white text-sm">
                        Сохранить
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}

export default Edit;