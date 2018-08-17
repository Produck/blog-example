import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

const INITIALIZE = 'editor/INITIALIZE';
const CAHNGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';

export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CAHNGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);

const initialState = Map({
    title: '',
    markdown: '',
    tags: '',
    postId: null,
});

export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CAHNGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => {
            const { _id } = action.payload.data;
            return state.set('postId', _id);
        }
    })
}, initialState);