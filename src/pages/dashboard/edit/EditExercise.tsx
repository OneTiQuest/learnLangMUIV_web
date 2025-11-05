import { useCallback, useState } from "react";
import { useFetcher } from "react-router";
import { useLoaderData } from "react-router";

function EditContent({ exerciseType, data }) {
    switch (Number(exerciseType)) {
        case 1: {
            return (<div>1</div>);
        }
        case 2: {
            return (<div>2</div>);
        }
        case 3: {
            return (<div>3</div>);
        }
        case 4: {
            return (
            <div>
                <textarea name=""></textarea>
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

            <fetcher.Form className="mt-4" method="post">
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

                <div className="mt-2 overflow-hidden">
                    <EditContent exerciseType={selectType} data={exercise && exercise[3]}/>
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