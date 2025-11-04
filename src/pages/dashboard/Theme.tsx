import { useCallback, useState } from "react";
import { useLoaderData } from "react-router";
import Exercise from "./theme/Exercise";
import Api from "../../ApiClient";

function calcResults(answers: [string, string][]) {
    const maxA = answers.length;

    const successCount = answers.filter(([userAnswer, successAnswer]) =>
        String(userAnswer).toLowerCase() === String(successAnswer).toLowerCase()
    ).length;

    const result = (successCount * 100) / maxA;

    if (result < 50) return 2;
    if (result < 75) return 3;
    if (result < 85) return 4;
    return 5;
}

function Theme() {
    const { exercises, uid, id, grade } = useLoaderData();
    const [themeInWork, setThemeInWork] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [themeGrade, setThemeGrade] = useState(grade[0]);


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
            await Api.post(
                `/users/${uid}/themes/${id}/grades`,
                { grade },
            );

            setThemeGrade(grade);
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

            <div className="mt-8">

                <div className="flex flex-col">
                    <span>Количество упражнений в теме: {exercises.length}</span>

                    <div className="inline-flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mt-3">
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

                    <button onClick={startThemeHandler} className="mt-8 py-2 px-4 cursor-pointer text-center bg-muiv w-sm rounded-md text-white text-sm">
                        Изучить тему
                    </button>
                </div>

            </div>

        </div>
    );
}

export default Theme;
