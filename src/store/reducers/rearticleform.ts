import { handleActions } from 'redux-actions'
import { GETTAGS } from '../types/index'
const state = {
  tags:['hahah'],
}
export default handleActions({
  [GETTAGS](state:object, action:any) {
    return {
      ...state,
      tags: action.payload
    }
  }
}, state)