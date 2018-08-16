import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

const INITIALIZE = 'editor/INITIALIZE';
const CAHNGE_INPUT = 'editor/CHANGE_INPUT';

export const initalize = createAction(INITIALIZE);
export const changeInput = createAction(CAHNGE_INPUT);

const initialState = Map({
    title: '',
    markdown: '',
    tags: '',
});

export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CAHNGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    }
}, initialState);