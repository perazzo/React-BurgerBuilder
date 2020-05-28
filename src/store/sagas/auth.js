import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionsTypes';

//* = generators
export function* logoutSaga(action) {
    console.log('Runing SAGA');

    //put dispatch a new action
    yield put({
        type: actionTypes.AUTH_LOGOUT
    });
}