import { useLoaderData } from "react-router";

function StudentGrades({ grades }) {

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Оценки</h3>

            {!grades?.length ? (
                <p className="text-muiv text-2xl font-medium">Оценок нет</p>
            ) : (
                <div className="mt-8">
                    <div className="flex flex-col mt-6">
                        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-6 w-4xl py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Модуль</th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Оценки</th>
                                        </tr >
                                    </thead >

                                    <tbody className="bg-white">
                                        {grades.map((grade_data, idx) => (
                                            <tr key={`${grade_data.name}-${idx}`} className="border-b border-gray-200">
                                                <td className="px-6 py-4 whitespace-no-wrap flex">
                                                    <span className="text-xl leading-5 text-gray-900">
                                                        {grade_data[0]}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-l border-gray-200 text-sm leading-5 font-medium" >
                                                    {grade_data[1].map((grade) => (
                                                        <div key={`${grade.name}-${grade.grade}`} className="my-2 text-sm border-b flex flex-col border-gray-200">
                                                            <span>Тема: {grade.name}</span>
                                                            <span className="text-muiv">Оценка: {grade.grade}</span>
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table >
                            </div >
                        </div >
                    </div >
                </div>
            )}
        </div>
    );
}

function Grades() {
    const { grades, userData } = useLoaderData();

    if (userData.isStudent) {
        return <StudentGrades grades={grades} />;
    }

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Оценки</h3>

            <div className="mt-8">
                <div className="flex flex-col mt-6">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        {grades.map((module_grade) => (
                            <>
                                <h4 className="text-muiv mt-6 text-2xl font-medium">Модуль: {module_grade[1]}</h4>

                                <div key={module_grade[0]} className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                    <table className="min-w-full mt-4">
                                        <thead>
                                            <tr>
                                                <th className="px-6 w-4xl py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Тема</th>
                                                <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Оценки</th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white">
                                            {module_grade[2].map((theme_data) => (
                                                <tr key={theme_data.id} className="border-b border-gray-200">
                                                    <td className="px-6 py-4 whitespace-no-wrap flex">
                                                        <span className="text-xl leading-5 text-gray-900">
                                                            {theme_data.theme_name}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-l border-gray-200 text-sm leading-5 font-medium" >
                                                        {theme_data.grades_data.map((grade_data) => (
                                                            <div key={grade_data.user.id} className="my-2 text-sm border-b border-gray-200">
                                                                <span>{`${grade_data.user.name ?? ''} (${grade_data.user.login}) ${grade_data.user.last_name ?? ''}`}</span>
                                                                <span className="text-muiv">Оценка: {grade_data.grade}</span>
                                                            </div>
                                                        ))}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Grades;
