//actionTypes (экшены называют обратным методом - сущность-действие, которое уже совершено)
import * as actionTypes from "./actionTypes";

export function taskCompleted(id) {
    return {
        type: actionTypes.taskUpdated,
        payload: { id: id, completed: true },
    };
}

export function titleChanged(id) {
    return {
        type: actionTypes.taskUpdated,
        payload: { id: id, title: `New title for ${id}` },
    };
}

export function titleDeleted(id) {
    return {
        type: actionTypes.taskDeleted,
        payload: { id: id },
    };
}
