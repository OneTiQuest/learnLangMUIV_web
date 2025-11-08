import { useCallback } from "react";
import { useLoaderData } from "react-router";
import { NavLink } from "react-router";
import { useSubmit } from "react-router";

function Modules() {
    const { modules, userData } = useLoaderData();
    const submit = useSubmit();

    console.log(modules);


    const deleteHandler = useCallback((moduleId) => submit({ deleteModule: moduleId }, { method: 'post' }), [submit]);

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Модули</h3>

            {userData.isAdmin && (
                <NavLink to={'/dashboard/modules/create'} className="flex bg-muiv justify-center items-center cursor-pointer px-4 mt-8 w-40 rounded-4xl">
                    <span className="text-white text-2xl">Добавить</span>
                    <span className="text-white text-3xl ml-2">+</span>
                </NavLink>
            )}

            <div className="mt-8">
                <div className="flex flex-col mt-6">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        {!Object.entries(modules).length ? (
                            <p className="text-muiv text-2xl font-medium">Нет доступных модулей</p>
                        ) : (
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Имя</th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Язык</th>
                                            {userData.isAdmin && (
                                                <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Действия</th>
                                            )}
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white">
                                        {Object.entries(modules).map((module) => (
                                            <tr key={module[1][0]}>
                                                {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm leading-5 font-medium text-gray-900">John Doe</div>
                                                    <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                                </div>
                                            </div>
                                        </td> */}

                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <NavLink to={`/dashboard/modules/${module[1][0]}`} className="text-sm flex leading-5 text-gray-900">
                                                        <span>{`${module[1][1]}`}</span>
                                                    </NavLink>
                                                    {/* <div className="text-sm leading-5 text-gray-500">Web dev</div> */}
                                                </td>

                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <span className="text-sm flex leading-5 text-gray-900">{module[1][2]}</span>
                                                </td>

                                                {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">Owner</td> */}
                                                {userData.isAdmin && (
                                                    < td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium" >
                                                        <NavLink to={`/dashboard/modules/${module[1][0]}/edit`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 ml-6 cursor-pointer">
                                                            Редактировать
                                                        </NavLink>
                                                        <span onClick={deleteHandler.bind(null, module[1][0])} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 ml-6 cursor-pointer">
                                                            Удалить
                                                        </span>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div >
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modules;
