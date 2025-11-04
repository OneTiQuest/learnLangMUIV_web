import { useLoaderData } from "react-router";

function Profile() {
    const { profile } = useLoaderData();


    return (
        <div>
            <h3 className="text-gray-700 text-3xl font-medium">Профиль</h3>

            <div className="mt-4">
                <div className="mt-6">
                    <div className="bg-white shadow rounded-md overflow-hidden my-6">
                        <table className="text-left w-full border-collapse">
                            <thead className="border-b">
                                <tr>
                                    <th className="py-3 px-5 bg-muiv font-medium uppercase text-sm text-gray-100">Данные пользователя</th>
                                    <th className="py-3 px-5 bg-muiv font-medium uppercase text-sm text-gray-100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-200">
                                    <td className="py-4 px-6 border-b text-gray-700 text-lg">Имя</td>
                                    <td className="py-4 px-6 border-b text-gray-500">{profile[1]}</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="py-4 px-6 border-b text-gray-700 text-lg">Фамилия</td>
                                    <td className="py-4 px-6 border-b text-gray-500">{profile[2]}</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="py-4 px-6 border-b text-gray-700 text-lg">Логин</td>
                                    <td className="py-4 px-6 border-b text-gray-500">{profile[3]}</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="py-4 px-6 border-b text-gray-700 text-lg">Роль</td>
                                    <td className="py-4 px-6 border-b text-gray-500">{profile[8]}</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="py-4 px-6 border-b text-gray-700 text-lg">Закрепленные направление полготовки</td>
                                    <td className="py-4 px-6 border-b text-gray-500">{(profile[10] as string[]).join(', ')}</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="py-4 px-6 border-b text-gray-700 text-lg">Закрепленные языки</td>
                                    <td className="py-4 px-6 border-b text-gray-500">{(profile[9] as string[]).join(', ')}</td>
                                </tr>
                                <tr className="hover:bg-gray-200">
                                    <td className="py-4 px-6 border-b text-gray-700 text-lg">Дата создания</td>
                                    <td className="py-4 px-6 border-b text-gray-500">{new Date(profile[7]).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
