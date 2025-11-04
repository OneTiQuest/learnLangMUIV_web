import { useCallback, useState } from "react";
import Api from "../../../ApiClient";

function Content({ type, data, onAnswerChange }) {
    data = JSON.parse(data);

    const changeHandler = useCallback((event) => onAnswerChange(event.target.value), [onAnswerChange]);

    switch (type) {
        case 1: {
            return (
                <div className="mt-8 flex flex-col">
                    <span>Отправьте пропущенное слово:</span>
                    <input
                        onChange={changeHandler}
                        type="text"
                        className="form-input block w-sm p-2 mt-4 rounded-md outline-offset-2 outline-2 outline-muiv focus:outline-dashed"
                    />
                </div>
            );
        }
        case 2: {
            return (
                <div className="mt-8 flex flex-col">
                    <span>Выберите правильный вариант ответа:</span>
                    <div className="flex flex-col mt-4">
                        {data.answers.map((answer) => (
                            <label className="flex mt-2">
                                <input value={answer} name="exercise" type="radio" onChange={changeHandler} />
                                <span className="ml-2 flex flex-col">{answer}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        }
        case 3: {
            return <div></div>;
        }
        case 4: {
            const contentArr: any = data.content;

            if (contentArr) {
                return contentArr.reduce((prev: string, cur: any) => {
                    return prev += cur.data;
                }, '');
            }
        }
    }
    return JSON.stringify(data);
}

function Exercise({ exercise, onNext, isEnd, uid }) {
    const [id, title, , data, , type, type_name] = exercise;
    const [answer, setAnswer] = useState(null);
    const isNeedAnswer = [1, 2].includes(type);
    const [isError, setIsError] = useState(false);

    const sendHandler = useCallback(async () => {
        if (isNeedAnswer) {
            if (!answer) {
                setIsError(true);
                return;
            }
            await Api.post(
                `/users/${uid}/exercises/${id}/answers`,
                { answer },
            );
            setAnswer(null);
            setIsError(false);
        }
        onNext();
    }, [uid, id, answer, isNeedAnswer, onNext]);

    return (
        <div>
            <h3 className="text-muiv text-3xl font-medium">{type_name}</h3>

            <div className="mt-8 flex flex-col">
                <h4 className="text-xl font-medium">
                    {title}
                </h4>
                <div className="mt-4 w-l">
                    <Content type={type} data={data} onAnswerChange={setAnswer} />

                    {isError && (
                        <div className='flex justify-center absolute bg-red-300 border-2 p-4 border-red-400 rounded-md -translate-y-14 translate-x-100'>
                            Заполние поле для ответа
                        </div>
                    )}
                </div>
                <button onClick={sendHandler} className="mt-8 py-2 px-4 cursor-pointer text-center bg-muiv w-sm rounded-md text-white text-sm">
                    {isNeedAnswer
                        ? isEnd
                            ? 'Зафиксировать ответ и закончить тему'
                            : 'Зафиксировать ответ'
                        : isEnd
                            ? 'Закончить тему'
                            : 'Следующее упражнение'
                    }
                </button>
            </div>
        </div>
    );
}

export default Exercise;
