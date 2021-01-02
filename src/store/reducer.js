// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as recomdReducer } from '@/pages/discover/c-pages/recomd/store'

const reducer = combineReducers({
  recomd: recomdReducer
})

export default reducer
