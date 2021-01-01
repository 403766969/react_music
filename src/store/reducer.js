// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as recommendationReducer } from '@/pages/discover/c-pages/recommendation/store'

const reducer = combineReducers({
  recommendation: recommendationReducer
})

export default reducer
