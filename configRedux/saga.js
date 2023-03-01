import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* fetchUsers() {
  try {
    const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users')
    yield put({ type: 'USERS_FETCH_SUCCEEDED', payload: response.data })
  } catch (e) {
    yield put({ type: 'USERS_FETCH_FAILED', message: e.message })
  }
}

function* saga() {
  yield takeLatest('USERS_FETCH_REQUESTED', fetchUsers)
}

export default saga