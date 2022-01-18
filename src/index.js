import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
    completeTask,
    titleChanged,
    taskDeleted,
    loadTasks,
    getTasksLoadingStatus,
    getTasks,
    taskCreated,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();
    console.log(state);

    useEffect(() => {
        dispatch(loadTasks());
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };

    const deleteTitle = (taskId) => {
        dispatch(taskDeleted(taskId));
    };

    const createTask = () => {
        const newId = state.length + 1;
        const newTask = {
            id: newId,
            title: `New Title ${newId}`,
            completed: false,
        };
        dispatch(taskCreated(newTask));
    };

    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            <h1>New App</h1>
            <button onClick={() => createTask()}>Add new task</button>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change title
                        </button>
                        <button onClick={() => deleteTitle(el.id)}>
                            Delete task
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
