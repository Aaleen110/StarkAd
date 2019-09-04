import * as types from './actionTypes';

export function insertValue(key, value) {
  return {type: types.INSERT, key, value};
}
