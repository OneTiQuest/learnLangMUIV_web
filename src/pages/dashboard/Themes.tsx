import { NavLink, useLoaderData, useSubmit } from "react-router";
import { useCallback } from "react";

function Themes() {
    const { themes, userData } = useLoaderData();
    const submit = useSubmit();

    const deleteHandler = useCallback((themeId) => submit({ deleteTheme: themeId }, { method: 'post' }), [submit]);

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Темы</h3>

            {!userData.isStudent && (
                <NavLink to={'/dashboard/themes/create'} className="flex bg-muiv justify-center items-center cursor-pointer px-4 mt-8 w-40 rounded-4xl">
                    <span className="text-white text-2xl">Добавить</span>
                    <span className="text-white text-3xl ml-2">+</span>
                </NavLink>
            )}

            <div className="mt-8">
                <div className="flex flex-col mt-6">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Имя</th>
                                        {!userData.isStudent && (
                                            <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Действия</th>
                                        )}
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {Object.entries(themes).map((theme) => (
                                        <tr key={theme[1][0]}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <NavLink to={`/dashboard/themes/${theme[1][0]}`} className="text-sm leading-5 text-gray-900">
                                                    {theme[1][1]}
                                                </NavLink>
                                            </td>

                                            {!userData.isStudent && (
                                                <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium" >
                                                    <NavLink to={`/dashboard/themes/${theme[1][0]}/edit`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 ml-6 cursor-pointer">
                                                        Редактировать
                                                    </NavLink>
                                                    <span onClick={deleteHandler.bind(null, theme[1][0])} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 ml-6 cursor-pointer">
                                                        Удалить
                                                    </span>
                                                </td>
                                            )}
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

export default Themes;
