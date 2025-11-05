import { useCallback } from "react";
import { useLoaderData } from "react-router";
import { NavLink } from "react-router";
import { useSubmit } from "react-router";

function Users() {
    const { users } = useLoaderData();
    const submit = useSubmit();

    const deleteHandler = useCallback((userId) => submit({ deleteUser: userId }, { method: 'post' }), [submit]);

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Пользователи</h3>

            <NavLink to={'/dashboard/users/create'} className="flex bg-muiv justify-center align-center cursor-pointer px-4 mt-8 w-40 rounded-4xl">
                <span className="text-white text-2xl">Добавить</span>
                <span className="text-white text-3xl ml-2">+</span>
            </NavLink>

            <div className="mt-8">
                <div className="flex flex-col mt-6">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Имя</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Роль</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Дата создания</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Действия</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {Object.entries(users).map((user) => (
                                        <tr key={user[1][0]}>

                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-sm flex leading-5 text-gray-900">{`${user[1][1] ?? ''} (${user[1][3]}) ${user[1][2] ?? ''}`}</span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-sm flex leading-5 text-gray-900">{user[1][8]}</span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-sm flex leading-5 text-gray-900">{new Date(user[1][7]).toLocaleDateString()}</span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                                {user[1][6] < 3 && (
                                                    <>
                                                        <NavLink to={`/dashboard/users/${user[1][0]}/edit`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 ml-6 cursor-pointer">
                                                            Редактировать
                                                        </NavLink>
                                                        <span onClick={deleteHandler.bind(null, user[1][0])} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 ml-6 cursor-pointer">
                                                            Удалить
                                                        </span>
                                                    </>
                                                )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
