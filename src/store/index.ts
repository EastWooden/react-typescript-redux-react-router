import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk' //用来做异步action的
import rootReducer from './reducers'

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  return store
}