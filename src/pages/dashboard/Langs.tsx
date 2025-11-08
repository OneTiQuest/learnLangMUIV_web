import { useLoaderData, useSubmit, useActionData } from "react-router";
import { useCallback, useRef } from "react";

function Langs() {
    const { langs } = useLoaderData();
    const submit = useSubmit();
    const actionData = useActionData();
    const inputRef = useRef(null);

    const addHandler = useCallback(async () => {
        const input = inputRef.current;
        await submit({ addName: input?.value }, { method: 'post' });
        input.value = '';
    }, [submit]);
    const deleteHandler = useCallback((langId) => {
        if (langs?.length && (langs?.length < 2)) {
            return;
        }
        submit({ deleteLang: langId }, { method: 'post' });
    }, [submit]);

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Языки</h3>

            <div className="flex items-center mt-8">
                <input type="text" ref={inputRef} placeholder="Название языка" className="form-input block w-96 p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />

                <button onClick={addHandler} className="flex bg-muiv justify-center items-center cursor-pointer ml-4 px-4 w-40 rounded-4xl">
                    <span className="text-white text-2xl">Добавить</span>
                    <span className="text-white text-3xl ml-2">+</span>
                </button>

                {actionData?.error && (<div className="bg-red-300 border-2 ml-4 box-border p-4 border-red-400 rounded-md">{actionData.error_text}</div>)}
            </div>

            <div className="mt-8">
                <div className="flex flex-col mt-6">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Имя</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Действия</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {Object.entries(langs).map((lang) => (
                                        <tr key={lang[1][0]}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-sm leading-5 text-gray-900">
                                                    {lang[1][1]}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium" >
                                                <span onClick={deleteHandler.bind(null, lang[1][0])} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 ml-6 cursor-pointer">
                                                    Удалить
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Langs;
