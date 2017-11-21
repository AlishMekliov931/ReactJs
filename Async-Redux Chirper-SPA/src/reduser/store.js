import { createStore, applyMiddleware } from 'redux'
import redusers from './redusers'
import thunk from 'redux-thunk' 


const store = createStore(
    redusers,
    applyMiddleware(thunk)
)

export default store;