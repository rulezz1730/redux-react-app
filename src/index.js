import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        store.subscribe(() => setState(store.getState()));
        store.subscribe(() => console.log(store.getState()));
    }, []);

    const completeTask = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId));
    };

    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChanged(taskId));
    };

    const deleteTitle = (taskId) => {
        store.dispatch(actions.titleDeleted(taskId));
    };

    return (
        <>
            <h1>New App</h1>
            <button onClick={() => completeTask()}>Complete</button>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => completeTask(el.id)}>
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
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
