import * as types from '../actions/actionTypes';

const initialState = {
  data: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.INSERT:
      const {key, value} = action;
      const newSate = Object.assign({}, state);
      newSate.data[key] = value;
      return newSate;
    default:
      return state;
  }
}
