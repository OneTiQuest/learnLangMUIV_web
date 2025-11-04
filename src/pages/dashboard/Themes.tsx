import { useLoaderData } from "react-router";
import { NavLink } from "react-router";

function Themes() {
    const { themes } = useLoaderData();
    
    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Темы</h3>

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
                                    {Object.entries(themes).map((theme) => (
                                        <tr key={theme[1][0]}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <NavLink to={`/dashboard/themes/${theme[1][0]}`} className="text-sm leading-5 text-gray-900">
                                                    {theme[1][1]}
                                                </NavLink>
                                            </td>
                                            

                                            < td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium" >
                                                <NavLink to={`/dashboard/themes/${theme[1][0]}/edit`} className="text-muiv hover:text-indigo-900">
                                                    Редактировать
                                                </NavLink>
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

export default Themes;
