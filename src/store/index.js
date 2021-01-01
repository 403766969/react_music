import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const storeEnhancer = applyMiddleware(thunk)

const store = createStore(reducer, composeEnhancers(storeEnhancer))

export default store
