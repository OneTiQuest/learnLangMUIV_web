import { useCallback, useState } from "react";
import { useFetcher } from "react-router";
import { useLoaderData } from "react-router";

enum EExerciseTypes {
    MissingWord = 1,
    SuccessAnswer = 2,
    Audio = 3,
    Theory = 4
}

function EditContent({ exerciseType = 1, data }) {
    const [exData, setExData] = useState(data);

    switch (Number(exerciseType)) {
        case EExerciseTypes.MissingWord: {
            const success_answer = exData?.success_answer;
            return (
                <div className="block w-96">
                    <label className="block w-96">
                        <span className="text-gray-700 text-sm">Правильный ответ</span>
                        <input type="text" name="success_answer" defaultValue={success_answer} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                    </label>
                </div>
            );
        }
        case EExerciseTypes.SuccessAnswer: {
            const answers = exData?.answers;
            const success_answer = exData?.success_answer;

            const deleteAnswer = (answerId: number) => {
                (exData.answers as string[])?.splice(answerId, 1);
                setExData({ ...exData, answers: [...exData.answers] });
            };

            return (
                <div className="block w-96">
                    <label className="block w-96">
                        <span className="text-gray-700 text-sm">Правильный ответ</span>
                        <input type="text" name="success_answer" defaultValue={success_answer} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                    </label>

                    <label className="block w-96 mt-4">
                        <span className="text-gray-700 text-sm">Варианты ответа</span>

                        <div onClick={() => setExData({ ...exData, answers: [...(exData?.answers || []), ''] })} className="flex bg-muiv justify-center items-center cursor-pointer px-2 my-2 w-40 rounded-4xl">
                            <span className="text-white">Добавить</span>
                            <span className="text-white text-2xl ml-2">+</span>
                        </div>

                        {answers?.map((answer, idx) => (
                            <div key={answer + idx} className="flex items-center my-2">
                                <input type="text" name="answers" defaultValue={answer} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                                <div onClick={() => deleteAnswer(idx)} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 cursor-pointer ml-4">Удалить</div>
                            </div>
                        ))}
                    </label>
                </div>
            );
        }
        case EExerciseTypes.Audio: {
            const deleteFile = () => {
                setExData({ fileName: null });
            };

            return (
                <div className="block w-96">
                    <label className="block w-96">
                        <span className="text-gray-700 text-sm">Файл</span>
                        {exData?.fileName
                            ? (
                                <div className="flex items-center justify-between bg-green-100 rounded-full mt-4 px-4 py-2">
                                    <span>{exData?.fileName?.split('.')?.[1]}</span>
                                    <div onClick={() => deleteFile()} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 cursor-pointer ml-4">Удалить</div>
                                </div>
                            )
                            : (
                                <input
                                    name="file"
                                    type="file"
                                    className="flex h-9 w-full rounded-md border 
                                border-input bg-background px-3 py-1 text-sm 
                                shadow-sm transition-colors file:border-0 
                                file:bg-transparent file:text-foreground file:text-sm 
                                file:font-medium placeholder:text-muted-foreground 
                                focus-visible:outline-none focus-visible:ring-1 
                                focus-visible:ring-ring disabled:cursor-not-allowed 
                                disabled:opacity-50"
                                />
                            )}

                    </label>
                </div>
            );
        }
        case EExerciseTypes.Theory: {
            const defaultValue = exData?.content?.[0]?.data;
            return (
                <div className="block w-96">
                    <label className="block w-96">
                        <span className="text-gray-700 text-sm">Контент</span>
                        <textarea name="content" defaultValue={defaultValue} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                    </label>
                </div>
            );
        }
    }
}

function Edit() {
    const fetcher = useFetcher();
    const { exercise, exercise_types } = useLoaderData();
    const [selectType, setSelectType] = useState(exercise && exercise[5]);

    const changeTypeHandler = useCallback((event) => {
        const newType = event.target.value;
        setSelectType(newType);
    }, []);

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">Редактирование упражнения</h3>

            {fetcher?.data?.error && (
                <div className='flex justify-center absolute bg-red-300 border-2 p-4 border-red-400 rounded-md translate-x-120'>
                    {fetcher.data.error_text}
                </div>
            )}

            <fetcher.Form className="mt-4" method="post" encType="multipart/form-data">
                <label className="block w-96">
                    <span className="text-gray-700 text-sm">Название</span>
                    <input type="text" name="name" defaultValue={exercise && exercise[1]} className="form-input block w-full p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed" />
                </label>

                <h2 className="text-muiv text-2xl mt-6 mb-4 font-medium">Тип упражнения</h2>

                <select name="exercise_type" defaultValue={selectType} onChange={changeTypeHandler} className="block w-96 p-2 mt-2 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed">
                    {exercise_types.map((exercise_type) => {
                        return (
                            <option key={exercise_type[0]} value={exercise_type[0]}>
                                {exercise_type[1]}
                            </option>
                        );
                    })}
                </select>

                <h2 className="text-muiv text-2xl mt-6 mb-4 font-medium">Редактор</h2>

                <div className="mt-2">
                    <EditContent exerciseType={selectType} data={exercise && JSON.parse(exercise[3] || '{}')} />
                </div>

                <div className="mt-6">
                    <button type='submit' className="py-2 px-4 cursor-pointer text-center bg-muiv rounded-md w-96 text-white text-sm">
                        Сохранить
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}

export default Edit;