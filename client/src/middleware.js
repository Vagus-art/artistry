//this redux middleware checks if the payload is a promise,
//if it's a promise, resolves it and assings the returned value to the action payload
//so the actual fetched values are stored in the redux store and not an unresolved promise

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        action.payload.then(
            res=> {
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = error;
                store.dispatch(action);
            }
        );
        return;
    }
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export {
    promiseMiddleware
};
