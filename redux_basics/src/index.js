import store from "./store";
import { bugAdded, bugResolved } from "./actions";

store.dispatch(bugAdded("Bug1"));
store.dispatch(bugResolved(1));

console.log(store.getState());

/*
[
    {
        "id": 1,
        "description": "Bug1",
        "resolved": true
    }
]

*/