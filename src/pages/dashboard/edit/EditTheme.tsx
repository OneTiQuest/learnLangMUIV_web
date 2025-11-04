import { useFetcher } from "react-router";

function Edit() {
    const fetcher = useFetcher();

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Редактирование темы</h3>

            {fetcher?.data?.error && (
                <div className='flex justify-center absolute bg-red-300 border-2 p-4 border-red-400 rounded-md translate-x-120'>
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

                <label className="block mt-6">
                    <span className="text-gray-700 text-sm">Повторите пароль</span>
                    <input type="password" name="repeat_password" className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <label className="block mt-6">
                    <span className="text-gray-700 text-sm">Имя</span>
                    <input type="text" name="first_name" className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <label className="block mt-6">
                    <span className="text-gray-700 text-sm">Фамилия</span>
                    <input type="text" name="last_name" className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <div className="mt-6">
                    <button type='submit' className="py-2 px-4 cursor-pointer text-center bg-muiv rounded-md w-full text-white text-sm">
                        Сохранить
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}

export default Edit;