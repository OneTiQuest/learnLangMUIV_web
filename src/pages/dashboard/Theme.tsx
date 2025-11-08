import { useCallback, useState } from "react";
import Exercise from "./theme/Exercise";
import Api from "../../ApiClient";
import { NavLink, useLoaderData, useSubmit } from "react-router";

function calcResults(answers: [string, string][]) {
    const maxA = answers?.length;

    if (!maxA) return;

    const successCount = answers.filter(([userAnswer, successAnswer]) =>
        String(userAnswer).toLowerCase() === String(successAnswer).toLowerCase()
    ).length;

    const result = (successCount * 100) / maxA;

    if (result < 50) return 2;
    if (result < 75) return 3;
    if (result < 85) return 4;
    return 5;
}

function StudentTheme({ exercises, uid, id, grade, answers }) {
    const [themeInWork, setThemeInWork] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [exAnswers, setExAnswers] = useState(answers);
    const [themeGrade, setThemeGrade] = useState(grade && grade[0]);

    const startThemeHandler = useCallback(() => {
        setCurrentExercise(0);
        setThemeInWork(true);
    }, []);

    const nextHandler = useCallback(async () => {
        const nextExercise = currentExercise + 1;

        if (exercises.length <= nextExercise) {
            setThemeInWork(false);
            const answers = await Api.get(`/users/${uid}/themes/${id}/answers`);
            const grade = calcResults(answers);
            if (grade) {
                await Api.post(
                    `/users/${uid}/themes/${id}/grades`,
                    { grade },
                );
                setExAnswers(answers);
                setThemeGrade(grade);
            }
            return;
        }

        setCurrentExercise(nextExercise);
    }, [id, uid, exercises, currentExercise]);

    if (themeInWork) {
        return (
            <Exercise
                uid={uid}
                exercise={exercises[currentExercise]}
                isEnd={(exercises.length - 1) <= currentExercise}
                onNext={nextHandler}
            />
        );
    }

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Упражнения</h3>

            <div className="mt-8 flex flex-col">
                <span>Количество упражнений в теме: {exercises.length}</span>

                {themeGrade && (
                    <div className="inline-flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
                        {themeGrade > 3 ? (
                            <div className="flex justify-center items-center w-12 bg-green-500">
                                <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                                </svg>
                            </div>

                        ) : themeGrade > 2 ? (
                            <div className="flex justify-center items-center w-12 bg-yellow-500">
                                <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                                </svg>
                            </div>

                        ) : (
                            <div className="flex justify-center items-center w-12 bg-red-500">
                                <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                                </svg>
                            </div>
                        )}


                        <div className="-mx-3 py-2 px-4">
                            <div className="mx-3">
                                <span className="text-green-500 font-semibold">Ваша оценка за тему: {themeGrade}</span>
                            </div>
                        </div>
                    </div>
                )}

                {!!exAnswers?.length && (
                    <table className="w-96 shadow overflow-hidden sm:rounded-lg border-b border-gray-200 mt-4">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Ваш ответ</th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Правильный ответ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {exAnswers.map((answer) => (
                                <tr>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{answer[0]}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-l border-gray-200">{answer[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!!exercises.length && (
                    <button onClick={startThemeHandler} className="mt-8 py-2 px-4 cursor-pointer text-center bg-muiv w-sm rounded-md text-white text-sm">
                        {!themeGrade ? 'Изучить тему' : 'Пройти тему заного'}
                    </button>
                )}
            </div>

        </div>
    );
}

function Theme() {
    const { exercises, id, grade, answers, userData } = useLoaderData();
    const submit = useSubmit();

    const deleteHandler = useCallback((exerciseId) => submit({ deleteExercise: exerciseId }, { method: 'post' }), [submit]);

    if (userData.isStudent) {
        return <StudentTheme exercises={exercises} answers={answers} uid={userData.uid} id={id} grade={grade} />;
    }

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Упражнения</h3>

            <NavLink to={`/dashboard/themes/${id}/exercises/create`} className="flex bg-muiv justify-center items-center cursor-pointer px-4 mt-8 w-40 rounded-4xl">
                <span className="text-white text-2xl">Добавить</span>
                <span className="text-white text-3xl ml-2">+</span>
            </NavLink>

            <div className="flex flex-col mt-8">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    {!exercises || !exercises.length
                        ? (
                            <p className="text-muiv text-2xl font-medium">Нет упражнений по выбранной теме</p>
                        )
                        : (
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Имя</th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-muiv text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Действия</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white">
                                        {exercises.map((exercise) => (
                                            <tr key={exercise[0]}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <span className="text-sm flex leading-5 text-gray-900">{exercise[1]}</span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium" >
                                                    <NavLink to={`/dashboard/themes/${id}/exercises/${exercise[0]}/edit`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 ml-6 cursor-pointer">
                                                        Редактировать
                                                    </NavLink>
                                                    <span onClick={deleteHandler.bind(null, exercise[0])} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 ml-6 cursor-pointer">
                                                        Удалить
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table >
                            </div >
                        )
                    }

                </div >
            </div >
        </div >
    );
}

export default Theme;
