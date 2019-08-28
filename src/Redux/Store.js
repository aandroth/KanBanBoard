import { createStore } from 'redux';
import { reducersCombined } from './Reducer';


export function configureStore(initialState = {}) {
    const store = createStore(reducersCombined, initialState);
    return store;
};
let myStore = configureStore();

myStore.dispatch({type: 'INIT'});

export default myStore;