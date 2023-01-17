import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './Reducers'

const rootReducer = combineReducers({ userReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
// const rootReducer = combineReducers({ userReducer });

// export const Store = configureStore({reducer: rootReducer}, applyMiddleware(thunk));
